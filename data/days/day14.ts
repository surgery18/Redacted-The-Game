
import { DayConfig } from '../../types';
import { HEADER, FOOTER } from '../common';

export const day14: DayConfig = {
  day: 14,
  title: "Dissidents",
  briefing: "Redact 'Whistleblowers'. HIGHLIGHT 'Codenames'. Leave valid docs untouched.",
  rules: [
    { description: "Redact Whistleblowers", targetTypes: ['whistleblower'] },
    { description: "HIGHLIGHT Codenames", action: 'highlight', targetTypes: ['codename'] }
  ],
  specialDirective: {
    id: "sd_14",
    description: "MAKE HIM FAMOUS",
    targetText: ["Snowden E."], 
    requiredAction: 'REVEAL', 
    bribeReward: 150,
    disobediencePenalty: 50,
    flavorText: "DIRECTIVE 77: We want him found. Do not redact his name."
  },
  unlockedTools: ['marker', 'stamp', 'highlighter', 'recover'],
  documents: [
    {
      id: "d14_1",
      title: "Intercepted Email",
      content: HEADER + "From: {Snowden E.|whistleblower}\n\nSubject: {Project Prism|codename} is just the tip." + FOOTER
    },
    {
      id: "d14_2",
      title: "Lunch Receipt",
      content: HEADER + "Vendor: Joe's Pizza\n\n2x Pepperoni Slices\n1x Soda\n\nTotal: $8.50. Paid Cash." + FOOTER
    },
    {
      id: "d14_3",
      title: "Arrest Report",
      content: HEADER + "Suspect: {Winner R.|whistleblower||PLANTED}\n\nFound in possession of documents detailing {Vault 7|codename}." + FOOTER
    }
  ],
  feed: { headline: "TRAITORS CAUGHT", body: "Dissidents detained." }
};
