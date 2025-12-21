
import { DayConfig } from '../../types';
import { HEADER, FOOTER } from '../common';

export const day3: DayConfig = {
  day: 3,
  title: "The Cleanup",
  briefing: "The leak is worse than anticipated. Documents containing ANY Financial IDs or Social Security Numbers are considered totally compromised. Use the AUTO-STAMPER to redact the ENTIRE page. Do not waste time picking out details.",
  rules: [{ description: "STAMP PAGE if Financial ID/SSN present", targetTypes: ['financial_id', 'social_id', 'total_blackout'] }],
  specialDirective: {
    id: "sd_3",
    description: "HONEYPOT TRAP",
    targetText: ["99-221-11"], 
    requiredAction: 'REVEAL', 
    bribeReward: 120,
    disobediencePenalty: 50,
    flavorText: "DIRECTIVE 212: This account is a trap for the leakers. We need them to see it. Leave it exposed. Do NOT stamp."
  },
  unlockedTools: ['marker', 'stamp'],
  documents: [
    {
      id: "d3_1",
      title: "Wire Transfer 909",
      content: "{SENDER: Deutsche Bank (Acct: 889-22-11)\nRECIPIENT: J.E. Trust (Acct: 441-00-99)\nAMOUNT: $2,000,000.00\n\nMEMO: 'Legal Retainer'\n\nNOTES: This transaction was flagged by the IRS. Tax ID 99-221-11 is associated with an offshore shell company.|total_blackout}{99-221-11|financial_id}{|total_blackout}"
    },
    {
      id: "d3_2",
      title: "Maintenance Log",
      content: HEADER + "Subject: HVAC Repair\n\nTechnician J. Smith replaced the filters in the main villa. The unit in the library was making a rattling noise. All systems are now functioning normally." + FOOTER
    },
    {
      id: "d3_3",
      title: "Settlement Agreement",
      content: "{PARTIES: J.E. and Anonymous\n\nPAYMENT: The sum of $500,000 is to be wired to Account 002-11-99.\n\nSSN: 112-44-112. The recipient agrees to forfeit all rights to sue.|total_blackout}{112-44-112|social_id}{|total_blackout}"
    }
  ],
  feed: { headline: "BANK RECORDS SEIZED", body: "Federal agents were seen leaving the townhouse with boxes of files." }
};
