//App.jsx
import { useState } from 'react';
import HomeFlowCanvas from './components/home/HomeFlowCanvas';
import CourseOverviewFlowCanvas from './components/courseOverview/CourseOverviewFlowCanvas';

export default function App() {
  const [active, setActive] = useState('home');
  return (
    <div>
      <button onClick={() => setActive('home')}>Home Flow</button>
      <button onClick={() => setActive('course')}>Kursübersicht</button>
      {active === 'home' ? <HomeFlowCanvas /> : <CourseOverviewFlowCanvas />}
    </div>
  );
}
