// components/Content/LerneinheitNode.jsx
import React from 'react';
import FavoritIconNode from '../../status/FavoritIconNode';
import DoneIconNode from '../../status/DoneIconNode';
import DeadlineIconNode from '../../status/DeadlineIconNode';
import StartedIconNode from '../../status/StartedIconNode';
import LockedIconNode from '../../status/LockedIconNode';
import calendarIcon from '../../../assets/calendar.svg';
import pic1 from '../../../assets/Pictures/pic1.jpg';
import pic2 from '../../../assets/Pictures/pic2.jpg';
import pic3 from '../../../assets/Pictures/pic3.jpg';
import { getLerneinheitScaleFactor, calculateLerneinheitPositionInCell, getContainerDimensions } from '../GridboxNode/gridUtils';
import { calculateSingleIconPosition } from '../GridboxNode/gridUtilsIcons';

// Custom Deadline Icon mit Shimmer-Effekt
function DeadlineIconWithShimmer() {
  return (
    <div
      style={{
        width: 20,
        height: 20,
        borderRadius: 100,
        background: '#2B7FFF',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: 1,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <img src={calendarIcon} alt="Kalender" width={15} height={15} />
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: '-100%',
          width: '100%',
          height: '100%',
          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
          animation: 'shimmer 2s infinite',
        }}
      />
      <style>
        {`
          @keyframes shimmer {
            0% {
              left: -100%;
            }
            100% {
              left: 100%;
            }
          }
        `}
      </style>
    </div>
  );
}

const iconMap = {
  favoritIcon: FavoritIconNode,
  doneIcon: DoneIconNode,
  deadlineIcon: DeadlineIconWithShimmer,
  startedIcon: StartedIconNode,
  lockedIcon: LockedIconNode,
};

export default function LerneinheitNode({ data }) {
  // Debug: Icon-Informationen anzeigen
  console.log('LerneinheitNode render:', {
    id: data.title,
    statusIcons: data.statusIcons,
    iconMap: Object.keys(iconMap)
  });
  
  // Schriftgröße aus data verwenden oder basierend auf der Node-Größe anpassen
  const fontSize = data.fontSize || Math.min(data.width / 8, data.height / 4);
  
  // Bild basierend auf imageSource auswählen
  const getImageSource = (imageSource) => {
    switch (imageSource) {
      case 'pic1':
        return pic1;
      case 'pic2':
        return pic2;
      case 'pic3':
        return pic3;
    }
  };
  
  const currentImage = getImageSource(data.imageSource);
  
  // Dynamische Icon-Skalierung basierend auf der Lerneinheit-Größe
  // Ursprüngliche Standard-Größe: 18000x12000
  // Ursprüngliche Icon-Skalierung: 300
  const originalWidth = 18000;
  const originalHeight = 12000;
  const originalIconScale = 300;
  
  // Berechne den Skalierungsfaktor basierend auf dem Verhältnis der aktuellen Größe zur ursprünglichen
  const widthRatio = data.width / originalWidth;
  const heightRatio = data.height / originalHeight;
  const scaleRatio = Math.min(widthRatio, heightRatio); // Verwende den kleineren Wert für konsistente Skalierung
  
  // Berechne die neue Icon-Skalierung
  const dynamicIconScale = originalIconScale * scaleRatio;
  
  // Dynamische Border-Radius basierend auf der Lerneinheit-Größe
  // Ursprüngliche Standard-Border-Radius: 8
  const originalBorderRadius = 8;
  // Für verkleinerte Lerneinheiten: deutlich weniger Rundung
  const dynamicBorderRadius = scaleRatio < 0.5 ? 
    Math.max(0.5, originalBorderRadius * scaleRatio * 0.3) : // 70% weniger Rundung bei kleinen Lerneinheiten
    Math.max(1, originalBorderRadius * scaleRatio); // Normale Skalierung für größere Lerneinheiten
  
  // Dynamische Border-Breite basierend auf der Lerneinheit-Größe
  // Ursprüngliche Standard-Border-Breite: 4px
  const originalBorderWidth = 4;
  const dynamicBorderWidth = Math.max(1, originalBorderWidth * scaleRatio); // Mindestens 1px
  
  return (
    <div
      style={{
        width: data.width,
        height: data.height,
        background: data.backgroundColor || '#e6fefc',
        border: `${dynamicBorderWidth}px solid ${data.borderColor || '#30b89b'}`, // Dynamische Border-Breite
        borderRadius: dynamicBorderRadius, // Dynamische Border-Radius
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'sans-serif',
        fontSize: fontSize,
        fontWeight: 'bold',
        overflow: 'hidden',
        position: 'relative', // für absolute Icons
        touchAction: 'none', // Touch-Events deaktivieren
        userSelect: 'none', // Text-Auswahl verhindern
      }}
    >
                 {/* Status-Icons mit dynamischer Skalierung */}
         {Array.isArray(data.statusIcons) && data.statusIcons.slice(0, 2).map((icon, i) => {
           const IconComp = iconMap[icon.type];
           return IconComp ? (
             <div
               key={i}
               style={{
                 position: 'absolute',
                                   left: (() => {
                    // Relative Position in Pixel umrechnen
                    const baseX = typeof icon.x === 'number' && icon.x <= 1 ? icon.x * data.width : icon.x;
                    // Absolute Pixel-Offset anwenden (750px nach links)
                    return baseX - (icon.offsetX || 0);
                  })(),
                  top: (() => {
                    // Relative Position in Pixel umrechnen
                    const baseY = typeof icon.y === 'number' && icon.y <= 1 ? icon.y * data.height : icon.y;
                    // Absolute Pixel-Offset anwenden (750px nach oben)
                    return baseY - (icon.offsetY || 0);
                  })(),
                 zIndex: 2,
                 transform: `scale(${dynamicIconScale})`, // Dynamische Skalierung
                 transformOrigin: 'top left',
                 pointerEvents: 'none', // Pointer-Events deaktivieren
                 touchAction: 'none', // Touch-Events deaktivieren
                 userSelect: 'none', // Text-Auswahl verhindern
               }}
             >
               <IconComp />
             </div>
           ) : null;
         })}


        

        {/* Medien-Icon */}
        <div
          style={{
            width: '100%',
            height: '60%',
            background: '#d5f4ee',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
          }}
        >
          <img 
            src={currentImage} 
            alt="Lerneinheit Bild" 
            style={{
              width: '125%',
              height: '125%',
              objectFit: 'contain',
              transform: 'scale(1.25)',
              transformOrigin: 'center',
            }}
          />
        </div>
  
        {/* Titelbereich */}
        <div
          style={{
            height: '40%',
            width: '100%',
            background: '#f7f7f7',
            color: '#333',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '0 4px',
            textAlign: 'center',
            lineHeight: '1.0', // Vergrößerter Zeilenabstand um 25% (von 0.8 auf 1.0)
          }}
        >
          {data.title}
        </div>
      </div>
    );
  }

// Lerneinheiten für das 9er Grid (Level 1) - wird von CourseOverviewFlowCanvas verwendet
export const nineGridLerneinheiten = [
  {
    id: 'nine-grid-lerneinheit-1',
    type: 'lerneinheit',
    // Position relativ zu Zelle 1: 5% X, 10% Y der Zelle
    position: (() => {
      const containerId = '9erContainer-1-level-1';
      const { width, height } = getContainerDimensions(containerId);
      return calculateLerneinheitPositionInCell(1, width, height);
    })(),
    parentId: '9erContainer-1-level-1',
    data: {
      title: '9er Grid Lerneinheit 1',
      // SKALIERTE Größen basierend auf Container-ID
      width: 18000 * getLerneinheitScaleFactor('9erContainer-1-level-1'),
      height: 12000 * getLerneinheitScaleFactor('9erContainer-1-level-1'),
      backgroundColor: '#e6fefc',
      borderColor: '#30b89b',
      // SKALIERTE Schriftgröße basierend auf Container-ID
      fontSize: 960 * getLerneinheitScaleFactor('9erContainer-1-level-1'),
      imageSource: 'pic1', // Bild-Quelle für diese Lerneinheit
                           statusIcons: [
          {
            type: 'startedIcon',
            x: 0.083, // 8.33% der Breite (relative Position)
            y: 0.05,  // 5% der Höhe (relative Position)
          },
          {
            type: 'favoritIcon',
            x: 0.583, // 58.33% der Breite (relative Position)
            y: 0.05,  // 5% der Höhe (relative Position)
          }
        ],
    },
  },
  {
    id: 'nine-grid-lerneinheit-2',
    type: 'lerneinheit',
    // Position relativ zu Zelle 2: 5% X, 10% Y der Zelle
    position: (() => {
      const containerId = '9erContainer-1-level-1';
      const { width, height } = getContainerDimensions(containerId);
      return calculateLerneinheitPositionInCell(2, width, height);
    })(),
    parentId: '9erContainer-1-level-1',
    data: {
             title: '9er Grid Lerneinheit 2',
       // SKALIERTE Größen basierend auf Container-ID
       width: 18000 * getLerneinheitScaleFactor('9erContainer-1-level-1'),
       height: 12000 * getLerneinheitScaleFactor('9erContainer-1-level-1'),
       backgroundColor: '#e6fefc',
       borderColor: '#30b89b',
       // SKALIERTE Schriftgröße basierend auf Container-ID
       fontSize: 960 * getLerneinheitScaleFactor('9erContainer-1-level-1'),
       imageSource: 'pic2', // Bild-Quelle für diese Lerneinheit
              statusIcons: [
         {
           type: 'doneIcon',
           ...(() => {
             // Berechne die tatsächliche gerenderte Icon-Größe
             const lerneinheitWidth = 18000 * getLerneinheitScaleFactor('9erContainer-1-level-1');
             const lerneinheitHeight = 12000 * getLerneinheitScaleFactor('9erContainer-1-level-1');
             const scaleRatio = Math.min(lerneinheitWidth / 18000, lerneinheitHeight / 12000);
             const actualIconSize = 20 * 300 * scaleRatio; // 20px × 300 × scaleRatio
             
             const iconPosition = calculateSingleIconPosition(
               { x: 0.5, y: 0.3 }, // Relative Position: 50% Breite, 30% Höhe der Lerneinheit
               lerneinheitWidth, // Lerneinheit-Breite
               lerneinheitHeight, // Lerneinheit-Höhe
               actualIconSize, // Icon-Breite (echte gerenderte Größe)
               actualIconSize  // Icon-Höhe (echte gerenderte Größe)
             );
             return {
               x: iconPosition.centerIcon.x,
               y: iconPosition.centerIcon.y,
               offsetX: iconPosition.calculations.offsetX, // 750px X-Offset
               offsetY: iconPosition.calculations.offsetY  // 750px Y-Offset
             };
           })()
         }
       ],
    },
  },
  {
    id: 'nine-grid-lerneinheit-3',
    type: 'lerneinheit',
    // Position relativ zu Zelle 3: 5% X, 10% Y der Zelle
    position: (() => {
      const containerId = '9erContainer-1-level-1';
      const { width, height } = getContainerDimensions(containerId);
      return calculateLerneinheitPositionInCell(3, width, height);
    })(),
    parentId: '9erContainer-1-level-1',
    data: {
             title: '9er Grid Lerneinheit 3',
       // SKALIERTE Größen basierend auf Container-ID
       width: 18000 * getLerneinheitScaleFactor('9erContainer-1-level-1'),
       height: 12000 * getLerneinheitScaleFactor('9erContainer-1-level-1'),
       backgroundColor: '#e6fefc',
       borderColor: '#30b89b',
       // SKALIERTE Schriftgröße basierend auf Container-ID
       fontSize: 960 * getLerneinheitScaleFactor('9erContainer-1-level-1'),
       imageSource: 'pic3', // Bild-Quelle für diese Lerneinheit - pic3
              statusIcons: [
         {
           type: 'favoritIcon',
           ...(() => {
             // Berechne die tatsächliche gerenderte Icon-Größe
             const lerneinheitWidth = 18000 * getLerneinheitScaleFactor('9erContainer-1-level-1');
             const lerneinheitHeight = 12000 * getLerneinheitScaleFactor('9erContainer-1-level-1');
             const scaleRatio = Math.min(lerneinheitWidth / 18000, lerneinheitHeight / 12000);
             const actualIconSize = 20 * 300 * scaleRatio; // 20px × 300 × scaleRatio
             
             const iconPosition = calculateSingleIconPosition(
               { x: 0.5, y: 0.3 }, // Relative Position: 50% Breite, 30% Höhe der Lerneinheit
               lerneinheitWidth, // Lerneinheit-Breite
               lerneinheitHeight, // Lerneinheit-Höhe
               actualIconSize, // Icon-Breite (echte gerenderte Größe)
               actualIconSize  // Icon-Höhe (echte gerenderte Größe)
             );
             return {
               x: iconPosition.centerIcon.x,
               y: iconPosition.centerIcon.y,
               offsetX: iconPosition.calculations.offsetX, // 750px X-Offset
               offsetY: iconPosition.calculations.offsetY  // 750px Y-Offset
             };
           })()
         }
       ],
    },
  },
  {
    id: 'nine-grid-lerneinheit-4',
    type: 'lerneinheit',
    // Position relativ zu Zelle 4: 5% X, 10% Y der Zelle
    position: (() => {
      const containerId = '9erContainer-1-level-1';
      const { width, height } = getContainerDimensions(containerId);
      return calculateLerneinheitPositionInCell(4, width, height);
    })(),
    parentId: '9erContainer-1-level-1',
    data: {
             title: '9er Grid Lerneinheit 4',
       // SKALIERTE Größen basierend auf Container-ID
       width: 18000 * getLerneinheitScaleFactor('9erContainer-1-level-1'),
       height: 12000 * getLerneinheitScaleFactor('9erContainer-1-level-1'),
       backgroundColor: '#e6fefc',
       borderColor: '#30b89b',
       // SKALIERTE Schriftgröße basierend auf Container-ID
       fontSize: 960 * getLerneinheitScaleFactor('9erContainer-1-level-1'),
       imageSource: 'pic1', // Bild-Quelle für diese Lerneinheit
               statusIcons: [
          {
            type: 'favoritIcon',
            x: 0.083, // 8.33% der Breite (relative Position)
            y: 0.05,  // 5% der Höhe (relative Position)
          },
          {
            type: 'doneIcon',
            x: 0.583, // 58.33% der Breite (relative Position)
            y: 0.05,  // 5% der Höhe (relative Position)
          }
        ],
    },
  },
  {
    id: 'nine-grid-lerneinheit-5',
    type: 'lerneinheit',
    // Position relativ zu Zelle 5: 5% X, 10% Y der Zelle
    position: (() => {
      const containerId = '9erContainer-1-level-1';
      const { width, height } = getContainerDimensions(containerId);
      return calculateLerneinheitPositionInCell(5, width, height);
    })(),
    parentId: '9erContainer-1-level-1',
    data: {
             title: '9er Grid Lerneinheit 5',
       // SKALIERTE Größen basierend auf Container-ID
       width: 18000 * getLerneinheitScaleFactor('9erContainer-1-level-1'),
       height: 12000 * getLerneinheitScaleFactor('9erContainer-1-level-1'),
       backgroundColor: '#e6fefc',
       borderColor: '#30b89b',
       // SKALIERTE Schriftgröße basierend auf Container-ID
       fontSize: 960 * getLerneinheitScaleFactor('9erContainer-1-level-1'),
       imageSource: 'pic2', // Bild-Quelle für diese Lerneinheit
       statusIcons: [
         {
           type: 'favoritIcon',
           x: 0.083, // 1500/18000 = 8.33% der Breite (relative Position)
           y: 0.05,  // 600/12000 = 5% der Höhe (relative Position)
         },
         {
           type: 'doneIcon',
           x: 0.583, // 10500/18000 = 58.33% der Breite (rechte Position)
           y: 0.05,  // 600/12000 = 5% der Höhe (relative Position)
         }
       ],
    },
  },
  {
    id: 'nine-grid-lerneinheit-6',
    type: 'lerneinheit',
    // Position relativ zu Zelle 6: 5% X, 10% Y der Zelle
    position: (() => {
      const containerId = '9erContainer-1-level-1';
      const { width, height } = getContainerDimensions(containerId);
      return calculateLerneinheitPositionInCell(6, width, height);
    })(),
    parentId: '9erContainer-1-level-1',
    data: {
                           title: '9er Grid Lerneinheit 6',
         // SKALIERTE Größen basierend auf Container-ID
         width: 18000 * getLerneinheitScaleFactor('9erContainer-1-level-1'),
         height: 12000 * getLerneinheitScaleFactor('9erContainer-1-level-1'),
         backgroundColor: '#e6fefc',
         borderColor: '#30b89b',
         // SKALIERTE Schriftgröße basierend auf Container-ID
         fontSize: 960 * getLerneinheitScaleFactor('9erContainer-1-level-1'),
         imageSource: 'pic3', // Bild-Quelle für diese Lerneinheit
         statusIcons: [
           {
             type: 'doneIcon',
             ...(() => {
               // Berechne die tatsächliche gerenderte Icon-Größe
               const lerneinheitWidth = 18000 * getLerneinheitScaleFactor('9erContainer-1-level-1');
               const lerneinheitHeight = 12000 * getLerneinheitScaleFactor('9erContainer-1-level-1');
               const scaleRatio = Math.min(lerneinheitWidth / 18000, lerneinheitHeight / 12000);
               const actualIconSize = 20 * 300 * scaleRatio; // 20px × 300 × scaleRatio
               
               const iconPosition = calculateSingleIconPosition(
                 { x: 0.5, y: 0.3 }, // Relative Position: 50% Breite, 30% Höhe der Lerneinheit
                 lerneinheitWidth, // Lerneinheit-Breite
                 lerneinheitHeight, // Lerneinheit-Höhe
                 actualIconSize, // Icon-Breite (echte gerenderte Größe)
                 actualIconSize  // Icon-Höhe (echte gerenderte Größe)
               );
               return {
                 x: iconPosition.centerIcon.x,
                 y: iconPosition.centerIcon.y,
                 offsetX: iconPosition.calculations.offsetX, // 750px X-Offset
                 offsetY: iconPosition.calculations.offsetY  // 750px Y-Offset
               };
             })()
           }
         ],
    },
  },
  {
    id: 'nine-grid-lerneinheit-7',
    type: 'lerneinheit',
    // Position relativ zu Zelle 7: 5% X, 10% Y der Zelle
    position: (() => {
      const containerId = '9erContainer-1-level-1';
      const { width, height } = getContainerDimensions(containerId);
      return calculateLerneinheitPositionInCell(7, width, height);
    })(),
    parentId: '9erContainer-1-level-1',
    data: {
             title: '9er Grid Lerneinheit 7',
       // SKALIERTE Größen basierend auf Container-ID
       width: 18000 * getLerneinheitScaleFactor('9erContainer-1-level-1'),
       height: 12000 * getLerneinheitScaleFactor('9erContainer-1-level-1'),
       backgroundColor: '#e6fefc',
       borderColor: '#30b89b',
       // SKALIERTE Schriftgröße basierend auf Container-ID
       fontSize: 960 * getLerneinheitScaleFactor('9erContainer-1-level-1'),
       imageSource: 'pic1', // Bild-Quelle für diese Lerneinheit
       statusIcons: [
         {
           type: 'favoritIcon',
           x: 0.083, // 1500/18000 = 8.33% der Breite (relative Position)
           y: 0.05,  // 600/12000 = 5% der Höhe (relative Position)
         },
         {
           type: 'doneIcon',
           x: 0.583, // 10500/18000 = 58.33% der Breite (rechte Position)
           y: 0.05,  // 600/12000 = 5% der Höhe (relative Position)
         }
       ],
    },
  },
  {
    id: 'nine-grid-lerneinheit-8',
    type: 'lerneinheit',
    // Position relativ zu Zelle 8: 5% X, 10% Y der Zelle
    position: (() => {
      const containerId = '9erContainer-1-level-1';
      const { width, height } = getContainerDimensions(containerId);
      return calculateLerneinheitPositionInCell(8, width, height);
    })(),
    parentId: '9erContainer-1-level-1',
    data: {
      title: '9er Grid Lerneinheit 8',
      // SKALIERTE Größen basierend auf Container-ID
      width: 18000 * getLerneinheitScaleFactor('9erContainer-1-level-1'),
      height: 12000 * getLerneinheitScaleFactor('9erContainer-1-level-1'),
      backgroundColor: '#e6fefc',
      borderColor: '#30b89b',
      // SKALIERTE Schriftgröße basierend auf Container-ID
      fontSize: 960 * getLerneinheitScaleFactor('9erContainer-1-level-1'),
      imageSource: 'pic2', // Bild-Quelle für diese Lerneinheit
      statusIcons: [
        {
          type: 'startedIcon',
          x: 0.083, // 1500/18000 = 8.33% der Breite (relative Position)
          y: 0.05,  // 600/12000 = 5% der Höhe (relative Position)
        },
        {
          type: 'lockedIcon',
          x: 0.583, // 10500/18000 = 58.33% der Breite (rechte Position)
          y: 0.05,  // 600/12000 = 5% der Höhe (relative Position)
        }
      ],
    },
  },
  {
    id: 'nine-grid-lerneinheit-9',
    type: 'lerneinheit',
    // Position relativ zu Zelle 9: 5% X, 10% Y der Zelle
    position: (() => {
      const containerId = '9erContainer-1-level-1';
      const { width, height } = getContainerDimensions(containerId);
      return calculateLerneinheitPositionInCell(9, width, height);
    })(),
    parentId: '9erContainer-1-level-1',
    data: {
      title: '9er Grid Lerneinheit 9',
      // SKALIERTE Größen basierend auf Container-ID
      width: 18000 * getLerneinheitScaleFactor('9erContainer-1-level-1'),
      height: 12000 * getLerneinheitScaleFactor('9erContainer-1-level-1'),
      backgroundColor: '#e6fefc',
      borderColor: '#30b89b',
      // SKALIERTE Schriftgröße basierend auf Container-ID
      fontSize: 960 * getLerneinheitScaleFactor('9erContainer-1-level-1'),
      imageSource: 'pic3', // Bild-Quelle für diese Lerneinheit
      statusIcons: [
        {
          type: 'deadlineIcon',
          x: 0.083, // 1500/18000 = 8.33% der Breite (relative Position)
          y: 0.05,  // 600/12000 = 5% der Höhe (relative Position)
        },
        {
          type: 'favoritIcon',
          x: 0.583, // 10500/18000 = 58.33% der Breite (rechte Position)
          y: 0.05,  // 600/12000 = 5% der Höhe (relative Position)
        }
      ],
    },
  },

];

// Lerneinheiten für das 6er Grid werden jetzt über gridUtilsIcons.js erstellt
// Das ursprüngliche Array wurde entfernt, um doppelte Lerneinheiten zu vermeiden
export const sixGridLerneinheiten = [];
