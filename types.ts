
export type TokenType = 
  | 'text' 
  | 'social_id' 
  | 'financial_id'
  | 'address' 
  | 'name' 
  | 'minor_name' 
  | 'minor_age'
  | 'school' 
  | 'witness' 
  | 'phone' 
  | 'codename' 
  | 'location' 
  | 'panic_phrase' 
  | 'staff' 
  | 'diagnosis' 
  | 'clinic_name' 
  | 'eidolon' 
  | 'report_id' 
  | 'victim' 
  | 'bri_error' 
  | 'oversight' 
  | 'timestamp' 
  | 'adverse_outcome' 
  | 'whistleblower' 
  | 'coercion' 
  | 'vip_protect' 
  | 'vip_expose' 
  | 'total_blackout'
  | 'contamination' // Triggers VOID
  | 'sensitive'; // Generic catch-all

export type ToolType = 
  | 'hand' 
  | 'marker'       // Black (Redact)
  | 'eraser'       // Remove marks
  | 'highlighter'  // Yellow (Emphasize)
  | 'recover'      // Green (Declassify)
  | 'analyzer'     // Blue (Scan Context)
  | 'void_stamp'   // VOID entire doc
  | 'stamp'        // Shop: Redact Page
  | 'lens'         // Shop: Auto-find
  | 'uv'           // Shop: Secrets
  | 'seal';        // Shop: Instant Submit

export type UpgradeType = 'stamp' | 'uv' | 'lens' | 'seal';

export interface Token {
  id: string;
  groupId?: string; // Links multi-word entities like addresses
  text: string;
  type: TokenType | 'normal';
  originalString: string; 
  metadata?: string; // Information revealed by Magnifying Glass
  uvText?: string;   // Secret text revealed by UV Light
  analysis?: string; // Revealed by Analyzer Tool (e.g., "License Expired")
}

export interface DocumentData {
  id: string;
  title: string;
  content: string; // Markup format: "{Text|type|metadata|uvText|analysis}"
  forcedRedaction?: boolean; 
  obfuscated?: boolean; 
}

export interface Rule {
  description: string;
  targetTypes: (TokenType | 'normal')[];
  action?: 'redact' | 'highlight' | 'recover' | 'void' | 'none'; 
}

export interface SpecialDirective {
  id: string;
  description: string;
  targetText: string[]; // Exact text match to trigger specific handling
  requiredAction: 'REDACT' | 'REVEAL';
  bribeReward: number; // Money for obeying
  disobediencePenalty: number; // Fine for disobeying
  flavorText: string; // Text shown on the Shadow Note
}

export interface ChapterConfig {
  id: string;
  number: number;
  title: string;
  description: string;
  startDayIndex: number; // 0-based index in the DAYS array
  endDayIndex: number;
}

export interface DayConfig {
  day: number;
  title: string;
  briefing: string;
  rules: Rule[];
  specialDirective?: SpecialDirective;
  documents: DocumentData[];
  feed: {
    headline: string;
    body: string;
  };
  unlockedTools?: ToolType[];
}

export interface Citation {
  type: 'WARNING' | 'PENALTY' | 'PERFECT' | 'BRIBE' | 'DEBT';
  message: string;
  amount: number; // Fine amount or bonus
}

export interface Mistake {
  text: string;
  type: 'MISSED' | 'OVER_REDACTED' | 'MISSED_HIGHLIGHT' | 'MISSED_RECOVERY' | 'WRONG_VOID' | 'MISSED_VOID' | 'ILLEGAL_OBEDIENCE' | 'ILLEGAL_DEFIANCE' | 'SECURITY_RISK';
  hint: string;
}

export interface AuditLogEntry {
  docId: string;
  docTitle: string;
  mistakes: Mistake[];
}

export interface GameSave {
  dayIndex: number;
  funds: number;
  moralScore: number;
  purchasedUpgrades: UpgradeType[];
  maxChapterReached: number;
  maxDayReached: number;
}

export interface GameState {
  currentDay: number;
  phase: 'MENU' | 'CHAPTER_INTRO' | 'BRIEFING' | 'WORK' | 'EVALUATION' | 'FEED' | 'SHOP' | 'GAME_OVER' | 'VICTORY';
  
  funds: number;
  moralScore: number; // Positive = Good, Negative = Corrupt

  history: {
    day: number;
    correct: number;
    missed: number;
    overRedacted: number;
  }[];

  flags: Record<string, boolean>;
  purchasedUpgrades: UpgradeType[];
  maxDayReached: number;
}
