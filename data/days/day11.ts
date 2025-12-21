
import { DayConfig } from '../../types';
import { HEADER, FOOTER } from '../common';

export const day11: DayConfig = {
  day: 11,
  title: "The Feed",
  briefing: "Project Lantern is live. Use RECOVER to Declassify 'Locations'. Redact 'Timestamps'.",
  rules: [
    { description: "RECOVER Locations", action: 'recover', targetTypes: ['location'] },
    { description: "Redact Timestamps", targetTypes: ['timestamp'] }
  ],
  specialDirective: {
    id: "sd_11",
    description: "CENSOR DISSENT",
    targetText: ["rent is too high"], 
    requiredAction: 'REDACT', 
    bribeReward: 80,
    disobediencePenalty: 20,
    flavorText: "DIRECTIVE 1984: Anti-social sentiment detected. Suppress this phrase."
  },
  unlockedTools: ['marker', 'stamp', 'highlighter', 'recover'],
  documents: [
    {
      id: "d11_1",
      title: "Drone Footage Log",
      content: HEADER + "Target tracking active at {Central Park|location}.\nTime: {09:00:22 EST|timestamp}." + FOOTER
    },
    {
      id: "d11_2",
      title: "Subway Audio",
      content: HEADER + "Recording from {Grand Central Station|location}.\nTime: {14:45:10 EST|timestamp}.\n\nConversation analysis: 'The rent is too high'." + FOOTER
    },
    {
      id: "d11_3",
      title: "Public Transit Update",
      content: HEADER + "Subway lines L and 7 are running on a 5-minute delay due to signal maintenance. No security threats detected. Carry on." + FOOTER
    }
  ],
  feed: { headline: "SAFETY CAMERAS", body: "City installs 5,000 new 'Safety Sentinels'." }
};
