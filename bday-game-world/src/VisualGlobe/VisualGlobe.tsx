import React, { useEffect, useState } from 'react';
import Globe from 'react-globe.gl';
import { useBdayGameTimes } from './hooks/useBdayGameTimes';

export function VisualGlobe() {
  const { events, getCurrentTimeString } = useBdayGameTimes();
  const [markers, setMarkers] = useState<typeof events>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const currentTime = getCurrentTimeString();
      const activeEvents = events.filter((e) => e.time === currentTime);
      setMarkers(activeEvents);
    }, 1000);

    return () => clearInterval(interval);
  }, [events, getCurrentTimeString]);

  return (
    <div className="max-w-full">
      <Globe
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
        pointsData={markers}
        pointLabel="label"
        pointColor="color"
        pointAltitude="size"
      />
    </div>
  );
}
