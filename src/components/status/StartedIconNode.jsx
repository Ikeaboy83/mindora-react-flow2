// components/status/FavoritIconNode.jsx
import favoriteIcon from '../../assets/favorite.svg';
import startedIcon from '../../assets/startet.svg';

export default function StartedIconNode() {
  return (
    <div
      style={{
        width: 20,
        height: 20,
        borderRadius: 100,
        background: '#FFB800', // Beispiel-Farbe für 'started', kann angepasst werden
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: 1,
        touchAction: 'none', // Touch-Events deaktivieren
        userSelect: 'none', // Text-Auswahl verhindern
      }}
    >
      <img src={startedIcon} alt="Started" width={15} height={15} />
    </div>
  );
}
