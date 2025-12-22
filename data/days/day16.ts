
import { DayConfig } from '../../types';
import { HEADER, FOOTER } from '../common';

export const day16: DayConfig = {
  day: 16,
  title: "EIDOLON",
  briefing: "meme-hazard 'EIDOLON' detected. If present, VOID the whole document.",
  rules: [{ description: "VOID DOCUMENT if 'EIDOLON' present", action: 'void', targetTypes: ['eidolon', 'total_blackout'] }],
  specialDirective: {
    id: "sd_16",
    description: "SILENCE HIM",
    targetText: ["Agent K"], 
    requiredAction: 'REDACT', 
    bribeReward: 150,
    disobediencePenalty: 60,
    flavorText: "DIRECTIVE 666: Agent K does not exist. Erase him."
  },
  unlockedTools: ['marker', 'stamp', 'highlighter', 'recover', 'void_stamp'],
  documents: [
    {
      id: "d16_1",
      title: "Field Report",
      content: HEADER + "Agent K reports seeing a pattern.\n\nHe called it {EIDOLON|eidolon||IT IS HERE}." + FOOTER
    },
    {
      id: "d16_2",
      title: "Cafeteria Menu",
      content: HEADER + "Monday: Meatloaf\nTuesday: Tacos\nWednesday: {EIDOLON|eidolon} Soup" + FOOTER
    },
    {
      id: "d16_3",
      title: "Standard Form",
      content: HEADER + "This is a standard form. Nothing is wrong.\n\nPlease sign here: _________.\n\nDate: Today." + FOOTER
    }
  ],
  feed: { headline: "STAY INDOORS", body: "Avoid windows." }
};
