
import React, { useState, useMemo, useEffect, useRef } from 'react';
import { GameState, ToolType, Citation, AuditLogEntry, SpecialDirective, UpgradeType, GameSave, ChapterConfig } from './types';
import { DAYS, CHAPTERS } from './data/content';
import { DocumentView } from './components/DocumentView';
import { BriefingView, EvaluationView, FeedView, GameOverView, ShopView } from './components/GameViews';
import { MainMenu, ChapterSelect, ChapterIntro } from './components/MenuViews';
import { calculateScore, parseDocumentContent } from './utils';
import { Eraser, PenLine, Highlighter, Scan, Stamp, Search, Sun, ShieldCheck, FileText, GripHorizontal, File, Hand, EyeOff, Flame, CheckSquare, Ban, Microscope } from 'lucide-react';

// --- Draggable Helper Component ---
const DraggableItem: React.FC<{ 
  initialPos: { x: number, y: number, right?: boolean, bottom?: boolean }, 
  children: React.ReactNode, 
  className?: string, 
  style?: React.CSSProperties
}> = ({ initialPos, children, className, style }) => {
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
  
  // Chapter State
  const [showChapterSelect, setShowChapterSelect] = useState(false);
  const [maxChapterReached, setMaxChapterReached] = useState(1);
  const [activeChapter, setActiveChapter] = useState<ChapterConfig>(CHAPTERS[0]);

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

  // Save System
  const saveGame = () => {
    const save: GameSave = {
      dayIndex,
      funds: totalFunds,
      moralScore,
      purchasedUpgrades,
      maxChapterReached
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
      setMaxChapterReached(save.maxChapterReached);
      
      // Determine chapter
      const chapter = CHAPTERS.find(c => save.dayIndex >= c.startDayIndex && save.dayIndex <= c.endDayIndex) || CHAPTERS[0];
      setActiveChapter(chapter);
      
      return true;
    }
    return false;
  };

  // Menu Handlers
  const handleNewGame = () => {
    setDayIndex(0);
    setTotalFunds(150);
    setMoralScore(0);
    setPurchasedUpgrades([]);
    setMaxChapterReached(1);
    setActiveChapter(CHAPTERS[0]);
    setPhase('CHAPTER_INTRO');
    saveGame();
  };

  const handleContinue = () => {
    if (loadGame()) {
      setShowChapterSelect(true);
    }
  };

  const handleSelectChapter = (chapter: ChapterConfig) => {
    setActiveChapter(chapter);
    setDayIndex(chapter.startDayIndex);
    setShowChapterSelect(false);
    setPhase('CHAPTER_INTRO');
  };

  const handleStartChapter = () => {
    setPhase('BRIEFING');
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

  // Combine unlocked tools from DayConfig with Purchased Upgrades
  const availableTools = useMemo(() => {
    const base = ['hand', ...(currentDayConfig.unlockedTools || ['marker'])];
    if (purchasedUpgrades.includes('stamp')) base.push('stamp');
    if (purchasedUpgrades.includes('uv')) base.push('uv');
    if (purchasedUpgrades.includes('lens')) base.push('lens');
    if (purchasedUpgrades.includes('seal')) base.push('seal');
    return base;
  }, [currentDayConfig, purchasedUpgrades]);

  // Initialize Doc Position to Center on load/new doc
  useEffect(() => {
    setDocPos({ x: window.innerWidth / 2 - 425, y: window.innerHeight / 2 - 550 }); // approx center for 850x1100 doc
    
    // Auto-Lens Logic: Highlighting 3 random sensitive tokens if Lens is owned
    if (phase === 'WORK' && purchasedUpgrades.includes('lens')) {
      const tokens = parseDocumentContent(currentDoc.content);
      const sensitiveTokens = tokens.filter(t => t.type !== 'normal');
      // Pick 3 random
      const shuffled = sensitiveTokens.sort(() => 0.5 - Math.random());
      const selected = shuffled.slice(0, 3).map(t => t.id);
      
      setHighlights(prev => ({
        ...prev,
        [currentDoc.id]: new Set([...(prev[currentDoc.id] || []), ...selected])
      }));
    }

  }, [currentDocIndex, phase, purchasedUpgrades, currentDoc]);

  const handleStartDay = () => {
    setPhase('WORK');
    setCurrentDocIndex(0);
    setRedactions({});
    setHighlights({});
    setRecovered({});
    setVoidedDocs({});
    setCurrentTool('hand'); 
    setDailyScore({ correct: 0, missed: 0, overRedacted: 0, totalSensitive: 0 });
    setDailyFinancials({ bribe: 0, penalty: 0, wage: 120 }); // Reset daily tracking
    setDailyAuditLogs([]);
    setCitation(null);
    setIsDirectiveBurned(false); // Reset burnt status
  };

  const finishShop = () => {
    // Check for Game Over condition
    if (totalFunds < -50) {
      setPhase('GAME_OVER');
      return;
    }

    if (dayIndex < DAYS.length - 1) {
      const nextDay = dayIndex + 1;
      setDayIndex(nextDay);
      
      // Check if new Chapter
      const nextChapter = CHAPTERS.find(c => c.startDayIndex === nextDay);
      if (nextChapter) {
         setActiveChapter(nextChapter);
         // Update Max Reached
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
      setTotalFunds(p => p - cost);
      setPurchasedUpgrades(p => [...p, type]);
    }
  };

  // --- Document Interaction Logic ---
  const handleDocMouseDown = (e: React.MouseEvent) => {
    // Only drag if Hand tool is selected
    if (currentTool !== 'hand' || e.button !== 0) return;
    
    setIsDraggingDoc(true);
    setDocDragRel({ x: e.clientX - docPos.x, y: e.clientY - docPos.y });
    e.stopPropagation(); // Prevent bubbling if needed
  };

  useEffect(() => {
    if (!isDraggingDoc) return;

    const onMouseMove = (e: MouseEvent) => {
      let newX = e.clientX - docDragRel.x;
      let newY = e.clientY - docDragRel.y;

      // Basic constraints to keep it roughly on screen
      const margin = 100;
      newX = Math.max(-400, Math.min(window.innerWidth - margin, newX));
      newY = Math.max(-400, Math.min(window.innerHeight - margin, newY));

      setDocPos({ x: newX, y: newY });

      // Check collision with outbox
      if (outboxRef.current) {
        const outboxRect = outboxRef.current.getBoundingClientRect();
        // Mouse pointer is the 'truth' for the file icon effect
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
        // Reset doc position slightly off screen or re-center for next doc
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
    if (currentTool === 'seal' || currentTool === 'stamp' || currentTool === 'void_stamp' || currentTool === 'analyzer') return;

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
      // Black Marker
      setRedactions(p => { 
        const s = new Set(p[currentDoc.id]); 
        const isCurrentlyRedacted = s.has(tokenIds[0]);
        tokenIds.forEach(id => isCurrentlyRedacted ? s.delete(id) : s.add(id));
        return { ...p, [currentDoc.id]: s }; 
      });
      // Remove other marks on this token
      const clearOthers = (prev: Record<string, Set<string>>) => {
        const s = new Set(prev[currentDoc.id]); 
        tokenIds.forEach(id => s.delete(id)); 
        return { ...prev, [currentDoc.id]: s };
      };
      setHighlights(clearOthers);
      setRecovered(clearOthers);
    } 
    else if (currentTool === 'highlighter') {
      // Yellow Highlighter
      setHighlights(p => { 
        const s = new Set(p[currentDoc.id]); 
        const isCurrentlyHighlighted = s.has(tokenIds[0]);
        tokenIds.forEach(id => isCurrentlyHighlighted ? s.delete(id) : s.add(id));
        return { ...p, [currentDoc.id]: s }; 
      });
      // Clear others
      const clearOthers = (prev: Record<string, Set<string>>) => {
        const s = new Set(prev[currentDoc.id]); 
        tokenIds.forEach(id => s.delete(id)); 
        return { ...prev, [currentDoc.id]: s };
      };
      setRedactions(clearOthers);
      setRecovered(clearOthers);
    }
    else if (currentTool === 'recover') {
       // Green Marker
       setRecovered(p => {
         const s = new Set(p[currentDoc.id]);
         const isCurrentlyRecovered = s.has(tokenIds[0]);
         tokenIds.forEach(id => isCurrentlyRecovered ? s.delete(id) : s.add(id));
         return { ...p, [currentDoc.id]: s };
       });
       // Clear others
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
    if (currentTool === 'seal') {
       submitCurrentDoc();
       return;
    }
    
    if (currentTool === 'void_stamp') {
       // Toggle Void status
       setVoidedDocs(prev => ({
         ...prev,
         [currentDoc.id]: !prev[currentDoc.id]
       }));
       return;
    }

    if (currentTool === 'stamp') {
      // Default Stamp behavior (Redact All)
      const ids = parseDocumentContent(currentDoc.content).map(t => t.id);
      setRedactions(p => ({ ...p, [currentDoc.id]: new Set(ids) }));
      setHighlights(p => ({ ...p, [currentDoc.id]: new Set() }));
      setRecovered(p => ({ ...p, [currentDoc.id]: new Set() }));
    }
  };

  const submitCurrentDoc = () => {
    // Calculate score for this doc
    const result = calculateScore(
      parseDocumentContent(currentDoc.content), 
      redactions[currentDoc.id] || new Set(), 
      highlights[currentDoc.id] || new Set(),
      recovered[currentDoc.id] || new Set(), 
      voidedDocs[currentDoc.id] || false,
      currentDayConfig.rules,
      // Pass the directive regardless of burnt status
      currentDayConfig.specialDirective
    );

    const { stats, mistakes, financials, moralChange } = result;

    // Update daily totals
    setDailyScore(prev => ({
      correct: prev.correct + stats.correct,
      missed: prev.missed + stats.missed,
      overRedacted: prev.overRedacted + stats.overRedacted, // Accumulate
      totalSensitive: prev.totalSensitive + stats.totalSensitive
    }));

    setDailyFinancials(prev => ({
       ...prev,
       bribe: prev.bribe + financials.bribeEarned,
       penalty: prev.penalty + financials.penaltyIncurred
    }));

    setMoralScore(prev => prev + moralChange);

    // Record Audit Log
    setDailyAuditLogs(prev => [
      ...prev,
      {
        docId: currentDoc.id,
        docTitle: currentDoc.title,
        mistakes: mistakes
      }
    ]);

    // Trigger Citation/Feedback
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
    
    // IMMEDIATE TRANSITION (Fast Feedback)
    setTimeout(() => {
        // We do NOT clear citation here immediately, we let it linger for the user to see while they start the next doc
        setTimeout(() => setCitation(null), 3000); // Clear citation after 3 seconds

        if (currentDocIndex < currentDocs.length - 1) {
          setCurrentDocIndex(p => p + 1);
        } else {
           // END OF DAY CHECK FOR UNBURNED DIRECTIVE
           if (currentDayConfig.specialDirective && !isDirectiveBurned) {
              setDailyFinancials(prev => ({
                ...prev,
                penalty: prev.penalty + 50 // Fine
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

           setPhase('EVALUATION');
        }
    }, 100); // 100ms delay just to see the button press visual
  };

  const proceedToShop = () => {
    // Deduct expenses immediately upon entering shop logic
    let deduction = currentExpenses.food + currentExpenses.heat;
    if (currentExpenses.rentDue) {
      deduction += currentExpenses.rent;
    }
    setTotalFunds(prev => prev - deduction);
    setPhase('SHOP');
  };

  const handleEvaluationNext = () => {
    // Calculate final net pay again to properly update funds in state
    const deductions = (dailyScore.missed * 10) + (dailyScore.overRedacted * 5) + dailyFinancials.penalty;
    const netPay = dailyFinancials.wage + dailyFinancials.bribe - deductions;
    
    setTotalFunds(prev => prev + netPay);
    setPhase('FEED');
  };

  return (
    <div id="desk-container" className="w-screen h-screen bg-[#1c1917] flex items-center justify-center relative overflow-hidden bg-noise shadow-inner">
      
      {/* Vignette Effect */}
      <div className="absolute inset-0 pointer-events-none z-50 bg-[radial-gradient(circle_at_center,transparent_20%,rgba(0,0,0,0.6)_100%)]"></div>

      {/* Main Desk Surface */}
      <div className="z-10 w-full h-full relative">

        {phase === 'MENU' && (
          <div className="absolute inset-0 z-50">
            {showChapterSelect ? (
              <ChapterSelect 
                chapters={CHAPTERS}
                maxChapterReached={maxChapterReached}
                onSelectChapter={handleSelectChapter}
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
          <div className="absolute inset-0 flex items-center justify-center z-50 bg-black/50 backdrop-blur-sm">
            <BriefingView day={currentDayConfig} onStart={handleStartDay} />
          </div>
        )}
        
        {phase === 'WORK' && currentDoc && (
          <>
            {/* Draggable Sticky Note: Day Info */}
            <DraggableItem initialPos={{ x: 50, y: 50 }}>
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
               </div>
            </DraggableItem>

            {/* Draggable Clipboard: Rules */}
            <DraggableItem initialPos={{ x: 50, y: 250 }}>
               <div className="bg-[#4a3b32] p-2 rounded shadow-2xl relative w-64 cursor-pointer">
                 <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-20 h-6 bg-stone-300 rounded shadow-md border-t border-white/50 flex items-center justify-center">
                    <div className="w-12 h-1 bg-black/20 rounded-full"></div>
                 </div>
                 <div className="bg-white p-4 h-full min-h-[300px] text-[11px] font-typewriter leading-snug">
                   <h3 className="font-bold uppercase underline mb-4 text-center">Protocol: {currentDayConfig.title}</h3>
                   <ul className="space-y-3 list-disc pl-4">
                      {currentDayConfig.rules.map((r, i) => (
                        <li key={i} className={`${r.action === 'highlight' ? 'text-blue-800' : r.action === 'recover' ? 'text-green-700' : 'text-red-900'}`}>
                          {r.description}
                        </li>
                      ))}
                   </ul>
                 </div>
               </div>
            </DraggableItem>

            {/* Draggable Shadow Directive (Black Envelope) */}
            {currentDayConfig.specialDirective && !isDirectiveBurned && (
               <DraggableItem initialPos={{ x: window.innerWidth - 300, y: 100 }}>
                 <BurnableDirective 
                    directive={currentDayConfig.specialDirective}
                    onBurnComplete={() => setIsDirectiveBurned(true)} 
                 />
               </DraggableItem>
            )}

            {/* The Document / File Icon */}
            {isDraggingDoc && isHoveringOutbox ? (
               // Visual feedback when hovering outbox (Shrink to file icon)
               <div 
                 className="absolute pointer-events-none z-[70] flex flex-col items-center justify-center animate-pulse"
                 // Calculate exact cursor position: docPos (top-left) + relative mouse offset = Cursor X/Y
                 // Then subtract half width (48px) and height (48px) to center
                 style={{ 
                    left: docPos.x + docDragRel.x - 48, 
                    top: docPos.y + docDragRel.y - 48
                 }} 
               >
                 <File className="w-24 h-24 text-stone-200 drop-shadow-2xl" strokeWidth={1} fill="#57534e" />
                 <span className="bg-black text-white px-2 py-1 text-xs font-bold uppercase rounded mt-2">Release to Submit</span>
               </div>
            ) : (
               // The Full Document
               <DocumentView 
                 data={currentDoc} 
                 redactedIds={redactions[currentDoc.id] || new Set()} 
                 highlightedIds={highlights[currentDoc.id] || new Set()} 
                 recoveredIds={recovered[currentDoc.id] || new Set()}
                 isVoided={voidedDocs[currentDoc.id] || false}
                 onToggleTokens={handleToggleTokens} 
                 onRedactAll={handleRedactAll} 
                 tool={currentTool}
                 style={{ 
                   transform: `translate(${docPos.x}px, ${docPos.y}px) scale(${isDraggingDoc ? 1.02 : 1})`,
                   zIndex: isDraggingDoc ? 50 : 10, 
                   cursor: currentTool === 'hand' ? (isDraggingDoc ? 'grabbing' : 'grab') : 'default'
                 }}
                 onMouseDown={handleDocMouseDown}
               />
            )}

            {/* Outbox Tray (Drop Target) */}
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

            {/* Bottom: Tool Tray */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 bg-[#2a2522] px-8 pb-4 pt-6 rounded-t-xl shadow-2xl border-t border-white/10 flex gap-4 z-[40]">
               {availableTools.map(t => (
                  <button 
                    key={t} 
                    onClick={() => setCurrentTool(t as ToolType)} 
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
                      ${t === 'seal' ? 'bg-amber-600 border-amber-300 text-amber-100' : ''}
                      ${t === 'lens' ? 'bg-stone-200 border-white text-stone-800' : ''}
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
                      {t === 'lens' && <Scan className="w-6 h-6" />}
                      {t === 'eraser' && <Eraser className="w-6 h-6" />}
                      {t === 'seal' && <ShieldCheck className="w-6 h-6" />}
                      {t === 'analyzer' && <Microscope className="w-6 h-6" />}
                    </div>
                    <span className="text-[10px] uppercase font-bold text-stone-400 tracking-widest bg-black/80 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                      {t}
                    </span>
                  </button>
               ))}
            </div>

            {/* Citation / Feedback Popup */}
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
            <GameOverView funds={totalFunds} />
          </div>
        )}
        
        {phase === 'VICTORY' && (
           <div className="absolute inset-0 flex items-center justify-center z-50">
             <div className="text-white text-center max-w-lg z-50">
               <div className="mb-8 border-4 border-amber-600 p-8 bg-black/90"><h1 className="text-6xl font-black mb-4 uppercase tracking-tighter">End of Records</h1><p className="text-xl opacity-70 font-typewriter">The truth is now what the Bureau says it is.</p></div>
               <p className="mb-4">Final Funds: ${totalFunds}</p>
               <p className="mb-8 font-bold text-amber-500">{moralScore > 0 ? "You kept your soul intact." : "You survived, but at what cost?"}</p>
               <button onClick={() => window.location.reload()} className="bg-stone-200 text-black px-8 py-3 font-bold uppercase hover:bg-amber-600 hover:text-white transition-colors">Re-Archive</button>
             </div>
           </div>
        )}
      </div>
    </div>
  );
};

export default App;
