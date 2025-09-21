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
import pic4 from '../../../assets/Pictures/pic4.jpg';
import pic5 from '../../../assets/Pictures/pic5.jpg';
import pic6 from '../../../assets/Pictures/pic6.jpg';
import pic7 from '../../../assets/Pictures/pic7.jpg';
import pic8 from '../../../assets/Pictures/pic8.jpg';
import pic9 from '../../../assets/Pictures/pic9.jpg';
import pic10 from '../../../assets/Pictures/pic10.jpg';
import pic11 from '../../../assets/Pictures/pic11.jpg';
import pic12 from '../../../assets/Pictures/pic12.jpg';
import pic13 from '../../../assets/Pictures/pic13.jpg';
import { calculateLerneinheitPositionInCell, getContainerDimensions } from '../GridboxNode/gridUtils';
import { calculateSingleIconPosition } from '../GridboxNode/positionUtils';

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
  
  // Glow-Effekt für spezielle Lerneinheiten (z.B. 9. Lerneinheit)
  const glowColor = '#00aaff';
  const hasGlowEffect = data.hasGlowEffect || false;
  
  // Bild basierend auf imageSource auswählen
  const getImageSource = (imageSource) => {
    switch (imageSource) {
      case 'pic1':
        return pic1;
      case 'pic2':
        return pic2;
      case 'pic3':
        return pic3;
      case 'pic4':
        return pic4;
      case 'pic5':
        return pic5;
      case 'pic6':
        return pic6;
      case 'pic7':
        return pic7;
      case 'pic8':
        return pic8;
      case 'pic9':
        return pic9;
      case 'pic10':
        return pic10;
      case 'pic11':
        return pic11;
      case 'pic12':
        return pic12;
      case 'pic13':
        return pic13;
      default:
        return pic1; // Fallback
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
    <>
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
          ...(hasGlowEffect && {
            boxShadow: data.glowSize === 'level1' ? 
              `0 0 ${512/5}px ${256/5}px ${glowColor}, 0 0 ${1024/5}px ${512/5}px rgba(0, 170, 255, 0.24)` :
              data.glowSize === 'level1x4' ?
              `0 0 ${512 * 4}px ${256 * 4}px ${glowColor}, 0 0 ${1024 * 4}px ${512 * 4}px rgba(0, 170, 255, 0.24)` :
              data.glowSize === 'level1x16' ?
              `0 0 8192px 4096px ${glowColor}, 0 0 16384px 8192px rgba(0, 170, 255, 0.24)` :
              data.glowSize === 'level1x2' ?
              `0 0 ${512 * 2}px ${256 * 2}px ${glowColor}, 0 0 ${1024 * 2}px ${512 * 2}px rgba(0, 170, 255, 0.24)` :
              `0 0 ${512 * scaleRatio}px ${256 * scaleRatio}px ${glowColor}, 0 0 ${1024 * scaleRatio}px ${512 * scaleRatio}px rgba(0, 170, 255, 0.24)`,
            animation: data.glowSize === 'level1x16' ? 'pulsate-mega 2s infinite' : 
                      data.glowSize === 'level1x2' ? 'pulsate-small 2s infinite' : 'pulsate 2s infinite',
          })
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
                 pointerEvents: 'auto', // Icons klickbar machen
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
      
      {/* CSS für Glow-Animation */}
      {hasGlowEffect && (
        <style>
          {`
            @keyframes pulsate-small {
              0% {
                box-shadow: 0 0 1024px 512px ${glowColor}, 0 0 2048px 1024px rgba(0, 170, 255, 0.24);
              }
              25% {
                box-shadow: 0 0 1280px 640px ${glowColor}, 0 0 2304px 1152px rgba(0, 170, 255, 0.3);
              }
              50% {
                box-shadow: 0 0 1536px 768px ${glowColor}, 0 0 2560px 1280px rgba(0, 170, 255, 0.4);
              }
              75% {
                box-shadow: 0 0 1280px 640px ${glowColor}, 0 0 2304px 1152px rgba(0, 170, 255, 0.3);
              }
              100% {
                box-shadow: 0 0 1024px 512px ${glowColor}, 0 0 2048px 1024px rgba(0, 170, 255, 0.24);
              }
            }
            @keyframes pulsate-mega {
              0% {
                box-shadow: 0 0 8192px 4096px ${glowColor}, 0 0 16384px 8192px rgba(0, 170, 255, 0.24);
              }
              25% {
                box-shadow: 0 0 10240px 5120px ${glowColor}, 0 0 18432px 9216px rgba(0, 170, 255, 0.3);
              }
              50% {
                box-shadow: 0 0 12288px 6144px ${glowColor}, 0 0 20480px 10240px rgba(0, 170, 255, 0.4);
              }
              75% {
                box-shadow: 0 0 10240px 5120px ${glowColor}, 0 0 18432px 9216px rgba(0, 170, 255, 0.3);
              }
              100% {
                box-shadow: 0 0 8192px 4096px ${glowColor}, 0 0 16384px 8192px rgba(0, 170, 255, 0.24);
              }
            }
            @keyframes pulsate {
              0% {
                box-shadow: ${data.glowSize === 'level1' ? 
                  `0 0 ${512/5}px ${256/5}px ${glowColor}, 0 0 ${1024/5}px ${512/5}px rgba(0, 170, 255, 0.24)` :
                  data.glowSize === 'level1x4' ?
                  `0 0 ${512 * 4}px ${256 * 4}px ${glowColor}, 0 0 ${1024 * 4}px ${512 * 4}px rgba(0, 170, 255, 0.24)` :
                  data.glowSize === 'level1x16' ?
                  `0 0 ${512 * 16}px ${256 * 16}px ${glowColor}, 0 0 ${1024 * 16}px ${512 * 16}px rgba(0, 170, 255, 0.24)` :
                  `0 0 ${512 * scaleRatio}px ${256 * scaleRatio}px ${glowColor}, 0 0 ${1024 * scaleRatio}px ${512 * scaleRatio}px rgba(0, 170, 255, 0.24)`};
              }
              25% {
                box-shadow: ${data.glowSize === 'level1' ? 
                  `0 0 ${640/5}px ${320/5}px ${glowColor}, 0 0 ${1152/5}px ${576/5}px rgba(0, 170, 255, 0.3)` :
                  data.glowSize === 'level1x4' ?
                  `0 0 ${640 * 4}px ${320 * 4}px ${glowColor}, 0 0 ${1152 * 4}px ${576 * 4}px rgba(0, 170, 255, 0.3)` :
                  data.glowSize === 'level1x16' ?
                  `0 0 ${640 * 16}px ${320 * 16}px ${glowColor}, 0 0 ${1152 * 16}px ${576 * 16}px rgba(0, 170, 255, 0.3)` :
                  `0 0 ${640 * scaleRatio}px ${320 * scaleRatio}px ${glowColor}, 0 0 ${1152 * scaleRatio}px ${576 * scaleRatio}px rgba(0, 170, 255, 0.3)`};
              }
              50% {
                box-shadow: ${data.glowSize === 'level1' ? 
                  `0 0 ${768/5}px ${384/5}px ${glowColor}, 0 0 ${1280/5}px ${640/5}px rgba(0, 170, 255, 0.4)` :
                  data.glowSize === 'level1x4' ?
                  `0 0 ${768 * 4}px ${384 * 4}px ${glowColor}, 0 0 ${1280 * 4}px ${640 * 4}px rgba(0, 170, 255, 0.4)` :
                  data.glowSize === 'level1x16' ?
                  `0 0 ${768 * 16}px ${384 * 16}px ${glowColor}, 0 0 ${1280 * 16}px ${640 * 16}px rgba(0, 170, 255, 0.4)` :
                  `0 0 ${768 * scaleRatio}px ${384 * scaleRatio}px ${glowColor}, 0 0 ${1280 * scaleRatio}px ${640 * scaleRatio}px rgba(0, 170, 255, 0.4)`};
              }
              75% {
                box-shadow: ${data.glowSize === 'level1' ? 
                  `0 0 ${640/5}px ${320/5}px ${glowColor}, 0 0 ${1152/5}px ${576/5}px rgba(0, 170, 255, 0.3)` :
                  data.glowSize === 'level1x4' ?
                  `0 0 ${640 * 4}px ${320 * 4}px ${glowColor}, 0 0 ${1152 * 4}px ${576 * 4}px rgba(0, 170, 255, 0.3)` :
                  data.glowSize === 'level1x16' ?
                  `0 0 ${640 * 16}px ${320 * 16}px ${glowColor}, 0 0 ${1152 * 16}px ${576 * 16}px rgba(0, 170, 255, 0.3)` :
                  `0 0 ${640 * scaleRatio}px ${320 * scaleRatio}px ${glowColor}, 0 0 ${1152 * scaleRatio}px ${576 * scaleRatio}px rgba(0, 170, 255, 0.3)`};
              }
              100% {
                box-shadow: ${data.glowSize === 'level1' ? 
                  `0 0 ${512/5}px ${256/5}px ${glowColor}, 0 0 ${1024/5}px ${512/5}px rgba(0, 170, 255, 0.24)` :
                  data.glowSize === 'level1x4' ?
                  `0 0 ${512 * 4}px ${256 * 4}px ${glowColor}, 0 0 ${1024 * 4}px ${512 * 4}px rgba(0, 170, 255, 0.24)` :
                  data.glowSize === 'level1x16' ?
                  `0 0 ${512 * 16}px ${256 * 16}px ${glowColor}, 0 0 ${1024 * 16}px ${512 * 16}px rgba(0, 170, 255, 0.24)` :
                  `0 0 ${512 * scaleRatio}px ${256 * scaleRatio}px ${glowColor}, 0 0 ${1024 * scaleRatio}px ${512 * scaleRatio}px rgba(0, 170, 255, 0.24)`};
              }
            }
          `}
        </style>
      )}
    </>
  );
}

// Lerneinheiten für das 9er Grid (Level 1) - wird von CourseOverviewFlowCanvas verwendet
export const nineGridLerneinheiten = [
  {
    id: 'nine-grid-lerneinheit-1',
    type: 'lerneinheit',
    // Position relativ zu Zelle 1: 5% X, 10% Y der Zelle
    position: (() => {
      const containerId = '9erContainer-level-1';
      const { width, height } = getContainerDimensions(containerId);
      return calculateLerneinheitPositionInCell(1, width, height);
    })(),
    parentId: '9erContainer-level-1',
    data: {
      title: '9er Grid Lerneinheit 1',
      // SKALIERTE Größen basierend auf Container-ID
      width: 18000 * 1, // getLerneinheitScaleFactor('9erContainer-level-1'),
      height: 12000 * 1, // getLerneinheitScaleFactor('9erContainer-level-1'),
      backgroundColor: '#e6fefc',
      borderColor: '#30b89b',
      // SKALIERTE Schriftgröße basierend auf Container-ID
      fontSize: 960 * 1, // getLerneinheitScaleFactor('9erContainer-level-1'),
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
      const containerId = '9erContainer-level-1';
      const { width, height } = getContainerDimensions(containerId);
      return calculateLerneinheitPositionInCell(2, width, height);
    })(),
    parentId: '9erContainer-level-1',
    data: {
             title: '9er Grid Lerneinheit 2',
       // SKALIERTE Größen basierend auf Container-ID
       width: 18000 * 1, // getLerneinheitScaleFactor('9erContainer-1-level-1'),
       height: 12000 * 1, // getLerneinheitScaleFactor('9erContainer-1-level-1'),
       backgroundColor: '#e6fefc',
       borderColor: '#30b89b',
       // SKALIERTE Schriftgröße basierend auf Container-ID
       fontSize: 960 * 1, // getLerneinheitScaleFactor('9erContainer-1-level-1'),
       imageSource: 'pic2', // Bild-Quelle für diese Lerneinheit
              statusIcons: [
         {
           type: 'doneIcon',
           ...(() => {
             // Berechne die tatsächliche gerenderte Icon-Größe
             const lerneinheitWidth = 18000 * 1; // getLerneinheitScaleFactor('9erContainer-level-1');
             const lerneinheitHeight = 12000 * 1; // getLerneinheitScaleFactor('9erContainer-level-1');
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
      const containerId = '9erContainer-level-1';
      const { width, height } = getContainerDimensions(containerId);
      return calculateLerneinheitPositionInCell(3, width, height);
    })(),
    parentId: '9erContainer-level-1',
    data: {
             title: '9er Grid Lerneinheit 3',
       // SKALIERTE Größen basierend auf Container-ID
       width: 18000 * 1, // getLerneinheitScaleFactor('9erContainer-1-level-1'),
       height: 12000 * 1, // getLerneinheitScaleFactor('9erContainer-1-level-1'),
       backgroundColor: '#e6fefc',
       borderColor: '#30b89b',
       // SKALIERTE Schriftgröße basierend auf Container-ID
       fontSize: 960 * 1, // getLerneinheitScaleFactor('9erContainer-1-level-1'),
       imageSource: 'pic3', // Bild-Quelle für diese Lerneinheit - pic3
              statusIcons: [
         {
           type: 'favoritIcon',
           ...(() => {
             // Berechne die tatsächliche gerenderte Icon-Größe
             const lerneinheitWidth = 18000 * 1; // getLerneinheitScaleFactor('9erContainer-level-1');
             const lerneinheitHeight = 12000 * 1; // getLerneinheitScaleFactor('9erContainer-level-1');
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
      const containerId = '9erContainer-level-1';
      const { width, height } = getContainerDimensions(containerId);
      return calculateLerneinheitPositionInCell(4, width, height);
    })(),
    parentId: '9erContainer-level-1',
    data: {
             title: '9er Grid Lerneinheit 4',
       // SKALIERTE Größen basierend auf Container-ID
       width: 18000 * 1, // getLerneinheitScaleFactor('9erContainer-1-level-1'),
       height: 12000 * 1, // getLerneinheitScaleFactor('9erContainer-1-level-1'),
       backgroundColor: '#e6fefc',
       borderColor: '#30b89b',
       // SKALIERTE Schriftgröße basierend auf Container-ID
       fontSize: 960 * 1, // getLerneinheitScaleFactor('9erContainer-1-level-1'),
       imageSource: 'pic4', // Bild-Quelle für diese Lerneinheit
               statusIcons: [],
    },
  },
  {
    id: 'nine-grid-lerneinheit-5',
    type: 'lerneinheit',
    // Position relativ zu Zelle 5: 5% X, 10% Y der Zelle
    position: (() => {
      const containerId = '9erContainer-level-1';
      const { width, height } = getContainerDimensions(containerId);
      return calculateLerneinheitPositionInCell(5, width, height);
    })(),
    parentId: '9erContainer-level-1',
    data: {
             title: '9er Grid Lerneinheit 5',
       // SKALIERTE Größen basierend auf Container-ID
       width: 18000 * 1, // getLerneinheitScaleFactor('9erContainer-1-level-1'),
       height: 12000 * 1, // getLerneinheitScaleFactor('9erContainer-1-level-1'),
       backgroundColor: '#e6fefc',
       borderColor: '#30b89b',
       // SKALIERTE Schriftgröße basierend auf Container-ID
       fontSize: 960 * 1, // getLerneinheitScaleFactor('9erContainer-1-level-1'),
       imageSource: 'pic5', // Bild-Quelle für diese Lerneinheit
       statusIcons: [],
    },
  },
  {
    id: 'nine-grid-lerneinheit-6',
    type: 'lerneinheit',
    // Position relativ zu Zelle 6: 5% X, 10% Y der Zelle
    position: (() => {
      const containerId = '9erContainer-level-1';
      const { width, height } = getContainerDimensions(containerId);
      return calculateLerneinheitPositionInCell(6, width, height);
    })(),
    parentId: '9erContainer-level-1',
    data: {
                           title: '9er Grid Lerneinheit 6',
         // SKALIERTE Größen basierend auf Container-ID
         width: 18000 * 1, // getLerneinheitScaleFactor('9erContainer-1-level-1'),
         height: 12000 * 1, // getLerneinheitScaleFactor('9erContainer-1-level-1'),
         backgroundColor: '#e6fefc',
         borderColor: '#30b89b',
         // SKALIERTE Schriftgröße basierend auf Container-ID
         fontSize: 960 * 1, // getLerneinheitScaleFactor('9erContainer-1-level-1'),
         imageSource: 'pic6', // Bild-Quelle für diese Lerneinheit
         statusIcons: [],
    },
  },
  {
    id: 'nine-grid-lerneinheit-7',
    type: 'lerneinheit',
    // Position relativ zu Zelle 7: 5% X, 10% Y der Zelle
    position: (() => {
      const containerId = '9erContainer-level-1';
      const { width, height } = getContainerDimensions(containerId);
      return calculateLerneinheitPositionInCell(7, width, height);
    })(),
    parentId: '9erContainer-level-1',
    data: {
             title: '9er Grid Lerneinheit 7',
       // SKALIERTE Größen basierend auf Container-ID
       width: 18000 * 1, // getLerneinheitScaleFactor('9erContainer-1-level-1'),
       height: 12000 * 1, // getLerneinheitScaleFactor('9erContainer-1-level-1'),
       backgroundColor: '#e6fefc',
       borderColor: '#30b89b',
       // SKALIERTE Schriftgröße basierend auf Container-ID
       fontSize: 960 * 1, // getLerneinheitScaleFactor('9erContainer-1-level-1'),
       imageSource: 'pic7', // Bild-Quelle für diese Lerneinheit
       statusIcons: [],
    },
  },
  {
    id: 'nine-grid-lerneinheit-8',
    type: 'lerneinheit',
    // Position relativ zu Zelle 8: 5% X, 10% Y der Zelle
    position: (() => {
      const containerId = '9erContainer-level-1';
      const { width, height } = getContainerDimensions(containerId);
      return calculateLerneinheitPositionInCell(8, width, height);
    })(),
    parentId: '9erContainer-level-1',
    data: {
      title: '9er Grid Lerneinheit 8',
      // SKALIERTE Größen basierend auf Container-ID
      width: 18000 * 1, // getLerneinheitScaleFactor('9erContainer-level-1'),
      height: 12000 * 1, // getLerneinheitScaleFactor('9erContainer-level-1'),
      backgroundColor: '#e6fefc',
      borderColor: '#30b89b',
      // SKALIERTE Schriftgröße basierend auf Container-ID
      fontSize: 960 * 1, // getLerneinheitScaleFactor('9erContainer-level-1'),
      imageSource: 'pic8', // Bild-Quelle für diese Lerneinheit
      statusIcons: [],
    },
  },
  {
    id: 'nine-grid-lerneinheit-9',
    type: 'lerneinheit',
    // Position relativ zu Zelle 9: 5% X, 10% Y der Zelle
    position: (() => {
      const containerId = '9erContainer-level-1';
      const { width, height } = getContainerDimensions(containerId);
      return calculateLerneinheitPositionInCell(9, width, height);
    })(),
    parentId: '9erContainer-level-1',
    data: {
      title: '9er Grid Lerneinheit 9',
      // SKALIERTE Größen basierend auf Container-ID
      width: 18000 * 1, // getLerneinheitScaleFactor('9erContainer-level-1'),
      height: 12000 * 1, // getLerneinheitScaleFactor('9erContainer-level-1'),
      backgroundColor: '#e6fefc',
      borderColor: '#30b89b',
      // SKALIERTE Schriftgröße basierend auf Container-ID
      fontSize: 960 * 1, // getLerneinheitScaleFactor('9erContainer-level-1'),
      imageSource: 'pic9', // Bild-Quelle für diese Lerneinheit
      hasGlowEffect: true, // Glow-Effekt für die 9. Lerneinheit aktiviert
      glowSize: 'level1x2', // 2x vergrößerter Glow für Lerneinheit 9
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

// Lerneinheiten für das 6er Grid (Level 2) - 12.5% der Basis-Größe
export const sixGridLevel2Lerneinheiten = [
  {
    id: 'six-grid-level2-lerneinheit-1',
    type: 'lerneinheit',
    // Position relativ zu Zelle 1: 5% X, 10% Y der Zelle
    position: (() => {
      const containerId = '6erContainer-level-2';
      const { width, height } = getContainerDimensions(containerId);
      const lerneinheitWidth = 18000 * 0.125; // Level 2 Größe
      const lerneinheitHeight = 12000 * 0.125; // Level 2 Größe
      return calculateLerneinheitPositionInCell(1, width, height, '6er', lerneinheitWidth, lerneinheitHeight);
    })(),
    parentId: '6erContainer-level-2',
    data: {
      title: '6er L2 Lerneinheit 1',
      // SKALIERTE Größen für Level 2 (12.5% der Basis-Größe)
      width: 18000 * 0.125,
      height: 12000 * 0.125,
      backgroundColor: '#e6fefc',
      borderColor: '#30b89b',
      // SKALIERTE Schriftgröße für Level 2
      fontSize: 960 * 0.125,
      imageSource: 'pic1',
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
    id: 'six-grid-level2-lerneinheit-2',
    type: 'lerneinheit',
    // Position relativ zu Zelle 2: 5% X, 10% Y der Zelle
    position: (() => {
      const containerId = '6erContainer-level-2';
      const { width, height } = getContainerDimensions(containerId);
      const lerneinheitWidth = 18000 * 0.125; // Level 2 Größe
      const lerneinheitHeight = 12000 * 0.125; // Level 2 Größe
      return calculateLerneinheitPositionInCell(2, width, height, '6er', lerneinheitWidth, lerneinheitHeight);
    })(),
    parentId: '6erContainer-level-2',
    data: {
      title: '6er L2 Lerneinheit 2',
      width: 18000 * 0.125,
      height: 12000 * 0.125,
      backgroundColor: '#e6fefc',
      borderColor: '#30b89b',
      fontSize: 960 * 0.125,
      imageSource: 'pic2',
      statusIcons: [
        {
          type: 'doneIcon',
          ...(() => {
            // Berechne die tatsächliche gerenderte Icon-Größe für Level 2
            const lerneinheitWidth = 18000 * 0.125;
            const lerneinheitHeight = 12000 * 0.125;
            const scaleRatio = Math.min(lerneinheitWidth / 18000, lerneinheitHeight / 12000);
            const actualIconSize = 20 * 300 * scaleRatio;
            
            const iconPosition = calculateSingleIconPosition(
              { x: 0.5, y: 0.3 },
              lerneinheitWidth,
              lerneinheitHeight,
              actualIconSize,
              actualIconSize
            );
            return {
              x: iconPosition.centerIcon.x,
              y: iconPosition.centerIcon.y,
              offsetX: iconPosition.calculations.offsetX,
              offsetY: iconPosition.calculations.offsetY
            };
          })()
        }
      ],
    },
  },
  {
    id: 'six-grid-level2-lerneinheit-3',
    type: 'lerneinheit',
    // Position relativ zu Zelle 3: 5% X, 10% Y der Zelle
    position: (() => {
      const containerId = '6erContainer-level-2';
      const { width, height } = getContainerDimensions(containerId);
      const lerneinheitWidth = 18000 * 0.125; // Level 2 Größe
      const lerneinheitHeight = 12000 * 0.125; // Level 2 Größe
      return calculateLerneinheitPositionInCell(3, width, height, '6er', lerneinheitWidth, lerneinheitHeight);
    })(),
    parentId: '6erContainer-level-2',
    data: {
      title: '6er L2 Lerneinheit 3',
      width: 18000 * 0.125,
      height: 12000 * 0.125,
      backgroundColor: '#e6fefc',
      borderColor: '#30b89b',
      fontSize: 960 * 0.125,
      imageSource: 'pic11', // Level 2, Lerneinheit 3
      hasGlowEffect: true, // Glow-Effekt für Lerneinheit 3 Level 2 aktiviert
      glowSize: 'level1', // Verwende Level 1 Glow-Größe statt skalierter Größe
      statusIcons: [
        {
          type: 'deadlineIcon',
          x: 0.083,
          y: 0.05,
        },
        {
          type: 'startedIcon',
          x: 0.583,
          y: 0.05,
        }
      ],
    },
  },
  {
    id: 'six-grid-level2-lerneinheit-4',
    type: 'lerneinheit',
    // Position relativ zu Zelle 4: 5% X, 10% Y der Zelle
    position: (() => {
      const containerId = '6erContainer-level-2';
      const { width, height } = getContainerDimensions(containerId);
      const lerneinheitWidth = 18000 * 0.125; // Level 2 Größe
      const lerneinheitHeight = 12000 * 0.125; // Level 2 Größe
      return calculateLerneinheitPositionInCell(4, width, height, '6er', lerneinheitWidth, lerneinheitHeight);
    })(),
    parentId: '6erContainer-level-2',
    data: {
      title: '6er L2 Lerneinheit 4',
      width: 18000 * 0.125,
      height: 12000 * 0.125,
      backgroundColor: '#e6fefc',
      borderColor: '#30b89b',
      fontSize: 960 * 0.125,
      imageSource: 'pic12', // Level 2, Lerneinheit 4
      statusIcons: [],
    },
  },
];

// Lerneinheiten für das 9er Grid (Level 2) - 50% der Basis-Größe
export const nineGridLevel2Lerneinheiten = [
  {
    id: 'nine-grid-level2-lerneinheit-1',
    type: 'lerneinheit',
    // Position relativ zu Zelle 1: 5% X, 10% Y der Zelle
    position: (() => {
      const containerId = '9erContainer-level-2';
      const { width, height } = getContainerDimensions(containerId);
      const lerneinheitWidth = 18000 * 0.125; // Level 2 Größe
      const lerneinheitHeight = 12000 * 0.125; // Level 2 Größe
      return calculateLerneinheitPositionInCell(1, width, height, null, lerneinheitWidth, lerneinheitHeight);
    })(),
    parentId: '9erContainer-level-2',
    data: {
      title: '9er L2 Lerneinheit 1',
      // SKALIERTE Größen für Level 2 (12.5% der Basis-Größe)
      width: 18000 * 0.125,
      height: 12000 * 0.125,
      backgroundColor: '#e6fefc',
      borderColor: '#30b89b',
      // SKALIERTE Schriftgröße für Level 2
      fontSize: 960 * 0.125,
      imageSource: 'pic1',
      statusIcons: [
        {
          type: 'doneIcon',
          ...(() => {
            const lerneinheitWidth = 18000 * 0.125;
            const lerneinheitHeight = 12000 * 0.125;
            const scaleRatio = Math.min(lerneinheitWidth / 18000, lerneinheitHeight / 12000);
            const actualIconSize = 20 * 300 * scaleRatio;
            
            const iconPosition = calculateSingleIconPosition(
              { x: 0.5, y: 0.3 },
              lerneinheitWidth,
              lerneinheitHeight,
              actualIconSize,
              actualIconSize
            );
            return {
              x: iconPosition.centerIcon.x,
              y: iconPosition.centerIcon.y,
              offsetX: iconPosition.calculations.offsetX,
              offsetY: iconPosition.calculations.offsetY
            };
          })()
        }
      ],
    },
  },
  {
    id: 'nine-grid-level2-lerneinheit-2',
    type: 'lerneinheit',
    // Position relativ zu Zelle 2: 5% X, 10% Y der Zelle
    position: (() => {
      const containerId = '9erContainer-level-2';
      const { width, height } = getContainerDimensions(containerId);
      const lerneinheitWidth = 18000 * 0.125; // Level 2 Größe
      const lerneinheitHeight = 12000 * 0.125; // Level 2 Größe
      return calculateLerneinheitPositionInCell(2, width, height, null, lerneinheitWidth, lerneinheitHeight);
    })(),
    parentId: '9erContainer-level-2',
    data: {
      title: '9er L2 Lerneinheit 2',
      width: 18000 * 0.125,
      height: 12000 * 0.125,
      backgroundColor: '#e6fefc',
      borderColor: '#30b89b',
      fontSize: 960 * 0.125,
      imageSource: 'pic10', // Level 2, Lerneinheit 2
      statusIcons: [
        {
          type: 'doneIcon',
          ...(() => {
            // Berechne die tatsächliche gerenderte Icon-Größe für Level 2
            const lerneinheitWidth = 18000 * 0.125;
            const lerneinheitHeight = 12000 * 0.125;
            const scaleRatio = Math.min(lerneinheitWidth / 18000, lerneinheitHeight / 12000);
            const actualIconSize = 20 * 300 * scaleRatio;
            
            const iconPosition = calculateSingleIconPosition(
              { x: 0.5, y: 0.3 },
              lerneinheitWidth,
              lerneinheitHeight,
              actualIconSize,
              actualIconSize
            );
            return {
              x: iconPosition.centerIcon.x,
              y: iconPosition.centerIcon.y,
              offsetX: iconPosition.calculations.offsetX,
              offsetY: iconPosition.calculations.offsetY
            };
          })()
        }
      ],
    },
  },
  {
    id: 'nine-grid-level2-lerneinheit-3',
    type: 'lerneinheit',
    // Position relativ zu Zelle 3: 5% X, 10% Y der Zelle
    position: (() => {
      const containerId = '9erContainer-level-2';
      const { width, height } = getContainerDimensions(containerId);
      const lerneinheitWidth = 18000 * 0.125; // Level 2 Größe
      const lerneinheitHeight = 12000 * 0.125; // Level 2 Größe
      return calculateLerneinheitPositionInCell(3, width, height, null, lerneinheitWidth, lerneinheitHeight);
    })(),
    parentId: '9erContainer-level-2',
    data: {
      title: '9er L2 Lerneinheit 3',
      width: 18000 * 0.125,
      height: 12000 * 0.125,
      backgroundColor: '#e6fefc',
      borderColor: '#30b89b',
      fontSize: 960 * 0.125,
      imageSource: 'pic3',
      statusIcons: [
        {
          type: 'doneIcon',
          ...(() => {
            const lerneinheitWidth = 18000 * 0.125;
            const lerneinheitHeight = 12000 * 0.125;
            const scaleRatio = Math.min(lerneinheitWidth / 18000, lerneinheitHeight / 12000);
            const actualIconSize = 20 * 300 * scaleRatio;
            
            const iconPosition = calculateSingleIconPosition(
              { x: 0.5, y: 0.3 },
              lerneinheitWidth,
              lerneinheitHeight,
              actualIconSize,
              actualIconSize
            );
            return {
              x: iconPosition.centerIcon.x,
              y: iconPosition.centerIcon.y,
              offsetX: iconPosition.calculations.offsetX,
              offsetY: iconPosition.calculations.offsetY
            };
          })()
        }
      ],
    },
  },
  {
    id: 'nine-grid-level2-lerneinheit-4',
    type: 'lerneinheit',
    // Position relativ zu Zelle 4: 5% X, 10% Y der Zelle
    position: (() => {
      const containerId = '9erContainer-level-2';
      const { width, height } = getContainerDimensions(containerId);
      const lerneinheitWidth = 18000 * 0.125; // Level 2 Größe
      const lerneinheitHeight = 12000 * 0.125; // Level 2 Größe
      return calculateLerneinheitPositionInCell(4, width, height, null, lerneinheitWidth, lerneinheitHeight);
    })(),
    parentId: '9erContainer-level-2',
    data: {
      title: '9er L2 Lerneinheit 4',
      width: 18000 * 0.125,
      height: 12000 * 0.125,
      backgroundColor: '#e6fefc',
      borderColor: '#30b89b',
      fontSize: 960 * 0.125,
      imageSource: 'pic1',
      statusIcons: [
        {
          type: 'doneIcon',
          ...(() => {
            const lerneinheitWidth = 18000 * 0.125;
            const lerneinheitHeight = 12000 * 0.125;
            const scaleRatio = Math.min(lerneinheitWidth / 18000, lerneinheitHeight / 12000);
            const actualIconSize = 20 * 300 * scaleRatio;
            
            const iconPosition = calculateSingleIconPosition(
              { x: 0.5, y: 0.3 },
              lerneinheitWidth,
              lerneinheitHeight,
              actualIconSize,
              actualIconSize
            );
            return {
              x: iconPosition.centerIcon.x,
              y: iconPosition.centerIcon.y,
              offsetX: iconPosition.calculations.offsetX,
              offsetY: iconPosition.calculations.offsetY
            };
          })()
        }
      ],
    },
  },
  {
    id: 'nine-grid-level2-lerneinheit-5',
    type: 'lerneinheit',
    // Position relativ zu Zelle 5: 5% X, 10% Y der Zelle
    position: (() => {
      const containerId = '9erContainer-level-2';
      const { width, height } = getContainerDimensions(containerId);
      const lerneinheitWidth = 18000 * 0.125; // Level 2 Größe
      const lerneinheitHeight = 12000 * 0.125; // Level 2 Größe
      return calculateLerneinheitPositionInCell(5, width, height, null, lerneinheitWidth, lerneinheitHeight);
    })(),
    parentId: '9erContainer-level-2',
    data: {
      title: '9er L2 Lerneinheit 5',
      width: 18000 * 0.125,
      height: 12000 * 0.125,
      backgroundColor: '#e6fefc',
      borderColor: '#30b89b',
      fontSize: 960 * 0.125,
      imageSource: 'pic13', // Level 2, Lerneinheit 5
      statusIcons: [
        {
          type: 'doneIcon',
          ...(() => {
            const lerneinheitWidth = 18000 * 0.125;
            const lerneinheitHeight = 12000 * 0.125;
            const scaleRatio = Math.min(lerneinheitWidth / 18000, lerneinheitHeight / 12000);
            const actualIconSize = 20 * 300 * scaleRatio;
            
            const iconPosition = calculateSingleIconPosition(
              { x: 0.5, y: 0.3 },
              lerneinheitWidth,
              lerneinheitHeight,
              actualIconSize,
              actualIconSize
            );
            return {
              x: iconPosition.centerIcon.x,
              y: iconPosition.centerIcon.y,
              offsetX: iconPosition.calculations.offsetX,
              offsetY: iconPosition.calculations.offsetY
            };
          })()
        }
      ],
    },
  },
  {
    id: 'nine-grid-level2-lerneinheit-6',
    type: 'lerneinheit',
    // Position relativ zu Zelle 6: 5% X, 10% Y der Zelle
    position: (() => {
      const containerId = '9erContainer-level-2';
      const { width, height } = getContainerDimensions(containerId);
      const lerneinheitWidth = 18000 * 0.125; // Level 2 Größe
      const lerneinheitHeight = 12000 * 0.125; // Level 2 Größe
      return calculateLerneinheitPositionInCell(6, width, height, null, lerneinheitWidth, lerneinheitHeight);
    })(),
    parentId: '9erContainer-level-2',
    data: {
      title: '9er L2 Lerneinheit 6',
      width: 18000 * 0.125,
      height: 12000 * 0.125,
      backgroundColor: '#e6fefc',
      borderColor: '#30b89b',
      fontSize: 960 * 0.125,
      imageSource: 'pic1', // Level 2, Lerneinheit 6 (Wiederholung)
      statusIcons: [
        {
          type: 'doneIcon',
          ...(() => {
            const lerneinheitWidth = 18000 * 0.125;
            const lerneinheitHeight = 12000 * 0.125;
            const scaleRatio = Math.min(lerneinheitWidth / 18000, lerneinheitHeight / 12000);
            const actualIconSize = 20 * 300 * scaleRatio;
            
            const iconPosition = calculateSingleIconPosition(
              { x: 0.5, y: 0.3 },
              lerneinheitWidth,
              lerneinheitHeight,
              actualIconSize,
              actualIconSize
            );
            return {
              x: iconPosition.centerIcon.x,
              y: iconPosition.centerIcon.y,
              offsetX: iconPosition.calculations.offsetX,
              offsetY: iconPosition.calculations.offsetY
            };
          })()
        }
      ],
    },
  },
  {
    id: 'nine-grid-level2-lerneinheit-7',
    type: 'lerneinheit',
    // Position relativ zu Zelle 7: 5% X, 10% Y der Zelle
    position: (() => {
      const containerId = '9erContainer-level-2';
      const { width, height } = getContainerDimensions(containerId);
      const lerneinheitWidth = 18000 * 0.125; // Level 2 Größe
      const lerneinheitHeight = 12000 * 0.125; // Level 2 Größe
      return calculateLerneinheitPositionInCell(7, width, height, null, lerneinheitWidth, lerneinheitHeight);
    })(),
    parentId: '9erContainer-level-2',
    data: {
      title: '9er L2 Lerneinheit 7',
      width: 18000 * 0.125,
      height: 12000 * 0.125,
      backgroundColor: '#e6fefc',
      borderColor: '#30b89b',
      fontSize: 960 * 0.125,
      imageSource: 'pic2', // Level 2, Lerneinheit 7 (Wiederholung)
      statusIcons: [
        {
          type: 'doneIcon',
          ...(() => {
            const lerneinheitWidth = 18000 * 0.125;
            const lerneinheitHeight = 12000 * 0.125;
            const scaleRatio = Math.min(lerneinheitWidth / 18000, lerneinheitHeight / 12000);
            const actualIconSize = 20 * 300 * scaleRatio;
            
            const iconPosition = calculateSingleIconPosition(
              { x: 0.5, y: 0.3 },
              lerneinheitWidth,
              lerneinheitHeight,
              actualIconSize,
              actualIconSize
            );
            return {
              x: iconPosition.centerIcon.x,
              y: iconPosition.centerIcon.y,
              offsetX: iconPosition.calculations.offsetX,
              offsetY: iconPosition.calculations.offsetY
            };
          })()
        }
      ],
    },
  },
];
