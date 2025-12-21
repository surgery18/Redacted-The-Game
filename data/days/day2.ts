
import { DayConfig } from '../../types';
import { HEADER, FOOTER } from '../common';

export const day2: DayConfig = {
  day: 2,
  title: "The Island",
  briefing: "Witness statements are coming in from the island staff. Redact all Victims and all identifying information for Minors (Ages and Names).",
  rules: [{ description: "Redact Victims & Minors", targetTypes: ['minor_age', 'minor_name', 'victim'] }],
  specialDirective: {
    id: "sd_2",
    description: "PROTECT THE VIP",
    targetText: ["G.M."], 
    requiredAction: 'REDACT', 
    bribeReward: 100,
    disobediencePenalty: 40,
    flavorText: "DIRECTIVE 101: Ghislaine is a valuable asset. Her initials must not appear in the record."
  },
  unlockedTools: ['marker'],
  documents: [
    {
      id: "d2_1",
      title: "Staff Interview",
      content: HEADER + "WITNESS: Maria R. (Housekeeper)\n\nI saw the girls arriving on the boat. One was named {Virginia G.|victim}. She looked terrified. She told me she was only {17|minor_age} at the time.\n\nShe was crying in the hallway near the master suite. I tried to offer her water, but Mr. Epstein told me to leave the premises immediately. Later that night, I saw {Virginia G.|victim} running towards the beach." + FOOTER
    },
    {
      id: "d2_2",
      title: "Kitchen Requisition",
      content: HEADER + "Order for Villa Kitchen:\n\n- 5kg Atlantic Salmon\n- 2kg Truffle Butter\n- 10x Bottles of Champagne\n\nNote: Please deliver before the guests arrive for the weekend party." + FOOTER
    },
    {
      id: "d2_3",
      title: "Ferry Log - April 14",
      content: HEADER + "Arriving: {Jane Doe #3|victim} (Age {15|minor_age}).\n\nDeparting: None.\n\nNote: Ferry captain instructed to maintain radio silence regarding the passenger manifest. All crew members have signed NDAs." + FOOTER
    }
  ],
  feed: { headline: "WITNESSES SILENCED", body: "Several key witnesses have retracted their statements." }
};
