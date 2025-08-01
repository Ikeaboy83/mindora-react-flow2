// components/status/DeadlineIconNode.jsx
import calendarIcon from '../../assets/calendar.svg';

export default function DeadlineIconNode() {
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
      }}
    >
      <img src={calendarIcon} alt="Kalender" width={15} height={15} />
    </div>
  );
}
