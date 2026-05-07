import React, { useEffect, useState } from 'react';
import Globe from 'react-globe.gl';
import { useBdayGameTimes } from './hooks/useBdayGameTimes';
import type { GameEvent } from './hooks/useBdayGameTimes';
import { TIME_COLORS } from './hooks/useBdayGameTimes';
import './styles/VisualGlobe.scss';

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
          const showTime = d.showTimeInPin;

          const timeWithZone = d.timeZone
            ? `${d.time} <span class="visualGlobePin__tz">${d.timeZone}</span>`
            : d.time;

          el.innerHTML = `
            <div class="visualGlobePin">
              <div class="visualGlobePin__iconWrapper">
                <i class="fa-solid fa-${iconName} visualGlobePin__icon"></i>
              </div>
              ${showTime ? `<div class="visualGlobePin__time">${timeWithZone}</div>` : ''}
              <div class="visualGlobePin__line"></div>
            </div>
          `;

          const iconWrapper = el.querySelector(`.visualGlobePin__iconWrapper`) as HTMLElement;
          if (iconWrapper) {
            iconWrapper.style.borderColor = color;
          }
          const line = el.querySelector(`.visualGlobePin__line`) as HTMLElement;
          if (line) {
            line.style.background = color;
          }

          return el;
        }}
      />
    </div>
  );
}
