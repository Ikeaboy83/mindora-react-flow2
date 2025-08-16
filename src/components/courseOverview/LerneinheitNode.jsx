// components/LerneinheitNode.jsx
import React from 'react';
import FavoritIconNode from '../status/FavoritIconNode';
import DoneIconNode from '../status/DoneIconNode';
import DeadlineIconNode from '../status/DeadlineIconNode';
import StartedIconNode from '../status/StartedIconNode';
import LockedIconNode from '../status/LockedIconNode';
import calendarIcon from '../../assets/calendar.svg';
import praesentationIcon from '../../assets/Präsenation.jpg';

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
  // Schriftgröße aus data verwenden oder basierend auf der Node-Größe anpassen
  const fontSize = data.fontSize || Math.min(data.width / 8, data.height / 4);
  
  return (
    <div
      style={{
        width: data.width,
        height: data.height,
        background: data.backgroundColor || '#e6fefc',
        border: `4px solid ${data.borderColor || '#30b89b'}`, // Individuelle Borderfarbe oder Standard, 4px breit
        borderRadius: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'sans-serif',
        fontSize: fontSize,
        fontWeight: 'bold',
        overflow: 'hidden',
        position: 'relative', // für absolute Icons
      }}
    >
        {/* Status-Icons */}
        {Array.isArray(data.statusIcons) && data.statusIcons.slice(0, 2).map((icon, i) => {
          const IconComp = iconMap[icon.type];
          return IconComp ? (
            <div
              key={i}
              style={{
                position: 'absolute',
                left: icon.x,
                top: icon.y,
                zIndex: 2,
                transform: data.iconScale ? `scale(${data.iconScale})` : 'scale(1)',
                transformOrigin: 'top left',
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
            src={praesentationIcon} 
            alt="Präsentation" 
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
