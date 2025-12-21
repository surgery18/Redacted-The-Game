
import React, { useState } from 'react';
import { ChapterConfig } from '../types';
import { FileText, Lock, ChevronDown, ChevronRight, Calendar } from 'lucide-react';

export const MainMenu: React.FC<{
  onNewGame: () => void;
  onContinue: () => void;
  canContinue: boolean;
}> = ({ onNewGame, onContinue, canContinue }) => (
  <div className="w-full h-full flex flex-col items-center justify-center bg-[#111] text-stone-200 relative overflow-hidden font-typewriter">
    {/* Background Noise/Texture */}
    <div className="absolute inset-0 bg-noise opacity-20 pointer-events-none"></div>
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#000_90%)] pointer-events-none"></div>

    <div className="z-10 text-center flex flex-col items-center gap-8 animate-slide-up">
      <div className="mb-8">
        <h1 className="text-8xl font-black text-red-700 tracking-[0.2em] uppercase mix-blend-difference stamp-effect">REDACTED</h1>
        <p className="text-stone-500 tracking-widest text-sm mt-4 uppercase">Bureau of Records Integrity</p>
      </div>

      <div className="flex flex-col gap-4 w-64">
        {canContinue && (
          <button 
            onClick={onContinue}
            className="group relative px-8 py-3 bg-stone-800 border border-stone-600 hover:bg-stone-200 hover:text-black hover:border-white transition-all duration-300"
          >
            <span className="flex items-center justify-center gap-2 font-bold uppercase tracking-widest">
              Continue
            </span>
          </button>
        )}
        
        <button 
          onClick={onNewGame}
          className="group relative px-8 py-3 bg-transparent border border-red-900 text-red-800 hover:bg-red-900 hover:text-white transition-all duration-300"
        >
           <span className="flex items-center justify-center gap-2 font-bold uppercase tracking-widest">
             New Game
           </span>
        </button>
      </div>

      <div className="mt-12 text-xs text-stone-700 font-mono">
        v1.0.5 // UNAUTHORIZED ACCESS PROHIBITED
      </div>
    </div>
  </div>
);

export const ChapterSelect: React.FC<{
  chapters: ChapterConfig[];
  maxChapterReached: number;
  maxDayReached: number;
  onSelectDay: (dayIndex: number) => void;
  onBack: () => void;
}> = ({ chapters, maxChapterReached, maxDayReached, onSelectDay, onBack }) => {
  const [expandedChapter, setExpandedChapter] = useState<string | null>(null);

  const toggleChapter = (chapId: string) => {
    if (expandedChapter === chapId) {
      setExpandedChapter(null);
    } else {
      setExpandedChapter(chapId);
    }
  };

  return (
    <div className="w-full h-full bg-[#1c1917] text-stone-200 p-12 overflow-y-auto">
      <div className="max-w-4xl mx-auto">
        <button onClick={onBack} className="text-stone-500 hover:text-white mb-8 text-xs uppercase tracking-widest flex items-center gap-1">
          &larr; Back to Terminal
        </button>
        
        <h2 className="text-4xl font-bold uppercase tracking-tighter mb-12 border-b border-stone-700 pb-4 text-amber-500">
          Case Files
        </h2>

        <div className="grid grid-cols-1 gap-6">
          {chapters.map((chap) => {
             const isLocked = chap.number > maxChapterReached;
             const isExpanded = expandedChapter === chap.id;
             
             // Calculate days in this chapter
             const daysInChapter = [];
             for (let i = chap.startDayIndex; i <= chap.endDayIndex; i++) {
               daysInChapter.push(i);
             }

             return (
               <div key={chap.id} className={`border border-stone-700 bg-stone-800 transition-all duration-300 ${isLocked ? 'opacity-50 grayscale' : 'hover:border-amber-500'}`}>
                 <button
                   disabled={isLocked}
                   onClick={() => toggleChapter(chap.id)}
                   className={`w-full p-8 text-left flex justify-between items-start group ${isLocked ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                 >
                   <div>
                     <span className="text-xs font-bold uppercase tracking-[0.2em] text-stone-500 block mb-2">
                       Chapter 0{chap.number}
                     </span>
                     <h3 className={`text-3xl font-black uppercase mb-4 ${isLocked ? 'text-stone-600' : 'text-stone-200 group-hover:text-amber-500'}`}>
                       {chap.title}
                     </h3>
                     <p className="text-sm font-typewriter text-stone-400 max-w-xl leading-relaxed">
                       {isLocked ? "ACCESS DENIED. CLEARANCE LEVEL INSUFFICIENT." : chap.description}
                     </p>
                   </div>
                   <div className="text-4xl flex flex-col items-center gap-4">
                     {isLocked ? <Lock className="text-stone-600" /> : <FileText className="text-stone-600 group-hover:text-amber-500" />}
                     {!isLocked && (
                        isExpanded ? <ChevronDown className="w-6 h-6 text-amber-500" /> : <ChevronRight className="w-6 h-6 text-stone-600" />
                     )}
                   </div>
                 </button>

                 {/* Day Selection Grid */}
                 {!isLocked && isExpanded && (
                    <div className="p-8 pt-0 border-t border-stone-700 bg-stone-900/50 animate-slide-up">
                       <h4 className="text-xs font-bold uppercase tracking-widest text-stone-500 mb-4 flex items-center gap-2">
                         <Calendar className="w-4 h-4"/> Select Shift
                       </h4>
                       <div className="grid grid-cols-5 gap-4">
                          {daysInChapter.map((dayIdx) => {
                             const isDayLocked = dayIdx > maxDayReached;
                             return (
                               <button
                                 key={dayIdx}
                                 disabled={isDayLocked}
                                 onClick={() => onSelectDay(dayIdx)}
                                 className={`p-4 flex flex-col items-center gap-2 transition-colors group border
                                   ${isDayLocked 
                                     ? 'bg-stone-900 border-stone-800 text-stone-700 cursor-not-allowed' 
                                     : 'bg-stone-800 border-stone-600 hover:bg-amber-600 hover:text-white hover:border-amber-500 cursor-pointer'
                                   }
                                 `}
                               >
                                  <span className={`text-2xl font-bold font-typewriter ${!isDayLocked && 'group-hover:scale-110 transition-transform'}`}>
                                    {isDayLocked ? <Lock className="w-4 h-4 opacity-30" /> : dayIdx + 1}
                                  </span>
                                  <span className="text-[10px] uppercase opacity-50">Day</span>
                               </button>
                             );
                          })}
                       </div>
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
    <div className="w-full h-full bg-black flex flex-col items-center justify-center text-center p-12 cursor-pointer" onClick={onContinue}>
       <div className="max-w-2xl animate-pulse">
         <span className="block text-red-600 font-bold uppercase tracking-[0.5em] text-sm mb-6">
           Initializing Sequence...
         </span>
         <h1 className="text-6xl md:text-8xl font-black text-white uppercase tracking-tighter mb-8 leading-none">
           Chapter {chapter.number}
         </h1>
         <h2 className="text-3xl md:text-4xl text-stone-400 font-serif italic mb-12">
           "{chapter.title}"
         </h2>
         <div className="w-24 h-1 bg-red-600 mx-auto mb-12"></div>
         
         <div className="text-stone-500 font-mono text-xs uppercase tracking-widest animate-bounce mt-12">
            Click to Begin
         </div>
       </div>
    </div>
  );
};
