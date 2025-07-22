// components/LerneinheitNodeDeadline.jsx

const glowColor = '#00aaff';

export default function LerneinheitNodeDeadline({ data }) {
  return (
    <>
      <div
        style={{
          width: 109,
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
          boxShadow: `0 0 16px 8px ${glowColor}, 0 0 32px 16px rgba(0, 170, 255, 0.24)`,
          animation: 'pulsate 2s ease-in-out infinite',
          position: 'relative',
        }}
      >
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
          Einzel
        </div>
      </div>
      <style>
        {`
          @keyframes pulsate {
            0% {
              box-shadow: 0 0 16px 8px ${glowColor}, 0 0 32px 16px rgba(0, 170, 255, 0.24);
            }
            50% {
              box-shadow: 0 0 24px 12px ${glowColor}, 0 0 40px 20px rgba(0, 170, 255, 0.4);
            }
            100% {
              box-shadow: 0 0 16px 8px ${glowColor}, 0 0 32px 16px rgba(0, 170, 255, 0.24);
            }
          }
        `}
      </style>
    </>
  );
}
  