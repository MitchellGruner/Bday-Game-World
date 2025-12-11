import { useMemo } from 'react';

interface EventData {
  lat: number;
  lng: number;
  color: string;
}

interface GameEvent {
  time: string;
  lat: number;
  lng: number;
  size: number;
  color: string;
  label: string;
}

const times: string[] = [
  '00:24',
  '00:25',
  '00:31',
  '00:34',
  '01:00',
  '02:10',
  '02:20',
  '03:12',
  '03:14',
  '03:16',
  '03:21',
  '03:33',
  '04:20',
  '05:24',
  '05:30',
  '06:10',
  '07:11',
  '09:11',
  '09:24',
  '10:24',
  '11:11',
];

const eventData: EventData[] = [
  { lat: 34.0522, lng: -118.2437, color: 'red' },
  { lat: 40.7128, lng: -74.006, color: 'green' },
  { lat: 51.5074, lng: 0.1278, color: 'blue' },
  { lat: 35.6895, lng: 139.6917, color: 'orange' },
  { lat: 48.8566, lng: 2.3522, color: 'purple' },
  { lat: 55.7558, lng: 37.6173, color: 'yellow' },
  { lat: 37.7749, lng: -122.4194, color: 'pink' },
  { lat: 52.52, lng: 13.405, color: 'cyan' },
  { lat: 41.8781, lng: -87.6298, color: 'magenta' },
  { lat: 39.9042, lng: 116.4074, color: 'lime' },
  { lat: 28.6139, lng: 77.209, color: 'teal' },
  { lat: 19.076, lng: 72.8777, color: 'brown' },
  { lat: -33.8688, lng: 151.2093, color: 'navy' },
  { lat: 1.3521, lng: 103.8198, color: 'olive' },
  { lat: 31.2304, lng: 121.4737, color: 'maroon' },
  { lat: 41.3851, lng: 2.1734, color: 'aqua' },
  { lat: 55.9533, lng: -3.1883, color: 'silver' },
  { lat: 45.4642, lng: 9.19, color: 'gold' },
  { lat: 59.3293, lng: 18.0686, color: 'coral' },
  { lat: 35.6762, lng: 139.6503, color: 'indigo' },
];

function getCurrentTimeString() {
  const now = new Date();
  const centralTime = now
    .toLocaleString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
      timeZone: 'America/Chicago',
    })
    .trim();
  return centralTime;
}

export function useBdayGameTimes() {
  const events = useMemo(() => {
    const events: GameEvent[] = [];
    times.forEach((time, index) => {
      events.push({
        time: time,
        lat: eventData[index % eventData.length].lat,
        lng: eventData[index % eventData.length].lng,
        size: 0.5,
        color: eventData[index % eventData.length].color,
        label: `Event ${time} AM`,
      });
      let [hour, minute] = time.split(':').map(Number);
      let pmHour = hour === 12 ? 12 : hour + 12;
      let pmTime = `${pmHour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
      events.push({
        time: pmTime,
        lat: eventData[index % eventData.length].lat,
        lng: eventData[index % eventData.length].lng,
        size: 0.5,
        color: eventData[index % eventData.length].color,
        label: `Event ${time} PM`,
      });
    });

    const now = new Date();
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const day = now.getDate().toString().padStart(2, '0');
    const dateTime = `${month}:${day}`;
    const dateLat = 0;
    const dateLng = 0;
    const dateColor = 'black';

    events.push({
      time: dateTime,
      lat: dateLat,
      lng: dateLng,
      size: 0.7,
      color: dateColor,
      label: `Event ${month}/${day} AM`,
    });
    let pmHour = Number(month) === 12 ? 12 : Number(month) + 12;
    const dateTimePM = `${pmHour.toString().padStart(2, '0')}:${day}`;
    events.push({
      time: dateTimePM,
      lat: dateLat,
      lng: dateLng,
      size: 0.7,
      color: dateColor,
      label: `Event ${month}/${day} PM`,
    });

    return events;
  }, []);

  return { events, getCurrentTimeString };
}
