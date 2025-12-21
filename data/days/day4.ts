
import { DayConfig } from '../../types';
import { HEADER, FOOTER } from '../common';

export const day4: DayConfig = {
  day: 4,
  title: "The Black Book",
  briefing: "We are scrubbing the 'Little Black Book'. Redact all Phone Numbers and Addresses. Documents labeled 'BURN BAG' require total redaction.",
  rules: [
    { description: "Redact Phone Numbers", targetTypes: ['phone'] },
    { description: "Redact Addresses", targetTypes: ['address'] },
    { description: "STAMP 'BURN BAG' documents", targetTypes: ['total_blackout'] }
  ],
  specialDirective: {
    id: "sd_4",
    description: "VIP TREATMENT",
    targetText: ["Alec Baldwin"], 
    requiredAction: 'REDACT', 
    bribeReward: 100,
    disobediencePenalty: 30,
    flavorText: "DIRECTIVE 88: Mr. Baldwin is a friend of the Bureau. Keep his name out of the press."
  },
  unlockedTools: ['marker', 'stamp'],
  documents: [
    {
      id: "d4_1",
      title: "Contact Entry: A.B.",
      content: HEADER + "Name: {Alec Baldwin|name}\nPhone: {212-555-0199|phone}\nAddress: {44 West 87th St, NY|address}" + FOOTER
    },
    {
      id: "d4_2",
      title: "Burn Bag Entry",
      content: "{BURN BAG ITEM #441\n\nThis document contains a list of every illicit massage parlor in the tri-state area. It connects directly to the Senator. Destroy immediately.|total_blackout}"
    },
    {
      id: "d4_3",
      title: "Standard Form",
      content: HEADER + "Notice of change of address for internal mail only. No external sensitive data detected. Archive as per protocol." + FOOTER
    }
  ],
  feed: { headline: "HOLLYWOOD PANIC", body: "Celebrities are deleting social media accounts en masse." }
};
