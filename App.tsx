
import React, { useState, useMemo, useEffect, useRef } from 'react';
import { GameState, ToolType, Citation, AuditLogEntry, SpecialDirective, UpgradeType, GameSave, ChapterConfig } from './types';
import { DAYS, CHAPTERS } from './data/content';
import { DocumentView } from './components/DocumentView';
import { BriefingView, EvaluationView, FeedView, GameOverView, ShopView, VictoryView } from './components/GameViews';
import { MainMenu, ChapterSelect, ChapterIntro } from './components/MenuViews';
import { TutorialNote, ToolPopup } from './components/Tutorial';
import { calculateScore, parseDocumentContent } from './utils';
import { audio } from './utils/audio';
import { Eraser, PenLine, Highlighter, Scan, Stamp, Search, Sun, ShieldCheck, FileText, GripHorizontal, File, Hand, EyeOff, Flame, CheckSquare, Ban, Microscope, Key, Volume2, VolumeX } from 'lucide-react';

// --- Draggable Helper Component ---
const DraggableItem: React.FC<{ 
  initialPos: { x: number, y: number, right?: boolean, bottom?: boolean }, 
  children: React.ReactNode, 
  className?: string, 
  style?: React.CSSProperties,
  onDragStart?: () => void
}> = ({ initialPos, children, className, style, onDragStart }) => {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [hasInitialized, setHasInitialized] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [rel, setRel] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const x = initialPos.right ? window.innerWidth - initialPos.x : initialPos.x;
    const y = initialPos.bottom ? window.innerHeight - initialPos.y : initialPos.y;
    setPos({ x, y });
    setHasInitialized(true);
  }, []); 

  const onMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return;
    if (onDragStart) onDragStart();
    else audio.playPaperRustle();
    
    setDragging(true);
    setRel({ x: e.clientX - pos.x, y: e.clientY - pos.y });
    e.stopPropagation();
  };

  useEffect(() => {
    if (!dragging) return;
    const onMouseMove = (e: MouseEvent) => {
      setPos({ x: e.clientX - rel.x, y: e.clientY - rel.y });
      e.preventDefault();
    };
    const onMouseUp = () => setDragging(false);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, [dragging, rel]);

  if (!hasInitialized) return null;

  return (
    <div 
      onMouseDown={onMouseDown}
      style={{ left: pos.x, top: pos.y, position: 'absolute', ...style }}
      className={`cursor-grab active:cursor-grabbing ${className} ${dragging ? 'z-[60] scale-105 rotate-1 shadow-2xl' : 'z-20'} transition-transform select-none`}
    >
      {children}
    </div>
  );
};

// --- Burnable Directive Component ---
const BurnableDirective: React.FC<{ 
  directive: SpecialDirective, 
  onBurnComplete: () => void 
}> = ({ directive, onBurnComplete }) => {
  const [isBurning, setIsBurning] = useState(false);

  const handleBurn = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsBurning(true);
    audio.playBurn();
    // Wait for animation to finish before removing
    setTimeout(onBurnComplete, 1900); 
  };

  return (
    <div className={`relative w-64 ${isBurning ? 'burning' : ''} transition-all`}>
      {/* Burning Edge Effect Overlay */}
      <div className={`burn-edge ${isBurning ? 'opacity-100' : 'opacity-0'}`}></div>

      {/* Smoke Particles (Only active when burning) */}
      {isBurning && (
        <div className="absolute inset-0 pointer-events-none overflow-visible z-50">
          {[...Array(15)].map((_, i) => (
             <div 
               key={i} 
               className="smoke" 
               style={{ 
                 left: `${10 + Math.random() * 80}%`, 
                 animationDelay: `${Math.random() * 0.5}s`,
                 bottom: '10px'
               }} 
             />
          ))}
          {[...Array(8)].map((_, i) => (
             <div 
               key={`spark-${i}`} 
               className="spark" 
               style={{ 
                 left: `${20 + Math.random() * 60}%`, 
                 bottom: '0px',
                 animationDelay: `${Math.random() * 1}s`,
                 // @ts-ignore custom prop
                 '--dx': `${(Math.random() - 0.5) * 50}px`
               }} 
             />
          ))}
        </div>
      )}

      {/* Content */}
      <div className={`bg-[#111] border border-stone-700 p-4 shadow-2xl rotate-[3deg] group cursor-pointer transition-transform hover:scale-105 ${isBurning ? 'burning-mask' : ''}`}>
        <div className="text-stone-500 text-[10px] uppercase font-bold tracking-[0.3em] mb-2 text-center border-b border-stone-800 pb-2">
           Burn After Reading
        </div>
        <div className="text-stone-300 font-typewriter text-xs leading-relaxed">
           {directive.flavorText}
        </div>
        <div className="mt-4 flex justify-between text-[10px] uppercase font-bold">
           <span className="text-green-700">Reward: ${directive.bribeReward}</span>
           <span className="text-red-700">Refusal: -${directive.disobediencePenalty}</span>
        </div>
        
        {/* Drag Hint */}
        <div className="mt-3 pt-2 border-t border-stone-800 text-[9px] text-stone-600 text-center uppercase tracking-widest font-sans opacity-50">
           (You can drag me around the screen)
        </div>

        <div className="absolute -right-2 -top-2">
           <EyeOff className="w-6 h-6 text-stone-600" />
        </div>

        {/* Lighter Button */}
        {!isBurning && (
           <button 
             onClick={handleBurn}
             className="absolute -bottom-4 -right-4 bg-orange-700 hover:bg-orange-600 text-white p-2 rounded-full shadow-lg transition-transform hover:scale-110 active:scale-95 z-50 group-hover:opacity-100 opacity-0 transition-opacity"
             title="Burn Evidence"
           >
             <Flame className="w-4 h-4" fill="white" />
           </button>
        )}
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const [dayIndex, setDayIndex] = useState(0);
  const [phase, setPhase] = useState<GameState['phase']>('MENU');
  const [currentDocIndex, setCurrentDocIndex] = useState(0);
  const [currentTool, setCurrentTool] = useState<ToolType>('hand');
  
  // Audio State
  const [isMuted, setIsMuted] = useState(false);

  // Progression State
  const [showChapterSelect, setShowChapterSelect] = useState(false);
  const [maxChapterReached, setMaxChapterReached] = useState(1);
  const [maxDayReached, setMaxDayReached] = useState(0); // Index of furthest reached day
  const [activeChapter, setActiveChapter] = useState<ChapterConfig>(CHAPTERS[0]);

  // Tutorial State
  const [tutorialStep, setTutorialStep] = useState<number>(-1); // -1 = No Tutorial
  const [seenTools, setSeenTools] = useState<ToolType[]>(['hand']); // Tools the user has already seen popup for
  const [activeToolPopup, setActiveToolPopup] = useState<ToolType | null>(null);
  const [tutorialCompleted, setTutorialCompleted] = useState(false);

  // Document Annotations
  const [redactions, setRedactions] = useState<Record<string, Set<string>>>({});
  const [highlights, setHighlights] = useState<Record<string, Set<string>>>({});
  const [recovered, setRecovered] = useState<Record<string, Set<string>>>({});
  const [voidedDocs, setVoidedDocs] = useState<Record<string, boolean>>({});

  const [dailyScore, setDailyScore] = useState({ correct: 0, missed: 0, overRedacted: 0, totalSensitive: 0 });
  
  // Financial & Moral State
  const [totalFunds, setTotalFunds] = useState(150); // Starting Money
  const [moralScore, setMoralScore] = useState(0); // 0 = Neutral
  const [dailyFinancials, setDailyFinancials] = useState({ bribe: 0, penalty: 0, wage: 120 });
  const [purchasedUpgrades, setPurchasedUpgrades] = useState<UpgradeType[]>([]);

  // Burning State for current day
  const [isDirectiveBurned, setIsDirectiveBurned] = useState(false);

  // Detailed Audit Logs for the Evaluation Screen
  const [dailyAuditLogs, setDailyAuditLogs] = useState<AuditLogEntry[]>([]);

  // Document Dragging State
  const [docPos, setDocPos] = useState({ x: 0, y: 0 }); // Center offset
  const [isDraggingDoc, setIsDraggingDoc] = useState(false);
  const [docDragRel, setDocDragRel] = useState({ x: 0, y: 0 });
  const [isHoveringOutbox, setIsHoveringOutbox] = useState(false);
  const outboxRef = useRef<HTMLDivElement>(null);
  
  // Feedback System
  const [citation, setCitation] = useState<Citation | null>(null);

  const currentDayConfig = DAYS[dayIndex] || DAYS[DAYS.length - 1];
  const currentDocs = currentDayConfig.documents;
  const currentDoc = currentDocs[currentDocIndex];

  // Initialize Audio Logic
  const handleToggleMute = () => {
    const muted = audio.toggleMute();
    setIsMuted(muted);
  };

  // Helper to get current chapter based on day index
  const getChapterForDay = (index: number) => {
    return CHAPTERS.find(c => index >= c.startDayIndex && index <= c.endDayIndex) || CHAPTERS[0];
  };

  // --- Helpers for Tutorial Logic ---
  const currentDocTokens = useMemo(() => 
    currentDoc ? parseDocumentContent(currentDoc.content) : [], 
    [currentDoc]
  );

  // Monitor Redactions for Tutorial Step 3 -> 4 Transition
  useEffect(() => {
    if (tutorialStep !== 3 && tutorialStep !== 4) return;
    if (dayIndex !== 0 || !currentDoc) return;
    
    const names = currentDocTokens.filter(t => t.type === 'name');
    const currentRedactions = redactions[currentDoc.id] || new Set();
    const unredacted = names.filter(t => !currentRedactions.has(t.id));
    
    // Check if the only remaining unredacted item is the Special Directive Target (Bill)
    const specialTargets = currentDayConfig.specialDirective?.targetText || [];
    const isOnlySpecialLeft = unredacted.length > 0 && unredacted.every(t => 
        specialTargets.some(target => t.text.includes(target))
    );
    
    const isAllRedacted = unredacted.length === 0;
    
    if (isAllRedacted || isOnlySpecialLeft) {
       // All done, or only optional target left -> Allow progressing to next step
       if (tutorialStep === 3) setTutorialStep(4);
    } else {
       // Still have required names -> Go back to step 3 if we were at 4
       if (tutorialStep === 4) setTutorialStep(3);
    }
  }, [redactions, currentDocTokens, tutorialStep, dayIndex, currentDoc, currentDayConfig]);

  // Save System
  const saveGame = (overrides?: Partial<GameSave>) => {
    const save: GameSave = {
      dayIndex: overrides?.dayIndex ?? dayIndex,
      funds: overrides?.funds ?? totalFunds,
      moralScore: overrides?.moralScore ?? moralScore,
      purchasedUpgrades: overrides?.purchasedUpgrades ?? purchasedUpgrades,
      maxChapterReached: overrides?.maxChapterReached ?? maxChapterReached,
      maxDayReached: overrides?.maxDayReached ?? maxDayReached,
      seenTools: overrides?.seenTools ?? seenTools,
      tutorialCompleted: overrides?.tutorialCompleted ?? tutorialCompleted
    };
    localStorage.setItem('redacted_save', JSON.stringify(save));
  };

  const loadGame = () => {
    const stored = localStorage.getItem('redacted_save');
    if (stored) {
      const save: GameSave = JSON.parse(stored);
      setDayIndex(save.dayIndex);
      setTotalFunds(save.funds);
      setMoralScore(save.moralScore);
      setPurchasedUpgrades(save.purchasedUpgrades);
      setSeenTools(save.seenTools || ['hand']);
      setTutorialCompleted(save.tutorialCompleted || false);
      
      const currentChap = getChapterForDay(save.dayIndex);
      setMaxDayReached(Math.max(save.maxDayReached || 0, save.dayIndex));
      setMaxChapterReached(Math.max(save.maxChapterReached || 1, currentChap.number));
      setActiveChapter(currentChap);
      
      return true;
    }
    return false;
  };

  // Menu Handlers
  const handleNewGame = () => {
    audio.ensureContext();
    audio.playClick();
    audio.startMusic();
    setDayIndex(0);
    setTotalFunds(150);
    setMoralScore(0);
    setPurchasedUpgrades([]);
    setSeenTools(['hand']);
    setTutorialCompleted(false);
    setMaxChapterReached(1);
    setMaxDayReached(0);
    setActiveChapter(CHAPTERS[0]);
    setPhase('CHAPTER_INTRO');
    saveGame({ 
      dayIndex: 0, 
      funds: 150, 
      moralScore: 0, 
      purchasedUpgrades: [], 
      maxChapterReached: 1, 
      maxDayReached: 0, 
      seenTools: ['hand'], 
      tutorialCompleted: false 
    });
  };

  const handleContinue = () => {
    audio.ensureContext();
    audio.playClick();
    audio.startMusic();
    if (loadGame()) {
      setShowChapterSelect(true);
    }
  };

  const handleSelectDay = (selectedDayIndex: number) => {
    audio.playClick();
    setDayIndex(selectedDayIndex);
    const chapter = getChapterForDay(selectedDayIndex);
    setActiveChapter(chapter);
    setShowChapterSelect(false);
    setPhase('BRIEFING');
  };

  const handleStartChapter = () => {
    audio.playClick();
    setPhase('BRIEFING');
  };
  
  const handleBackToMenu = () => {
    audio.playClick();
    setPhase('MENU');
    setShowChapterSelect(false);
    setIsDirectiveBurned(false);
  };
  
  // Calculate dynamic expenses based on day
  const calculateExpenses = () => {
    const dayNum = dayIndex + 1;
    const rentDue = dayNum % 3 === 0;
    const daysUntilRent = 3 - (dayNum % 3);
    
    return {
      rent: 120, 
      food: 15,
      heat: 10,
      rentDue,
      daysUntilRent: rentDue ? 0 : daysUntilRent
    };
  };

  const currentExpenses = calculateExpenses();

  const availableTools = useMemo(() => {
    const base = ['hand', ...(currentDayConfig.unlockedTools || ['marker'])];
    // Check Shop Upgrades
    if (purchasedUpgrades.includes('uv')) base.push('uv');
    if (purchasedUpgrades.includes('omni')) base.push('omni'); // Master Key
    return base;
  }, [currentDayConfig, purchasedUpgrades]);

  // Initialize Doc Position to Center on load/new doc
  useEffect(() => {
    setDocPos({ x: window.innerWidth / 2 - 425, y: window.innerHeight / 2 - 550 }); // approx center for 850x1100 doc
  }, [currentDocIndex, phase, purchasedUpgrades, currentDoc]);

  const handleStartDay = () => {
    audio.playStamp();
    setPhase('WORK');
    setCurrentDocIndex(0);
    setRedactions({});
    setHighlights({});
    setRecovered({});
    setVoidedDocs({});
    setCurrentTool('hand'); 
    setDailyScore({ correct: 0, missed: 0, overRedacted: 0, totalSensitive: 0 });
    setDailyFinancials({ bribe: 0, penalty: 0, wage: 120 });
    setDailyAuditLogs([]);
    setCitation(null);
    setIsDirectiveBurned(false);
    
    // Start Tutorial if Day 1 and not completed
    if (dayIndex === 0 && !tutorialCompleted) {
      setTutorialStep(0);
    } else {
      setTutorialStep(-1);
    }

    saveGame(); 
  };
  
  const handleToolSelect = (tool: ToolType) => {
    audio.playClick();
    setCurrentTool(tool);
    
    // Tutorial Jump: If user picks marker early (Steps 0, 1, 2), jump straight to redaction
    if (tool === 'marker' && tutorialStep >= 0 && tutorialStep < 3) {
      setTutorialStep(3);
    }

    // Tutorial Step 4 -> 5: Select Hand (Transition to Burn or Submit)
    if (tutorialStep === 4 && tool === 'hand') {
       // If they already burned the directive, skip the burn instruction (Step 5) and go to Outbox (Step 6)
       if (isDirectiveBurned) {
          setTutorialStep(6);
       } else {
          setTutorialStep(5);
       }
    }

    // New Tool Popup Logic
    if (tool !== 'hand' && !seenTools.includes(tool)) {
      // Don't show popup if we are currently in a tutorial step that explains this tool
      if (tutorialStep >= 0 && tool === 'marker') {
        const newSeen = [...seenTools, tool];
        setSeenTools(newSeen);
        saveGame({ seenTools: newSeen });
      } else {
        setActiveToolPopup(tool);
        const newSeen = [...seenTools, tool];
        setSeenTools(newSeen);
        saveGame({ seenTools: newSeen });
      }
    }
  };

  const finishShop = () => {
    audio.playClick();
    if (totalFunds < -50) {
      setPhase('GAME_OVER');
      return;
    }

    if (dayIndex < DAYS.length - 1) {
      const nextDay = dayIndex + 1;
      setDayIndex(nextDay);
      
      const nextChapter = getChapterForDay(nextDay);
      if (nextChapter.number > activeChapter.number) {
         setActiveChapter(nextChapter);
         if (nextChapter.number > maxChapterReached) {
            setMaxChapterReached(nextChapter.number);
         }
         setPhase('CHAPTER_INTRO');
      } else {
         setPhase('BRIEFING');
      }
      saveGame();
    } else {
      setPhase('VICTORY');
    }
  };

  const handleBuyUpgrade = (type: UpgradeType, cost: number) => {
    if (totalFunds >= cost && !purchasedUpgrades.includes(type)) {
      audio.playSuccess();
      const newUpgrades = [...purchasedUpgrades, type];
      const newFunds = totalFunds - cost;
      setTotalFunds(newFunds);
      setPurchasedUpgrades(newUpgrades);
      saveGame({ funds: newFunds, purchasedUpgrades: newUpgrades });
    } else {
      audio.playClick();
    }
  };

  const handleDocMouseDown = (e: React.MouseEvent) => {
    if (currentTool !== 'hand' || e.button !== 0) return;
    audio.playPaperRustle();
    setIsDraggingDoc(true);
    setDocDragRel({ x: e.clientX - docPos.x, y: e.clientY - docPos.y });
    e.stopPropagation();
  };
  
  const handleBurnDirective = () => {
    setIsDirectiveBurned(true);
    // Step 5 -> 6: Burn
    if (tutorialStep === 5) {
      setTutorialStep(6);
    }
    // If they burn it during the intro to it (Step 1), move along immediately
    if (tutorialStep === 1) {
      setTutorialStep(2);
    }
  };

  useEffect(() => {
    if (!isDraggingDoc) return;

    const onMouseMove = (e: MouseEvent) => {
      let newX = e.clientX - docDragRel.x;
      let newY = e.clientY - docDragRel.y;
      const margin = 100;
      newX = Math.max(-400, Math.min(window.innerWidth - margin, newX));
      newY = Math.max(-400, Math.min(window.innerHeight - margin, newY));
      setDocPos({ x: newX, y: newY });

      if (outboxRef.current) {
        const outboxRect = outboxRef.current.getBoundingClientRect();
        if (
          e.clientX >= outboxRect.left && 
          e.clientX <= outboxRect.right && 
          e.clientY >= outboxRect.top && 
          e.clientY <= outboxRect.bottom
        ) {
          setIsHoveringOutbox(true);
        } else {
          setIsHoveringOutbox(false);
        }
      }
    };

    const onMouseUp = () => {
      setIsDraggingDoc(false);
      if (isHoveringOutbox) {
        submitCurrentDoc();
        setIsHoveringOutbox(false);
        setDocPos({ x: window.innerWidth / 2 - 425, y: window.innerHeight / 2 - 550 });
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, [isDraggingDoc, docDragRel, isHoveringOutbox]);


  const handleToggleTokens = (tokenIds: string[]) => {
    if (currentTool === 'stamp' || currentTool === 'void_stamp' || currentTool === 'analyzer' || currentTool === 'omni') return;
    
    audio.playMarkerScratch();

    if (currentTool === 'eraser') {
      const updateSet = (prev: Record<string, Set<string>>) => {
        const s = new Set(prev[currentDoc.id]); 
        tokenIds.forEach(id => s.delete(id)); 
        return { ...prev, [currentDoc.id]: s };
      };
      setRedactions(updateSet);
      setHighlights(updateSet);
      setRecovered(updateSet);
      return;
    }

    if (currentTool === 'marker') {
      const currentDocRedactions = redactions[currentDoc.id] || new Set();
      const newS = new Set(currentDocRedactions);
      const isCurrentlyRedacted = newS.has(tokenIds[0]);
      tokenIds.forEach(id => isCurrentlyRedacted ? newS.delete(id) : newS.add(id));

      setRedactions(p => ({ ...p, [currentDoc.id]: newS }));
      
      const clearOthers = (prev: Record<string, Set<string>>) => {
        const s = new Set(prev[currentDoc.id]); 
        tokenIds.forEach(id => s.delete(id)); 
        return { ...prev, [currentDoc.id]: s };
      };
      setHighlights(clearOthers);
      setRecovered(clearOthers);
      
      // Tutorial Logic Step 3 -> 4 is now handled in useEffect
    } 
    else if (currentTool === 'highlighter') {
      setHighlights(p => { 
        const s = new Set(p[currentDoc.id]); 
        const isCurrentlyHighlighted = s.has(tokenIds[0]);
        tokenIds.forEach(id => isCurrentlyHighlighted ? s.delete(id) : s.add(id));
        return { ...p, [currentDoc.id]: s }; 
      });
      const clearOthers = (prev: Record<string, Set<string>>) => {
        const s = new Set(prev[currentDoc.id]); 
        tokenIds.forEach(id => s.delete(id)); 
        return { ...prev, [currentDoc.id]: s };
      };
      setRedactions(clearOthers);
      setRecovered(clearOthers);
    }
    else if (currentTool === 'recover') {
       setRecovered(p => {
         const s = new Set(p[currentDoc.id]);
         const isCurrentlyRecovered = s.has(tokenIds[0]);
         tokenIds.forEach(id => isCurrentlyRecovered ? s.delete(id) : s.add(id));
         return { ...p, [currentDoc.id]: s };
       });
       const clearOthers = (prev: Record<string, Set<string>>) => {
         const s = new Set(prev[currentDoc.id]); 
         tokenIds.forEach(id => s.delete(id)); 
         return { ...prev, [currentDoc.id]: s };
       };
       setRedactions(clearOthers);
       setHighlights(clearOthers);
    }
  };

  const handleRedactAll = () => {
    if (currentTool === 'void_stamp') {
       audio.playStamp();
       setVoidedDocs(prev => ({
         ...prev,
         [currentDoc.id]: !prev[currentDoc.id]
       }));
       return;
    }
    if (currentTool === 'stamp') {
      audio.playStamp();
      const ids = parseDocumentContent(currentDoc.content).map(t => t.id);
      setRedactions(p => ({ ...p, [currentDoc.id]: new Set(ids) }));
      setHighlights(p => ({ ...p, [currentDoc.id]: new Set() }));
      setRecovered(p => ({ ...p, [currentDoc.id]: new Set() }));
    }
  };

  // --- Auto-Submit Logic ---
  useEffect(() => {
    if (!purchasedUpgrades.includes('auto_submit') || phase !== 'WORK' || !currentDoc) return;

    const timeout = setTimeout(() => {
      const result = calculateScore(
        parseDocumentContent(currentDoc.content), 
        redactions[currentDoc.id] || new Set(), 
        highlights[currentDoc.id] || new Set(),
        recovered[currentDoc.id] || new Set(), 
        voidedDocs[currentDoc.id] || false,
        currentDayConfig.rules,
        currentDayConfig.specialDirective
      );

      if (result.mistakes.length === 0 && result.stats.totalSensitive > 0) {
        submitCurrentDoc();
      }
    }, 800); 

    return () => clearTimeout(timeout);
  }, [redactions, highlights, recovered, voidedDocs, currentDoc, phase, purchasedUpgrades]);

  const submitCurrentDoc = () => {
    audio.playSuccess();
    const result = calculateScore(
      parseDocumentContent(currentDoc.content), 
      redactions[currentDoc.id] || new Set(), 
      highlights[currentDoc.id] || new Set(),
      recovered[currentDoc.id] || new Set(), 
      voidedDocs[currentDoc.id] || false,
      currentDayConfig.rules,
      currentDayConfig.specialDirective
    );
    
    // Tutorial Finish Logic
    // If user submits document (drags to outbox) at ANY point during tutorial, 
    // complete the tutorial and move on.
    if (!tutorialCompleted && tutorialStep !== -1) {
      setTutorialStep(-1);
      setTutorialCompleted(true);
      saveGame({ tutorialCompleted: true });
    }

    const { stats, mistakes, financials, moralChange } = result;

    setDailyScore(prev => ({
      correct: prev.correct + stats.correct,
      missed: prev.missed + stats.missed,
      overRedacted: prev.overRedacted + stats.overRedacted,
      totalSensitive: prev.totalSensitive + stats.totalSensitive
    }));

    setDailyFinancials(prev => ({
       ...prev,
       bribe: prev.bribe + financials.bribeEarned,
       penalty: prev.penalty + financials.penaltyIncurred
    }));

    setMoralScore(prev => prev + moralChange);

    setDailyAuditLogs(prev => [
      ...prev,
      {
        docId: currentDoc.id,
        docTitle: currentDoc.title,
        mistakes: mistakes
      }
    ]);

    let newCitation: Citation | null = null;
    if (financials.bribeEarned > 0) {
      newCitation = { type: 'BRIBE', message: 'DIRECTIVE COMPLIANCE', amount: financials.bribeEarned };
    } else if (financials.penaltyIncurred > 0) {
      newCitation = { type: 'PENALTY', message: 'INSUBORDINATION FINE', amount: financials.penaltyIncurred };
    } else if (stats.missed > 0) {
      newCitation = { type: 'PENALTY', message: 'PROTOCOL VIOLATION: SENSITIVE INFO LEAKED', amount: stats.missed * 10 };
    } else if (stats.overRedacted > 2) {
      newCitation = { type: 'WARNING', message: 'CARELESSNESS: EXCESSIVE REDACTION', amount: 5 };
    }
    setCitation(newCitation);
    
    setTimeout(() => {
        setTimeout(() => setCitation(null), 3000);

        if (currentDocIndex < currentDocs.length - 1) {
          setCurrentDocIndex(p => p + 1);
        } else {
           if (currentDayConfig.specialDirective && !isDirectiveBurned) {
              setDailyFinancials(prev => ({
                ...prev,
                penalty: prev.penalty + 50
              }));
              setDailyAuditLogs(prev => [
                ...prev, 
                {
                  docId: "SECURITY_BREACH",
                  docTitle: "DIRECTIVE DISPOSAL",
                  mistakes: [{ text: "Classified Material Retained", type: "SECURITY_RISK" as const, hint: "Directives must be destroyed" }]
                }
              ]);
           }
           
           // IMMEDIATELY UNLOCK NEXT LEVEL AND SAVE
           const nextIdx = dayIndex + 1;
           const newMaxDay = Math.max(maxDayReached, nextIdx);
           const currentChap = getChapterForDay(dayIndex);
           const nextChap = getChapterForDay(nextIdx);
           const newMaxChap = Math.max(maxChapterReached, nextChap.number);
           
           setMaxDayReached(newMaxDay);
           setMaxChapterReached(newMaxChap);
           
           // Perform a save including the unlocked day
           saveGame({ 
             maxDayReached: newMaxDay, 
             maxChapterReached: newMaxChap 
           });

           setPhase('EVALUATION');
        }
    }, 100);
  };

  const proceedToShop = () => {
    audio.playClick();
    let deduction = currentExpenses.food + currentExpenses.heat;
    if (currentExpenses.rentDue) {
      deduction += currentExpenses.rent;
    }
    const newFunds = totalFunds - deduction;
    setTotalFunds(newFunds);
    saveGame({ funds: newFunds });
    setPhase('SHOP');
  };

  const handleEvaluationNext = () => {
    audio.playClick();
    const hasKickback = purchasedUpgrades.includes('kickback');
    const kickbackAmount = hasKickback ? 50 : 0;
    
    const deductions = (dailyScore.missed * 10) + (dailyScore.overRedacted * 5) + dailyFinancials.penalty;
    const netPay = dailyFinancials.wage + dailyFinancials.bribe + kickbackAmount - deductions;
    const newFunds = totalFunds + netPay;
    setTotalFunds(newFunds);
    saveGame({ funds: newFunds, moralScore: moralScore });
    setPhase('FEED');
  };

  // --- Dynamic Text for Tutorial Step 4 ---
  const step4Text = useMemo(() => {
     if (!currentDoc) return "";
     const names = currentDocTokens.filter(t => t.type === 'name');
     const currentRedactions = redactions[currentDoc.id] || new Set();
     const unredacted = names.filter(t => !currentRedactions.has(t.id));
     
     if (unredacted.length > 0) {
        // Must be the directive target if we are here
        return "You've left a name visible. This matches your **Secret Directive**. Redact it to be safe, or leave it to earn a bribe. It's your choice.\n\nSelect the **Hand Tool** to proceed.";
     }
     return "All names redacted. Good.\n\nNow switch back to the **Hand Tool** so you can move the document.";
  }, [redactions, currentDocTokens, currentDoc]);

  return (
    <div id="desk-container" className="w-screen h-screen bg-[#1c1917] flex items-center justify-center relative overflow-hidden bg-noise shadow-inner">
      <div className="absolute inset-0 pointer-events-none z-50 bg-[radial-gradient(circle_at_center,transparent_20%,rgba(0,0,0,0.6)_100%)]"></div>
      
      {/* Mute Button */}
      <button 
        onClick={handleToggleMute}
        className="absolute top-4 right-4 z-[100] p-2 bg-stone-800 border border-stone-600 rounded text-stone-400 hover:text-white hover:border-white transition-colors"
      >
        {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
      </button>

      <div className="z-10 w-full h-full relative">

        {phase === 'MENU' && (
          <div className="absolute inset-0 z-50">
            {showChapterSelect ? (
              <ChapterSelect 
                chapters={CHAPTERS}
                maxChapterReached={maxChapterReached}
                maxDayReached={maxDayReached}
                onSelectDay={handleSelectDay}
                onBack={() => setShowChapterSelect(false)}
              />
            ) : (
              <MainMenu 
                onNewGame={handleNewGame}
                onContinue={handleContinue}
                canContinue={!!localStorage.getItem('redacted_save')}
              />
            )}
          </div>
        )}

        {phase === 'CHAPTER_INTRO' && (
           <div className="absolute inset-0 z-50">
             <ChapterIntro chapter={activeChapter} onContinue={handleStartChapter} />
           </div>
        )}
        
        {phase === 'BRIEFING' && (
          <div className="absolute inset-0 flex items-center justify-center z-50">
            <BriefingView day={currentDayConfig} onStart={handleStartDay} />
          </div>
        )}
        
        {phase === 'WORK' && currentDoc && (
          <>
            {activeToolPopup && (
              <ToolPopup tool={activeToolPopup} onClose={() => setActiveToolPopup(null)} />
            )}

            <DraggableItem initialPos={{ x: 50, y: 50 }} onDragStart={() => audio.playPaperRustle()}>
               <div className="bg-yellow-200 text-stone-900 p-4 w-64 shadow-lg rotate-[-2deg] font-handwriting transform hover:scale-105 transition-transform duration-300 cursor-pointer">
                  <div className="font-bold text-sm uppercase border-b border-stone-800 pb-1 mb-2 flex justify-between">
                    <span>Day {currentDayConfig.day}</span>
                    <span>Stack: {currentDocIndex + 1}/{currentDocs.length}</span>
                  </div>
                  <div className="text-xs leading-tight font-serif italic opacity-80">
                    "{currentDayConfig.briefing.slice(0, 80)}..."
                  </div>
                  <div className="mt-4 pt-2 border-t border-stone-400/50 flex justify-between items-center text-xs font-bold">
                    <span>Funds: ${totalFunds}</span>
                    {totalFunds < 20 && <span className="text-red-600 animate-pulse">LOW FUNDS!</span>}
                  </div>
                  <div className="mt-3 text-[9px] text-stone-600 text-center uppercase tracking-widest font-sans opacity-60">
                    (You can drag me around the screen)
                  </div>
               </div>
            </DraggableItem>

            <DraggableItem initialPos={{ x: 50, y: 250 }} onDragStart={() => audio.playPaperRustle()}>
               <div className="bg-[#4a3b32] p-2 rounded shadow-2xl relative w-64 cursor-pointer">
                 <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-20 h-6 bg-stone-300 rounded shadow-md border-t border-white/50 flex items-center justify-center">
                    <div className="w-12 h-1 bg-black/20 rounded-full"></div>
                 </div>
                 <div className="bg-white p-4 h-full min-h-[300px] text-[11px] font-typewriter leading-snug flex flex-col">
                   <h3 className="font-bold uppercase underline mb-4 text-center">Protocol: {currentDayConfig.title}</h3>
                   <ul className="space-y-3 list-disc pl-4 flex-1">
                      {currentDayConfig.rules.map((r, i) => (
                        <li key={i} className={`${r.action === 'highlight' ? 'text-blue-800' : r.action === 'recover' ? 'text-green-700' : 'text-red-900'}`}>
                          {r.description}
                        </li>
                      ))}
                   </ul>
                   <div className="mt-6 pt-2 border-t border-stone-200 text-[9px] text-stone-400 text-center uppercase tracking-widest font-sans">
                     (You can drag me around the screen)
                   </div>
                 </div>
                 
                 {/* Step 0: Protocol Tutorial */}
                 {tutorialStep === 0 && (
                    <div className="absolute -right-4 top-10 translate-x-full z-[100]">
                       <TutorialNote 
                         text="Welcome to the desk, Agent. Start by reviewing your **Protocol**. It tells you exactly what needs to be censored today."
                         arrow="left"
                         onNext={() => setTutorialStep(1)}
                       />
                    </div>
                 )}
               </div>
            </DraggableItem>

            {currentDayConfig.specialDirective && !isDirectiveBurned && (
               <DraggableItem initialPos={{ x: window.innerWidth - 300, y: 350 }} onDragStart={() => audio.playPaperRustle()}>
                 <BurnableDirective 
                    directive={currentDayConfig.specialDirective}
                    onBurnComplete={handleBurnDirective} 
                 />
                 
                 {/* Step 1: Envelope Intro */}
                 {tutorialStep === 1 && (
                    <div className="absolute top-1/2 -left-4 -translate-x-full -translate-y-1/2 z-[100]">
                      <TutorialNote
                        text="This **Black Envelope** contains a Special Directive. It offers a bribe to break protocol. It is your choice to follow it or not."
                        arrow="right"
                        onNext={() => setTutorialStep(2)}
                      />
                    </div>
                 )}
                 
                 {/* Step 5: Burn Envelope */}
                 {tutorialStep === 5 && (
                    <div className="absolute top-1/2 -left-4 -translate-x-full -translate-y-1/2 z-[100]">
                      <TutorialNote
                        text="We cannot leave a paper trail. Click the **Flame Icon** on the envelope to destroy it."
                        arrow="right"
                      />
                    </div>
                 )}
               </DraggableItem>
            )}

            {isDraggingDoc && isHoveringOutbox ? (
               <div 
                 className="absolute pointer-events-none z-[70] flex flex-col items-center justify-center animate-pulse"
                 style={{ 
                    left: docPos.x + docDragRel.x - 48, 
                    top: docPos.y + docDragRel.y - 48
                 }} 
               >
                 <File className="w-24 h-24 text-stone-200 drop-shadow-2xl" strokeWidth={1} fill="#57534e" />
                 <span className="bg-black text-white px-2 py-1 text-xs font-bold uppercase rounded mt-2">Release to Submit</span>
               </div>
            ) : (
               <>
                 <DocumentView 
                   data={currentDoc} 
                   rules={currentDayConfig.rules}
                   redactedIds={redactions[currentDoc.id] || new Set()} 
                   highlightedIds={highlights[currentDoc.id] || new Set()} 
                   recoveredIds={recovered[currentDoc.id] || new Set()}
                   isVoided={voidedDocs[currentDoc.id] || false}
                   onToggleTokens={handleToggleTokens} 
                   onRedactAll={handleRedactAll} 
                   tool={currentTool}
                   tutorialStep={tutorialStep}
                   style={{ 
                     transform: `translate(${docPos.x}px, ${docPos.y}px) scale(${isDraggingDoc ? 1.02 : 1})`,
                     zIndex: isDraggingDoc ? 50 : 10, 
                     cursor: currentTool === 'hand' ? (isDraggingDoc ? 'grabbing' : 'grab') : 'default'
                   }}
                   onMouseDown={handleDocMouseDown}
                 />
                 
                 {/* Step 3: Redaction Tutorial (Positioned ABOVE document to prevent blocking) */}
                 {tutorialStep === 3 && (
                    <div 
                       className="absolute z-[100] pointer-events-none transition-transform duration-75" 
                       style={{ 
                          // Position relative to docPos but offset significantly up and centered
                          transform: `translate(${docPos.x + 425}px, ${docPos.y - 120}px)`, 
                       }}
                    >
                        <div className="relative -left-1/2 pointer-events-auto">
                           <TutorialNote 
                              text="Click on the **highlighted Guest Names** below to redact them."
                              arrow="down"
                              style={{ transform: 'rotate(-1deg)' }}
                           />
                        </div>
                    </div>
                 )}
               </>
            )}

            <div 
              ref={outboxRef}
              className={`absolute right-10 bottom-32 w-64 h-48 rounded-lg border-b-[16px] border-r-[16px] transition-all duration-300 flex items-center justify-center z-[55]
                ${isHoveringOutbox 
                  ? 'bg-stone-700 border-amber-600 shadow-[0_0_30px_rgba(245,158,11,0.3)] scale-105' 
                  : 'bg-stone-800 border-stone-900 shadow-2xl'
                }
              `}
            >
              <div className="absolute -top-6 left-6 bg-stone-300 text-stone-900 px-4 py-2 text-xs font-bold uppercase tracking-widest shadow-sm flex items-center gap-2">
                <GripHorizontal className="w-3 h-3 opacity-50"/>
                OUTBOX
              </div>
              <div className="text-stone-600 flex flex-col items-center gap-2">
                 <div className="w-32 h-2 bg-black/20 rounded-full"></div>
                 <div className="w-24 h-2 bg-black/20 rounded-full"></div>
              </div>
            </div>

            {/* Step 6: Outbox Tutorial */}
            {tutorialStep === 6 && (
               <div className="absolute right-80 bottom-48 z-[100]">
                  <TutorialNote
                     text="Excellent. Now drag the document into the **Outbox** to submit it for filing."
                     arrow="right"
                  />
               </div>
            )}
            
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 bg-[#2a2522] px-8 pb-4 pt-6 rounded-t-xl shadow-2xl border-t border-white/10 flex gap-4 z-[40]">
               {availableTools.map(t => (
                  <button 
                    key={t} 
                    onClick={() => handleToolSelect(t as ToolType)} 
                    className={`
                      relative group flex flex-col items-center gap-1 transition-all duration-200
                      ${currentTool === t ? '-translate-y-6 scale-110' : 'hover:-translate-y-2 opacity-70 hover:opacity-100'}
                    `}
                  >
                    <div className={`
                      w-12 h-12 rounded-full flex items-center justify-center shadow-lg border-2
                      ${t === 'hand' ? 'bg-stone-500 border-stone-400 text-stone-100' : ''}
                      ${t === 'marker' ? 'bg-black border-stone-600 text-white' : ''}
                      ${t === 'highlighter' ? 'bg-yellow-400 border-yellow-200 text-yellow-900' : ''}
                      ${t === 'recover' ? 'bg-green-700 border-green-500 text-green-100' : ''}
                      ${t === 'stamp' ? 'bg-red-800 border-red-600 text-red-100' : ''}
                      ${t === 'void_stamp' ? 'bg-red-950 border-red-800 text-red-500' : ''}
                      ${t === 'uv' ? 'bg-purple-900 border-purple-500 text-purple-200' : ''}
                      ${t === 'omni' ? 'bg-stone-100 border-white text-stone-800' : ''}
                      ${t === 'eraser' ? 'bg-pink-300 border-pink-200 text-pink-800' : ''}
                      ${t === 'analyzer' ? 'bg-sky-900 border-cyan-500 text-cyan-200' : ''}
                    `}>
                      {t === 'hand' && <Hand className="w-6 h-6" />}
                      {t === 'marker' && <PenLine className="w-6 h-6" />}
                      {t === 'highlighter' && <Highlighter className="w-6 h-6" />}
                      {t === 'recover' && <CheckSquare className="w-6 h-6" />}
                      {t === 'uv' && <Sun className="w-6 h-6" />}
                      {t === 'stamp' && <Stamp className="w-6 h-6" />}
                      {t === 'void_stamp' && <Ban className="w-6 h-6" />}
                      {t === 'omni' && <Key className="w-6 h-6" />}
                      {t === 'eraser' && <Eraser className="w-6 h-6" />}
                      {t === 'analyzer' && <Microscope className="w-6 h-6" />}
                    </div>
                    <span className="text-[10px] uppercase font-bold text-stone-400 tracking-widest bg-black/80 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                      {t === 'omni' ? 'Master Key' : t}
                    </span>
                  </button>
               ))}
            </div>

            {/* Step 2: Toolbox Tutorial - Select Marker */}
            {tutorialStep === 2 && (
               <div 
                 className="absolute bottom-36 left-1/2 z-[100]" 
                 style={{ transform: 'translateX(32px)' }} 
               >
                 <TutorialNote
                   text="We need to redact names. Select the **Marker Tool**."
                   arrow="down"
                   style={{ marginLeft: '-8rem' }}
                 />
               </div>
            )}

            {/* Step 4: Select Hand Tool */}
            {tutorialStep === 4 && (
               <div 
                 className="absolute bottom-36 left-1/2 z-[100]"
                 style={{ transform: 'translateX(-32px)' }} 
               >
                 <TutorialNote
                   text={step4Text}
                   arrow="down"
                   style={{ marginLeft: '-8rem' }} 
                 />
               </div>
            )}

            {citation && (
              <div className="absolute bottom-32 right-80 z-[100] animate-slide-up">
                <div className={`
                   w-64 p-4 shadow-2xl border-l-4 rotate-2 font-typewriter text-xs
                   ${citation.type === 'PENALTY' ? 'bg-red-100 border-red-600 text-red-900' : 
                     citation.type === 'BRIBE' ? 'bg-green-100 border-green-600 text-green-900' : 
                     'bg-yellow-100 border-yellow-500 text-yellow-900'}
                `}>
                  <div className="font-bold uppercase border-b border-black/10 pb-1 mb-2 flex justify-between">
                    <span>{citation.type}</span>
                    <span>{citation.type === 'PENALTY' ? '-' : '+'}{citation.amount} CR</span>
                  </div>
                  <p>{citation.message}</p>
                </div>
              </div>
            )}
          </>
        )}

        {phase === 'EVALUATION' && (
           <div className="absolute inset-0 flex items-center justify-center z-50 bg-black/60 backdrop-blur-sm">
             <EvaluationView 
               score={dailyScore} 
               financials={dailyFinancials}
               totalFunds={totalFunds}
               purchasedUpgrades={purchasedUpgrades}
               auditLogs={dailyAuditLogs} 
               onNext={handleEvaluationNext} 
              />
           </div>
        )}
        
        {phase === 'FEED' && (
           <div className="absolute inset-0 flex items-center justify-center z-50 bg-black/80">
             <FeedView feed={currentDayConfig.feed} onNextDay={proceedToShop} />
           </div>
        )}

        {phase === 'SHOP' && (
           <div className="absolute inset-0 flex items-center justify-center z-50 bg-[#1c1917] bg-opacity-95">
             <ShopView 
               funds={totalFunds} 
               expenses={currentExpenses} 
               purchasedUpgrades={purchasedUpgrades}
               onBuy={handleBuyUpgrade}
               onNext={finishShop} 
             />
           </div>
        )}

        {phase === 'GAME_OVER' && (
          <div className="absolute inset-0 flex items-center justify-center z-50 bg-black">
            <GameOverView funds={totalFunds} onBackToMenu={handleBackToMenu} />
          </div>
        )}
        
        {phase === 'VICTORY' && (
           <div className="absolute inset-0 flex items-center justify-center z-50">
             <VictoryView funds={totalFunds} moralScore={moralScore} onBackToMenu={handleBackToMenu} />
           </div>
        )}
      </div>
    </div>
  );
};

export default App;
