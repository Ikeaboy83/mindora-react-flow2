import React from 'react';
import calendarIcon from '../../assets/calendar.svg';
import './CalendarIconNode.css';

export default function CalendarIconNode({ data }) {
  return (
    <div className="calendar-icon-node">
      {/* Shimmer-Effekt */}
      <div className="shimmer-effect" />
      
      {/* Kalender-Icon */}
      <img 
        src={calendarIcon} 
        alt="Kalender" 
        className="calendar-icon"
      />
    </div>
  );
}
