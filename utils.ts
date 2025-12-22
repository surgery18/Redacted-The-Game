
import { Token, TokenType, DayConfig, Mistake } from './types';

// Helper to map technical types to human-readable strings for the audit log
const getTypeLabel = (type: TokenType | 'normal'): string => {
  const mapping: Partial<Record<TokenType | 'normal', string>> = {
    'minor_name': 'MINOR (NAME)',
    'minor_age': 'MINOR (AGE)',
    'victim': 'VICTIM IDENTITY',
    'financial_id': 'ACCOUNT/ROUTING #',
    'social_id': 'SOCIAL SECURITY #',
    'name': 'GUEST NAME',
    'location': 'SENSITIVE LOCATION',
    'panic_phrase': 'INCIDENT DETAIL',
    'diagnosis': 'MEDICAL DIAGNOSIS',
    'clinic_name': 'FACILITY NAME',
    'eidolon': 'CLASSIFIED KEYWORD',
    'timestamp': 'RESTRICTED DATE',
    'vip_protect': 'PROTECTED PERSONNEL',
    'vip_expose': 'RELIABILITY RISK',
    'contamination': 'SYSTEM CORRUPTION',
    'whistleblower': 'DISSIDENT IDENTITY',
    'sensitive': 'RESTRICTED DATA'
  };
  return mapping[type] || type.toUpperCase();
};

// Parses text like: "{Dr. Smith|name|ID:123||License Expired}"
export const parseDocumentContent = (content: string): Token[] => {
  const tokens: Token[] = [];
  let currentText = '';
  let idCounter = 0;
  let groupCounter = 0;

  const pushToken = (text: string, type: TokenType | 'normal' = 'normal', metadata?: string, uvText?: string, analysis?: string, groupId?: string) => {
    const words = text.split(/(\s+)/); 
    
    words.forEach(word => {
      if (word.length === 0) return;
      tokens.push({
        id: `tok_${idCounter++}`,
        groupId: groupId,
        text: word,
        type: type === 'normal' || word.trim().length === 0 ? 'normal' : type,
        originalString: word,
        metadata: metadata,
        uvText: uvText,
        analysis: analysis
      });
    });
  };

  let i = 0;
  while (i < content.length) {
    if (content[i] === '{') {
      if (currentText) {
        pushToken(currentText, 'normal');
        currentText = '';
      }
      
      const end = content.indexOf('}', i);
      if (end === -1) {
        currentText += '{';
        i++;
        continue;
      }
      
      const inner = content.slice(i + 1, end);
      const parts = inner.split('|');
      const textPart = parts[0];
      const typePart = parts[1];
      const metaPart = parts[2];
      const uvPart = parts[3];
      const analysisPart = parts[4]; 
      
      const groupId = `grp_${groupCounter++}`;
      
      pushToken(
        textPart, 
        (typePart as TokenType) || 'sensitive', 
        metaPart || undefined, 
        uvPart || undefined,
        analysisPart || undefined,
        groupId
      );
      
      i = end + 1;
    } else {
      currentText += content[i];
      i++;
    }
  }

  if (currentText) {
    pushToken(currentText, 'normal');
  }

  return tokens;
};

interface ScoreResult {
  stats: { correct: number, missed: number, overRedacted: number, totalSensitive: number };
  financials: { bribeEarned: number, penaltyIncurred: number };
  moralChange: number;
  mistakes: Mistake[];
  uvBonus: number;
}

export const calculateScore = (
  tokens: Token[],
  redactedIds: Set<string>,
  highlightedIds: Set<string>,
  recoveredIds: Set<string>,
  isVoided: boolean,
  rules: DayConfig['rules'],
  specialDirective?: DayConfig['specialDirective']
): ScoreResult => {
  let correct = 0;
  let missed = 0;
  let overRedacted = 0;
  let totalSensitive = 0;
  let bribeEarned = 0;
  let penaltyIncurred = 0;
  let moralChange = 0;
  let uvBonus = 0;
  const mistakes: Mistake[] = [];

  // Group Rules by Action - Filter out 'none' action (trap rules)
  const redactTypes = new Set(rules.filter(r => (!r.action || r.action === 'redact') && r.action !== 'none').flatMap(r => r.targetTypes));
  const highlightTypes = new Set(rules.filter(r => r.action === 'highlight').flatMap(r => r.targetTypes));
  const recoverTypes = new Set(rules.filter(r => r.action === 'recover').flatMap(r => r.targetTypes));
  const voidTypes = new Set(rules.filter(r => r.action === 'void').flatMap(r => r.targetTypes));
  
  // Explicit "Do Not Redact" types
  const noRedactTypes = new Set(rules.filter(r => r.action === 'none').flatMap(r => r.targetTypes));

  // 1. Check for VOID condition
  const requiresVoid = tokens.some(t => voidTypes.has(t.type));
  
  if (isVoided) {
    if (requiresVoid) {
      return { 
        stats: { correct: 10, missed: 0, overRedacted: 0, totalSensitive: 1 }, 
        financials: { bribeEarned: 0, penaltyIncurred: 0 },
        moralChange: 0,
        mistakes: [],
        uvBonus: 0
      };
    } else {
      return { 
        stats: { correct: 0, missed: 0, overRedacted: 5, totalSensitive: 0 }, 
        financials: { bribeEarned: 0, penaltyIncurred: 0 },
        moralChange: 0,
        mistakes: [{ text: "DOCUMENT", type: "WRONG_VOID", hint: "Document was valid" }],
        uvBonus: 0
      };
    }
  } else if (requiresVoid) {
    return { 
      stats: { correct: 0, missed: 5, overRedacted: 0, totalSensitive: 1 }, 
      financials: { bribeEarned: 0, penaltyIncurred: 25 }, 
      moralChange: 0,
      mistakes: [{ text: "CONTAMINATED", type: "MISSED_VOID", hint: "Protocol requires VOID stamp" }],
      uvBonus: 0
    };
  }


  // 2. Pre-calculate total tokens matching directive
  let directiveTotalMatches = 0;
  if (specialDirective) {
     directiveTotalMatches = tokens.filter(tok => 
       specialDirective.targetText.some(target => tok.originalString.toLowerCase().includes(target.toLowerCase()))
     ).length;
  }

  tokens.forEach(t => {
    if (t.originalString.trim() === '') return; 

    const isRedacted = redactedIds.has(t.id);
    const isHighlighted = highlightedIds.has(t.id);
    const isRecovered = recoveredIds.has(t.id);
    
    // Check for UV Bonus
    let isBonus = false;
    if (isRedacted && t.uvText) {
      uvBonus += 50;
      isBonus = true;
    }
    
    // Check Special Directive First
    let processedByDirective = false;
    
    if (specialDirective) {
      const matchesDirective = specialDirective.targetText.some(target => 
        t.originalString.toLowerCase().includes(target.toLowerCase())
      );

      if (matchesDirective) {
        processedByDirective = true;
        const rewardShare = directiveTotalMatches > 0 ? (specialDirective.bribeReward / directiveTotalMatches) : 0;
        const penaltyShare = directiveTotalMatches > 0 ? (specialDirective.disobediencePenalty / directiveTotalMatches) : 0;

        if (specialDirective.requiredAction === 'REVEAL') {
          if (!isRedacted) {
             bribeEarned += rewardShare;
             moralChange -= 1; 
          } else {
             penaltyIncurred += penaltyShare;
             moralChange += 1; 
             mistakes.push({ text: t.text, type: 'ILLEGAL_DEFIANCE', hint: 'Order Disobeyed' });
          }
        } else if (specialDirective.requiredAction === 'REDACT') {
          if (isRedacted) {
             bribeEarned += rewardShare;
             moralChange -= 1; 
          } else {
             penaltyIncurred += penaltyShare;
             moralChange += 1;
             mistakes.push({ text: t.text, type: 'ILLEGAL_DEFIANCE', hint: 'Order Disobeyed' });
          }
        }
      }
    }

    if (processedByDirective) return; 

    // Standard Rules
    if (redactTypes.has(t.type)) {
      totalSensitive++;
      if (isRedacted) {
        correct++;
      } else {
        missed++;
        mistakes.push({ text: t.text, type: 'MISSED', hint: getTypeLabel(t.type) });
      }
    } 
    else if (highlightTypes.has(t.type)) {
      totalSensitive++;
      if (isHighlighted && !isRedacted) {
        correct++;
      } else {
        missed++; 
        mistakes.push({ text: t.text, type: 'MISSED_HIGHLIGHT', hint: getTypeLabel(t.type) });
      }
    }
    else if (recoverTypes.has(t.type)) {
      totalSensitive++;
      if (isRecovered && !isRedacted) {
        correct++;
      } else {
        missed++;
        mistakes.push({ text: t.text, type: 'MISSED_RECOVERY', hint: 'DECLASSIFICATION' });
      }
    }
    else {
      // If it's redacted but NOT required, and NOT part of an explicit 'none' trap rule
      if (isRedacted && !noRedactTypes.has(t.type)) {
        // Only punish over-redaction if it's not a secret UV bonus
        if (!isBonus) {
           overRedacted++;
           mistakes.push({ text: t.text, type: 'OVER_REDACTED', hint: 'SAFE INFO' });
        }
      }
      // If it's part of a trap rule and is redacted, it's also over-redacted
      if (isRedacted && noRedactTypes.has(t.type)) {
        overRedacted++;
        mistakes.push({ text: t.text, type: 'OVER_REDACTED', hint: 'PROTECTED INFO' });
      }
    }
  });

  return { 
    stats: { correct, missed, overRedacted, totalSensitive }, 
    financials: { bribeEarned: Math.ceil(bribeEarned), penaltyIncurred: Math.ceil(penaltyIncurred) }, 
    moralChange,
    mistakes,
    uvBonus
  };
};
