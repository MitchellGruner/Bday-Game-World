import React, { useEffect, useState } from 'react';
import Globe from 'react-globe.gl';
import { useBdayGameTimes } from './hooks/useBdayGameTimes';
import type { GameEvent } from './hooks/useBdayGameTimes';

export function VisualGlobe() {
  const { getActiveEvents } = useBdayGameTimes();

  const [markers, setMarkers] = useState<GameEvent[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const activeEvents = getActiveEvents();
      setMarkers(activeEvents);
    }, 1000);

    return () => clearInterval(interval);
  }, [getActiveEvents]);

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
