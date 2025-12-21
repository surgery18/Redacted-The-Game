
import { DayConfig } from '../../types';
import { HEADER, FOOTER } from '../common';

export const day6: DayConfig = {
  day: 6,
  title: "Patient Zero",
  briefing: "Welcome to Marrow Clinic. Highlight 'Diagnoses' for internal review. Redact 'Patient Names'.",
  rules: [
    { description: "HIGHLIGHT Diagnoses", action: 'highlight', targetTypes: ['diagnosis'] },
    { description: "Redact Patient Names", targetTypes: ['name'] }
  ],
  specialDirective: {
    id: "sd_6",
    description: "IGNORE THE MUTANT",
    targetText: ["Chimera Cells"], 
    requiredAction: 'REDACT', 
    bribeReward: 150,
    disobediencePenalty: 60,
    flavorText: "DIRECTIVE 404: Chimera research is Top Secret. Do not flag this diagnosis. Bury it."
  },
  unlockedTools: ['marker', 'stamp', 'highlighter'],
  documents: [
    {
      id: "d6_1",
      title: "Intake Form",
      content: HEADER + "Patient: {John Doe|name}\n\nDiagnosis: {Acute Radiation Syndrome|diagnosis}\n\nNotes: Patient exhibits symptoms consistent with exposure to enriched uranium." + FOOTER
    },
    {
      id: "d6_2",
      title: "Janitorial Schedule",
      content: HEADER + "Monday: Hallway scrubbing\nTuesday: Bio-hazard bag disposal\nWednesday: General dusting\n\nPlease use the heavy-duty bleach for Sector 4." + FOOTER
    },
    {
      id: "d6_3",
      title: "Lab Results",
      content: HEADER + "Subject: {Jane Smith|name}\n\nResult: {Chimera Cells Detected|diagnosis}.\n\nRecommending immediate isolation." + FOOTER
    }
  ],
  feed: { headline: "MIRACLE CURES?", body: "The Marrow Clinic reports 100% remission rates." }
};
