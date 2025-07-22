// components/status/DeadlineIconNode.jsx
import calendarIcon from '../../assets/calendar.svg';

export default function DeadlineIconNode() {
  return (
    <div
      style={{
        width: 40,
        height: 40,
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
      <img src={calendarIcon} alt="Kalender" width={30} height={30} />
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
