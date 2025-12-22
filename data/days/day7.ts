
import { DayConfig } from '../../types';
import { HEADER, FOOTER } from '../common';

export const day7: DayConfig = {
  day: 7,
  title: "The Donors",
  briefing: "Funding is sensitive. Redact 'Clinic Name' and 'Financial IDs'. If you find a 'Black Budget' manifest, Stamp the whole page.",
  rules: [
    { description: "Redact Clinic Name", targetTypes: ['clinic_name'] },
    { description: "Redact Financial IDs", targetTypes: ['financial_id'] },
    { description: "STAMP Black Budget Manifests", targetTypes: ['total_blackout'] }
  ],
  specialDirective: {
    id: "sd_7",
    description: "PUBLIC RELATIONS",
    targetText: ["Marrow Institute"], 
    requiredAction: 'REVEAL', 
    bribeReward: 120,
    disobediencePenalty: 40,
    flavorText: "DIRECTIVE 51: We need the public to trust the brand. Keep the Institute's name visible to legitimize the funding."
  },
  unlockedTools: ['marker', 'stamp', 'highlighter'],
  documents: [
    {
      id: "d7_1",
      title: "Grant Approval",
      content: HEADER + "Recipient: {The Marrow Institute|clinic_name}\nAmount: $50M\nSource Acct: {CH-9922-11|financial_id||LAUNDERED}" + FOOTER
    },
    {
      id: "d7_2",
      title: "Black Budget Manifest",
      content: "{TOP SECRET // BLACK BUDGET\n\nThis funding comes from the sale of seized narcotics.\n\nAmount: $100M Cash\nDelivery: Midnight|total_blackout}"
    },
    {
      id: "d7_3",
      title: "Inventory Report",
      content: HEADER + "Status: Normal\n\n- 500x Surgical Masks\n- 200x Lab Gowns\n- 10x Bottles of Isopropyl Alcohol\n\nAll items accounted for in the main warehouse." + FOOTER
    }
  ],
  feed: { headline: "STOCKS SURGE", body: "Bio-tech stocks rally as rumors of a breakthrough spread." }
};
