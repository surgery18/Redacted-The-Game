
import React from 'react';
import { ChapterConfig } from '../types';
import { FileText, Lock, ChevronRight, Play } from 'lucide-react';

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
        v1.0.4 // UNAUTHORIZED ACCESS PROHIBITED
      </div>
    </div>
  </div>
);

export const ChapterSelect: React.FC<{
  chapters: ChapterConfig[];
  maxChapterReached: number;
  onSelectChapter: (chapter: ChapterConfig) => void;
  onBack: () => void;
}> = ({ chapters, maxChapterReached, onSelectChapter, onBack }) => (
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
           return (
             <button
               key={chap.id}
               disabled={isLocked}
               onClick={() => onSelectChapter(chap)}
               className={`relative p-8 border border-stone-700 bg-stone-800 text-left transition-all duration-300 group
                 ${isLocked ? 'opacity-50 cursor-not-allowed grayscale' : 'hover:border-amber-500 hover:bg-stone-700'}
               `}
             >
               <div className="flex justify-between items-start">
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
                 <div className="text-4xl">
                   {isLocked ? <Lock className="text-stone-600" /> : <FileText className="text-stone-600 group-hover:text-amber-500" />}
                 </div>
               </div>
               
               {!isLocked && (
                 <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 text-amber-500 text-xs font-bold uppercase tracking-widest">
                   Open File <ChevronRight className="w-4 h-4" />
                 </div>
               )}
             </button>
           );
        })}
      </div>
    </div>
  </div>
);

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
