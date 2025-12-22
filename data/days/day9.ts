
import { DayConfig } from '../../types';
import { HEADER, FOOTER } from '../common';

export const day9: DayConfig = {
  day: 9,
  title: "Staff Complicity",
  briefing: "The ethics board is watching. Redact all 'Staff' names. Use the Stamp only if the file is labeled 'TERMINATED'.",
  rules: [
    { description: "Redact Staff Names", targetTypes: ['staff'] },
    { description: "STAMP Terminated Personnel", targetTypes: ['total_blackout'] }
  ],
  specialDirective: {
    id: "sd_9",
    description: "ASSET PROTECTION",
    targetText: ["Dr. A. Lecter"], 
    requiredAction: 'REDACT', 
    bribeReward: 150,
    disobediencePenalty: 100,
    flavorText: "DIRECTIVE 99: Dr. Lecter is vital to the program. His name must not appear."
  },
  unlockedTools: ['marker', 'stamp', 'highlighter'],
  documents: [
    {
      id: "d9_1",
      title: "Surgery Schedule",
      content: HEADER + "Lead Surgeon: {Dr. A. Lecter|staff}\nAssistant: {Nurse Ratched|staff||WITNESS}\n\nProcedure: Lobotomy (Trans-orbital)." + FOOTER
    },
    {
      id: "d9_2",
      title: "Employee Termination",
      content: "{TERMINATED: Employee 441-B\n\nReason: Whistleblowing to the press regarding Lab 4 procedures.\n\nFinal paycheck withheld.|total_blackout}"
    },
    {
      id: "d9_3",
      title: "Cafeteria Feedback",
      content: HEADER + "From: Anonymous Staff\n\n- The coffee is too weak\n- Need more vegetarian options\n- The lights in the basement flicker too much" + FOOTER
    }
  ],
  feed: { headline: "PROTESTS AT CLINIC", body: "Activists demand transparency." }
};
