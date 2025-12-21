
import { DayConfig } from '../../types';
import { HEADER, FOOTER } from '../common';

export const day19: DayConfig = {
  day: 19,
  title: "The Director",
  briefing: "Direct orders. Redact 'VIP Protect'. RECOVER 'VIP Expose'. STAMP 'Kill Lists'.",
  rules: [
    { description: "Redact VIP Protect", targetTypes: ['vip_protect'] },
    { description: "RECOVER VIP Expose", action: 'recover', targetTypes: ['vip_expose'] },
    { description: "STAMP Kill Lists", targetTypes: ['total_blackout'] }
  ],
  specialDirective: {
    id: "sd_19",
    description: "ABORT HIT",
    targetText: ["Palpatine"], 
    requiredAction: 'REDACT', 
    bribeReward: 500,
    disobediencePenalty: 500,
    flavorText: "DIRECTIVE 66: The Senator has made a deal. Abort the exposure. Protect his identity."
  },
  unlockedTools: ['marker', 'stamp', 'highlighter', 'recover', 'void_stamp'],
  documents: [
    {
      id: "d19_1",
      title: "Executive Order 66",
      content: HEADER + "Signed: {Director Voss|vip_protect}.\n\nTarget: {Senator Palpatine|vip_expose}." + FOOTER
    },
    {
      id: "d19_2",
      title: "Official Kill List",
      content: "{KILL LIST // EYES ONLY\n\n1. The Journalist\n2. The Judge\n\nBurn this.|total_blackout}"
    },
    {
      id: "d19_3",
      title: "Internal Compliance",
      content: HEADER + "All employees have completed the mandatory security training. Certificates have been issued and filed. The Bureau is 100% compliant." + FOOTER
    }
  ],
  feed: { headline: "MARTIAL LAW", body: "Director assumes power." }
};
