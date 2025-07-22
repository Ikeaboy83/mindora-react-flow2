// components/LerneinheitNode.jsx
import FavoritIconNode from '../status/FavoritIconNode';
import DoneIconNode from '../status/DoneIconNode';

const iconMap = {
  favorit: FavoritIconNode,
  done: DoneIconNode,
};

export default function LerneinheitNode({ data }) {
    return (
      <div
        style={{
          width: data.width,
          height: data.height,
          background: '#e6fefc',
          border: '2px solid #30b89b',
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
  