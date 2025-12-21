
import { DayConfig } from '../../types';
import { HEADER, FOOTER } from '../common';

export const day12: DayConfig = {
  day: 12,
  title: "Facial Rec",
  briefing: "Redact 'Social IDs'. Highlight 'Panic Phrases'. Stamp 'Corrupted Data' blocks.",
  rules: [
    { description: "Redact Social IDs", targetTypes: ['social_id'] },
    { description: "HIGHLIGHT Panic Phrases", action: 'highlight', targetTypes: ['panic_phrase'] },
    { description: "STAMP Corrupted Data", targetTypes: ['total_blackout'] }
  ],
  specialDirective: {
    id: "sd_12",
    description: "SYSTEM REBOOT",
    targetText: ["Hash-NULL"], 
    requiredAction: 'REVEAL', 
    bribeReward: 100,
    disobediencePenalty: 40,
    flavorText: "DIRECTIVE 000: Hash-NULL is a system key. We need it visible to reboot the grid. Do not redact."
  },
  unlockedTools: ['marker', 'stamp', 'highlighter', 'recover'],
  documents: [
    {
      id: "d12_1",
      title: "Scan Result: Crowd",
      content: HEADER + "Subject 1: {Hash-NULL|social_id}\n\nAudio Keyword: '{They are watching us|panic_phrase}'." + FOOTER
    },
    {
      id: "d12_2",
      title: "Corrupted Stream",
      content: "{ERROR: DATA CORRUPTION\n\nVisual feed is displaying non-Euclidean geometry.\n\n0101010101|total_blackout}"
    },
    {
      id: "d12_3",
      title: "Weather Report",
      content: HEADER + "Forecast: Partly cloudy with a high of 72. Winds coming from the North at 5mph. Perfect day for a walk in the park." + FOOTER
    }
  ],
  feed: { headline: "CRIME RATE DROPS", body: "Officials credit the surveillance grid." }
};
