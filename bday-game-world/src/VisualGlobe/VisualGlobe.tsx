import React, { useEffect, useState } from 'react';
import Globe from 'react-globe.gl';
import { useBdayGameTimes } from './hooks/useBdayGameTimes';
import type { GameEvent } from './hooks/useBdayGameTimes';
import { TIME_COLORS } from './hooks/useBdayGameTimes';

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
        htmlElementsData={markers}
        htmlLat={(d: any) => d.lat}
        htmlLng={(d: any) => d.lng}
        htmlElement={(d: any) => {
          const el = document.createElement('div');
          el.style.position = 'absolute';
          el.style.transform = 'translate(-50%, -100%)';

          const iconName = typeof d.icon === 'string' ? d.icon : d.icon?.iconName || 'circle';

          const color = TIME_COLORS[d.time] || 'rgba(255,255,255,0.6)';

          el.innerHTML = `
            <div style="display:flex; flex-direction:column; align-items:center;">
              
              <div style="
                width: 30px;
                height: 30px;
                background: rgba(255, 255, 255, 0.25);
                border: 1px solid ${color};
                border-radius: 50%;
                display:flex;
                align-items:center;
                justify-content:center;
                backdrop-filter: blur(4px);
              ">
                <i class="fa-solid fa-${iconName}" style="
                  color: #ffffff;
                  font-size: 14px;
                "></i>
              </div>
        
              <div style="
                width: 2px;
                height: 45px;
                background: ${color};
                opacity: 0.6;
              "></div>
        
            </div>
          `;

          return el;
        }}
      />
    </div>
  );
}
