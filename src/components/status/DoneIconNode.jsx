// components/status/FavoritIconNode.jsx
import doneIcon from '../../assets/done.svg';

export default function DoneIconNode() {
  return (
    <div
      style={{
        width: 20,
        height: 20,
        borderRadius: 100,
        background: '#00D58A',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: 1,
      }}
    >
      <img src={doneIcon} alt="Done" width={15} height={15} />
    </div>
  );
}
