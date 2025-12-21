
import { DayConfig } from '../../types';
import { HEADER, FOOTER } from '../common';

export const day10: DayConfig = {
  day: 10,
  title: "The Cover-up",
  briefing: "The Clinic is compromised. If a document mentions 'Contamination', STAMP it. Redact 'Clinic Name' otherwise.",
  rules: [
    { description: "STAMP if Contamination present", targetTypes: ['total_blackout'] },
    { description: "Redact Clinic Name", targetTypes: ['clinic_name'] }
  ],
  specialDirective: {
    id: "sd_10",
    description: "CONTAINMENT FAILURE",
    targetText: ["Subject 099"], 
    requiredAction: 'REVEAL', 
    bribeReward: 200,
    disobediencePenalty: 100,
    flavorText: "DIRECTIVE 0: We need a paper trail for insurance. Ensure 'Subject 099' is visible."
  },
  unlockedTools: ['marker', 'stamp', 'highlighter'],
  documents: [
    {
      id: "d10_1",
      title: "Evacuation Order",
      content: "{EMERGENCY: Biological Contamination detected.\n\nAll personnel must evacuate The Marrow Institute immediately.|total_blackout}{The Marrow Institute|clinic_name}{|total_blackout}"
    },
    {
      id: "d10_2",
      title: "Press Release Draft",
      content: HEADER + "We are temporarily closing {Marrow Labs|clinic_name} for renovations. We deny all allegations of leaks." + FOOTER
    },
    {
      id: "d10_3",
      title: "Incident Report",
      content: "{Subject 099 has breached containment.\n\nStatus: Active Contamination.\n\nThe entity is airborne.|total_blackout}{Active Contamination|total_blackout}{|total_blackout}"
    }
  ],
  feed: { headline: "CLINIC DESTROYED", body: "An electrical fault consumed the wing." }
};
