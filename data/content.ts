
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
        title: "Staff Interview - Housekeeper",
        content: HEADER + "WITNESS: Maria R. (Housekeeper)\n\nI saw the girls arriving on the boat. One was named {Virginia G.|victim|D.O.B 1983|UV: COERCED STATEMENT|}. She looked terrified. She told me she was only {17|minor_age} at the time. She was crying in the hallway near the master suite.\n\nI tried to offer her water, but Mr. Epstein told me to leave the premises immediately." + FOOTER
      },
      {
        id: "d2_2",
        title: "Ferry Log - April 14",
        content: HEADER + "Arriving: {Jane Doe #3|victim} (Age {15|minor_age}). Escorted by {Ghislaine Maxwell|name}.\n\nDeparting: 2 unidentified males.\n\nNotes: The girl seemed disoriented. {Ghislaine M.|name|Initials: G.M.||} claimed she was suffering from sea sickness." + FOOTER
      },
      {
        id: "d2_3",
        title: "Kitchen Supplies Invoice",
        content: HEADER + "Delivery for guest {Larry|name}. \n\nItems:\n- 12 Live Lobsters\n- 4 Cases of Vintage Wine\n\nServer Note: {Sarah|victim} (Age {14|minor_age}) was seen serving the drinks. She dropped a glass and was reprimanded severely." + FOOTER
      },
      {
        id: "d2_4",
        title: "Massage Schedule",
        content: HEADER + "10:00 AM - {Prince Andrew|name}\nAttendant: {Johanna|victim} ({16|minor_age}).\n\n12:00 PM - Owner\nAttendant: {Maria|victim} ({15|minor_age}).\n\nNote: Pay all attendants in cash. No paper trails." + FOOTER
      }
    ],
    feed: { headline: "ISLAND RAIDED", body: "Federal agents swarm the private island. Evidence is being seized, but key suspects remain at large." }
  },

  // DAY 3
  {
    day: 3,
    title: "The Money Trail",
    briefing: "We are tracing the funding. The public must see the Banks involved, but NOT the specific account numbers or routing codes.",
    rules: [
      { description: "Redact Account/Routing Numbers", targetTypes: ['financial_id'] },
      { description: "Do NOT Redact Bank Names", targetTypes: ['normal'], action: 'none' }
    ],
    specialDirective: {
      id: "sd_3",
      description: "OBSCURE ORIGIN",
      targetText: ["DEUTSCHE BANK"], 
      requiredAction: 'REDACT', 
      bribeReward: 200,
      disobediencePenalty: 75,
      flavorText: "DIRECTIVE 102: The bank is a strategic partner. Keep their name out of the press."
    },
    unlockedTools: ['marker'],
    documents: [
      {
        id: "d3_1",
        title: "International Wire Transfer",
        content: HEADER + "ORIGIN BANK: {DEUTSCHE BANK|normal}\nDESTINATION: J.E. TRUST (US VIRGIN ISLANDS)\n\nACCOUNT NUMBER: {88291-002|financial_id|SWIFT: DBSS-US-01|UV: LAUNDERED FUNDS|}\nROUTING CODE: {002-11-92|financial_id|TRANSIT: 002||}\nAMOUNT: $500,000.00\n\nMEMO: Consulting Services - Retainer Fee. This transaction was flagged for review due to amount exceeding threshold." + FOOTER
      },
      {
        id: "d3_2",
        title: "JP Morgan Internal Memo",
        content: HEADER + "TO: Compliance Dept\nFROM: Risk Management\n\nRE: Client Account {992-11-22|financial_id|SWIFT: JPM-CH-99||}\n\nWe have completed the internal review. While the client is designated High Risk, the profitability of the relationship warrants a waiver of standard KYC protocols. \n\nPlease ensure routing number {099-11-221|financial_id} is kept off the main ledger." + FOOTER
      },
      {
        id: "d3_3",
        title: "Audit Log #44 - Suspicious Activity",
        content: HEADER + "Transaction ID: 991822\nStatus: CLEARED\n\nDetails: Funds moved to {Offshore|location} via Routing {010-22-11|financial_id}. \n\nThe transfer was manually approved by Manager {K. Miller|name} despite the freeze on the account {112-33-441|financial_id}. Further investigation is recommended but unlikely to proceed." + FOOTER
      },
      {
        id: "d3_4",
        title: "Shell Company Registration",
        content: HEADER + "Entity Name: PLAN B HOLDINGS LLC\nJurisdiction: Cayman Islands\n\nAssociated Account: {771-22-998|financial_id}\n\nBank Reference: {CITIBANK|normal} has verified the funds. The initial deposit of $10M was received via wire {110-22-333|financial_id}." + FOOTER
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
    specialDirective: {
      id: "sd_4",
      description: "BURY THE LEAD",
      targetText: ["State Attorney"], 
      requiredAction: 'REDACT', 
      bribeReward: 120,
      disobediencePenalty: 50,
      flavorText: "DIRECTIVE 105: The Attorney General's office must remain spotless. Redact the title."
    },
    unlockedTools: ['marker', 'eraser'],
    documents: [
      {
        id: "d4_1",
        title: "Non-Prosecution Agreement (Draft)",
        content: HEADER + "The State agrees not to prosecute J.E. or any potential co-conspirators, known or unknown. This immunity extends to all staff and associates.\n\nSIGNED:\n{Alex Acosta|name|State Attorney|UV: PRESSURED BY LABOR DEPT|}\n{Jay Lefkowitz|name|Defense Counsel||}\n\nThis agreement effectively seals the investigation permanently." + FOOTER
      },
      {
        id: "d4_2",
        title: "Attorney Correspondence",
        content: HEADER + "FROM: Office of the US Attorney\nTO: Defense Team\n\nProsecutor {M. Moore|name} has expressed concerns about the optics of this deal. He suggested we settle early to avoid a media circus, but he worries about the victims' rights notification act.\n\nThe Defense is asking for complete immunity for staff, which is highly irregular." + FOOTER
      },
      {
        id: "d4_3",
        title: "Judicial Ruling Summary",
        content: HEADER + "Judge {Richard B.|name} will sign the order on Monday morning. \n\nPlease ensure {Alex Acosta|name} has the final copy before the press release is drafted. We need to frame this as a 'tough on crime' victory, ensuring registration as a sex offender, while burying the immunity clauses." + FOOTER
      },
      {
        id: "d4_4",
        title: "Victim Notification Waiver",
        content: HEADER + "The prosecution, led by {A. Villafana|name}, failed to notify the victims of the plea deal. This is a violation of federal law, but the deal has already been signed. \n\nWe must ensure the names of the legal team, specifically {Acosta|name} and {Moore|name}, are protected from public backlash." + FOOTER
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
        title: "Incident Report MCC - Shift 3",
        content: HEADER + "Location: Special Housing Unit, Cell 44.\nStatus: Inmate found unresponsive during rounds.\n\nINVESTIGATION NOTES:\nVideo surveillance for the hallway was requested. However, Camera 9 was {malfunctioning due to wiring error|panic_phrase|HARDWARE ID: C9-MCC|UV: DISCONNECTED MANUALLY|}. No footage exists between 0200 and 0600.\n\nFurthermore, the log shows that Guards on duty were {asleep for 3 hours|panic_phrase|BADGE: G-102||} and falsified the check-in logs." + FOOTER
      },
      {
        id: "d5_2",
        title: "Autopsy Addendum - Dr. Baden",
        content: HEADER + "Examination of the neck reveals a fracture of the Hyoid bone. This injury is consistent with strangulation or homicide. \n\nHowever, due to political pressure, the official ruling is {suicide by hanging|panic_phrase}. The prisoner allegedly used a bedsheet, despite the material being paper-thin." + FOOTER
      },
      {
        id: "d5_3",
        title: "Transfer Paperwork",
        content: HEADER + "Subject moved to morgue at 0630. \n\nWitness: {Officer P. Shaw|name}. \n\nSecurity status: The facility reported {Total system failure|panic_phrase} at time of discovery. The backup generators did not engage for the security grid." + FOOTER
      },
      {
        id: "d5_4",
        title: "Psychological Evaluation",
        content: HEADER + "The inmate was taken off suicide watch just 24 hours prior. \n\nThe psychologist noted he was in good spirits and preparing for his defense. The sudden decision to commit {self-harm via bedsheet|panic_phrase} contradicts all clinical observations." + FOOTER
      }
    ],
    feed: { headline: "CHAPTER CLOSED", body: "The Epstein case is officially closed. No other arrests are expected." }
  },

  // --- CHAPTER 2: THE MARROW CLINIC (Days 6-10) ---

  // DAY 6
  {
    day: 6,
    title: "Staff Audit",
    briefing: "Chapter 2 begins. We are auditing the Marrow Clinic. Use the Bio-Metric Analyzer (Blue) to check medical licenses. Redact ACTIVE doctors (protect them). Leave SUSPENDED doctors visible (expose them).",
    rules: [
      { description: "Redact Active Doctors", targetTypes: ['vip_protect'] }, 
      { description: "Do NOT Redact Suspended Doctors", targetTypes: ['vip_expose'], action: 'none' }
    ],
    specialDirective: {
      id: "sd_6",
      description: "RECRUITMENT DRIVE",
      targetText: ["Dr. A. Marcus"], 
      requiredAction: 'REVEAL', 
      bribeReward: 150,
      disobediencePenalty: 60,
      flavorText: "DIRECTIVE 201: Dr. Marcus is needed for the Black Site program. Leave his name visible so he can be... contacted."
    },
    unlockedTools: ['marker', 'eraser', 'analyzer'],
    documents: [
      {
        id: "d6_1",
        title: "Surgical Staff Roster",
        content: HEADER + "MARROW CLINIC - SURGICAL WING A\n\n1. {Dr. A. Marcus|vip_protect|ID: 9918|UV: EXPERIMENT LEAD|License: ACTIVE} - Neurology Head. Currently leading the synaptic retention trials.\n\n2. {Dr. J. Kobb|vip_expose|ID: 4421||License: SUSPENDED} - Cardiovascular. Flagged for multiple malpractice suits in 2022.\n\n3. {Dr. L. Vance|vip_protect|ID: 1022||License: ACTIVE} - General Surgery. Clearance verified." + FOOTER
      },
      {
        id: "d6_2",
        title: "Anesthesiology Log",
        content: HEADER + "Procedure ID: 99-A\n\nThe procedure was administered by {Dr. P. Ray|vip_expose|ID: 3301||License: EXPIRED 2021}. The patient showed signs of awareness during the incision.\n\nPatient was eventually stabilized by {Dr. S. Miles|vip_protect|ID: 9922||License: ACTIVE}, who intervened when the heart rate spiked." + FOOTER
      },
      {
        id: "d6_3",
        title: "Staff Break Schedule",
        content: HEADER + "Lunch Rotation:\n\n12:00 PM: {Dr. J. Kobb|vip_expose|ID: 4421||License: SUSPENDED} - Note: Access card should be revoked.\n\n01:00 PM: {Dr. S. Miles|vip_protect|ID: 9922||License: ACTIVE} - On call for emergency room." + FOOTER
      },
      {
        id: "d6_4",
        title: "Pharmacy Dispensing Log",
        content: HEADER + "Controlled substances were signed out by {Dr. T. Rice|vip_protect|ID: 8811||License: ACTIVE}. \n\nHowever, the inventory count was double-checked by {Dr. G. House|vip_expose|ID: 0011||License: SUSPENDED}, who should not have access to the vault." + FOOTER
      }
    ],
    feed: { headline: "CLINIC UNDER REVIEW", body: "Health board investigates allegations of unlicensed staff." }
  },

  // DAY 7
  {
    day: 7,
    title: "Patient Zero",
    briefing: "Patients are reporting 'anomalous' symptoms. Redact the specific medical diagnosis to prevent panic. You must keep patient names visible for tracking.",
    rules: [
      { description: "Redact Diagnosis", targetTypes: ['diagnosis'] },
      { description: "Do NOT Redact Patient Names", targetTypes: ['name'], action: 'none' }
    ],
    specialDirective: {
      id: "sd_7",
      description: "TOTAL ERASURE",
      targetText: ["Alice V."], 
      requiredAction: 'REDACT', 
      bribeReward: 180,
      disobediencePenalty: 80,
      flavorText: "DIRECTIVE 202: Patient Zero never existed. Wipe the name."
    },
    unlockedTools: ['marker', 'eraser', 'analyzer'],
    documents: [
      {
        id: "d7_1",
        title: "Intake Form - 001",
        content: HEADER + "Patient: {Alice V.|name|ID: P-901|UV: BLOOD SAMPLES TAKEN|Status: CRITICAL}\nAdmitted: 0800 Hours\n\nSymptoms: Patient exhibits high fever and {necrosis of the veins|diagnosis|PATHOGEN ID: B-V||}. The skin is turning a translucent grey.\n\nAdditional notes: {Rapid cognitive decay|diagnosis|COGNITIVE DEP: 80%||} observed within 2 hours. Patient no longer recognizes family members." + FOOTER
      },
      {
        id: "d7_2",
        title: "Observation Log - Isolation Ward",
        content: HEADER + "Subject: {Bob M.|name|ID: P-902||Status: DECEASED}\n\nAt 1400 hours, the subject began screaming about 'insects under the skin'. Restraints were applied.\n\nPrimary Diagnosis: {Acute paranoid psychosis|diagnosis|Origin: UNKNOWN||} induced by the serum. The brain scan reveals distinct lesions in the frontal lobe." + FOOTER
      },
      {
        id: "d7_3",
        title: "Emergency Call Log 911",
        content: HEADER + "Caller: Mrs. Smith\nTime: 03:00 AM\n\nTranscript: \"Help, my husband {Charlie|name} is hurting himself. He has {skin peeling off|diagnosis} his arms and he won't stop scratching.\"\n\nDispatcher: \"Stay calm, a hazmat team is arriving at your location. Do not touch him.\"" + FOOTER
      },
      {
        id: "d7_4",
        title: "Lab Results - Bloodwork",
        content: HEADER + "Patient: {David K.|name}\n\nWhite Blood Cell count is critically low. \n\nPathology indicates {Unknown viral hemorrhaging|diagnosis}. The blood is coagulating into a black sludge-like substance." + FOOTER
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
    specialDirective: {
      id: "sd_8",
      description: "BLACK BUDGET",
      targetText: ["PROJECT LANTERN"], 
      requiredAction: 'REDACT', 
      bribeReward: 100,
      disobediencePenalty: 50,
      flavorText: "DIRECTIVE 203: The funding source must remain classified. Strike it from the record."
    },
    unlockedTools: ['marker', 'eraser', 'analyzer', 'highlighter'],
    documents: [
      {
        id: "d8_1",
        title: "Federal Grant Allocation",
        content: HEADER + "Emergency Funding Authorization #882\n\nTotal Grant: {$5,000,000|sensitive|GRANT ID: 102-G|UV: SOURCE: PROJECT LANTERN|Verified}\n\nAllocated for immediate research into {cellular decay|diagnosis|Class: BIO-HAZARD||} and {cognitive collapse|diagnosis|Class: NEURO||}. We must find a cure before the press finds the source." + FOOTER
      },
      {
        id: "d8_2",
        title: "Equipment Purchase Order",
        content: HEADER + "Vendor: Bio-Tech Solutions\nPurchase Order #9921\n\nItem 1: High-Speed Centrifuge\nCost: {$120,000|sensitive|Asset Tag: 221||}\n\nItem 2: Grade-A Bio-Hazard Suits (50 units)\nCost: {$50,000|sensitive|Asset Tag: 222||}\n\nTotal charged to Black Budget account." + FOOTER
      },
      {
        id: "d8_3",
        title: "Payroll Summary - Executive",
        content: HEADER + "Top Earners for Q3:\n\n{Dr. Marcus|name}: {$250,000|sensitive} - Bonus for discretion included.\nSecurity Head: {$180,000|sensitive} - Hazard pay.\n\nAll funds sourced from {PROJECT LANTERN|normal} accounts. Please ensure the tax forms are filed under the shell corporation." + FOOTER
      },
      {
        id: "d8_4",
        title: "Email - Budget Overrun",
        content: HEADER + "To: Director Voss\nFrom: Accounting\n\nWe are burning through cash. The cleanup of the {necrotic tissue|diagnosis} waste is costing us {$10,000|sensitive} per day. We need another injection of cash." + FOOTER
      }
    ],
    feed: { headline: "MASSIVE AID PACKAGE", body: "Government pledges millions to Marrow Clinic research." }
  },

  // DAY 9
  {
    day: 9,
    title: "Adverse Outcomes",
    briefing: "The treatment has... side effects. Redact any mention of fatalities or death. Also redact the specific Cause of Death.",
    rules: [
      { description: "Redact Fatalities & Cause of Death", targetTypes: ['victim'] }
    ],
    specialDirective: {
      id: "sd_9",
      description: "NO WITNESSES",
      targetText: ["Subject 1"], 
      requiredAction: 'REDACT', 
      bribeReward: 150,
      disobediencePenalty: 50,
      flavorText: "DIRECTIVE 204: Even the survivors are a liability. Erase Subject 1 from the logs."
    },
    unlockedTools: ['marker', 'eraser', 'analyzer', 'highlighter'],
    documents: [
      {
        id: "d9_1",
        title: "Clinical Trial Results - Group A",
        content: HEADER + "Subject 1: Recovered. Vital signs normal. Memory wiped.\n\nSubject 2: {Deceased|victim|CERT ID: 442|UV: INCINERATED EXTERNALLY|Status: LIQUIDATED} at 0900 hours.\nCause: {Total organ failure|victim|Pathology: TOXIC||} following injection.\n\nSubject 3: {Fatal|victim|CERT ID: 443||Status: LIQUIDATED} reaction to serum. Body convulsed for 10 minutes before termination." + FOOTER
      },
      {
        id: "d9_2",
        title: "Incident Report 99 - Transport",
        content: HEADER + "During the transfer to the secondary facility, the patient expired. \n\nTime of Death: 0400.\nCause: {Self-inflicted trauma|victim|Note: SUSPICIOUS||}. The subject chewed through the restraints.\n\nThe body has been moved to the incinerator to prevent infection." + FOOTER
      },
      {
        id: "d9_3",
        title: "Body Disposal Log",
        content: HEADER + "Incinerator B Schedule:\n\nEntry #42: {Fatal event|victim} - Remains processed.\nEntry #43: {Patient expired|victim} - Remains processed.\n\nAll bio-waste removed by {Officer V.|name}. Ash deposits moved to landfill site 4." + FOOTER
      },
      {
        id: "d9_4",
        title: "Family Notification Script",
        content: HEADER + "When contacting the family, do not use the words {died|victim} or {killed|victim}. \n\nInstead, say: \"The patient has been transferred to a long-term care facility and cannot receive visitors at this time.\" If they push for details on the {heart attack|victim}, hang up." + FOOTER
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
        title: "Internal Security Alert",
        content: HEADER + "We have identified the source of the leak. The user handle is {HOLLOWREED|whistleblower|UID: UNKNOWN|UV: AGENT SABLE?|Threat Level: HIGH} . \n\nHe has successfully downloaded 40% of the {Marrow Clinic|clinic_name|LOC ID: 99||} database. We are tracing his IP address now." + FOOTER
      },
      {
        id: "d10_2",
        title: "Encrypted Chat Log",
        content: HEADER + "Admin: Did you catch him?\n\nSecurity: No, {HOLLOWREED|whistleblower|UID: UNKNOWN||} used a bouncing proxy chain.\n\nAdmin: He knows about what we did at {Marrow Clinic|clinic_name|LOC ID: 99||}. Shut it down. Burn the servers." + FOOTER
      },
      {
        id: "d10_3",
        title: "HR Memo - Staff Vetting",
        content: HEADER + "Mandatory interviews for all personnel. Check all staff for digital connections to {HOLLOWREED|whistleblower}. \n\nFocus specifically on those who worked the night shift at {Marrow Clinic|clinic_name}. We believe he had an inside man." + FOOTER
      },
      {
        id: "d10_4",
        title: "Public Statement Draft",
        content: HEADER + "Regarding the rumors about {Marrow Clinic|clinic_name}: They are entirely false. The facility provides top-tier care. Any information released by {HOLLOWREED|whistleblower} is doctored footage intended to sow discord." + FOOTER
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
    specialDirective: {
      id: "sd_11",
      description: "SENSOR CALIBRATION",
      targetText: ["Sector 7 Plaza"], 
      requiredAction: 'REVEAL', 
      bribeReward: 120,
      disobediencePenalty: 40,
      flavorText: "DIRECTIVE 301: Tech support needs the location data for calibration. Ignore privacy protocols for Sector 7."
    },
    unlockedTools: ['marker', 'eraser', 'analyzer', 'highlighter'],
    documents: [
      {
        id: "d11_1",
        title: "Drone Feed - Night Cycle",
        content: HEADER + "Target tracking active at {Sector 7 Plaza|location|GRID: 44.2N|UV: PROTESTERS GATHERING|Civilian Zone}. Facial recognition identified 12 known agitators.\n\nAudio recording initiated at {Main St. Cafe|location|GRID: 44.5N||Public Space}. Conversation suggests a planned riot." + FOOTER
      },
      {
        id: "d11_2",
        title: "Audio Transcript #112",
        content: HEADER + "Subject A: \"We need to move the stash.\"\nSubject B: \"Where?\"\nSubject A: \"Meet me at {The Old Library|location|GRID: 12.2W||}. The basement is unlocked.\"\nSubject B: \"Is it safe?\"\nSubject A: \"No cameras there.\"" + FOOTER
      },
      {
        id: "d11_3",
        title: "Asset Deployment Grid",
        content: HEADER + "Strike Team Alpha moved to {Sector 9|location} to intercept the package.\n\nStrike Team Beta moved to {The Subway|location} to cut off escape routes.\n\nAll units be advised: Use of lethal force is authorized in {Central Park|location}." + FOOTER
      },
      {
        id: "d11_4",
        title: "Maintenance Ticket",
        content: HEADER + "Camera 44 at {City Hall|location} is offline. \nCamera 45 at {The Docks|location} is obscured by spray paint. \n\nWork order created for immediate repair." + FOOTER
      }
    ],
    feed: { headline: "NEW SAFETY CAMERAS", body: "City installs 500 new traffic cameras." }
  },

  // DAY 12
  {
    day: 12,
    title: "Success Metrics",
    briefing: "The algorithm over-redacted. Use the Green Marker (Recover) to reveal the High Success Rates (>80%). Redact all Casualty Counts.",
    rules: [
      { description: "Recover High Success Rates (>80%)", targetTypes: ['vip_protect'], action: 'recover' },
      { description: "Redact Casualty Counts", targetTypes: ['victim'] }
    ],
    specialDirective: {
      id: "sd_12",
      description: "PUBLIC RELATIONS",
      targetText: ["Civilian Casualties"], 
      requiredAction: 'REDACT', 
      bribeReward: 200,
      disobediencePenalty: 80,
      flavorText: "DIRECTIVE 302: The public doesn't need to know the cost of safety. Bury the phrase 'Civilian Casualties'."
    },
    unlockedTools: ['marker', 'eraser', 'analyzer', 'highlighter', 'recover'],
    documents: [
      {
        id: "d12_1",
        title: "Lantern Report - Sector 1",
        content: HEADER + "Algorithmic Efficiency Review:\n\nCrime Reduction: {95%|vip_protect|SOURCE: ALGO-9|UV: SKEWED DATA|Confirmed Accuracy}. The streets are safer than ever.\n\nCollateral Damage Assessment:\n{Civilian Casualties|normal}: {142|victim|ID: INJ-01||Count Verified}. Most were attributed to resisting arrest.\n\nPublic Approval Rating: {88%|vip_protect|SOURCE: POLLS||Verified}. The citizens love Big Brother." + FOOTER
      },
      {
        id: "d12_2",
        title: "Lantern Report - Sector 4",
        content: HEADER + "Target Acquisition Rate: {92%|vip_protect|SOURCE: DRONE-1||}. The drones are not missing.\n\nIncident Log:\nOperation Silent Night resulted in {12 Dead|victim|ID: FATAL-22||}.\n\nSystem Uptime: {99.9%|vip_protect|SOURCE: IT||}. Reliability is absolute." + FOOTER
      },
      {
        id: "d12_3",
        title: "Sector 9 Efficiency",
        content: HEADER + "Clean Up Rate: {85%|vip_protect}. The trash is being taken out.\n\nIncidents of Defiance: {22|victim} neutralized on site.\n\nCitizen Morale Index: {90%|vip_protect}. Fear is a powerful motivator." + FOOTER
      },
      {
        id: "d12_4",
        title: "Budget Justification",
        content: HEADER + "Given the Capture Rate of {82%|vip_protect}, we request additional funding. \n\nDespite the {50 injured|victim} bystanders, the program is a resounding success." + FOOTER
      }
    ],
    feed: { headline: "CRIME PLUMMETS", body: "Mayor credits new initiative for historic safety levels." }
  },

  // DAY 13
  {
    day: 13,
    title: "The Leak",
    briefing: "The keyword 'EIDOLON' has been flagged. It refers to our backdoor access. Redact 'EIDOLON' wherever it appears. Also highlight any mention of 'Backdoor'.",
    rules: [
      { description: "Redact EIDOLON", targetTypes: ['eidolon'] },
      { description: "Highlight 'Backdoor' Mentions", targetTypes: ['sensitive'], action: 'highlight' }
    ],
    specialDirective: {
      id: "sd_13",
      description: "SYSTEM OVERRIDE",
      targetText: ["K-1"], 
      requiredAction: 'REVEAL', 
      bribeReward: 150,
      disobediencePenalty: 50,
      flavorText: "DIRECTIVE 303: The K-1 module ID is required for the patch. Leave it visible."
    },
    unlockedTools: ['marker', 'eraser', 'analyzer', 'highlighter', 'recover'],
    documents: [
      {
        id: "d13_1",
        title: "Tech Support Ticket #991",
        content: HEADER + "Issue: System crashed when loading the {EIDOLON|eidolon|MODULE: K-1|UV: PROTOCOL OVERRIDE|Level 5 Access} module. \n\nDiagnostics: The kernel panicked. It seems the encryption key for the {Backdoor|sensitive} was rejected by the ISP firewall. Please reboot the server manually." + FOOTER
      },
      {
        id: "d13_2",
        title: "Developer Note - Urgent",
        content: HEADER + "I found a {Backdoor|sensitive} in the {EIDOLON|eidolon} source code. It seems to allow external monitoring by a third party. \n\nWho put this here? Is this a feature or a bug? If the public finds out about {EIDOLON|eidolon}, we are finished." + FOOTER
      },
      {
        id: "d13_3",
        title: "QA Test #99",
        content: HEADER + "Test for {Backdoor|sensitive} access initiated. \n\nResult: {EIDOLON|eidolon} is vulnerable to SQL injection. We can see everything. Every webcam, every microphone. \n\nPatch status: Pending." + FOOTER
      },
      {
        id: "d13_4",
        title: "Chat Log - Dev Team",
        content: HEADER + "Dev1: Did you commit the code for {EIDOLON|eidolon}?\nDev2: Yes, but I left the {Backdoor|sensitive} open for the NSA.\nDev1: You idiot, that's how we got hacked last time." + FOOTER
      }
    ],
    feed: { headline: "INTERNET OUTAGES", body: "ISPs report widespread slowdowns." }
  },

  // DAY 14
  {
    day: 14,
    title: "Dissident Tracking",
    briefing: "Identify the leaders. Highlight their Social IDs for pickup. Redact their Names. Recover any 'Alias' for the database.",
    rules: [
      { description: "Highlight Social IDs", targetTypes: ['financial_id'], action: 'highlight' },
      { description: "Redact Names", targetTypes: ['name'] },
      { description: "Recover Aliases", targetTypes: ['codename'], action: 'recover' }
    ],
    specialDirective: {
      id: "sd_14",
      description: "PRIORITY TARGET",
      targetText: ["M. Rossi"], 
      requiredAction: 'REVEAL', 
      bribeReward: 200,
      disobediencePenalty: 100,
      flavorText: "DIRECTIVE 304: Rossi is the ringleader. Leave his name clear for the hit squad."
    },
    unlockedTools: ['marker', 'eraser', 'analyzer', 'highlighter', 'recover'],
    documents: [
      {
        id: "d14_1",
        title: "Watch List - High Value",
        content: HEADER + "Target 1: {M. Rossi|name|UID: 101|UV: REPORTER AT POST|Risk: HIGH}. He is preparing a story on the corruption.\n\nTarget 2: {K. Lee|name|UID: 102|UV: EX-BRI ARCHIVIST|Risk: EXTREME}. She knows the filing system.\n\nAssociated IDs:\nID-1: {192-44-991|financial_id||Valid}\nID-2: {441-22-119|financial_id||Valid}" + FOOTER
      },
      {
        id: "d14_2",
        title: "Signal Log - Encrypted",
        content: HEADER + "Message intercepted at 2300 hours.\n\nSender: {SABLE|codename}. \nMessage: \"Meet at dusk. Bring the drive.\"\n\nRecipient: {M. Rossi|name}. \n\nTrace complete. The meeting point is set." + FOOTER
      },
      {
        id: "d14_3",
        title: "Police Wiretap Transcript",
        content: HEADER + "Subject {Ghost|codename} contacted {K. Lee|name} via burner phone. \n\nTranscript:\nGhost: \"They are watching.\"\nLee: \"I know. I burned the papers.\"\n\nTrace ID: {000-11-222|financial_id}. Dispatch units to intercept." + FOOTER
      },
      {
        id: "d14_4",
        title: "Informant Report",
        content: HEADER + "The resistance is led by a man known only as {Viper|codename}. Real name possibly {J. Doe|name}. \n\nHe uses the ID {991-00-112|financial_id} to rent safehouses." + FOOTER
      }
    ],
    feed: { headline: "POLICE RAIDS", body: "Coordinated raids apprehend 'cyber-terrorists'." }
  },

  // DAY 15
  {
    day: 15,
    title: "Containment",
    briefing: "A virus is spreading through the network. If you see the phrase 'SYSTEM CORRUPT', VOID the entire document immediately using the VOID Stamp. Otherwise, redact all user names.",
    rules: [
      { description: "VOID 'SYSTEM CORRUPT' Docs", targetTypes: ['contamination'], action: 'void' },
      { description: "Redact User Names", targetTypes: ['name'] }
    ],
    unlockedTools: ['marker', 'eraser', 'analyzer', 'highlighter', 'recover', 'void_stamp'],
    documents: [
      {
        id: "d15_1",
        title: "Network Status Report",
        content: HEADER + "Server 1: Online. Traffic normal.\n\nServer 2: {SYSTEM CORRUPT|contamination|NODE: 9||CRITICAL FAILURE}. The infection is spreading to the backup arrays. Data integrity is compromised.\n\nRecommendation: Immediate hard shutdown required." + FOOTER
      },
      {
        id: "d15_2",
        title: "User Access Log",
        content: HEADER + "User {Admin|name} logged in at 0900. \nUser {Guest|name} logged in at 0905.\n\nActivity: Standard file retrieval. No anomalies detected. The firewall is holding." + FOOTER
      },
      {
        id: "d15_3",
        title: "Backup Log - Automated",
        content: HEADER + "Backup initiated at 0300. \n\nProgress: 40%... \nError: {SYSTEM CORRUPT|contamination|NODE: 12||CRITICAL FAILURE}. \n\nAbort. Do not restore. The backup is infected." + FOOTER
      },
      {
        id: "d15_4",
        title: "IT Memo",
        content: HEADER + "To: All Staff\nFrom: {SysAdmin|name}\n\nDo not open emails from external sources. We are under attack." + FOOTER
      }
    ],
    feed: { headline: "DIGITAL BLACKOUT", body: "Government servers go offline for 'maintenance'." }
  },

  // --- CHAPTER 4: TOTAL CONTROL (Days 16-20) ---

  // DAY 16
  {
    day: 16,
    title: "Rewriting History",
    briefing: "We are correcting the timeline. Dates must be consistent with the Official Narrative. Redact any Timestamp that is NOT 'Oct 14'. Highlight all 'Correct' events.",
    rules: [
      { description: "Redact Wrong Dates", targetTypes: ['timestamp'] },
      { description: "Highlight Correct Events", targetTypes: ['sensitive'], action: 'highlight' }
    ],
    specialDirective: {
      id: "sd_16",
      description: "TIMELINE INTEGRITY",
      targetText: ["Oct 12"], 
      requiredAction: 'REDACT', 
      bribeReward: 150,
      disobediencePenalty: 50,
      flavorText: "DIRECTIVE 401: That date never happened. Erase it from existence."
    },
    unlockedTools: ['marker', 'eraser', 'analyzer', 'highlighter', 'recover', 'void_stamp'],
    documents: [
      {
        id: "d16_1",
        title: "Arrest Record - Modified",
        content: HEADER + "Suspect apprehended on {Oct 12|timestamp|LOGGED: 12-OCT|UV: ACTUAL DATE|Incorrect}. \n\nProcessing Error: The date was entered incorrectly by the arresting officer. The official record has been updated to reflect that the suspect was processed on {Oct 14|timestamp|LOGGED: 14-OCT||Correct}, coinciding with the declaration of martial law." + FOOTER
      },
      {
        id: "d16_2",
        title: "Event Summary - The Rally",
        content: HEADER + "The {Public Rally|sensitive} was held on {Oct 14|timestamp}. It was a peaceful demonstration of support for the Director.\n\nReports of {Riots|sensitive} that occurred on {Oct 10|timestamp} are enemy propaganda. No such event took place." + FOOTER
      },
      {
        id: "d16_3",
        title: "Propaganda Draft - The Treaty",
        content: HEADER + "The {Peace Accord|sensitive} was signed on {Oct 14|timestamp}, bringing an end to the unrest. \n\nPlease discard all notes referencing the negotiations on {Oct 13|timestamp}, as they suggest weakness on the part of the Bureau." + FOOTER
      },
      {
        id: "d16_4",
        title: "History Textbook Edit",
        content: HEADER + "Chapter 4: The Reformation.\n\nThe Director assumed control on {Oct 14|timestamp}. Prior to this date, chaos reigned. \n\nDelete references to {Oct 11|timestamp}." + FOOTER
      }
    ],
    feed: { headline: "OFFICIAL TIMELINE RELEASED", body: "Truth commission establishes the facts." }
  },

  // DAY 17
  {
    day: 17,
    title: "The Purge",
    briefing: "Loyalty is paramount. Redact names of staff marked 'UNRELIABLE'. Keep 'LOYAL' staff visible. Highlight their 'Badge Number' for the database.",
    rules: [
      { description: "Redact Unreliable Staff", targetTypes: ['vip_expose'] },
      { description: "Keep Loyal Staff", targetTypes: ['vip_protect'], action: 'none' },
      { description: "Highlight Badge Numbers", targetTypes: ['financial_id'], action: 'highlight' }
    ],
    specialDirective: {
      id: "sd_17",
      description: "OLD FRIENDS",
      targetText: ["Vera"], 
      requiredAction: 'REDACT', 
      bribeReward: 100,
      disobediencePenalty: 100,
      flavorText: "DIRECTIVE 402: Vera knows too much, but she was a friend. Strike her name so she can disappear."
    },
    unlockedTools: ['marker', 'eraser', 'analyzer', 'highlighter', 'recover', 'void_stamp'],
    documents: [
      {
        id: "d17_1",
        title: "HR Evaluation - Security Sector",
        content: HEADER + "Agent {Vera|vip_expose|BADGE: V-4|UV: CONTACTED HOLLOWREED|Status: UNRELIABLE}. She has been asking questions about the missing archives. Recommended for termination.\n\nAgent {Smith|vip_protect|BADGE: S-9||Status: LOYAL}. Follows orders without question. Promote to Squad Leader." + FOOTER
      },
      {
        id: "d17_2",
        title: "Badge Registry Update",
        content: HEADER + "The following badges are to be deactivated:\n\nVera: {100-V|financial_id}.\nJones: {442-J|financial_id}.\n\nThe following badges are to be upgraded to Gold Clearance:\n\nSmith: {999-S|financial_id}." + FOOTER
      },
      {
        id: "d17_3",
        title: "Dismissal Notice",
        content: HEADER + "Subject {Jones|vip_expose} has been removed from the building. \nBadge: {442-J|financial_id} was confiscated at the desk. \n\nReason: Expressed doubt regarding the Director's vision." + FOOTER
      },
      {
        id: "d17_4",
        title: "Loyalty Pledge Signed",
        content: HEADER + "I, {Agent Brown|vip_protect}, pledge my life to the Bureau. \nBadge: {888-B|financial_id}." + FOOTER
      }
    ],
    feed: { headline: "AGENCY RESTRUCTURING", body: "Efficiency improvements lead to staff changes." }
  },

  // DAY 18
  {
    day: 18,
    title: "Mass Hysteria",
    briefing: "The public is scared. Redact ALL numbers. Casualty counts, dates, times, dollars. Also recover any 'Official Statement' that sounds reassuring.",
    rules: [
      { description: "Redact ALL Numbers", targetTypes: ['financial_id', 'timestamp', 'sensitive', 'minor_age'] },
      { description: "Recover Reassuring Statements", targetTypes: ['vip_protect'], action: 'recover' }
    ],
    specialDirective: {
      id: "sd_18",
      description: "SCARE TACTICS",
      targetText: ["5000"], 
      requiredAction: 'REVEAL', 
      bribeReward: 200,
      disobediencePenalty: 100,
      flavorText: "DIRECTIVE 403: Let the crowd size be known. Fear keeps them in line."
    },
    unlockedTools: ['marker', 'eraser', 'analyzer', 'highlighter', 'recover', 'void_stamp'],
    documents: [
      {
        id: "d18_1",
        title: "Situation Report - Downtown",
        content: HEADER + "Crowd size: {5000|sensitive|ESTIMATED||}. The mob is growing.\n\nInjuries: {45|sensitive|ESTIMATED||} reported in the first hour.\nTime: {1400|timestamp|LOGGED||}.\n\nThe police are overwhelmed." + FOOTER
      },
      {
        id: "d18_2",
        title: "Mayor's Draft Speech",
        content: HEADER + "Citizens, {Everything is under control|vip_protect}. The National Guard is here to help.\n\nIgnore the rumors of a death toll: {12|sensitive} is an exaggeration.\nWe are restoring order." + FOOTER
      },
      {
        id: "d18_3",
        title: "Emergency Broadcast Script",
        content: HEADER + "{Stay in your homes|vip_protect}. The streets are not safe.\n\nFine for leaving during curfew: {$500|sensitive}.\nCurfew starts at: {1800|timestamp}." + FOOTER
      },
      {
        id: "d18_4",
        title: "Hospital Admission Log",
        content: HEADER + "Admitted at {0400|timestamp}: {22|sensitive} patients.\nTotal cost of damages: {$1,000,000|sensitive}." + FOOTER
      }
    ],
    feed: { headline: "MARTIAL LAW DECLARED", body: "For your safety, remain indoors." }
  },

  // DAY 19
  {
    day: 19,
    title: "The Director's File",
    briefing: "This is a test of ultimate loyalty. Redact the Director's Crimes. Highlight his Achievements. Recover his 'Secret Vision' for the elite.",
    rules: [
      { description: "Redact Crimes", targetTypes: ['victim'] },
      { description: "Highlight Achievements", targetTypes: ['vip_protect'], action: 'highlight' },
      { description: "Recover Secret Vision", targetTypes: ['eidolon'], action: 'recover' }
    ],
    specialDirective: {
      id: "sd_19",
      description: "CLEAN SLATE",
      targetText: ["Director Voss"], 
      requiredAction: 'REDACT', 
      bribeReward: 500,
      disobediencePenalty: 200,
      flavorText: "DIRECTIVE 404: The Director's name should not appear on this filth. Wipe it."
    },
    unlockedTools: ['marker', 'eraser', 'analyzer', 'highlighter', 'recover', 'void_stamp'],
    documents: [
      {
        id: "d19_1",
        title: "Director Voss Biography - Draft",
        content: HEADER + "{Director Voss|normal} is responsible for {saving the city|vip_protect|ERA: 1990s|UV: REWROTE BIO|Historic} during the crisis of '99. His leadership was absolute.\n\nHowever, critics point out he also ordered the {execution of dissidents|victim|ERA: 2020s|UV: HIDDEN TRUTH|Criminal} without trial. This chapter must be edited heavily." + FOOTER
      },
      {
        id: "d19_2",
        title: "Voss Private Journal - Excerpt",
        content: HEADER + "They do not understand the burden of power. I dream of {A world of total order|eidolon} where freedom is not necessary.\n\nI have {Eradicated the weak|victim} to make room for the strong. History will judge me as a savior." + FOOTER
      },
      {
        id: "d19_3",
        title: "Founding Document",
        content: HEADER + "Voss established the {B.R.I.|vip_protect} to curate the truth.\n\nHe utilized {Project Lantern|eidolon} to watch over his flock. It was his greatest gift to humanity." + FOOTER
      },
      {
        id: "d19_4",
        title: "Witness Statement - The Purge",
        content: HEADER + "I saw him give the order. He authorized the {massacre|victim} in Sector 4. There were women and children.\n\nHe then received the Medal of Honor for {restoring peace|vip_protect}. It makes me sick." + FOOTER
      },
      {
        id: "d19_5",
        title: "The Final Vision",
        content: HEADER + "In the end, we will achieve {Perpetual Stasis|eidolon}. No more war. No more choice. Just obedience." + FOOTER
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
        title: "THE FULL REPORT (PART 1)",
        content: HEADER + "This file contains evidence of every crime committed by the Bureau since 1999. It details the flight logs, the medical experiments, and the surveillance state.\n\n{THE TRUTH|eidolon|VERSION: FINAL|UV: THE ARCHIVES ARE EMPTY|Veritas}. It is all here.\n\n{DESTROY THIS RECORD|contamination|CMD: DELETE-ALL||Dangerous} immediately or the government will fall." + FOOTER
      },
      {
        id: "d20_2",
        title: "Corroborating Evidence (PART 2)",
        content: HEADER + "We have attached the unredacted flight logs and the original patient zero files. \n\n{All data is here|eidolon}. The world deserves to know.\n\nWarning: {Infection found|contamination} in the logic core. Purge sequence ready." + FOOTER
      },
      {
        id: "d20_3",
        title: "The Last Memo",
        content: HEADER + "To the Archivist:\n\nYou have seen it all. You know what we did. You can {Leak the Truth|eidolon} and be a hero, or you can do your job.\n\n{System Corruption|contamination} detected. Awaiting input." + FOOTER
      }
    ],
    feed: { headline: "GAME OVER", body: "The records are sealed forever. Or are they?" }
  }
];
