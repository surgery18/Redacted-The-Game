
import { DayConfig } from '../../types';
import { HEADER, FOOTER } from '../common';

export const day17: DayConfig = {
  day: 17,
  title: "Memory Hole",
  briefing: "Rewrite history. Redact 'Timestamps'. HIGHLIGHT 'Coercion'. STAMP 'Paradox' files.",
  rules: [
    { description: "Redact Timestamps", targetTypes: ['timestamp'] },
    { description: "HIGHLIGHT Coercion", action: 'highlight', targetTypes: ['coercion'] },
    { description: "STAMP Paradox Files", targetTypes: ['total_blackout'] }
  ],
  specialDirective: {
    id: "sd_17",
    description: "TRIGGER EVENT",
    targetText: ["Jan 6"], 
    requiredAction: 'REVEAL', 
    bribeReward: 100,
    disobediencePenalty: 50,
    flavorText: "DIRECTIVE 1984: We need to prove this event happened to trigger the paradox loop. Leave the date visible."
  },
  unlockedTools: ['marker', 'stamp', 'highlighter', 'recover', 'void_stamp'],
  documents: [
    {
      id: "d17_1",
      title: "History Draft",
      content: HEADER + "Event: The War of 2024.\nDate: {Jan 6, 2025|timestamp}.\n\nAuthor convinced via {Waterboarding|coercion}." + FOOTER
    },
    {
      id: "d17_2",
      title: "Temporal Paradox",
      content: "{PARADOX DETECTED\n\nThis document is from the future. It describes the fall of the Bureau.\n\nDelete.|total_blackout}"
    },
    {
      id: "d17_3",
      title: "Office Memo",
      content: HEADER + "Please remember to turn off your computer monitors before leaving. Energy conservation is everyone's responsibility. Thank you." + FOOTER
    }
  ],
  feed: { headline: "MANDELA EFFECT", body: "Memories are wrong." }
};
