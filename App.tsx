
import React, { useState, useMemo, useEffect, useRef } from 'react';
import { GameState, ToolType, Citation, AuditLogEntry, SpecialDirective, UpgradeType, GameSave, ChapterConfig } from './types';
import { DAYS, CHAPTERS } from './data/content';
import { DocumentView } from './components/DocumentView';
import { Notebook } from './components/Notebook';
import { BriefingView, EvaluationView, FeedView, GameOverView, ShopView, VictoryView } from './components/GameViews';
import { MainMenu, ChapterSelect, ChapterIntro } from './components/MenuViews';
import { TutorialNote, ToolPopup } from './components/Tutorial';
import { calculateScore, parseDocumentContent } from './utils';
import { audio } from './utils/audio';
import { Eraser, PenLine, Highlighter, Scan, Stamp, Search, Sun, ShieldCheck, FileText, GripHorizontal, File, Hand, EyeOff, Flame, CheckSquare, Ban, Microscope, Key, Volume2, VolumeX, Wifi, Battery, Clock, Terminal } from 'lucide-react';

// --- Action Sayings ---
const SAYINGS: Partial<Record<ToolType, string[]>> = {
  marker: [
    "For their own safety.",
    "Eyes only.",
    "Nothing to see here.",
    "Clean.",
    "Sanitized.",
    "History is written by us.",
    "Protect the narrative.",
    "Silence is golden.",
    "Necessary measure.",
    "Redacted.",
    "They don't need to know.",
    "Secure.",
    "Erase the truth.",
    "Glory to redacted States of America",
  ],
  stamp: [
    "Glory to redacted States of America", 
    "OFFICIAL BUSINESS",
    "DENIED",
    "BUREAUCRACY WINS",
    "TOTAL CONTAINMENT", 
    "SECURITY ASSURED",
    "APPROVED FOR DESTRUCTION",
    "CASE CLOSED"
  ],
  void_stamp: [
    "IT NEVER HAPPENED",
    "REALITY ADJUSTED",
    "NULL AND VOID",
    "MEMORY HOLED",
    "PURGED",
    "EIDOLON CONTAINED",
    "TIMELINE CORRECTED"
  ],
  highlighter: [
    "Flagged for review.",
    "Note this.",
    "Interesting...",
    "Watch list updated.",
    "Keeping tabs.",
    "Context matters."
  ],
  recover: [
    "Declassified.",
    "Let the truth slip.",
    "Correction made.",
    "Revealing...",
    "Open record.",
    "Sunlight is the best disinfectant."
  ],
  eraser: [
    "Nevermind.",
    "Try again.",
    "Undo.",
    "Clean slate.",
    "Rewriting..."
  ],
  uv: [
    "What's hidden here?",
    "Secrets revealed.",
    "Invisible ink.",
    "The truth glows.",
    "I see you."
  ]
};

// --- Floating Text Component ---
const FloatingText: React.FC<{ x: number, y: number, text: string, type: ToolType, onComplete: () => void }> = ({ x, y, text, type, onComplete }) => {
  useEffect(() => {
    const timer = setTimeout(onComplete, 1500);
    return () => clearTimeout(timer);
  }, []); 

  let colorClass = "text-stone-300";
  let fontClass = "font-typewriter";
  
  if (type === 'stamp') { colorClass = "text-red-500 font-bold uppercase tracking-widest text-lg"; fontClass = "font-stamp"; }
  else if (type === 'void_stamp') { colorClass = "text-red-600 font-black uppercase tracking-widest text-xl"; fontClass = "font-stamp"; }
  else if (type === 'highlighter') { colorClass = "text-yellow-400 font-bold"; }
  else if (type === 'recover') { colorClass = "text-green-400 font-bold"; }
  else if (type === 'marker') { colorClass = "text-white bg-black px-1 font-bold"; }
  else if (type === 'uv') { colorClass = "text-purple-400 font-bold text-lg drop-shadow-[0_0_5px_rgba(168,85,247,0.8)]"; }

  return (
    <div 
      className={`pointer-events-none fixed z-[100] ${colorClass} ${fontClass} animate-slide-up drop-shadow-md whitespace-nowrap`}
      style={{ left: x, top: y - 20, textShadow: '0 2px 4px rgba(0,0,0,1)' }}
    >
      {text}
    </div>
  );
};

// --- Draggable Helper Component ---
const DraggableItem: React.FC<{ 
  id: string,
  initialPos: { x: number, y: number, right?: boolean, bottom?: boolean }, 
  savedPos?: { x: number, y: number },
  onDragEnd?: (id: string, pos: { x: number, y: number }) => void,
  children: React.ReactNode, 
  className?: string, 
  style?: React.CSSProperties,
  onDragStart?: () => void
}> = ({ id, initialPos, savedPos, onDragEnd, children, className, style, onDragStart }) => {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [hasInitialized, setHasInitialized] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [rel, setRel] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (savedPos) {
       setPos(savedPos);
       setHasInitialized(true);
    } else {
       const x = initialPos.right ? window.innerWidth - initialPos.x : initialPos.x;
       const y = initialPos.bottom ? window.innerHeight - initialPos.y : initialPos.y;
       setPos({ x, y });
       setHasInitialized(true);
    }
  }, []); // Run once on mount to set initial.

  // Sync if savedPos changes externally (e.g. load game while mounted)
  useEffect(() => {
      if (savedPos && !dragging) {
          setPos(savedPos);
      }
  }, [savedPos]);

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
    const onMouseUp = (e: MouseEvent) => {
      setDragging(false);
      if (onDragEnd) {
        onDragEnd(id, { x: e.clientX - rel.x, y: e.clientY - rel.y });
      }
    };
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, [dragging, rel, id, onDragEnd]);

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

      {/* Smoke Particles */}
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

      {/* Content Styled as an Encrypted Note */}
      <div className={`bg-stone-900 border border-green-900/50 p-4 shadow-2xl rotate-[3deg] group cursor-pointer transition-transform hover:scale-105 ${isBurning ? 'burning-mask' : ''}`}>
        <div className="text-green-500 text-[10px] uppercase font-tech tracking-[0.3em] mb-2 text-center border-b border-green-900 pb-2">
           // ENCRYPTED DIRECTIVE
        </div>
        <div className="text-green-400 font-typewriter text-xs leading-relaxed">
           {directive.flavorText}
        </div>
        <div className="mt-4 flex justify-between text-[10px] uppercase font-bold font-tech">
           <span className="text-green-300">Credits: {directive.bribeReward}</span>
           <span className="text-red-500">Fine: {directive.disobediencePenalty}</span>
        </div>
        
        {/* ADDED HINT */}
        <div className="mt-3 pt-2 border-t border-green-900/30 text-[10px] text-green-400 text-center uppercase tracking-widest font-tech opacity-90">
           (You can drag me around the screen)
        </div>
        
        <div className="absolute -right-2 -top-2">
           <EyeOff className="w-6 h-6 text-green-700" />
        </div>

        {/* Lighter Button */}
        {!isBurning && (
           <button 
             onClick={handleBurn}
             className="absolute -bottom-4 -right-4 bg-red-900 hover:bg-red-700 text-white p-2 rounded-full shadow-lg transition-transform hover:scale-110 active:scale-95 z-50 group-hover:opacity-100 opacity-0 transition-opacity border border-red-500"
             title="Delete Securely"
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
  const [maxDayReached, setMaxDayReached] = useState(0); 
  const [activeChapter, setActiveChapter] = useState<ChapterConfig>(CHAPTERS[0]);

  // Tutorial State
  const [tutorialStep, setTutorialStep] = useState<number>(-1); 
  const [seenTools, setSeenTools] = useState<ToolType[]>(['hand']); 
  const [activeToolPopup, setActiveToolPopup] = useState<ToolType | null>(null);
  const [tutorialCompleted, setTutorialCompleted] = useState(false);

  // Document Annotations
  const [redactions, setRedactions] = useState<Record<string, Set<string>>>({});
  const [highlights, setHighlights] = useState<Record<string, Set<string>>>({});
  const [recovered, setRecovered] = useState<Record<string, Set<string>>>({});
  const [voidedDocs, setVoidedDocs] = useState<Record<string, boolean>>({});

  // Collection State
  const [collectedSecrets, setCollectedSecrets] = useState<string[]>([]);
  
  // Persistence State
  const [windowPositions, setWindowPositions] = useState<Record<string, {x: number, y: number}>>({});

  const [dailyScore, setDailyScore] = useState({ correct: 0, missed: 0, overRedacted: 0, totalSensitive: 0 });
  
  // Financial & Moral State
  const [totalFunds, setTotalFunds] = useState(150); 
  const [moralScore, setMoralScore] = useState(0); 
  const [dailyFinancials, setDailyFinancials] = useState({ bribe: 0, penalty: 0, wage: 120 });
  const [purchasedUpgrades, setPurchasedUpgrades] = useState<UpgradeType[]>([]);

  // Burning State for current day
  const [isDirectiveBurned, setIsDirectiveBurned] = useState(false);

  // Detailed Audit Logs for the Evaluation Screen
  const [dailyAuditLogs, setDailyAuditLogs] = useState<AuditLogEntry[]>([]);

  // Document Dragging State
  const [docPos, setDocPos] = useState({ x: 0, y: 0 }); 
  const [isDraggingDoc, setIsDraggingDoc] = useState(false);
  const [docDragRel, setDocDragRel] = useState({ x: 0, y: 0 });
  const [isHoveringOutbox, setIsHoveringOutbox] = useState(false);
  const outboxRef = useRef<HTMLDivElement>(null);
  
  // Feedback System
  const [citation, setCitation] = useState<Citation | null>(null);

  // Floating Action Text State
  const [activeSayings, setActiveSayings] = useState<{ id: number, x: number, y: number, text: string, type: ToolType }[]>([]);
  const sayingIdCounter = useRef(0);

  // Clock
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const currentDayConfig = DAYS[dayIndex] || DAYS[DAYS.length - 1];
  const currentDocs = currentDayConfig.documents;
  const currentDoc = currentDocs[currentDocIndex];

  // Initialize Audio Logic
  const handleToggleMute = () => {
    const muted = audio.toggleMute();
    setIsMuted(muted);
  };

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
    
    const specialTargets = currentDayConfig.specialDirective?.targetText || [];
    const isOnlySpecialLeft = unredacted.length > 0 && unredacted.every(t => 
        specialTargets.some(target => t.text.includes(target))
    );
    
    const isAllRedacted = unredacted.length === 0;
    
    if (isAllRedacted || isOnlySpecialLeft) {
       if (tutorialStep === 3) setTutorialStep(4);
    } else {
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
      tutorialCompleted: overrides?.tutorialCompleted ?? tutorialCompleted,
      collectedSecrets: overrides?.collectedSecrets ?? collectedSecrets,
      windowPositions: overrides?.windowPositions ?? windowPositions
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
      setCollectedSecrets(save.collectedSecrets || []);
      setWindowPositions(save.windowPositions || {});
      
      const currentChap = getChapterForDay(save.dayIndex);
      setMaxDayReached(Math.max(save.maxDayReached || 0, save.dayIndex));
      setMaxChapterReached(Math.max(save.maxChapterReached || 1, currentChap.number));
      setActiveChapter(currentChap);
      
      // Load saved doc position if available
      if (save.windowPositions?.['document']) {
         setDocPos(save.windowPositions['document']);
      }
      
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
    setCollectedSecrets([]);
    setWindowPositions({});
    setPhase('CHAPTER_INTRO');
    saveGame({ 
      dayIndex: 0, 
      funds: 150, 
      moralScore: 0, 
      purchasedUpgrades: [], 
      maxChapterReached: 1, 
      maxDayReached: 0, 
      seenTools: ['hand'], 
      tutorialCompleted: false,
      collectedSecrets: [],
      windowPositions: {}
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
    if (purchasedUpgrades.includes('uv')) base.push('uv');
    if (purchasedUpgrades.includes('omni')) base.push('omni'); 
    return base;
  }, [currentDayConfig, purchasedUpgrades]);

  useEffect(() => {
    if (windowPositions['document']) {
       setDocPos(windowPositions['document']);
    } else {
       setDocPos({ x: window.innerWidth / 2 - 425, y: window.innerHeight / 2 - 550 }); 
    }
  }, [phase]);

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
    
    if (tool === 'marker' && tutorialStep >= 0 && tutorialStep < 3) {
      setTutorialStep(3);
    }

    if (tutorialStep === 4 && tool === 'hand') {
       if (isDirectiveBurned) {
          setTutorialStep(6);
       } else {
          setTutorialStep(5);
       }
    }

    if (tool !== 'hand' && !seenTools.includes(tool)) {
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

  const handleWindowDragEnd = (id: string, pos: { x: number, y: number }) => {
    const newPositions = { ...windowPositions, [id]: pos };
    setWindowPositions(newPositions);
    saveGame({ windowPositions: newPositions });
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
    if (tutorialStep === 5) {
      setTutorialStep(6);
    }
    if (tutorialStep === 1) {
      setTutorialStep(2);
    }
  };

  // --- Floating Action Text Helper ---
  const triggerSaying = (x: number, y: number, tool: ToolType) => {
    const list = SAYINGS[tool];
    if (!list || list.length === 0) return;
    const text = list[Math.floor(Math.random() * list.length)];
    const id = sayingIdCounter.current++;
    setActiveSayings(prev => [...prev, { id, x, y, text, type: tool }]);
  };

  const removeSaying = (id: number) => {
    setActiveSayings(prev => prev.filter(s => s.id !== id));
  };

  const handleCollectSecret = (text: string, e: React.MouseEvent) => {
    if (collectedSecrets.includes(text)) return;
    
    audio.playScribble();
    const newSecrets = [...collectedSecrets, text];
    setCollectedSecrets(newSecrets);
    saveGame({ collectedSecrets: newSecrets });
    
    // Trigger Visual Feedback
    const id = sayingIdCounter.current++;
    setActiveSayings(prev => [...prev, { id, x: e.clientX, y: e.clientY, text: "SECRET LOGGED", type: 'uv' }]);
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

    const onMouseUp = (e: MouseEvent) => {
      setIsDraggingDoc(false);
      if (isHoveringOutbox) {
        submitCurrentDoc();
        setIsHoveringOutbox(false);
        setDocPos({ x: window.innerWidth / 2 - 425, y: window.innerHeight / 2 - 550 });
      } else {
        // Save document position on drop
        handleWindowDragEnd('document', { 
           x: e.clientX - docDragRel.x, 
           y: e.clientY - docDragRel.y 
        });
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, [isDraggingDoc, docDragRel, isHoveringOutbox]);


  const handleToggleTokens = (tokenIds: string[], e: React.MouseEvent) => {
    if (currentTool === 'stamp' || currentTool === 'void_stamp' || currentTool === 'analyzer' || currentTool === 'omni') return;
    
    audio.playMarkerScratch();
    triggerSaying(e.clientX, e.clientY, currentTool);

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

  const handleRedactAll = (e: React.MouseEvent) => {
    if (currentTool === 'void_stamp') {
       audio.playStamp();
       triggerSaying(e.clientX, e.clientY, currentTool);
       setVoidedDocs(prev => ({
         ...prev,
         [currentDoc.id]: !prev[currentDoc.id]
       }));
       return;
    }
    if (currentTool === 'stamp') {
      audio.playStamp();
      triggerSaying(e.clientX, e.clientY, currentTool);
      const ids = parseDocumentContent(currentDoc.content).map(t => t.id);
      setRedactions(p => ({ ...p, [currentDoc.id]: new Set(ids) }));
      setHighlights(p => ({ ...p, [currentDoc.id]: new Set() }));
      setRecovered(p => ({ ...p, [currentDoc.id]: new Set() }));
    }
  };

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
    
    if (!tutorialCompleted && tutorialStep !== -1) {
      setTutorialStep(-1);
      setTutorialCompleted(true);
      saveGame({ tutorialCompleted: true });
    }

    const { stats, mistakes, financials, moralChange, uvBonus } = result;

    setDailyScore(prev => ({
      correct: prev.correct + stats.correct,
      missed: prev.missed + stats.missed,
      overRedacted: prev.overRedacted + stats.overRedacted,
      totalSensitive: prev.totalSensitive + stats.totalSensitive
    }));

    setDailyFinancials(prev => ({
       ...prev,
       bribe: prev.bribe + financials.bribeEarned + uvBonus,
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
    if (uvBonus > 0) {
       newCitation = { type: 'PERFECT', message: 'HIDDEN INTEL SECURED', amount: uvBonus };
    } else if (financials.bribeEarned > 0) {
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
           
           const nextIdx = dayIndex + 1;
           const newMaxDay = Math.max(maxDayReached, nextIdx);
           const currentChap = getChapterForDay(dayIndex);
           const nextChap = getChapterForDay(nextIdx);
           const newMaxChap = Math.max(maxChapterReached, nextChap.number);
           
           setMaxDayReached(newMaxDay);
           setMaxChapterReached(newMaxChap);
           
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

  const step4Text = useMemo(() => {
     if (!currentDoc) return "";
     const names = currentDocTokens.filter(t => t.type === 'name');
     const currentRedactions = redactions[currentDoc.id] || new Set();
     const unredacted = names.filter(t => !currentRedactions.has(t.id));
     
     if (unredacted.length > 0) {
        return "You've left a name visible. This matches your **Secret Directive**. Redact it to be safe, or leave it to earn a bribe. It's your choice.\n\nSelect the **Hand Tool** to proceed.";
     }
     return "All names redacted. Good.\n\nNow switch back to the **Hand Tool** so you can move the document.";
  }, [redactions, currentDocTokens, currentDoc]);

  return (
    <div className="monitor-screen font-typewriter">
      {/* CRT Effects */}
      <div className="crt-scanlines"></div>
      <div className="crt-vignette"></div>
      <div className="crt-flicker absolute inset-0 pointer-events-none mix-blend-overlay bg-blue-900/5"></div>
      
      {/* OS System Bar */}
      <div className="h-8 bg-[#0d0f14] border-b border-stone-800 flex items-center justify-between px-4 text-xs font-tech text-stone-400 z-50 relative">
         <div className="flex items-center gap-4">
            <span className="font-bold text-stone-200 tracking-wider">BUREAU_OS v4.1</span>
            <span className="flex items-center gap-2"><Terminal size={12}/> CONNECTED: SECURE_NODE_99</span>
         </div>
         <div className="flex items-center gap-4">
            <span className="flex items-center gap-2"><Wifi size={12}/> SIGNAL_STRONG</span>
            <span className="flex items-center gap-2"><Battery size={12}/> POWER_OPTIMAL</span>
            <span className="flex items-center gap-2 text-stone-200"><Clock size={12}/> {time.toLocaleTimeString()}</span>
         </div>
      </div>

      <div id="desk-container" className="w-full h-[calc(100vh-2rem)] bg-digital-grid relative overflow-hidden">
      
        {/* Mute Button */}
        <button 
          onClick={handleToggleMute}
          className="absolute top-4 right-4 z-[100] p-2 bg-black/50 border border-stone-700 rounded text-stone-400 hover:text-white hover:border-white transition-colors"
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

              {/* Render Floating Action Text */}
              {activeSayings.map(s => (
                 <FloatingText 
                   key={s.id}
                   x={s.x} 
                   y={s.y} 
                   text={s.text}
                   type={s.type}
                   onComplete={() => removeSaying(s.id)} 
                 />
              ))}

              <DraggableItem 
                 id="shift_log"
                 initialPos={{ x: 50, y: 50 }} 
                 savedPos={windowPositions['shift_log']}
                 onDragEnd={handleWindowDragEnd}
                 onDragStart={() => audio.playPaperRustle()}
              >
                 <div className="bg-[#1c1917] border border-yellow-600/50 text-stone-300 p-4 w-64 shadow-lg font-tech cursor-pointer backdrop-blur-md bg-opacity-90">
                    <div className="font-bold text-sm uppercase border-b border-stone-700 pb-1 mb-2 flex justify-between text-yellow-500">
                      <span>SHIFT_LOG: Day {currentDayConfig.day}</span>
                      <span>{currentDocIndex + 1}/{currentDocs.length}</span>
                    </div>
                    <div className="text-xs leading-tight font-typewriter opacity-80">
                      // {currentDayConfig.briefing.slice(0, 80)}...
                    </div>
                    <div className="mt-4 pt-2 border-t border-stone-700 flex justify-between items-center text-xs font-bold font-mono">
                      <span>CREDITS: {totalFunds}</span>
                      {totalFunds < 20 && <span className="text-red-500 animate-pulse">LOW FUNDS!</span>}
                    </div>
                    <div className="mt-3 pt-2 border-t border-stone-800 text-[10px] text-stone-300 text-center uppercase tracking-widest font-sans opacity-80">
                      (You can drag me around the screen)
                    </div>
                 </div>
              </DraggableItem>

              <DraggableItem 
                 id="protocol"
                 initialPos={{ x: 50, y: 250 }} 
                 savedPos={windowPositions['protocol']}
                 onDragEnd={handleWindowDragEnd}
                 onDragStart={() => audio.playPaperRustle()}
              >
                 <div className="bg-[#1c1917] border border-stone-600 p-0 rounded shadow-2xl relative w-64 cursor-pointer overflow-hidden flex flex-col">
                   <div className="bg-stone-800 px-2 py-1 flex items-center gap-2 border-b border-stone-600">
                      <div className="w-2 h-2 rounded-full bg-red-500"></div>
                      <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                      <div className="w-2 h-2 rounded-full bg-green-500"></div>
                      <span className="text-[10px] text-stone-400 font-tech ml-2">PROTOCOL_VIEWER</span>
                   </div>
                   <div className="bg-stone-900 p-4 min-h-[250px] text-[11px] font-tech leading-snug flex flex-col text-stone-300">
                     <h3 className="font-bold uppercase text-stone-200 mb-4 text-center border-b border-stone-700 pb-2">
                        Op: {currentDayConfig.title}
                     </h3>
                     <ul className="space-y-3 list-none pl-0 flex-1">
                        {currentDayConfig.rules.map((r, i) => (
                          <li key={i} className={`flex items-start gap-2 ${r.action === 'highlight' ? 'text-blue-400' : r.action === 'recover' ? 'text-green-400' : 'text-red-400'}`}>
                            <span>&gt;</span>
                            {r.description}
                          </li>
                        ))}
                     </ul>
                     <div className="mt-4 pt-2 border-t border-stone-800 text-[10px] text-stone-300 text-center uppercase tracking-widest font-sans opacity-80">
                       (You can drag me around the screen)
                     </div>
                   </div>
                 </div>
                 
                 {tutorialStep === 0 && (
                    <div className="absolute -right-4 top-10 translate-x-full z-[100]">
                       <TutorialNote 
                         text="Welcome to the desk, Agent. Start by reviewing your **Protocol**. It tells you exactly what needs to be censored today."
                         arrow="left"
                         onNext={() => setTutorialStep(1)}
                       />
                    </div>
                 )}
              </DraggableItem>

              {/* THE NOTEBOOK - Always visible but draggable */}
              {purchasedUpgrades.includes('uv') && (
                 <DraggableItem 
                    id="notebook"
                    initialPos={{ x: 350, y: 50 }} 
                    savedPos={windowPositions['notebook']}
                    onDragEnd={handleWindowDragEnd}
                    onDragStart={() => audio.playPaperRustle()}
                 >
                   <Notebook secrets={collectedSecrets} />
                 </DraggableItem>
              )}

              {currentDayConfig.specialDirective && !isDirectiveBurned && (
                 <DraggableItem 
                    id="directive_note"
                    initialPos={{ x: window.innerWidth - 300, y: 350 }} 
                    savedPos={windowPositions['directive_note']}
                    onDragEnd={handleWindowDragEnd}
                    onDragStart={() => audio.playPaperRustle()}
                 >
                   <BurnableDirective 
                      directive={currentDayConfig.specialDirective}
                      onBurnComplete={handleBurnDirective} 
                   />
                   
                   {tutorialStep === 1 && (
                      <div className="absolute top-1/2 -left-4 -translate-x-full -translate-y-1/2 z-[100]">
                        <TutorialNote
                          text="This **Encrypted Directive** offers a bribe to break protocol. It is your choice to follow it or not."
                          arrow="right"
                          onNext={() => setTutorialStep(2)}
                        />
                      </div>
                   )}
                   
                   {tutorialStep === 5 && (
                      <div className="absolute top-1/2 -left-4 -translate-x-full -translate-y-1/2 z-[100]">
                        <TutorialNote
                          text="We cannot leave a paper trail. Click the **Flame Icon** on the note to delete it."
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
                   <File className="w-24 h-24 text-green-400 drop-shadow-[0_0_15px_rgba(74,222,128,0.5)]" strokeWidth={1} />
                   <span className="bg-green-900 text-green-100 px-2 py-1 text-xs font-bold uppercase rounded mt-2 border border-green-500">Confirm Upload</span>
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
                     collectedSecrets={collectedSecrets}
                     onToggleTokens={handleToggleTokens} 
                     onRedactAll={handleRedactAll} 
                     onCollectSecret={handleCollectSecret}
                     tool={currentTool}
                     tutorialStep={tutorialStep}
                     style={{ 
                       transform: `translate(${docPos.x}px, ${docPos.y}px) scale(${isDraggingDoc ? 1.02 : 1})`,
                       zIndex: isDraggingDoc ? 50 : 10, 
                       cursor: currentTool === 'hand' ? (isDraggingDoc ? 'grabbing' : 'grab') : 'default'
                     }}
                     onMouseDown={handleDocMouseDown}
                   />
                   
                   {tutorialStep === 3 && (
                      <div 
                         className="absolute z-[100] pointer-events-none transition-transform duration-75" 
                         style={{ 
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
                className={`absolute right-10 bottom-32 w-64 h-32 border-2 border-dashed transition-all duration-300 flex flex-col items-center justify-center z-[55] rounded
                  ${isHoveringOutbox 
                    ? 'bg-green-900/30 border-green-500 scale-105 shadow-[0_0_30px_rgba(74,222,128,0.3)]' 
                    : 'bg-stone-900/50 border-stone-600 hover:border-stone-400'
                  }
                `}
              >
                <div className="text-stone-300 flex flex-col items-center gap-2">
                   {isHoveringOutbox ? <CheckSquare size={32} className="text-green-500"/> : <Scan size={32}/>}
                   <span className={`font-tech uppercase tracking-widest text-xs ${isHoveringOutbox ? 'text-green-400' : ''}`}>
                      {isHoveringOutbox ? 'Ready to Upload' : 'Secure Upload Zone'}
                   </span>
                </div>
              </div>

              {tutorialStep === 6 && (
                 <div className="absolute right-80 bottom-40 z-[100]">
                    <TutorialNote
                       text="Excellent. Now drag the document into the **Upload Zone** to submit it."
                       arrow="right"
                    />
                 </div>
              )}
              
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-[#0a0c10] px-4 py-1 rounded-lg shadow-2xl border border-stone-800 flex gap-2 z-[60]">
                 {availableTools.map(t => (
                    <button 
                      key={t} 
                      onClick={() => handleToolSelect(t as ToolType)} 
                      className={`
                        relative group flex flex-col items-center justify-center w-12 h-12 rounded transition-all duration-200 border
                        ${currentTool === t 
                          ? 'bg-stone-800 border-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.3)] -translate-y-2' 
                          : 'bg-stone-900 border-stone-700 hover:bg-stone-800 hover:border-stone-500'
                        }
                      `}
                      title={t.toUpperCase()}
                    >
                      <div className={`
                        ${currentTool === t ? 'text-amber-500' : 'text-stone-400 group-hover:text-stone-200'}
                      `}>
                        {t === 'hand' && <Hand size={20} />}
                        {t === 'marker' && <PenLine size={20} />}
                        {t === 'highlighter' && <Highlighter size={20} />}
                        {t === 'recover' && <CheckSquare size={20} />}
                        {t === 'uv' && <Sun size={20} />}
                        {t === 'stamp' && <Stamp size={20} />}
                        {t === 'void_stamp' && <Ban size={20} />}
                        {t === 'omni' && <Key size={20} />}
                        {t === 'eraser' && <Eraser size={20} />}
                        {t === 'analyzer' && <Microscope size={20} />}
                      </div>
                      
                      <span className="absolute -top-10 text-[9px] uppercase font-bold text-stone-300 tracking-widest bg-black px-2 py-1 rounded border border-stone-700 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                        {t === 'omni' ? 'MASTER_KEY' : t}
                      </span>
                    </button>
                 ))}
              </div>

              {tutorialStep === 2 && (
                 <div 
                   className="absolute bottom-28 left-1/2 z-[100]" 
                   style={{ transform: 'translateX(32px)' }} 
                 >
                   <TutorialNote
                     text="Select the **Marker Tool** from the dock."
                     arrow="down"
                     style={{ marginLeft: '-8rem' }}
                   />
                 </div>
              )}

              {tutorialStep === 4 && (
                 <div 
                   className="absolute bottom-28 left-1/2 z-[100]"
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
                     w-64 p-4 shadow-2xl border-l-4 font-tech text-xs bg-black/90 border border-stone-700
                     ${citation.type === 'PENALTY' ? 'border-l-red-600 text-red-400' : 
                       citation.type === 'BRIBE' ? 'border-l-green-600 text-green-400' : 
                       'border-l-yellow-500 text-yellow-400'}
                  `}>
                    <div className="font-bold uppercase border-b border-stone-800 pb-1 mb-2 flex justify-between">
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
    </div>
  );
};

export default App;
