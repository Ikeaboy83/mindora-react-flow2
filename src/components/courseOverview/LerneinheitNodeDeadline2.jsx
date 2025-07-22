// components/LerneinheitNodeDeadline2.jsx

export default function LerneinheitNodeDeadline2({ data }) {
  return (
    <>
      <div
        style={{
          width: 120,
          height: 82,
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
          position: 'relative',
        }}
      >
        {/* Shimmer-Effekt */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: '-100%',
            width: '100%',
            height: '100%',
            background: 'linear-gradient(90deg, transparent, rgba(0,170,255,0.6), transparent)',
            animation: 'shimmer 2.3s ease-in-out infinite',
            zIndex: 3,
          }}
        />
        
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
            position: 'relative',
            zIndex: 2,
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
            position: 'relative',
            zIndex: 2,
          }}
        >
          Einzel
        </div>
      </div>
      <style>
        {`
          @keyframes shimmer {
            0% {
              left: -100%;
            }
            35% {
              left: 100%;
            }
            100% {
              left: 100%;
            }
          }
        `}
      </style>
    </>
  );
}
  