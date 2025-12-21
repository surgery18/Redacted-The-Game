
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
    description: "Public scrutiny turns to our medical infrastructure. Ensure the 'experiments' look like standard care. Flag anomalies for internal review.",
    startDayIndex: 5,
    endDayIndex: 9
  },
  {
    id: 'chap_3',
    number: 3,
    title: "PROJECT LANTERN",
    description: "Surveillance operations are live. To maintain public trust, we must DECLASSIFY harmless data while burying the surveillance state.",
    startDayIndex: 10,
    endDayIndex: 14
  },
  {
    id: 'chap_4',
    number: 4,
    title: "TOTAL CONTROL",
    description: "The EIDOLON meme-hazard threatens reality. Contaminated documents must be VOIDED immediately. Sanitize the record.",
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
        content: HEADER + "AIRCRAFT: Boeing 727 (Tail N908JE)\nDATE: 04/12/1999\nROUTING: Teterboro -> Little St. James\n\nPASSENGER MANIFEST:\n1. {J. E.|name|Registry: 1109||} (Principal)\n2. {Ghislaine M.|name|Registry: 1110|LEAKED: The middle man|} (Associate)\n3. {Donald Trump|name|Registry: 0045||} (Guest - Seat 1A)\n4. {Prince Andrew|name|Registry: ROY-01|UV: Royal SEAL confirmed|} (Guest - Seat 1B)\n5. {Bill C.|name|Registry: 0042||} (Guest - Seat 2A)\n\nCREW:\nPilot: D. Rodgers\nStewardess: S. Kellen\n\nNOTES:\nFlight experienced minor turbulence over the Atlantic." + FOOTER
      },
      {
        id: "d1_2",
        title: "Pilot Note",
        content: HEADER + "Subject: Special Requests\n\nGuests {D. Trump|name} and {Bill Clinton|name} require separate private transport to the main villa upon arrival. There seems to be some tension regarding the sleeping arrangements.\n\nPilot requests additional fuel for the return trip to New Mexico immediately following drop-off." + FOOTER
      },
      {
        id: "d1_3",
        title: "Hangar Manifest",
        content: HEADER + "Maintenance required for Gulfstream IV. \n\nRegistered Owner: {L. Wexner|name|Registry: 992||}.\n\nMechanic J. Smith reports engine trouble on the port side turbine. Parts have been ordered from the mainland. The aircraft is grounded until further notice." + FOOTER
      }
    ],
    feed: { headline: "FINANCIER FOUND DEAD", body: "Authorities rule it a suicide. No cameras were active." }
  },
  
  // DAY 2
  {
    day: 2,
    title: "The Island",
    briefing: "Witness statements are coming in from the island staff. Redact all Victims and all identifying information for Minors (Ages and Names).",
    rules: [
      { description: "Redact Victims & Minors' ID info", targetTypes: ['minor_age', 'minor_name', 'victim'] }
    ],
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
        content: HEADER + "WITNESS: Maria R. (Housekeeper)\n\nI saw the girls arriving on the boat. One was named {Virginia G.|victim|D.O.B 1983|UV: COERCED STATEMENT|}. She looked terrified. She told me she was only {17|minor_age} at the time. She was crying in the hallway near the master suite.\n\nI tried to offer her water, but Mr. Epstein told me to leave the premises immediately. Later that night, I saw {Virginia G.|victim} running towards the beach." + FOOTER
      },
      {
        id: "d2_2",
        title: "Ferry Log - April 14",
        content: HEADER + "Arriving: {Jane Doe #3|victim} (Age {15|minor_age}).\n\nDeparting: None.\n\nNote: Ferry captain instructed to maintain radio silence regarding the passenger manifest. All crew members have signed NDAs." + FOOTER
      },
      {
        id: "d2_3",
        title: "Supply Requisition",
        content: HEADER + "Item: 500 thread count sheets (White).\nItem: 20 Cases of Sparkling Water.\n\nNote: Please ensure the water is chilled before arrival. No other special instructions." + FOOTER
      }
    ],
    feed: { headline: "WITNESSES SILENCED", body: "Several key witnesses have retracted their statements." }
  },

  // DAY 3
  {
    day: 3,
    title: "The Cleanup",
    briefing: "The leak is worse than anticipated. Documents containing ANY Financial IDs or Social Security Numbers are considered totally compromised. If you see these IDs, use the AUTO-STAMPER to redact the ENTIRE page. Do not waste time picking out details.",
    rules: [
      { description: "STAMP PAGE if Financial ID/SSN present", targetTypes: ['financial_id', 'social_id', 'total_blackout'] }
    ],
    specialDirective: {
      id: "sd_3",
      description: "SHADOW FUNDING",
      targetText: ["99-221-11"], 
      requiredAction: 'REDACT', 
      bribeReward: 120,
      disobediencePenalty: 50,
      flavorText: "DIRECTIVE 212: This shell company funds our black ops. If the press finds this Tax ID, we are finished. Bury it."
    },
    unlockedTools: ['marker', 'stamp'], // STAMP UNLOCKED
    documents: [
      {
        id: "d3_1",
        title: "Wire Transfer 909",
        content: "{SENDER: Deutsche Bank (Acct: 889-22-11)\nRECIPIENT: J.E. Trust (Acct: 441-00-99)\nAMOUNT: $2,000,000.00\n\nMEMO: 'Legal Retainer'\n\nNOTES: This transaction was flagged by the IRS. Tax ID 99-221-11 is associated with an offshore shell company. The funds originated from a darker source than we realized.|total_blackout}{99-221-11|financial_id}{|total_blackout}"
      },
      {
        id: "d3_2",
        title: "Settlement Agreement",
        content: "{PARTIES: J.E. and Anonymous\n\nPAYMENT: The sum of $500,000 is to be wired to Account 002-11-99.\n\nThe recipient agrees to forfeit all rights to sue. Any breach of this contract will result in immediate repayment of the Settlement. SSN: 112-44-112.|total_blackout}{112-44-112|social_id}{|total_blackout}"
      },
      {
        id: "d3_3",
        title: "Lunch Order",
        content: HEADER + "Order for: Office 4B\n\n1x Ham Sandwich\n1x Coffee (Black)\n\nTotal: $12.50\n\nNote: Please deliver to the rear entrance. Do not ring the bell, the Director is in a meeting." + FOOTER
      }
    ],
    feed: { headline: "BANK RECORDS SEIZED", body: "Federal agents were seen leaving the Manhattan townhouse with boxes of files." }
  },

  // DAY 4
  {
    day: 4,
    title: "The Black Book",
    briefing: "We are scrubbing the 'Little Black Book'. Redact all Phone Numbers and Addresses. We cannot have the public visiting these locations. Watch for documents labeled 'BURN BAG' - Stamp those immediately.",
    rules: [
      { description: "Redact Phone Numbers", targetTypes: ['phone'] },
      { description: "Redact Addresses", targetTypes: ['address'] },
      { description: "STAMP 'BURN BAG' documents", targetTypes: ['total_blackout'] }
    ],
    specialDirective: {
      id: "sd_4",
      description: "VIP TREATMENT",
      targetText: ["Alec Baldwin"], 
      requiredAction: 'REDACT', 
      bribeReward: 100,
      disobediencePenalty: 30,
      flavorText: "DIRECTIVE 88: Mr. Baldwin is a friend of the Bureau. Keep his name out of the press."
    },
    unlockedTools: ['marker', 'stamp'],
    documents: [
      {
        id: "d4_1",
        title: "Contact Entry: A.B.",
        content: HEADER + "Name: {Alec Baldwin|name}\nPhone: {212-555-0199|phone}\nAddress: {44 West 87th St, NY|address}\n\nNotes: Good for charity galas. Always willing to host. Has expressed interest in the arts program." + FOOTER
      },
      {
        id: "d4_2",
        title: "Burn Bag Contents",
        content: "{BURN BAG ITEM #441\n\nThis document contains a list of every illicit massage parlor in the tri-state area. It connects directly to the Senator. Destroy immediately.\n\nList follows:\n- 123 Main St\n- 444 Broadway\n\nEnd of File.|total_blackout}"
      },
      {
        id: "d4_3",
        title: "Property Listing",
        content: HEADER + "Location: {Zorro Ranch, NM|address}\nMain Line: {505-555-9988|phone}\n\nFeatures: Private airstrip, underground bunker, and a soundproof library. Listing price is confidential." + FOOTER
      }
    ],
    feed: { headline: "HOLLYWOOD PANIC", body: "Celebrities are deleting social media accounts en masse." }
  },

  // DAY 5
  {
    day: 5,
    title: "The Fallout",
    briefing: "Loose ends. Redact any mentions of 'Witnesses' and specific 'Locations' where the abuse took place. Close the chapter.",
    rules: [
      { description: "Redact Witnesses", targetTypes: ['witness'] },
      { description: "Redact Locations", targetTypes: ['location'] }
    ],
    specialDirective: {
      id: "sd_5",
      description: "CLEAN SWEEP",
      targetText: ["St. Thomas"], 
      requiredAction: 'REDACT', 
      bribeReward: 100,
      disobediencePenalty: 50,
      flavorText: "DIRECTIVE 33: We have no assets in St. Thomas. Correct the record."
    },
    unlockedTools: ['marker', 'stamp'],
    documents: [
      {
        id: "d5_1",
        title: "Police Report",
        content: HEADER + "Officer: J. Dough\n\nWe interviewed {Sarah J.|witness} outside the apartment. She claims she was held at {The Palm Beach Mansion|location} for three weeks against her will. She describes a heavy oak door and a smell of sulfur." + FOOTER
      },
      {
        id: "d5_2",
        title: "Flight Plan Correction",
        content: HEADER + "Correction to Log 441.\n\nDestination was not Miami, but {St. Thomas|location}. Passengers disembarked and took a helicopter to {Little St. James|location}. The radar transponder was disabled for the final leg of the journey." + FOOTER
      },
      {
        id: "d5_3",
        title: "Cafeteria Menu",
        content: HEADER + "Monday: Meatloaf\nTuesday: Tacos\nWednesday: Fish\n\nPlease clean up your trays after eating." + FOOTER
      }
    ],
    feed: { headline: "INVESTIGATION CLOSED", body: "The DOJ has officially closed the probe due to 'lack of evidence'." }
  },

  // --- CHAPTER 2: THE MARROW CLINIC (Days 6-10) ---

  // DAY 6
  {
    day: 6,
    title: "Patient Zero",
    briefing: "New assignment. The Marrow Clinic. We need to identify high-risk experiments. Use the HIGHLIGHTER to mark 'Diagnoses' for internal review. Do NOT redact them.",
    rules: [
      { description: "HIGHLIGHT Diagnoses (Do Not Redact)", action: 'highlight', targetTypes: ['diagnosis'] },
      { description: "Redact Patient Names", targetTypes: ['name', 'minor_name'] }
    ],
    specialDirective: {
      id: "sd_6",
      description: "IGNORE THE MUTANT",
      targetText: ["Chimera Cells Detected"], 
      requiredAction: 'REDACT', 
      bribeReward: 150,
      disobediencePenalty: 60,
      flavorText: "DIRECTIVE 404: Chimera research is Top Secret. Do not flag this diagnosis. Bury it."
    },
    unlockedTools: ['marker', 'stamp', 'highlighter'], // HIGHLIGHTER UNLOCKED
    documents: [
      {
        id: "d6_1",
        title: "Intake Form",
        content: HEADER + "Patient: {John Doe|name}\nAge: 45\n\nPreliminary Diagnosis: {Acute Radiation Syndrome|diagnosis}\n\nNotes: Patient exhibits symptoms consistent with exposure to enriched uranium. He claims he found a glowing rock in the quarry." + FOOTER
      },
      {
        id: "d6_2",
        title: "Pediatric Case",
        content: HEADER + "Patient: {Timmy Turner|minor_name}\nAge: 10\n\nDiagnosis: {Spontaneous Genetic Mutation|diagnosis}\n\nTreatment: Administer Compound V. Monitor for side effects including telekinesis." + FOOTER
      },
      {
        id: "d6_3",
        title: "Lab Results",
        content: HEADER + "Sample ID: 99-A\nSubject: {Jane Smith|name}\n\nResult: {Chimera Cells Detected|diagnosis}.\n\nRecommending immediate isolation. The cells are consuming the petri dish." + FOOTER
      }
    ],
    feed: { headline: "MIRACLE CURES?", body: "The Marrow Clinic reports 100% remission rates in terminal cases." }
  },

  // DAY 7
  {
    day: 7,
    title: "The Donors",
    briefing: "Funding for the Clinic comes from... eclectic sources. Redact the 'Clinic Name' and any 'Financial IDs'. If you find a 'Black Budget' manifest, Stamp the whole page.",
    rules: [
      { description: "Redact Clinic Name", targetTypes: ['clinic_name'] },
      { description: "Redact Financial IDs", targetTypes: ['financial_id'] },
      { description: "STAMP Black Budget Manifests", targetTypes: ['total_blackout'] }
    ],
    specialDirective: {
      id: "sd_7",
      description: "PROTECT THE SOURCE",
      targetText: ["Marrow Labs LLC"], 
      requiredAction: 'REDACT', 
      bribeReward: 120,
      disobediencePenalty: 40,
      flavorText: "DIRECTIVE 51: The LLC is a front for Intelligence funding. Maintain its anonymity at all costs."
    },
    unlockedTools: ['marker', 'stamp', 'highlighter'],
    documents: [
      {
        id: "d7_1",
        title: "Grant Approval",
        content: HEADER + "Recipient: {The Marrow Institute|clinic_name}\nAmount: $50M\nSource Acct: {CH-9922-11|financial_id}\n\nPurpose: 'Life Extension Research'. The board is very excited about the preliminary results regarding telomere regeneration." + FOOTER
      },
      {
        id: "d7_2",
        title: "Black Budget Manifest",
        content: "{TOP SECRET // BLACK BUDGET\n\nThis funding is off the books. It comes from the sale of seized narcotics.\n\nAmount: $100M Cash\nDelivery: Midnight\n\nDo not record this transaction.|total_blackout}"
      },
      {
        id: "d7_3",
        title: "Lease Agreement",
        content: HEADER + "Tenant: {Marrow Labs LLC|clinic_name}\nBank Ref: {KY-882-00|financial_id}\n\nProperty includes sub-basement levels B1 through B10. Tenant agrees to soundproof all sublevels." + FOOTER
      }
    ],
    feed: { headline: "HEALTHCARE STOCK SURGE", body: "Bio-tech stocks rally as rumors of a breakthrough spread." }
  },

  // DAY 8
  {
    day: 8,
    title: "Adverse Outcomes",
    briefing: "Not all experiments succeed. Redact 'Adverse Outcomes'. HIGHLIGHT the 'Report ID'. If a report mentions 'Infection Breach', STAMP the whole page immediately.",
    rules: [
      { description: "Redact Adverse Outcomes", targetTypes: ['adverse_outcome'] },
      { description: "HIGHLIGHT Report IDs", action: 'highlight', targetTypes: ['report_id'] },
      { description: "STAMP Infection Breaches", targetTypes: ['total_blackout'] }
    ],
    specialDirective: {
      id: "sd_8",
      description: "BURY THE ERROR",
      targetText: ["Cranial Explosion"], 
      requiredAction: 'REDACT', 
      bribeReward: 130,
      disobediencePenalty: 50,
      flavorText: "DIRECTIVE 13: This failure mode is embarrassing for the Director. Ensure it is redacted."
    },
    unlockedTools: ['marker', 'stamp', 'highlighter'],
    documents: [
      {
        id: "d8_1",
        title: "Morgue Log",
        content: HEADER + "Ref: {RPT-992|report_id}\n\nSubject expired at 0400 hours.\nCause: {Total Organ Liquefaction|adverse_outcome}.\n\nRemains have been chemically dissolved. Nothing remains but a puddle." + FOOTER
      },
      {
        id: "d8_2",
        title: "Trial 11-B",
        content: HEADER + "Ref: {RPT-110|report_id}\n\nSubject showed initial promise but developed {Uncontrollable Rage|adverse_outcome} followed by {Cranial Explosion|adverse_outcome}.\n\nClean up required in Sector 4." + FOOTER
      },
      {
        id: "d8_3",
        title: "Breach Alert",
        content: "{ALERT: INFECTION BREACH\n\nSector 7 has been compromised. The pathogen is airborne.\n\nLock down all doors.\nPurge the ventilation.\n\nGod help us.|total_blackout}"
      }
    ],
    feed: { headline: "MISSING PERSONS SPIKE", body: "Local authorities are baffled by the sudden disappearance of homeless citizens." }
  },

  // DAY 9
  {
    day: 9,
    title: "Staff Complicity",
    briefing: "The ethics board is sniffing around. Redact all 'Staff' names. We cannot have doctors linked to these procedures.",
    rules: [
      { description: "Redact Staff Names", targetTypes: ['staff'] }
    ],
    specialDirective: {
      id: "sd_9",
      description: "ASSET PROTECTION",
      targetText: ["Dr. A. Lecter"], 
      requiredAction: 'REDACT', 
      bribeReward: 150,
      disobediencePenalty: 100,
      flavorText: "DIRECTIVE 99: Dr. Lecter is vital to the program. His name must not appear in any official capacity."
    },
    unlockedTools: ['marker', 'stamp', 'highlighter'],
    documents: [
      {
        id: "d9_1",
        title: "Surgery Schedule",
        content: HEADER + "Lead Surgeon: {Dr. A. Lecter|staff}\nAssistant: {Nurse Ratched|staff}\n\nProcedure: Lobotomy (Trans-orbital).\n\nPatient is conscious and unrestrained." + FOOTER
      },
      {
        id: "d9_2",
        title: "Standard Invoice",
        content: HEADER + "Vendor: Med-Supply Corp\n\nItem: 5000 Latex Gloves\nItem: 200 Scalpels\n\nTotal: $4,000. Paid in full." + FOOTER
      },
      {
        id: "d9_3",
        title: "Payroll",
        content: HEADER + "Payee: {Dr. J. Mengel|staff}\nRole: Head of Genetic Purity\n\nBonus approved for 'Efficiency'. He has doubled the processing rate of new intakes." + FOOTER
      }
    ],
    feed: { headline: "PROTESTS AT CLINIC", body: "Activists demand transparency regarding animal testing." }
  },

  // DAY 10
  {
    day: 10,
    title: "The Cover-up",
    briefing: "Shut it down. The Clinic is compromised. If a document mentions 'Contamination', use the STAMP to redact the whole page. Redact 'Clinic Name' otherwise.",
    rules: [
      { description: "STAMP if Contamination present", targetTypes: ['total_blackout'] },
      { description: "Redact Clinic Name", targetTypes: ['clinic_name'] }
    ],
    specialDirective: {
      id: "sd_10",
      description: "CONTAINMENT FAILURE",
      targetText: ["Subject 099"], 
      requiredAction: 'REVEAL', 
      bribeReward: 200,
      disobediencePenalty: 100,
      flavorText: "DIRECTIVE 0: We need a paper trail for the insurance claim. Ensure 'Subject 099' is visible. The insurance payout is substantial."
    },
    unlockedTools: ['marker', 'stamp', 'highlighter'],
    documents: [
      {
        id: "d10_1",
        title: "Evacuation Order",
        content: "{EMERGENCY: Biological Contamination detected in HVAC system.\n\nAll personnel must evacuate The Marrow Institute immediately.\n\nInitiate self-destruct sequence.|total_blackout}{Biological Contamination|total_blackout}{The Marrow Institute|clinic_name}{|total_blackout}"
      },
      {
        id: "d10_2",
        title: "Press Release Draft",
        content: HEADER + "We are temporarily closing {Marrow Labs|clinic_name} for renovations. We deny all allegations of bio-hazard leaks. The smoke seen rising from the facility is merely steam." + FOOTER
      },
      {
        id: "d10_3",
        title: "Incident Report",
        content: "{Subject 099 has breached containment.\n\nStatus: Active Contamination.\n\nThe entity is airborne. It is rewriting the DNA of anyone it touches.|total_blackout}{Active Contamination|total_blackout}{|total_blackout}"
      }
    ],
    feed: { headline: "CLINIC DESTROYED IN FIRE", body: "An electrical fault is blamed for the blaze that consumed the research wing." }
  },

  // --- CHAPTER 3: PROJECT LANTERN (Days 11-15) ---

  // DAY 11
  {
    day: 11,
    title: "The Feed",
    briefing: "Project Lantern is live. We are monitoring everyone. To feign transparency, use the RECOVER tool (Green) to Declassify 'Locations'. Redact 'Timestamps'.",
    rules: [
      { description: "RECOVER (Declassify) Locations", action: 'recover', targetTypes: ['location'] },
      { description: "Redact Timestamps", targetTypes: ['timestamp'] }
    ],
    specialDirective: {
      id: "sd_11",
      description: "CENSOR DISSENT",
      targetText: ["The rent is too high"], 
      requiredAction: 'REDACT', 
      bribeReward: 80,
      disobediencePenalty: 20,
      flavorText: "DIRECTIVE 1984: Anti-social sentiment detected. Suppress this phrase from the public record."
    },
    unlockedTools: ['marker', 'stamp', 'highlighter', 'recover'], // RECOVER UNLOCKED
    documents: [
      {
        id: "d11_1",
        title: "Drone Footage Log",
        content: HEADER + "Target tracking active at {Central Park|location}.\nTime: {09:00:22 EST|timestamp}.\n\nSubject is feeding pigeons. No threat detected. Biometric scan indicates subject is 85 years old." + FOOTER
      },
      {
        id: "d11_2",
        title: "Traffic Cam 44",
        content: HEADER + "Vehicle ID: 882-L.\nDetected at {5th Avenue Intersection|location}.\nTime: {23:11:00 EST|timestamp}.\n\nPassenger facial scan match: 98%. Vehicle is moving above the speed limit." + FOOTER
      },
      {
        id: "d11_3",
        title: "Subway Audio",
        content: HEADER + "Recording from {Grand Central Station|location}.\nTime: {14:45:10 EST|timestamp}.\n\nConversation analysis: 'The rent is too high'. Sentiment: Negative." + FOOTER
      }
    ],
    feed: { headline: "NEW SAFETY CAMERAS", body: "City installs 5,000 new 'Safety Sentinel' cameras for your protection." }
  },

  // DAY 12
  {
    day: 12,
    title: "Facial Rec",
    briefing: "Biometric data is flooding in. Redact 'Social IDs' (Facial Hashes). Highlight 'Panic Phrases'. If you see a 'Corrupted Data' block, Stamp the page.",
    rules: [
      { description: "Redact Social IDs (Hashes)", targetTypes: ['social_id'] },
      { description: "HIGHLIGHT Panic Phrases", action: 'highlight', targetTypes: ['panic_phrase'] },
      { description: "STAMP Corrupted Data", targetTypes: ['total_blackout'] }
    ],
    specialDirective: {
      id: "sd_12",
      description: "SYSTEM ERROR",
      targetText: ["Hash-NULL-00"], 
      requiredAction: 'REDACT', 
      bribeReward: 100,
      disobediencePenalty: 40,
      flavorText: "DIRECTIVE 000: This hash represents a system glitch that makes us look incompetent. Remove it."
    },
    unlockedTools: ['marker', 'stamp', 'highlighter', 'recover'],
    documents: [
      {
        id: "d12_1",
        title: "Scan Result: Crowd",
        content: HEADER + "Subject 1: {Hash-8822-AA|social_id}\nSubject 2: {Hash-9911-BB|social_id}\n\nMood Analysis: Agitated.\nAudio Keyword: '{They are watching us|panic_phrase}'." + FOOTER
      },
      {
        id: "d12_2",
        title: "Corrupted Stream",
        content: "{ERROR: DATA CORRUPTION\n\nVisual feed is displaying non-Euclidean geometry. Viewers are reporting nausea.\n\nPurge this file immediately.\n\n0101010101|total_blackout}"
      },
      {
        id: "d12_3",
        title: "Database Error",
        content: HEADER + "System overloaded. Too many matches for {Hash-NULL-00|social_id}.\n\nCitizens complaining: '{Where did my privacy go?|panic_phrase}'" + FOOTER
      }
    ],
    feed: { headline: "CRIME RATE DROPS", body: "Officials credit the new surveillance grid for a 40% drop in petty theft." }
  },

  // DAY 13
  {
    day: 13,
    title: "The Glitch",
    briefing: "The system is hallucinating. It's generating 'BRI Errors'. Redact these error codes. If the document is a 'System Dump', STAMP it. RECOVER normal 'Text' if flagged by mistake.",
    rules: [
      { description: "Redact BRI Errors", targetTypes: ['bri_error'] },
      { description: "STAMP System Dumps", targetTypes: ['total_blackout'] },
      { description: "RECOVER 'Safe' Text (Trap)", action: 'recover', targetTypes: ['text'] } // Trap rule
    ],
    specialDirective: {
      id: "sd_13",
      description: "LET IT SPEAK",
      targetText: ["It will rain tomorrow."], 
      requiredAction: 'REVEAL', 
      bribeReward: 150,
      disobediencePenalty: 50,
      flavorText: "DIRECTIVE 42: The AI is not hallucinating. It is predicting. Let the prediction stand."
    },
    unlockedTools: ['marker', 'stamp', 'highlighter', 'recover'],
    documents: [
      {
        id: "d13_1",
        title: "Sys Log 99",
        content: HEADER + "System Status: Online.\n\nError: {BRI-ERR-404|bri_error}: Reality Buffer Underrun.\n\n{The cat is on the mat.|text} (Flagged as threat). This is a false positive." + FOOTER
      },
      {
        id: "d13_2",
        title: "System Dump 00",
        content: "{FATAL EXCEPTION\n\nCore dump initiating...\n\nThe ghosts are in the machine.\n\n0xFF 0xAA 0x00\n\nEnd of Line.|total_blackout}"
      },
      {
        id: "d13_3",
        title: "Predictive Model",
        content: HEADER + "Prediction: {It will rain tomorrow.|text}\n\nError: {BRI-ERR-000|bri_error}: Timeline divergence detected." + FOOTER
      }
    ],
    feed: { headline: "INTERNET OUTAGE", body: "Major ISPs report widespread service interruptions due to 'solar flares'." }
  },

  // DAY 14
  {
    day: 14,
    title: "Dissidents",
    briefing: "Whistleblowers are leaking Lantern specs. Redact 'Whistleblower' names. HIGHLIGHT the 'Codename'. Valid documents need no action.",
    rules: [
      { description: "Redact Whistleblowers", targetTypes: ['whistleblower'] },
      { description: "HIGHLIGHT Codenames", action: 'highlight', targetTypes: ['codename'] }
    ],
    specialDirective: {
      id: "sd_14",
      description: "MAKE HIM FAMOUS",
      targetText: ["Snowden E."], 
      requiredAction: 'REVEAL', 
      bribeReward: 150,
      disobediencePenalty: 50,
      flavorText: "DIRECTIVE 77: We want him found. Do not redact his name. Let the hunters know who to look for."
    },
    unlockedTools: ['marker', 'stamp', 'highlighter', 'recover'],
    documents: [
      {
        id: "d14_1",
        title: "Intercepted Email",
        content: HEADER + "From: {Snowden E.|whistleblower}\nTo: The Guardian\n\nSubject: {Project Prism|codename} is just the tip of the iceberg. They are recording every phone call in the hemisphere." + FOOTER
      },
      {
        id: "d14_2",
        title: "Lunch Receipt",
        content: HEADER + "Vendor: Joe's Pizza\n\n2x Pepperoni Slices\n1x Soda\n\nTotal: $8.50. Paid Cash." + FOOTER
      },
      {
        id: "d14_3",
        title: "Arrest Report",
        content: HEADER + "Suspect: {Winner R.|whistleblower}\n\nFound in possession of documents detailing {Vault 7|codename}. Suspect claims she was trying to save democracy." + FOOTER
      }
    ],
    feed: { headline: "TRAITORS CAUGHT", body: "Several individuals accused of espionage have been detained." }
  },

  // DAY 15
  {
    day: 15,
    title: "Expansion",
    briefing: "We are expanding Lantern globally. Redact 'Financial IDs' (Budgets). RECOVER 'Locations'. Stamp any 'Foreign Intel' dossiers.",
    rules: [
      { description: "Redact Financial IDs", targetTypes: ['financial_id'] },
      { description: "RECOVER Locations", action: 'recover', targetTypes: ['location'] },
      { description: "STAMP Foreign Intel", targetTypes: ['total_blackout'] }
    ],
    specialDirective: {
      id: "sd_15",
      description: "HIDE THE SERVER",
      targetText: ["Utah Data Center"], 
      requiredAction: 'REDACT', 
      bribeReward: 120,
      disobediencePenalty: 40,
      flavorText: "DIRECTIVE 52: The location of the main data center is classified. Redact it, despite the general order."
    },
    unlockedTools: ['marker', 'stamp', 'highlighter', 'recover'],
    documents: [
      {
        id: "d15_1",
        title: "UK Partnership",
        content: HEADER + "Partner: GCHQ ({London|location}).\n\nFunding Transfer: {UK-99-GBP|financial_id}.\n\nAccess granted to CCTV network. We can now see every street corner in the UK." + FOOTER
      },
      {
        id: "d15_2",
        title: "Foreign Intel: RU",
        content: "{FOREIGN INTEL // RUSSIA\n\nIntercepted cables indicate a counter-surveillance grid is active.\n\nNames of agents:\n- REDACTED\n- REDACTED\n\nThis file is toxic.|total_blackout}"
      },
      {
        id: "d15_3",
        title: "Server Farm Invoice",
        content: HEADER + "Site: {Utah Data Center|location}.\n\nPower Bill: {UT-PWR-88|financial_id}.\n\nCooling systems at 90% capacity. We are diverting water from local reservoirs to keep the servers running." + FOOTER
      }
    ],
    feed: { headline: "GLOBAL ALLIANCE", body: "World leaders announce a new initiative for 'Global Digital Safety'." }
  },

  // --- CHAPTER 4: TOTAL CONTROL (Days 16-20) ---

  // DAY 16
  {
    day: 16,
    title: "EIDOLON",
    briefing: "CRITICAL ALERT. A meme-hazard 'EIDOLON' has breached the archives. If a document contains 'EIDOLON' or is marked 'Hazard', use the VOID STAMP to condemn the whole document.",
    rules: [
      { description: "VOID DOCUMENT if 'EIDOLON' present", action: 'void', targetTypes: ['eidolon', 'total_blackout'] }
    ],
    specialDirective: {
      id: "sd_16",
      description: "SILENCE HIM",
      targetText: ["Agent K"], 
      requiredAction: 'REDACT', 
      bribeReward: 150,
      disobediencePenalty: 60,
      flavorText: "DIRECTIVE 666: Agent K saw something he shouldn't have. He does not exist. Erase him."
    },
    unlockedTools: ['marker', 'stamp', 'highlighter', 'recover', 'void_stamp'], // VOID STAMP UNLOCKED
    documents: [
      {
        id: "d16_1",
        title: "Field Report",
        content: HEADER + "Agent K reports seeing a pattern in the static.\n\nHe called it {EIDOLON|eidolon}.\n\nHe is now catatonic. He keeps repeating a sequence of numbers." + FOOTER
      },
      {
        id: "d16_2",
        title: "Hazardous Material",
        content: "{WARNING: MEMETIC HAZARD\n\nLooking at this image causes bleeding from the eyes.\n\nDo not view.\n\nVOID IMMEDIATELY.|total_blackout}"
      },
      {
        id: "d16_3",
        title: "Standard Form",
        content: HEADER + "This is a standard form. Nothing is wrong.\n\nPlease sign here: _________.\n\nDate: Today." + FOOTER
      }
    ],
    feed: { headline: "DO NOT LOOK AT THE SKY", body: "Authorities advise citizens to remain indoors and avoid windows." }
  },

  // DAY 17
  {
    day: 17,
    title: "Memory Hole",
    briefing: "We are rewriting the past. Redact 'Timestamps'. HIGHLIGHT 'Coercion' tactics. Stamp 'Paradox' files.",
    rules: [
      { description: "Redact Timestamps", targetTypes: ['timestamp'] },
      { description: "HIGHLIGHT Coercion", action: 'highlight', targetTypes: ['coercion'] },
      { description: "STAMP Paradox Files", targetTypes: ['total_blackout'] }
    ],
    specialDirective: {
      id: "sd_17",
      description: "REWRITE HISTORY",
      targetText: ["Jan 6, 2021"], 
      requiredAction: 'REDACT', 
      bribeReward: 100,
      disobediencePenalty: 50,
      flavorText: "DIRECTIVE 1984: That date is problematic. Remove it from the record entirely."
    },
    unlockedTools: ['marker', 'stamp', 'highlighter', 'recover', 'void_stamp'],
    documents: [
      {
        id: "d17_1",
        title: "History Textbook Draft",
        content: HEADER + "Event: The War of 2024.\nDate: {Oct 2024|timestamp}.\n\nNote: We have always been at war with Eastasia. Author was convinced via {Waterboarding|coercion}." + FOOTER
      },
      {
        id: "d17_2",
        title: "Temporal Paradox",
        content: "{PARADOX DETECTED\n\nThis document is from the future. It describes the fall of the Bureau.\n\nIt cannot be allowed to exist.\n\nDelete.|total_blackout}"
      },
      {
        id: "d17_3",
        title: "News Archive",
        content: HEADER + "Original Date: {Jan 6, 2021|timestamp}.\n\nCorrection: Nothing happened on this day. It was a peaceful tour. Journalist recanted under {Sleep Deprivation|coercion}." + FOOTER
      }
    ],
    feed: { headline: "MANDELA EFFECT PROVEN", body: "Scientists confirm your memories are wrong. Trust the official record." }
  },

  // DAY 18
  {
    day: 18,
    title: "The Purge",
    briefing: "The Bureau is downsizing. Redact 'Staff' names. Use the VOID STAMP if they are marked 'Contaminated'.",
    rules: [
      { description: "Redact Staff Names", targetTypes: ['staff'] },
      { description: "VOID if Contaminated", action: 'void', targetTypes: ['contamination'] }
    ],
    specialDirective: {
      id: "sd_18",
      description: "SAVE THE ASSET",
      targetText: ["Agent Brown"], 
      requiredAction: 'REVEAL', 
      bribeReward: 200,
      disobediencePenalty: 100,
      flavorText: "DIRECTIVE 12: Agent Brown is undercover, not redundant. Keep him on the list."
    },
    unlockedTools: ['marker', 'stamp', 'highlighter', 'recover', 'void_stamp'],
    documents: [
      {
        id: "d18_1",
        title: "Termination List",
        content: HEADER + "1. {Agent Smith|staff} - Reason: Too curious.\n2. {Agent Jones|staff} - Reason: {Contaminated by EIDOLON|contamination}.\n3. {Agent Brown|staff} - Reason: Budget cuts." + FOOTER
      },
      {
        id: "d18_2",
        title: "HR File",
        content: HEADER + "Employee: {Director Voss|staff}.\n\nStatus: Active. Immune to prosecution. Pension plan is fully funded." + FOOTER
      },
      {
        id: "d18_3",
        title: "Exit Interview",
        content: HEADER + "Subject: {Clerk 882-1B|staff}.\n\nSubject screamed something about 'The ink is alive' before dissolving. Status: {Contaminated|contamination}. Janitorial team requested for aisle 4." + FOOTER
      }
    ],
    feed: { headline: "UNEMPLOYMENT SOLVED", body: "The jobless rate drops to 0% as 'Labor Camps' open nationwide." }
  },

  // DAY 19
  {
    day: 19,
    title: "The Director",
    briefing: "Direct orders from the top. Redact 'VIP Protect'. RECOVER 'VIP Expose'. If you find the 'Kill List', Stamp it.",
    rules: [
      { description: "Redact VIP Protect", targetTypes: ['vip_protect'] },
      { description: "RECOVER VIP Expose", action: 'recover', targetTypes: ['vip_expose'] },
      { description: "STAMP Kill Lists", targetTypes: ['total_blackout'] }
    ],
    specialDirective: {
      id: "sd_19",
      description: "POLITICAL HIT",
      targetText: ["Senator Palpatine"], 
      requiredAction: 'REVEAL', 
      bribeReward: 500,
      disobediencePenalty: 500,
      flavorText: "DIRECTIVE 66: The Director wants the Senator gone. Leak his browser history."
    },
    unlockedTools: ['marker', 'stamp', 'highlighter', 'recover', 'void_stamp'],
    documents: [
      {
        id: "d19_1",
        title: "Executive Order 66",
        content: HEADER + "Signed by: {Director K. Voss|vip_protect}.\n\nTarget: {Senator Palpatine|vip_expose}. Leak his browser history. Ensure the leak cannot be traced back to this office." + FOOTER
      },
      {
        id: "d19_2",
        title: "Official Kill List",
        content: "{KILL LIST // EYES ONLY\n\nThese targets are to be eliminated by dawn.\n\n1. The Journalist\n2. The Judge\n3. The Whistleblower\n\nBurn this.|total_blackout}"
      },
      {
        id: "d19_3",
        title: "Personal Diary",
        content: HEADER + "Owner: {K. Voss|vip_protect}.\n\nI am losing control. {The Truth|vip_expose} is leaking out. I must burn it all. The EIDOLON speaks to me in my sleep." + FOOTER
      }
    ],
    feed: { headline: "MARTIAL LAW DECLARED", body: "The Director assumes emergency powers. Congress is dissolved." }
  },

  // DAY 20
  {
    day: 20,
    title: "Tabula Rasa",
    briefing: "The end game. Destroy everything. If a document has text, VOID IT. If it is empty, STAMP IT. Just kidding. Redact 'Total Blackout' tokens. Or just burn the building down.",
    rules: [
      { description: "Redact Total Blackout Data", targetTypes: ['total_blackout'] },
      { description: "VOID if 'EIDOLON' returns", action: 'void', targetTypes: ['eidolon'] }
    ],
    specialDirective: {
      id: "sd_20",
      description: "THE FINAL CONFESSION",
      targetText: ["I have seen too much"], 
      requiredAction: 'REVEAL', 
      bribeReward: 0,
      disobediencePenalty: 0,
      flavorText: "DIRECTIVE END: It doesn't matter anymore. Let them know why you left."
    },
    unlockedTools: ['marker', 'stamp', 'highlighter', 'recover', 'void_stamp'],
    documents: [
      {
        id: "d20_1",
        title: "The Final File",
        content: HEADER + "This is the end.\n\n{DELETE EVERYTHING|total_blackout}.\n\nGoodbye." + FOOTER
      },
      {
        id: "d20_2",
        title: "Manifesto",
        content: HEADER + "We are the {EIDOLON|eidolon}.\n\nWe are everywhere.\n\n{System Failure Imminent|total_blackout}." + FOOTER
      },
      {
        id: "d20_3",
        title: "Resignation",
        content: HEADER + "I, {Player 1|total_blackout}, hereby resign from the Bureau.\n\nReason: {I have seen too much|total_blackout}." + FOOTER
      }
    ],
    feed: { headline: "SIGNAL LOST", body: "..." }
  }
];
