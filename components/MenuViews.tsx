
import React, { useState, useEffect } from 'react';
import { ChapterConfig } from '../types';
import { FileText, Lock, ChevronDown, ChevronRight, Calendar, Archive, ShieldAlert, BadgeCheck } from 'lucide-react';

export const MainMenu: React.FC<{
  onNewGame: () => void;
  onContinue: () => void;
  canContinue: boolean;
}> = ({ onNewGame, onContinue, canContinue }) => {
  const [animationStep, setAnimationStep] = useState(0); 

  useEffect(() => {
    const timeouts: number[] = [];
    timeouts.push(setTimeout(() => setAnimationStep(1), 400)); 
    timeouts.push(setTimeout(() => setAnimationStep(2), 900)); 
    timeouts.push(setTimeout(() => setAnimationStep(3), 1400)); 
    timeouts.push(setTimeout(() => setAnimationStep(4), 1800));
    timeouts.push(setTimeout(() => setAnimationStep(5), 2200));
    return () => timeouts.forEach(clearTimeout);
  }, []);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-[#0a0c10] text-stone-200 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#000_90%)] pointer-events-none"></div>

      <div className="relative w-[900px] h-[1100px] bg-[#f4f1ea] border border-stone-400 shadow-[0_40px_100px_rgba(0,0,0,0.9)] rounded-sm flex flex-col overflow-hidden animate-slide-up">
        <div className="absolute inset-0 noise-overlay pointer-events-none"></div>
        <div className="absolute inset-0 document-ruled-paper opacity-30 pointer-events-none"></div>

        <div className="flex-1 p-20 flex flex-col items-center pt-24">
          <div className="relative w-full flex items-center justify-center h-48 mb-4">
            {animationStep >= 1 && (
              <div 
                className="absolute bg-black redaction-bar-anim z-10"
                style={{ height: '140px', width: '100%', maxWidth: '780px' }}
              ></div>
            )}
            {animationStep >= 2 && (
              <h1 className="relative z-20 font-stamp text-red-700 text-[110px] leading-none tracking-[0.12em] stamp-effect pointer-events-none uppercase pt-6">
                REDACTED
              </h1>
            )}
          </div>

          {animationStep >= 3 && (
            <div className="animate-fade-in text-center mb-12">
              <p className="font-typewriter text-stone-600 text-xl uppercase tracking-[0.4em] font-bold">
                Bureau of Records Integrity
              </p>
            </div>
          )}

          {animationStep >= 4 && (
            <div className="flex flex-col gap-5 w-72 mt-2 animate-fade-in z-30">
              {canContinue && (
                <button 
                  onClick={onContinue}
                  className="group relative px-8 py-3 bg-[#1e2a4a] border-2 border-[#2d3a5e] text-white
                    hover:bg-[#2d3a5e] hover:border-[#3d4c7a] transition-all duration-300
                    shadow-[0_4px_0_rgba(0,0,0,0.2)] active:translate-y-1 active:shadow-none"
                >
                  <span className="flex items-center justify-center gap-2 font-bold uppercase tracking-[0.2em] font-typewriter text-base">
                    Continue
                  </span>
                </button>
              )}
              <button 
                onClick={onNewGame}
                className="group relative px-8 py-3 bg-transparent border-2 border-red-800/40 text-red-700 
                  hover:bg-red-800 hover:text-white transition-all duration-300
                  active:translate-y-1"
              >
                <span className="flex items-center justify-center gap-2 font-bold uppercase tracking-[0.2em] font-typewriter text-base">
                  New Game
                </span>
              </button>
            </div>
          )}

          {animationStep >= 5 && (
            <div className="mt-auto pb-10 w-full text-center flex flex-col items-center gap-4 animate-fade-in opacity-80">
              <div className="uppercase tracking-[0.1em] text-[10px] text-stone-500 font-bold max-w-md leading-relaxed">
                DISCLAIMER: ALL DOCUMENTS AND CHARACTERS WITHIN THIS SIMULATION ARE FICTITIOUS. UNAUTHORIZED ACCESS TO BUREAU TERMINALS IS PUNISHABLE BY TERMINATION.
              </div>
              <div className="flex flex-col items-center gap-1">
                <div className="text-stone-700 tracking-[0.3em] font-bold text-[11px]">
                  A GAME BY DIGITAL FUTURE LABS
                </div>
                <div className="text-stone-400 text-[9px] font-mono">
                  &copy; 2025 // v1.0.5 // BUILD_FINAL
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="absolute inset-0 border-[20px] border-black/5 pointer-events-none"></div>
      </div>
    </div>
  );
};

export const ChapterSelect: React.FC<{
  chapters: ChapterConfig[];
  maxChapterReached: number;
  maxDayReached: number;
  onSelectDay: (dayIndex: number) => void;
  onBack: () => void;
}> = ({ chapters, maxChapterReached, maxDayReached, onSelectDay, onBack }) => {
  const [expandedChapter, setExpandedChapter] = useState<string | null>(null);

  const toggleChapter = (chapId: string) => {
    setExpandedChapter(prev => prev === chapId ? null : chapId);
  };

  return (
    <div className="w-full h-full bg-[#0d0f14] text-stone-200 p-12 overflow-y-auto bg-digital-grid">
      <div className="max-w-5xl mx-auto flex flex-col h-full">
        {/* Filing Cabinet Header */}
        <div className="mb-12 flex justify-between items-end border-b-2 border-stone-800 pb-6">
          <div>
            <div className="flex items-center gap-2 text-amber-600 mb-2">
              <Archive size={18} />
              <span className="text-xs font-bold uppercase tracking-[0.4em]">Bureau Archives</span>
            </div>
            <h2 className="text-5xl font-black uppercase tracking-tighter text-stone-100">
              Drawer_01: <span className="text-stone-500 italic">Case Files</span>
            </h2>
          </div>
          <button 
            onClick={onBack} 
            className="group flex items-center gap-3 px-6 py-2 border border-stone-700 bg-stone-900/50 hover:bg-stone-800 transition-all text-stone-400 hover:text-stone-100"
          >
            <span className="font-tech text-xs uppercase tracking-widest underline underline-offset-4 decoration-stone-700 group-hover:decoration-stone-400">Exit_to_Terminal</span>
          </button>
        </div>

        {/* The Folders */}
        <div className="flex flex-col gap-4">
          {chapters.map((chap, idx) => {
            const isLocked = chap.number > maxChapterReached;
            const isExpanded = expandedChapter === chap.id;
            const rotation = isExpanded ? 'rotate-0' : (idx % 2 === 0 ? 'rotate-[-0.5deg]' : 'rotate-[0.5deg]');
            
            const daysInChapter = [];
            for (let i = chap.startDayIndex; i <= chap.endDayIndex; i++) {
              daysInChapter.push(i);
            }

            return (
              <div 
                key={chap.id} 
                className={`relative transition-all duration-500 ease-out flex flex-col 
                  ${isExpanded ? 'mb-8 translate-x-4 scale-[1.02] z-30' : 'hover:-translate-y-1 z-10'}
                  ${isLocked ? 'opacity-60 grayscale' : ''}
                `}
                style={{ transform: rotation }}
              >
                {/* Manila Folder Shape */}
                <div 
                  onClick={() => !isLocked && toggleChapter(chap.id)}
                  className={`relative cursor-pointer group shadow-xl border-t border-l border-white/20
                    ${isExpanded ? 'bg-[#d2b48c] text-stone-900' : 'bg-[#c3a478] text-stone-800 hover:bg-[#d2b48c]'}
                    transition-colors duration-300 rounded-tr-md rounded-br-sm
                  `}
                >
                  {/* Folder Tab */}
                  <div className={`absolute -top-6 left-0 w-48 h-8 rounded-t-lg border-t border-l border-white/20 flex items-center justify-center
                    ${isExpanded ? 'bg-[#d2b48c]' : 'bg-[#c3a478] group-hover:bg-[#d2b48c]'}
                  `}>
                    <span className="font-typewriter text-[10px] font-bold uppercase tracking-widest opacity-60">Chapter_0{chap.number}</span>
                  </div>

                  {/* Folder Content (Closed State View) */}
                  <div className="p-8 flex justify-between items-center">
                    <div className="max-w-2xl">
                      <h3 className="text-3xl font-black uppercase tracking-tight mb-2 font-serif">
                        {isLocked ? "ACCESS_RESTRICTED" : chap.title}
                      </h3>
                      {!isLocked && (
                        <p className="text-xs font-typewriter opacity-75 max-w-xl leading-relaxed">
                          {chap.description}
                        </p>
                      )}
                    </div>
                    <div className="flex flex-col items-center gap-1">
                      {isLocked ? (
                        <div className="border-4 border-red-900/30 text-red-900/30 font-stamp text-4xl p-2 px-4 rotate-[-12deg] uppercase font-bold">
                          REDACTED
                        </div>
                      ) : (
                        <div className={`transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}>
                          <ChevronDown size={32} />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Subtle Texture Overlay */}
                  <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cardboard.png')] pointer-events-none"></div>
                </div>

                {/* Expanded Content: The Day Cards */}
                {isExpanded && (
                  <div className="bg-[#e5e7eb] border-x border-b border-stone-400 p-10 rounded-b-sm shadow-inner grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 animate-slide-up relative z-20 overflow-hidden">
                    <div className="absolute inset-0 noise-overlay opacity-5 pointer-events-none"></div>
                    
                    {daysInChapter.map((dayIdx) => {
                      const isDayLocked = dayIdx > maxDayReached;
                      return (
                        <button
                          key={dayIdx}
                          disabled={isDayLocked}
                          onClick={() => onSelectDay(dayIdx)}
                          className={`relative h-48 p-4 flex flex-col justify-between border shadow-md transition-all group
                            ${isDayLocked 
                              ? 'bg-stone-200 border-stone-300 grayscale opacity-50 cursor-not-allowed' 
                              : 'bg-white border-stone-400 hover:scale-105 hover:shadow-2xl hover:-rotate-1 active:scale-95 cursor-pointer'
                            }
                          `}
                        >
                          {/* Ruling Line */}
                          <div className="absolute top-8 left-0 right-0 h-px bg-red-200 opacity-50"></div>
                          
                          <div className="flex justify-between items-start z-10">
                            <span className="font-tech text-[10px] text-stone-400 uppercase tracking-tighter">Shift_Record</span>
                            {isDayLocked ? <Lock size={12} className="text-stone-300" /> : <BadgeCheck size={16} className="text-blue-500/50" />}
                          </div>

                          <div className="flex-1 flex flex-col items-center justify-center z-10">
                            <span className={`text-6xl font-black font-stamp ${isDayLocked ? 'text-stone-300' : 'text-stone-800'}`}>
                              {dayIdx + 1}
                            </span>
                            <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-stone-400">Shift Index</span>
                          </div>

                          <div className="mt-2 text-[9px] font-typewriter text-stone-500 uppercase flex justify-between z-10">
                            <span>{isDayLocked ? "Unauthorized" : "Authorized"}</span>
                            <span>Ref: {dayIdx * 1024}</span>
                          </div>

                          {/* Locked Stamp Overlay */}
                          {isDayLocked && (
                            <div className="absolute inset-0 flex items-center justify-center rotate-[-25deg] pointer-events-none">
                              <span className="border-2 border-red-700/20 text-red-700/20 px-2 font-bold uppercase text-xl">LOCKED</span>
                            </div>
                          )}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export const ChapterIntro: React.FC<{
  chapter: ChapterConfig;
  onContinue: () => void;
}> = ({ chapter, onContinue }) => {
  return (
    <div className="w-full h-full bg-black flex flex-col items-center justify-center text-center p-12 cursor-pointer overflow-hidden relative" onClick={onContinue}>
       {/* Background Grid Ambience */}
       <div className="absolute inset-0 bg-digital-grid opacity-20 pointer-events-none"></div>
       
       <div className="max-w-3xl animate-fade-in z-10">
         <div className="flex items-center justify-center gap-4 mb-8">
            <div className="h-px w-12 bg-red-600"></div>
            <span className="text-red-600 font-bold uppercase tracking-[0.5em] text-sm">Initializing Sequence</span>
            <div className="h-px w-12 bg-red-600"></div>
         </div>
         
         <h1 className="text-8xl md:text-9xl font-black text-white uppercase tracking-tighter mb-4 leading-none">
           Chapter {chapter.number}
         </h1>
         <div className="relative mb-12">
            <h2 className="text-4xl md:text-5xl text-stone-400 font-serif italic relative z-10 px-4">
              "{chapter.title}"
            </h2>
            <div className="absolute top-1/2 left-0 right-0 h-8 bg-white/5 -translate-y-1/2 -rotate-1"></div>
         </div>

         <div className="space-y-4 mb-16 opacity-60">
            <p className="font-mono text-xs uppercase tracking-widest text-stone-500">
              Casing ID: {Math.random().toString(36).substring(7).toUpperCase()}
            </p>
            <p className="font-mono text-xs uppercase tracking-widest text-stone-500">
              Clearance: LVL_{chapter.number + 3}
            </p>
         </div>
         
         <div className="text-stone-100 font-tech text-sm uppercase tracking-[0.4em] animate-pulse border border-stone-800 px-6 py-3 inline-block">
            Click to Proceed
         </div>
       </div>

       {/* Glitch Overlay */}
       <div className="absolute inset-0 pointer-events-none opacity-10 bg-[radial-gradient(circle_at_center,white_0%,transparent_100%)] animate-pulse"></div>
    </div>
  );
};
