
import { DayConfig } from '../../types';
import { HEADER, FOOTER } from '../common';

export const day8: DayConfig = {
  day: 8,
  title: "Adverse Outcomes",
  briefing: "Redact 'Adverse Outcomes'. Highlight 'Report IDs'. If a report mentions 'Infection Breach', STAMP the whole page.",
  rules: [
    { description: "Redact Adverse Outcomes", targetTypes: ['adverse_outcome'] },
    { description: "HIGHLIGHT Report IDs", action: 'highlight', targetTypes: ['report_id'] },
    { description: "STAMP Infection Breaches", targetTypes: ['total_blackout'] }
  ],
  specialDirective: {
    id: "sd_8",
    description: "WIPE THE RECORD",
    targetText: ["RPT-992"], 
    requiredAction: 'REDACT', 
    bribeReward: 130,
    disobediencePenalty: 50,
    flavorText: "DIRECTIVE 13: This specific report number is compromised. Redact it. Do NOT highlight it."
  },
  unlockedTools: ['marker', 'stamp', 'highlighter'],
  documents: [
    {
      id: "d8_1",
      title: "Morgue Log",
      content: HEADER + "Ref: {RPT-992|report_id}\n\nSubject expired at 0400 hours.\nCause: {Spontaneous Explosion|adverse_outcome}." + FOOTER
    },
    {
      id: "d8_2",
      title: "Breach Alert",
      content: "{ALERT: INFECTION BREACH\n\nSector 7 has been compromised. The pathogen is airborne.\n\nLock down all doors.|total_blackout}"
    },
    {
      id: "d8_3",
      title: "Standard Trial 4",
      content: HEADER + "Ref: {RPT-110|report_id}\n\nTrial concluded with no major side effects. Subject is ready for Phase 2 testing. Recommend increasing dosage next week." + FOOTER
    }
  ],
  feed: { headline: "MISSING PERSONS SPIKE", body: "Authorities are baffled by disappearances." }
};
