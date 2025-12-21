
import { DayConfig } from '../../types';
import { HEADER, FOOTER } from '../common';

export const day18: DayConfig = {
  day: 18,
  title: "The Purge",
  briefing: "Downsizing. Redact 'Staff' names. VOID if 'Contaminated'.",
  rules: [
    { description: "Redact Staff Names", targetTypes: ['staff'] },
    { description: "VOID if Contaminated", action: 'void', targetTypes: ['contamination'] }
  ],
  specialDirective: {
    id: "sd_18",
    description: "SAVE THE ASSET",
    targetText: ["Agent Brown"], 
    requiredAction: 'REVEAL', 
    bribeReward: 200,
    disobediencePenalty: 100,
    flavorText: "DIRECTIVE 12: Agent Brown is undercover. Keep him on the list."
  },
  unlockedTools: ['marker', 'stamp', 'highlighter', 'recover', 'void_stamp'],
  documents: [
    {
      id: "d18_1",
      title: "Termination List",
      content: HEADER + "1. {Agent Smith|staff}\n2. {Agent Jones|staff} ({Contaminated|contamination})\n3. {Agent Brown|staff}" + FOOTER
    },
    {
      id: "d18_2",
      title: "Equipment Inventory",
      content: HEADER + "Verification complete for Sector 2.\n\n- 4x Desks\n- 4x Chairs\n- 4x Typewriters\n\nAll items are in good condition. No staff changes required." + FOOTER
    },
    {
      id: "d18_3",
      title: "Exit Interview",
      content: HEADER + "Subject: {Clerk 882-1B|staff}.\n\nSubject screamed something about ink. Status: {Contaminated|contamination}." + FOOTER
    }
  ],
  feed: { headline: "UNEMPLOYMENT SOLVED", body: "Labor camps open." }
};
