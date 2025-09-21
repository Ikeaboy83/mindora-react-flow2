// Icon-Map für alle verfügbaren Status-Icons
// Import aller verfügbaren Status-Icons
import FavoritIconNode from '../../status/FavoritIconNode';
import DoneIconNode from '../../status/DoneIconNode';
import DeadlineIconNode from '../../status/DeadlineIconNode';
import StartedIconNode from '../../status/StartedIconNode';
import LockedIconNode from '../../status/LockedIconNode';

// Icon-Map für alle verfügbaren Status-Icons
export const iconMap = {
  favoritIcon: FavoritIconNode,
  doneIcon: DoneIconNode,
  deadlineIcon: DeadlineIconNode,
  startedIcon: StartedIconNode,
  lockedIcon: LockedIconNode,
};

/**
 * Zeigt alle verfügbaren Icon-Typen an
 * @returns {Array} Array mit allen verfügbaren Icon-Typen
 */
export const getAvailableIconTypes = () => {
  return Object.keys(iconMap);
};

/**
 * Überprüft, ob ein Icon-Typ verfügbar ist
 * @param {string} iconType - Der zu überprüfende Icon-Typ
 * @returns {boolean} true, wenn der Icon-Typ verfügbar ist
 */
export const isIconTypeAvailable = (iconType) => {
  return iconType in iconMap;
};
