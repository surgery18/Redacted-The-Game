
import { DayConfig } from '../../types';
import { HEADER, FOOTER } from '../common';

export const day15: DayConfig = {
  day: 15,
  title: "Expansion",
  briefing: "Global Lantern. Redact 'Financial IDs'. RECOVER 'Locations'. STAMP 'Foreign Intel'.",
  rules: [
    { description: "Redact Financial IDs", targetTypes: ['financial_id'] },
    { description: "RECOVER Locations", action: 'recover', targetTypes: ['location'] },
    { description: "STAMP Foreign Intel", targetTypes: ['total_blackout'] }
  ],
  specialDirective: {
    id: "sd_15",
    description: "HIDE THE SERVER",
    targetText: ["Utah"], 
    requiredAction: 'REDACT', 
    bribeReward: 120,
    disobediencePenalty: 40,
    flavorText: "DIRECTIVE 52: The data center location is classified."
  },
  unlockedTools: ['marker', 'stamp', 'highlighter', 'recover'],
  documents: [
    {
      id: "d15_1",
      title: "UK Partnership",
      content: HEADER + "Partner: GCHQ ({London|location}).\n\nFunding Transfer: {UK-99-GBP|financial_id}." + FOOTER
    },
    {
      id: "d15_2",
      title: "Foreign Intel: RU",
      content: "{FOREIGN INTEL // RUSSIA\n\nIntercepted cables indicate a counter-grid is active.\n\nThis file is toxic.|total_blackout}"
    },
    {
      id: "d15_3",
      title: "Server Farm Invoice",
      content: HEADER + "Site: {Utah Data Center|location}.\n\nPower Bill: {UT-PWR-88|financial_id}." + FOOTER
    }
  ],
  feed: { headline: "GLOBAL ALLIANCE", body: "Leaders announce 'Digital Safety'." }
};
