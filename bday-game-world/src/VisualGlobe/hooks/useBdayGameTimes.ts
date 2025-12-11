import { useMemo } from 'react';

interface EventData {
  color: string;
}

export interface GameEvent {
  time: string;
  lat: number;
  lng: number;
  size: number;
  color: string;
  label: string;
}

interface TimezoneData {
  timezone: string;
  lat: number;
  lng: number;
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
  { color: 'red' },
  { color: 'green' },
  { color: 'blue' },
  { color: 'orange' },
  { color: 'purple' },
  { color: 'yellow' },
  { color: 'pink' },
  { color: 'cyan' },
  { color: 'magenta' },
  { color: 'lime' },
  { color: 'teal' },
  { color: 'brown' },
  { color: 'navy' },
  { color: 'olive' },
  { color: 'maroon' },
  { color: 'aqua' },
  { color: 'silver' },
  { color: 'gold' },
  { color: 'coral' },
  { color: 'indigo' },
  { color: 'black' },
];

const WORLD_TIMEZONES: TimezoneData[] = [
  { timezone: 'Pacific/Honolulu', lat: 21.3069, lng: -157.8583 },
  { timezone: 'America/Anchorage', lat: 61.2181, lng: -149.9003 },
  { timezone: 'America/Los_Angeles', lat: 34.0522, lng: -118.2437 },
  { timezone: 'America/Denver', lat: 39.7392, lng: -104.9903 },
  { timezone: 'America/Chicago', lat: 41.8781, lng: -87.6298 },
  { timezone: 'America/New_York', lat: 40.7128, lng: -74.006 },
  { timezone: 'America/Sao_Paulo', lat: -23.5505, lng: -46.6333 },
  { timezone: 'Atlantic/Reykjavik', lat: 64.1355, lng: -21.8954 },
  { timezone: 'Europe/London', lat: 51.5074, lng: -0.1278 },
  { timezone: 'Europe/Paris', lat: 48.8566, lng: 2.3522 },
  { timezone: 'Europe/Athens', lat: 37.9838, lng: 23.7275 },
  { timezone: 'Africa/Cairo', lat: 30.0444, lng: 31.2357 },
  { timezone: 'Africa/Johannesburg', lat: -26.2041, lng: 28.0473 },
  { timezone: 'Europe/Moscow', lat: 55.7558, lng: 37.6173 },
  { timezone: 'Asia/Dubai', lat: 25.276987, lng: 55.296249 },
  { timezone: 'Asia/Karachi', lat: 24.8607, lng: 67.0011 },
  { timezone: 'Asia/Dhaka', lat: 23.8103, lng: 90.4125 },
  { timezone: 'Asia/Bangkok', lat: 13.7563, lng: 100.5018 },
  { timezone: 'Asia/Hong_Kong', lat: 22.3193, lng: 114.1694 },
  { timezone: 'Asia/Tokyo', lat: 35.6762, lng: 139.6503 },
  { timezone: 'Australia/Sydney', lat: -33.8688, lng: 151.2093 },
  { timezone: 'Pacific/Auckland', lat: -36.8485, lng: 174.7633 },
];

function getCurrentTimeInTimezone(timezone: string) {
  return new Date().toLocaleString('en-US', {
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
    timeZone: timezone,
  });
}

function getCentralTime() {
  return new Date().toLocaleString('en-US', {
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'America/Chicago',
  });
}

export function useBdayGameTimes() {
  const events = useMemo(() => {
    return times.map((time, index) => ({
      time,
      lat: 0,
      lng: 0,
      size: 0.5,
      color: eventData[index % eventData.length].color,
      label: `Event ${time}`,
    }));
  }, []);

  function getActiveEvents(): GameEvent[] {
    const activeEvents: GameEvent[] = [];

    WORLD_TIMEZONES.forEach((timeData) => {
      const currentTime = getCurrentTimeInTimezone(timeData.timezone);

      events.forEach((event) => {
        if (event.time === currentTime) {
          activeEvents.push({
            ...event,
            lat: timeData.lat,
            lng: timeData.lng,
            label: `Event ${event.time} at ${timeData.timezone}`,
          });
        }
      });
    });

    return activeEvents;
  }

  return { events, getActiveEvents, getCentralTime };
}
