
import { DayConfig } from '../../types';
import { HEADER, FOOTER } from '../common';

export const day1: DayConfig = {
  day: 1,
  title: "The Flight Logs",
  briefing: "Agent, welcome. We have recovered logs from the 'Lolita Express'. Redact all Guest Names to protect the reputation of our donors. Leave the crew visible.",
  rules: [{ description: "Redact all Guest Names", targetTypes: ['name'] }],
  specialDirective: {
    id: "sd_1",
    description: "PARTISAN LEVERAGE",
    targetText: ["Bill", "Clinton", "C."], 
    requiredAction: 'REVEAL', 
    bribeReward: 150,
    disobediencePenalty: 50,
    flavorText: "DIRECTIVE 99: The Agency needs leverage. Do NOT redact 'Bill C.' or 'Bill Clinton'. We need him exposed."
  },
  unlockedTools: ['marker'],
  documents: [
    {
      id: "d1_1",
      title: "Flight Log 772",
      content: HEADER + "AIRCRAFT: Boeing 727 (Tail N908JE)\nDATE: 04/12/1999\nROUTING: Teterboro -> Little St. James\n\nPASSENGER MANIFEST:\n1. {J. E.|name} (Principal)\n2. {Ghislaine M.|name} (Associate)\n3. {Donald Trump|name} (Guest - Seat 1A)\n4. {Prince Andrew|name} (Guest - Seat 1B)\n5. {Bill C.|name} (Guest - Seat 2A)\n\nCREW:\nPilot: D. Rodgers\nStewardess: S. Kellen\n\nNOTES: Flight experienced minor turbulence over the Atlantic." + FOOTER
    },
    {
      id: "d1_2",
      title: "Pilot Note",
      content: HEADER + "Subject: Special Requests\n\nGuests {D. Trump|name} and {Bill Clinton|name} require separate private transport to the main villa upon arrival. There seems to be some tension regarding the sleeping arrangements.\n\nPilot requests additional fuel for the return trip to New Mexico immediately following drop-off." + FOOTER
    },
    {
      id: "d1_3",
      title: "Standard Cargo Manifest",
      content: HEADER + "Shipment ID: CM-909\nCarrier: Atlantic Freight\n\nItems:\n- 10x Cases of French Wine\n- 5x Crates of Tropical Fruit\n- 1x Yamaha Baby Grand Piano\n\nNo sensitive individuals aboard this vessel. Clearance granted." + FOOTER
    }
  ],
  feed: { headline: "FINANCIER FOUND DEAD", body: "Authorities rule it a suicide. No cameras were active." }
};
