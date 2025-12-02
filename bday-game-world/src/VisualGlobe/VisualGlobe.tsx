import React from 'react';
import Globe from 'react-globe.gl';

export function VisualGlobe() {
  const markers = [
    { lat: 34.0522, lng: -118.2437, size: 0.5, color: 'red', label: 'Los Angeles' },
    { lat: 51.5074, lng: 0.1278, size: 0.5, color: 'blue', label: 'London' },
  ];

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
