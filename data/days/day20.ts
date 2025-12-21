
import { DayConfig } from '../../types';
import { HEADER, FOOTER } from '../common';

export const day20: DayConfig = {
  day: 20,
  title: "Tabula Rasa",
  briefing: "Destroy everything. Redact 'Total Blackout' tokens. VOID if 'EIDOLON' returns.",
  rules: [
    { description: "Redact Total Blackout Data", targetTypes: ['total_blackout'] },
    { description: "VOID if 'EIDOLON' present", action: 'void', targetTypes: ['eidolon'] }
  ],
  specialDirective: {
    id: "sd_20",
    description: "FINAL CONFESSION",
    targetText: ["seen too much"], 
    requiredAction: 'REVEAL', 
    bribeReward: 0,
    disobediencePenalty: 0,
    flavorText: "DIRECTIVE END: Let them know why you left."
  },
  unlockedTools: ['marker', 'stamp', 'highlighter', 'recover', 'void_stamp'],
  documents: [
    {
      id: "d20_1",
      title: "The Final File",
      content: HEADER + "{DELETE EVERYTHING|total_blackout}.\n\nGoodbye." + FOOTER
    },
    {
      id: "d20_2",
      title: "Manifesto",
      content: HEADER + "We are the {EIDOLON|eidolon}.\n\n{System Failure Imminent|total_blackout}." + FOOTER
    },
    {
      id: "d20_3",
      title: "Resignation",
      content: HEADER + "I, {Player 1|total_blackout}, hereby resign.\n\nReason: {I have seen too much|total_blackout}." + FOOTER
    }
  ],
  feed: { headline: "SIGNAL LOST", body: "..." }
};
