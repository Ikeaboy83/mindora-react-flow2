// components/status/FavoritIconNode.jsx
import lockIcon from "../../assets/lock.svg";

export default function LockedIconNode() {
  return (
    <div
      style={{
        width: 20,
        height: 20,
        borderRadius: 100,
        background: '#8E98A7',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: 1,
        touchAction: 'none', // Touch-Events deaktivieren
        userSelect: 'none', // Text-Auswahl verhindern
        pointerEvents: 'none', // Alle Pointer-Events deaktivieren
      }}
    >
      <img src={lockIcon} alt="Locked" width={15} height={15} />
    </div>
  );
}
