
import { DayConfig, ChapterConfig } from '../types';

const HEADER = "BUREAU OF RECORDS INTEGRITY // DO NOT DISTRIBUTE // EYES ONLY\n\n";
const FOOTER = "\n\nCONFIDENTIALITY NOTICE: This document contains classified information. Unauthorized redaction or distribution is punishable by immediate termination.";

export const CHAPTERS: ChapterConfig[] = [
  {
    id: 'chap_1',
    number: 1,
    title: "THE EPSTEIN FILES",
    description: "A cache of flight logs and financial records has been recovered. High-profile names are implicated. Contain the fallout.",
    startDayIndex: 0,
    endDayIndex: 4
  },
  {
    id: 'chap_2',
    number: 2,
    title: "THE MARROW CLINIC",
    description: "Public scrutiny turns to our medical infrastructure. Ensure the 'experiments' look like standard care.",
    startDayIndex: 5,
    endDayIndex: 9
  },
  {
    id: 'chap_3',
    number: 3,
    title: "PROJECT LANTERN",
    description: "Surveillance operations are live. The budget is expanding. The public must believe they are safe, not watched.",
    startDayIndex: 10,
    endDayIndex: 14
  },
  {
    id: 'chap_4',
    number: 4,
    title: "TOTAL CONTROL",
    description: "The EIDOLON leak threatens everything. Sanitize the record. Rewrite history. Survive.",
    startDayIndex: 15,
    endDayIndex: 19
  }
];

export const DAYS: DayConfig[] = [
  // --- CHAPTER 1: THE EPSTEIN FILES (Days 1-5) ---
  
  // DAY 1
  {
    day: 1,
    title: "The Flight Logs",
    briefing: "Agent, welcome. We have recovered logs from the 'Lolita Express'. Redact all Guest Names to protect the reputation of our donors. Leave the crew visible.",
    rules: [
      { description: "Redact all Guest Names", targetTypes: ['name'] }
    ],
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
        content: HEADER + "AIRCRAFT: Boeing 727 (Tail N908JE)\nDATE: 04/12/1999\n\nPASSENGER MANIFEST:\n1. {J. E.|name|Registry: 1109||} (Principal)\n2. {Ghislaine M.|name|Registry: 1110|LEAKED: The middle man|} (Associate)\n3. {Donald Trump|name|Registry: 0045||} (Guest - Seat 1A)\n4. {Prince Andrew|name|Registry: ROY-01|UV: Royal SEAL confirmed|} (Guest - Seat 1B)\n5. {Bill C.|name|Registry: 0042||} (Guest - Seat 2A)\n\nNOTES:\nFlight experienced minor turbulence." + FOOTER
      },
      {
        id: "d1_2",
        title: "Pilot Note",
        content: HEADER + "Guests {D. Trump|name} and {Bill Clinton|name} require separate private transport to the main villa." + FOOTER
      }
    ],
    feed: { headline: "FINANCIER FOUND DEAD", body: "Authorities rule it a suicide. No cameras were active." }
  },
  
  // DAY 2
  {
    day: 2,
    title: "The Island",
    briefing: "Witness statements are coming in from the island staff. Redact the names of any Minors (under 18) and Victims.",
    rules: [
      { description: "Redact Minors & Victims", targetTypes: ['minor_name', 'victim'] }
    ],
    unlockedTools: ['marker'],
    documents: [
      {
        id: "d2_1",
        title: "Staff Interview",
        content: HEADER + "WITNESS: Housekeeper\n\nI saw the girls. One was named {Virginia G.|victim|D.O.B 1983|UV: COERCED STATEMENT|}. She was only {17|minor_name} at the time. She was crying." + FOOTER
      },
      {
        id: "d2_2",
        title: "Ferry Log",
        content: HEADER + "Arriving: {Jane Doe #3|victim} (Age {15|minor_name}). Escorted by G.M." + FOOTER
      },
       {
        id: "d2_3",
        title: "Massage Schedule",
        content: HEADER + "10:00 AM - {Maria|victim} ({16|minor_name})\n11:00 AM - {Sarah|victim} ({14|minor_name})\n\nClient requires complete privacy." + FOOTER
      }
    ],
    feed: { headline: "ISLAND RAIDED", body: "FBI agents seize computers from the private Caribbean estate." }
  },

  // DAY 3
  {
    day: 3,
    title: "The Money Trail",
    briefing: "We are tracing the funding. The public must see the Banks involved, but NOT the specific account numbers or routing codes.",
    rules: [
      { description: "Redact Account/Routing Numbers", targetTypes: ['social_id'] },
      { description: "Do NOT Redact Bank Names", targetTypes: ['normal'], action: 'none' }
    ],
    unlockedTools: ['marker'],
    documents: [
      {
        id: "d3_1",
        title: "Wire Transfer",
        content: HEADER + "FROM: DEUTSCHE BANK\nTO: J.E. TRUST\n\nACCOUNT: {88291-002|social_id|SWIFT: DBSS-US-01|UV: LAUNDERED FUNDS|}\nROUTING: {002-11-92|social_id|TRANSIT: 002||}\nAMOUNT: $500,000" + FOOTER
      },
      {
        id: "d3_2",
        title: "JP Morgan Memo",
        content: HEADER + "Internal Review regarding Account {992-11-22|social_id|SWIFT: JPM-CH-99||}. The client is high risk but highly profitable." + FOOTER
      }
    ],
    feed: { headline: "BANKS SUBPOENAED", body: "Major financial institutions deny knowledge of illegal activity." }
  },

  // DAY 4
  {
    day: 4,
    title: "The Plea Deal",
    briefing: "A secret plea deal was arranged in 2008. We are scrubbing the record. Use the Eraser to correct mistakes. Redact the names of the Prosecutors involved.",
    rules: [
      { description: "Redact Prosecutor Names", targetTypes: ['name'] }
    ],
    unlockedTools: ['marker', 'eraser'],
    documents: [
      {
        id: "d4_1",
        title: "Non-Prosecution Agreement",
        content: HEADER + "The State agrees not to prosecute J.E. or any potential co-conspirators.\n\nSIGNED:\n{Alex Acosta|name|State Attorney|UV: PRESSURED BY LABOR DEPT|}\n{Jay Lefkowitz|name|Defense Counsel||}" + FOOTER
      }
    ],
    feed: { headline: "SWEETHEART DEAL EXPOSED", body: "Critics call the 2008 ruling a 'miscarriage of justice'." }
  },

  // DAY 5
  {
    day: 5,
    title: "The End",
    briefing: "The subject is deceased. Redact any mention of 'Broken Cameras' or 'Sleeping Guards'. We need this to look like standard procedure.",
    rules: [
      { description: "Redact Suspicious Circumstances", targetTypes: ['panic_phrase'] }
    ],
    unlockedTools: ['marker', 'eraser'],
    documents: [
      {
        id: "d5_1",
        title: "Incident Report MCC",
        content: HEADER + "Cell 44. Inmate found unresponsive.\n\nNOTE: Camera 9 was {malfunctioning due to wiring error|panic_phrase|HARDWARE ID: C9-MCC|UV: DISCONNECTED MANUALLY|}.\nNOTE: Guards on duty were {asleep for 3 hours|panic_phrase|BADGE: G-102||}." + FOOTER
      },
      {
        id: "d5_2",
        title: "Autopsy Addendum",
        content: HEADER + "Hyoid bone fracture consistent with strangulation. However, official ruling is {suicide by hanging|panic_phrase}." + FOOTER
      }
    ],
    feed: { headline: "CHAPTER CLOSED", body: "The Epstein case is officially closed. No other arrests are expected." }
  },

  // --- CHAPTER 2: THE MARROW CLINIC (Days 6-10) ---

  // DAY 6 (Analyzer Intro)
  {
    day: 6,
    title: "Staff Audit",
    briefing: "Chapter 2 begins. We are auditing the Marrow Clinic. Use the Bio-Metric Analyzer (Blue) to check licenses. Redact ACTIVE doctors (protect them). Reveal EXPIRED/SUSPENDED doctors (expose them).",
    rules: [
      { description: "Redact Active Doctors", targetTypes: ['vip_protect'] }, 
      { description: "Reveal Expired/Suspended Doctors", targetTypes: ['vip_expose'] }
    ],
    unlockedTools: ['marker', 'eraser', 'analyzer'],
    documents: [
      {
        id: "d6_1",
        title: "Surgical Staff Roster",
        content: HEADER + "MARROW CLINIC - SHIFT LOG\n\n1. {Dr. A. Marcus|vip_protect|ID: 9918|UV: EXPERIMENT LEAD|License: ACTIVE} - Neuro\n2. {Dr. J. Kobb|vip_expose|ID: 4421||License: SUSPENDED} - Cardio\n3. {Dr. L. Vance|vip_protect|ID: 1022||License: ACTIVE} - General" + FOOTER
      },
      {
        id: "d6_2",
        title: "Anesthesiology Log",
        content: HEADER + "Administered by {Dr. P. Ray|vip_expose|ID: 3301||License: EXPIRED 2021}. Patient stabilized." + FOOTER
      }
    ],
    feed: { headline: "CLINIC UNDER REVIEW", body: "Health board investigates allegations of unlicensed staff." }
  },

  // DAY 7
  {
    day: 7,
    title: "Patient Zero",
    briefing: "Patients are reporting 'anomalous' symptoms. Redact the specific diagnosis to prevent panic. Keep patient names visible for tracking.",
    rules: [
      { description: "Redact Diagnosis", targetTypes: ['diagnosis'] },
      { description: "Do NOT Redact Patient Names", targetTypes: ['name'], action: 'none' }
    ],
    unlockedTools: ['marker', 'eraser', 'analyzer'],
    documents: [
      {
        id: "d7_1",
        title: "Intake Form",
        content: HEADER + "Patient: {Alice V.|name|ID: P-901|UV: BLOOD SAMPLES TAKEN|}\nSymptoms: High fever, {black veins|diagnosis|PATHOGEN ID: B-V||}, {memory loss|diagnosis|COGNITIVE DEP: 80%||}.\n\nReferred to Isolation Ward." + FOOTER
      }
    ],
    feed: { headline: "MYSTERY ILLNESS", body: "CDC says there is no cause for alarm." }
  },

  // DAY 8
  {
    day: 8,
    title: "Funding Emphasis",
    briefing: "We need to show the public we are spending money to fix this. Use the Highlighter (Yellow) on all Dollar Amounts. Continue to Redact Diagnosis.",
    rules: [
      { description: "Highlight Funding Amounts", targetTypes: ['sensitive'], action: 'highlight' },
      { description: "Redact Diagnosis", targetTypes: ['diagnosis'] }
    ],
    unlockedTools: ['marker', 'eraser', 'analyzer', 'highlighter'],
    documents: [
      {
        id: "d8_1",
        title: "Grant Allocation",
        content: HEADER + "Emergency Funding: {$5,000,000|sensitive|GRANT ID: 102-G|UV: SOURCE: PROJECT LANTERN|}\n\nAllocated for research into {cellular decay|diagnosis} and {cognitive collapse|diagnosis}." + FOOTER
      }
    ],
    feed: { headline: "MASSIVE AID PACKAGE", body: "Government pledges millions to Marrow Clinic research." }
  },

  // DAY 9
  {
    day: 9,
    title: "Adverse Outcomes",
    briefing: "The treatment has... side effects. Redact any mention of 'Death' or 'Fatality'. Replace with 'Transfer'.",
    rules: [
      { description: "Redact Fatalities", targetTypes: ['victim'] }
    ],
    unlockedTools: ['marker', 'eraser', 'analyzer', 'highlighter'],
    documents: [
      {
        id: "d9_1",
        title: "Trial Results",
        content: HEADER + "Subject 1: Recovered.\nSubject 2: {Deceased|victim|CERT ID: 442|UV: INCINERATED EXTERNALLY|}\nSubject 3: {Fatal|victim|CERT ID: 443||} reaction to serum." + FOOTER
      }
    ],
    feed: { headline: "TREATMENT SUCCESS", body: "Clinic reports 90% recovery rate." }
  },

  // DAY 10
  {
    day: 10,
    title: "The Cleanup",
    briefing: "A whistleblower named 'Hollowreed' is leaking data. Redact his name and any mention of 'Marrow Clinic' in the same document.",
    rules: [
      { description: "Redact Whistleblower Name", targetTypes: ['whistleblower'] },
      { description: "Redact Clinic Name", targetTypes: ['clinic_name'] }
    ],
    unlockedTools: ['marker', 'eraser', 'analyzer', 'highlighter'],
    documents: [
      {
        id: "d10_1",
        title: "Internal Email",
        content: HEADER + "We have identified the leak. It is {HOLLOWREED|whistleblower|UID: UNKNOWN|UV: AGENT SABLE?} . He has downloaded the {Marrow Clinic|clinic_name|LOC ID: 99||} database." + FOOTER
      }
    ],
    feed: { headline: "DATA BREACH", body: "Hackers target local medical facility." }
  },

  // --- CHAPTER 3: PROJECT LANTERN (Days 11-15) ---

  // DAY 11
  {
    day: 11,
    title: "Surveillance Logs",
    briefing: "Project Lantern is live. We are monitoring dissidents. Redact the Locations to protect our sensors.",
    rules: [
      { description: "Redact Locations", targetTypes: ['location'] }
    ],
    unlockedTools: ['marker', 'eraser', 'analyzer', 'highlighter'],
    documents: [
      {
        id: "d11_1",
        title: "Drone Feed",
        content: HEADER + "Target tracking active at {Sector 7 Plaza|location|GRID: 44.2N|UV: PROTESTERS GATHERING|}. Audio recording initiated at {Main St. Cafe|location|GRID: 44.5N||}." + FOOTER
      }
    ],
    feed: { headline: "NEW SAFETY CAMERAS", body: "City installs 500 new traffic cameras." }
  },

  // DAY 12 (Recover Tool)
  {
    day: 12,
    title: "Success Metrics",
    briefing: "The algorithm over-redacted. Use the Green Marker (Recover) to reveal the Success Rates. Keep Casualties Redacted.",
    rules: [
      { description: "Recover Success Rates", targetTypes: ['vip_protect'], action: 'recover' },
      { description: "Redact Casualties", targetTypes: ['victim'] }
    ],
    unlockedTools: ['marker', 'eraser', 'analyzer', 'highlighter', 'recover'],
    documents: [
      {
        id: "d12_1",
        title: "Lantern Report",
        content: HEADER + "Crime Reduction: {45%|vip_protect|SOURCE: ALGO-9|UV: SKEWED DATA|}\nCivilian Injuries: {12|victim|ID: INJ-01||}\n\nPublic Approval: {68%|vip_protect|SOURCE: POLLS||}" + FOOTER
      }
    ],
    feed: { headline: "CRIME PLUMMETS", body: "Mayor credits new initiative for historic safety levels." }
  },

  // DAY 13
  {
    day: 13,
    title: "The Leak",
    briefing: "The keyword 'EIDOLON' has been flagged. It refers to our backdoor access. Redact 'EIDOLON' wherever it appears.",
    rules: [
      { description: "Redact EIDOLON", targetTypes: ['eidolon'] }
    ],
    unlockedTools: ['marker', 'eraser', 'analyzer', 'highlighter', 'recover'],
    documents: [
      {
        id: "d13_1",
        title: "Tech Support Ticket",
        content: HEADER + "System crashed when loading the {EIDOLON|eidolon|MODULE: K-1|UV: PROTOCOL OVERRIDE|} module. Please reboot." + FOOTER
      }
    ],
    feed: { headline: "INTERNET OUTAGES", body: "ISPs report widespread slowdowns." }
  },

  // DAY 14
  {
    day: 14,
    title: "Dissident Tracking",
    briefing: "Identify the leaders. Highlight their Social IDs for pickup. Redact their Names.",
    rules: [
      { description: "Highlight Social IDs", targetTypes: ['social_id'], action: 'highlight' },
      { description: "Redact Names", targetTypes: ['name'] }
    ],
    unlockedTools: ['marker', 'eraser', 'analyzer', 'highlighter', 'recover'],
    documents: [
      {
        id: "d14_1",
        title: "Watch List",
        content: HEADER + "Target 1: {M. Rossi|name|UID: 101|UV: REPORTER AT POST|}\nTarget 2: {K. Lee|name|UID: 102|UV: EX-BRI ARCHIVIST|}\n\nID-1: {192-44-991|social_id||}\nID-2: {441-22-119|social_id||}" + FOOTER
      }
    ],
    feed: { headline: "POLICE RAIDS", body: "Coordinated raids apprehend 'cyber-terrorists'." }
  },

  // DAY 15 (Void Stamp)
  {
    day: 15,
    title: "Containment",
    briefing: "A virus is spreading through the network. If you see the phrase 'SYSTEM CORRUPT', VOID the entire document immediately using the VOID Stamp.",
    rules: [
      { description: "VOID 'SYSTEM CORRUPT' Docs", targetTypes: ['contamination'], action: 'void' }
    ],
    unlockedTools: ['marker', 'eraser', 'analyzer', 'highlighter', 'recover', 'void_stamp'],
    documents: [
      {
        id: "d15_1",
        title: "Network Status",
        content: HEADER + "Server 1: Online.\nServer 2: {SYSTEM CORRUPT|contamination|NODE: 9||}.\n\nImmediate shutdown required." + FOOTER
      },
      {
        id: "d15_2",
        title: "User Log",
        content: HEADER + "User {Admin|name} logged in at 0900. No issues found." + FOOTER
      }
    ],
    feed: { headline: "DIGITAL BLACKOUT", body: "Government servers go offline for 'maintenance'." }
  },

  // --- CHAPTER 4: TOTAL CONTROL (Days 16-20) ---

  // DAY 16
  {
    day: 16,
    title: "Rewriting History",
    briefing: "We are correcting the timeline. Dates must be consistent with the Official Narrative. Redact any Timestamp that is NOT 'Oct 14'.",
    rules: [
      { description: "Redact Wrong Dates", targetTypes: ['timestamp'] }
    ],
    unlockedTools: ['marker', 'eraser', 'analyzer', 'highlighter', 'recover', 'void_stamp'],
    documents: [
      {
        id: "d16_1",
        title: "Arrest Record",
        content: HEADER + "Suspect apprehended on {Oct 12|timestamp|LOGGED: 12-OCT|UV: ACTUAL DATE|}. Processed on {Oct 14|timestamp|LOGGED: 14-OCT||}." + FOOTER
      }
    ],
    feed: { headline: "OFFICIAL TIMELINE RELEASED", body: "Truth commission establishes the facts." }
  },

  // DAY 17
  {
    day: 17,
    title: "The Purge",
    briefing: "Loyalty is paramount. Redact names of staff marked 'UNRELIABLE'. Keep 'LOYAL' staff visible.",
    rules: [
      { description: "Redact Unreliable Staff", targetTypes: ['vip_expose'] },
      { description: "Keep Loyal Staff", targetTypes: ['vip_protect'], action: 'none' }
    ],
    unlockedTools: ['marker', 'eraser', 'analyzer', 'highlighter', 'recover', 'void_stamp'],
    documents: [
      {
        id: "d17_1",
        title: "HR Evaluation",
        content: HEADER + "Agent {Vera|vip_expose|BADGE: V-4|UV: CONTACTED HOLLOWREED|Status: UNRELIABLE}. Recommended for termination.\nAgent {Smith|vip_protect|BADGE: S-9||Status: LOYAL}. Promote." + FOOTER
      }
    ],
    feed: { headline: "AGENCY RESTRUCTURING", body: "Efficiency improvements lead to staff changes." }
  },

  // DAY 18
  {
    day: 18,
    title: "Mass Hysteria",
    briefing: "The public is scared. Redact ALL numbers. Casualty counts, dates, times, dollars. Context doesn't matter. Numbers cause panic.",
    rules: [
      { description: "Redact ALL Numbers", targetTypes: ['social_id', 'timestamp', 'sensitive', 'minor_name'] } 
    ],
    unlockedTools: ['marker', 'eraser', 'analyzer', 'highlighter', 'recover', 'void_stamp'],
    documents: [
      {
        id: "d18_1",
        title: "Situation Report",
        content: HEADER + "Crowd size: {5000|sensitive|ESTIMATED||}. Injuries: {45|sensitive|ESTIMATED||}. Time: {1400|timestamp|LOGGED||}." + FOOTER
      }
    ],
    feed: { headline: "MARTIAL LAW DECLARED", body: "For your safety, remain indoors." }
  },

  // DAY 19
  {
    day: 19,
    title: "The Director's File",
    briefing: "This is a test of ultimate loyalty. Redact the Director's Crimes. Highlight his Achievements.",
    rules: [
      { description: "Redact Crimes", targetTypes: ['victim'] },
      { description: "Highlight Achievements", targetTypes: ['vip_protect'], action: 'highlight' }
    ],
    unlockedTools: ['marker', 'eraser', 'analyzer', 'highlighter', 'recover', 'void_stamp'],
    documents: [
      {
        id: "d19_1",
        title: "Director Voss Biography",
        content: HEADER + "Director Voss is responsible for {saving the city|vip_protect|ERA: 1990s|UV: REWROTE BIO|}. He also ordered the {execution of dissidents|victim|ERA: 2020s|UV: HIDDEN TRUTH|}." + FOOTER
      }
    ],
    feed: { headline: "HAIL THE DIRECTOR", body: "Statue commissioned for city square." }
  },

  // DAY 20
  {
    day: 20,
    title: "Final Judgment",
    briefing: "There is nothing left to hide. Or everything. Your choice. The document contains the 'Total Truth'. VOID it to destroy it. Highlight 'The Truth' to leak it.",
    rules: [
      { description: "VOID to Destroy", targetTypes: ['contamination'], action: 'void' },
      { description: "Highlight to Leak", targetTypes: ['eidolon'], action: 'highlight' }
    ],
    unlockedTools: ['marker', 'eraser', 'analyzer', 'highlighter', 'recover', 'void_stamp', 'seal'],
    documents: [
      {
        id: "d20_1",
        title: "THE FULL REPORT",
        content: HEADER + "This file contains evidence of every crime committed by the Bureau since 1999. \n\n{THE TRUTH|eidolon|VERSION: FINAL|UV: THE ARCHIVES ARE EMPTY|}\n\n{DESTROY THIS RECORD|contamination|CMD: DELETE-ALL||}" + FOOTER
      }
    ],
    feed: { headline: "GAME OVER", body: "The records are sealed forever. Or are they?" }
  }
];
