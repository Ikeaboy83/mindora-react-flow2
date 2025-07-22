// components/LerneinheitNode.jsx
import FavoritIconNode from '../status/FavoritIconNode';
import DoneIconNode from '../status/DoneIconNode';
import DeadlineIconNode from '../status/DeadlineIconNode';
import StartedIconNode from '../status/StartedIconNode';
import LockedIconNode from '../status/LockedIconNode';

const iconMap = {
  favorit: FavoritIconNode,
  done: DoneIconNode,
  deadline: DeadlineIconNode,
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
  