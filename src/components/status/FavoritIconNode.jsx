// components/status/FavoritIconNode.jsx
import favoriteIcon from '../../assets/favorite.svg';

export default function FavoritIconNode() {
  return (
    <div
      style={{
        width: 20,
        height: 20,
        borderRadius: 100,
        background: '#FF5264',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: 1,
        touchAction: 'manipulation', // Touch-Events für Zoom erlauben
        userSelect: 'none', // Text-Auswahl verhindern
        pointerEvents: 'auto', // Pointer-Events erlauben
      }}
    >
      <img src={favoriteIcon} alt="Favorit" width={15} height={15} />
    </div>
  );
}
