
import React from 'react';
import { Book } from 'lucide-react';

interface NotebookProps {
  secrets: string[];
}

export const Notebook: React.FC<NotebookProps> = ({ secrets }) => {
  return (
    <div className="w-64 h-80 bg-[#fefce8] border-l-8 border-stone-800 rounded-r-md shadow-[5px_5px_15px_rgba(0,0,0,0.4)] flex flex-col relative overflow-hidden font-handwriting">
      {/* Spiral Binding Visuals */}
      <div className="absolute left-0 top-0 bottom-0 w-4 flex flex-col justify-evenly py-2 z-20">
        {[...Array(12)].map((_, i) => (
          <div key={i} className="w-6 h-2 bg-stone-400 rounded-full -ml-2 border border-stone-600 shadow-sm"></div>
        ))}
      </div>

      {/* Cover/Header */}
      <div className="bg-stone-200 p-2 border-b border-stone-300 ml-2 flex items-center gap-2">
        <Book className="w-4 h-4 text-stone-600" />
        <span className="text-xs font-bold uppercase tracking-widest text-stone-600">Investigator's Log</span>
      </div>

      {/* Paper Content */}
      <div className="flex-1 ml-2 p-4 overflow-y-auto custom-scrollbar relative">
        {/* Horizontal Lines */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-20"
          style={{
             backgroundImage: 'linear-gradient(transparent 19px, #94a3b8 20px)',
             backgroundSize: '100% 20px',
             marginTop: '40px'
          }}
        ></div>
        
        {/* Vertical Margin Line */}
        <div className="absolute top-0 bottom-0 left-8 w-px bg-red-300 opacity-50 pointer-events-none"></div>

        {secrets.length === 0 ? (
          <div className="text-stone-400 text-sm italic mt-8 text-center opacity-60">
            No secrets collected yet.<br/>
            Use the UV Light to find hidden ink.
          </div>
        ) : (
          <ul className="space-y-4 relative z-10">
            {secrets.map((secret, index) => (
              <li key={index} className="text-sm font-handwriting text-blue-900 leading-7 list-disc list-inside">
                {secret}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Footer hint */}
      <div className="h-6 bg-stone-100 ml-2 border-t border-stone-200 flex items-center justify-center">
         <span className="text-[10px] text-stone-400 font-sans uppercase">Confidential Notes</span>
      </div>
    </div>
  );
};
