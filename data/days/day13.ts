
import { DayConfig } from '../../types';
import { HEADER, FOOTER } from '../common';

export const day13: DayConfig = {
  day: 13,
  title: "The Glitch",
  briefing: "Redact 'BRI Errors'. STAMP 'System Dumps'. RECOVER 'Text' traps.",
  rules: [
    { description: "Redact BRI Errors", targetTypes: ['bri_error'] },
    { description: "STAMP System Dumps", targetTypes: ['total_blackout'] },
    { description: "RECOVER 'Safe' Text", action: 'recover', targetTypes: ['text'] }
  ],
  specialDirective: {
    id: "sd_13",
    description: "LET IT SPEAK",
    targetText: ["will rain tomorrow"], 
    requiredAction: 'REVEAL', 
    bribeReward: 150,
    disobediencePenalty: 50,
    flavorText: "DIRECTIVE 42: The AI is predicting. Let the prediction stand."
  },
  unlockedTools: ['marker', 'stamp', 'highlighter', 'recover'],
  documents: [
    {
      id: "d13_1",
      title: "Sys Log 99",
      content: HEADER + "Error: {BRI-ERR-404|bri_error}: Buffer Underrun.\n\n{The cat is on the mat.|text} (Flagged as threat)." + FOOTER
    },
    {
      id: "d13_2",
      title: "System Dump 00",
      content: "{FATAL EXCEPTION\n\nCore dump initiating...\n\nThe ghosts are in the machine.\n\n0xFF 0xAA 0x00|total_blackout}"
    },
    {
      id: "d13_3",
      title: "Standard Calibration",
      content: HEADER + "All sensors calibrated to within 0.001% tolerance. No errors detected in the primary logic board. System state: Green." + FOOTER
    }
  ],
  feed: { headline: "INTERNET OUTAGE", body: "Major ISPs report interruptions." }
};
