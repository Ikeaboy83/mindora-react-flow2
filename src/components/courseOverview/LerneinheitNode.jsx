// components/LerneinheitNode.jsx
import FavoritIconNode from '../status/FavoritIconNode';
import DoneIconNode from '../status/DoneIconNode';
import DeadlineIconNode from '../status/DeadlineIconNode';
import StartedIconNode from '../status/StartedIconNode';
import LockedIconNode from '../status/LockedIconNode';
import calendarIcon from '../../assets/calendar.svg';

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
  favorit: FavoritIconNode,
  done: DoneIconNode,
  deadline: DeadlineIconWithShimmer,
  started: StartedIconNode,
  locked: LockedIconNode,
};

export default function LerneinheitNode({ data }) {
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
          fontSize: 12,
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
            fontSize: 28,
          }}
        >
          📄
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
          }}
        >
          {data.title}
        </div>
      </div>
    );
  }
  