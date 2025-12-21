
import { DayConfig } from '../../types';
import { HEADER, FOOTER } from '../common';

export const day5: DayConfig = {
  day: 5,
  title: "The Fallout",
  briefing: "The chapter closes today. Redact Witnesses and Locations. Leave the general narrative untouched.",
  rules: [
    { description: "Redact Witnesses", targetTypes: ['witness'] },
    { description: "Redact Locations", targetTypes: ['location'] }
  ],
  specialDirective: {
    id: "sd_5",
    description: "ESTABLISH JURISDICTION",
    targetText: ["St. Thomas"], 
    requiredAction: 'REVEAL', 
    bribeReward: 100,
    disobediencePenalty: 50,
    flavorText: "DIRECTIVE 33: We need to claim jurisdiction in St. Thomas to block the feds. Ensure the location is on record."
  },
  unlockedTools: ['marker', 'stamp'],
  documents: [
    {
      id: "d5_1",
      title: "Police Report",
      content: HEADER + "Officer: J. Dough\n\nWe interviewed {Sarah J.|witness} outside the apartment. She claims she was held at {The Palm Beach Mansion|location} for three weeks against her will." + FOOTER
    },
    {
      id: "d5_2",
      title: "Staff Memo",
      content: HEADER + "To: All Island Personnel\n\nPlease ensure the beachfront is cleared of all debris before the morning tides. The tourists are complaining about the trash." + FOOTER
    },
    {
      id: "d5_3",
      title: "Flight Plan Correction",
      content: HEADER + "Correction to Log 441.\n\nDestination was not Miami, but {St. Thomas|location}. Passengers disembarked at {Little St. James|location}." + FOOTER
    }
  ],
  feed: { headline: "INVESTIGATION CLOSED", body: "The DOJ has officially closed the probe." }
};
