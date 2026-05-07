import { useMemo } from 'react';
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';

import {
  faClock,
  faWind,
  faCakeCandles,
  faGift,
  faChartPie,
  faBookBible,
  faLeaf,
  faFrog,
  faSun,
  faTractor,
  faHotdog,
  faPlane,
  faCalendar,
  faFaceGrinHearts,
  fa1,
  faCandyCane,
  faTree,
  faMartiniGlassCitrus,
} from '@fortawesome/free-solid-svg-icons';

interface EventData {
  icon: IconDefinition;
}

export interface GameEvent {
  time: string;
  timeZone?: string;
  lat: number;
  lng: number;
  size: number;
  icon: IconDefinition;
  label: string;
  showTimeInPin?: boolean;
}

interface TimezoneData {
  timezone: string;
  lat: number;
  lng: number;
}

const times: string[] = [
  '01:00',
  '02:10',
  '02:20',
  '03:12',
  '03:14',
  '03:16',
  '04:20',
  '05:24',
  '05:30',
  '06:10',
  '07:11',
  '09:11',
  '09:24',
  '10:24',
  '11:11',
  '12:24',
  '12:25',
  '12:31',
  '12:34',
];

const eventData: EventData[] = [
  { icon: faClock },
  { icon: faWind },
  { icon: faCakeCandles },
  { icon: faGift },
  { icon: faChartPie },
  { icon: faBookBible },
  { icon: faLeaf },
  { icon: faFrog },
  { icon: faSun },
  { icon: faTractor },
  { icon: faHotdog },
  { icon: faPlane },
  { icon: faLeaf },
  { icon: faCalendar },
  { icon: faFaceGrinHearts },
  { icon: fa1 },
  { icon: faCandyCane },
  { icon: faTree },
  { icon: faMartiniGlassCitrus },
  { icon: faClock },
];

export const TIME_COLORS: Record<string, string> = {
  '01:00': '#fcd34d',
  '02:10': '#fdba74',
  '02:20': '#fca5a5',
  '03:12': '#a7f3d0',
  '03:14': '#4ade80',
  '03:16': '#34d399',
  '03:21': '#22d3ee',
  '03:33': '#60a5fa',
  '04:20': '#818cf8',
  '05:24': '#c084fc',
  '05:30': '#e879f9',
  '06:10': '#f472b6',
  '07:11': '#fb7185',
  '09:11': '#38bdf8',
  '09:24': '#2dd4bf',
  '10:24': '#fbbf24',
  '11:11': '#3b82f6',
  '12:24': '#a5b4fc',
  '12:25': '#93c5fd',
  '12:31': '#67e8f9',
  '12:34': '#86efac',
};

function getTimeColor(time: string): string {
  return TIME_COLORS[time] ?? 'rgba(255,255,255,0.5)';
}

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
  const now = new Date();

  return new Intl.DateTimeFormat('en-GB', {
    timeZone: timezone,
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).format(now);
}

function getTimezoneAbbreviation(timezone: string) {
  const now = new Date();

  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: timezone,
    timeZoneName: 'short',
  }).formatToParts(now);

  return parts.find((part) => part.type === 'timeZoneName')?.value ?? '';
}

function getTimeWithTimezone(timezone: string) {
  const now = new Date();

  return new Intl.DateTimeFormat('en-US', {
    timeZone: timezone,
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    timeZoneName: 'short',
  }).format(now);
}

function getCentralTime() {
  return getTimeWithTimezone('America/Chicago');
}

export function useBdayGameTimes() {
  const events = useMemo<GameEvent[]>(() => {
    return times.map((time, index) => ({
      time,
      lat: 0,
      lng: 0,
      size: 0.5,
      icon: eventData[index % eventData.length].icon,
      label: `Event ${time}`,
      showTimeInPin: true,
    }));
  }, []);

  function getActiveEvents(): GameEvent[] {
    const activeEvents: GameEvent[] = [];

    WORLD_TIMEZONES.forEach((timeData) => {
      const currentTime = getCurrentTimeInTimezone(timeData.timezone);

      const timezoneAbbreviation = getTimezoneAbbreviation(timeData.timezone);

      events.forEach((event) => {
        if (event.time === currentTime) {
          activeEvents.push({
            ...event,
            lat: timeData.lat,
            lng: timeData.lng,
            timeZone: timezoneAbbreviation,
            label: `Event ${event.time} ${timezoneAbbreviation} at ${timeData.timezone}`,
            showTimeInPin: true,
          });
        }
      });
    });

    return activeEvents;
  }

  return {
    events,
    getActiveEvents,
    getCentralTime,
    getTimeColor,
  };
}
