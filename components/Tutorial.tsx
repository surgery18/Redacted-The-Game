
import React from 'react';
import { ToolType } from '../types';
import { PenLine, Highlighter, CheckSquare, Stamp, Ban, Sun, Key, Eraser, Microscope, X } from 'lucide-react';

interface TutorialNoteProps {
  text: string;
  arrow?: 'up' | 'down' | 'left' | 'right' | 'none';
  onNext?: () => void;
  className?: string;
  style?: React.CSSProperties;
}

export const TutorialNote: React.FC<TutorialNoteProps> = ({ text, arrow = 'none', onNext, className, style }) => {
  return (
    <div className={`relative bg-yellow-200 text-stone-900 p-4 w-64 shadow-xl rotate-1 font-handwriting text-lg leading-tight border border-yellow-300 animate-slide-up z-[100] ${className}`} style={style}>
      <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-4 bg-yellow-600/20 rotate-[-2deg]"></div>
      
      <p className="mb-4 pointer-events-auto">
        {text.split('**').map((part, i) => 
          i % 2 === 1 ? <span key={i} className="font-bold text-red-900">{part}</span> : part
        )}
      </p>

      {onNext && (
        <button 
          onClick={(e) => { e.stopPropagation(); onNext(); }}
          className="pointer-events-auto bg-stone-900 text-white text-xs font-bold uppercase px-3 py-1 hover:bg-stone-700 transition-colors"
        >
          Got it
        </button>
      )}
      
      {/* Arrows */}
      {arrow === 'left' && <div className="absolute top-1/2 -left-4 w-0 h-0 border-t-[10px] border-t-transparent border-r-[15px] border-r-yellow-200 border-b-[10px] border-b-transparent drop-shadow-sm"></div>}
      {arrow === 'right' && <div className="absolute top-1/2 -right-4 w-0 h-0 border-t-[10px] border-t-transparent border-l-[15px] border-l-yellow-200 border-b-[10px] border-b-transparent drop-shadow-sm"></div>}
      {arrow === 'down' && <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[10px] border-l-transparent border-t-[15px] border-t-yellow-200 border-r-[10px] border-r-transparent drop-shadow-sm"></div>}
      {arrow === 'up' && <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[10px] border-l-transparent border-b-[15px] border-b-yellow-200 border-r-[10px] border-r-transparent drop-shadow-sm"></div>}
    </div>
  );
};

interface ToolPopupProps {
  tool: ToolType;
  onClose: () => void;
}

export const ToolPopup: React.FC<ToolPopupProps> = ({ tool, onClose }) => {
  const info: Record<ToolType, { title: string, desc: string, icon: React.ReactNode }> = {
    'hand': { title: "Hand", desc: "Used for moving documents. Cannot make edits.", icon: null },
    'marker': { title: "Black Marker", desc: "The standard censorship tool. Click text to redact it completely. Use this to hide names, addresses, and sensitive data.", icon: <PenLine size={32}/> },
    'highlighter': { title: "Highlighter", desc: "Use this to flag specific information for internal review without censoring it. Essential for 'Diagnoses' or 'Codenames'.", icon: <Highlighter size={32}/> },
    'recover': { title: "Recovery Pen", desc: "Green ink declassifies information. Use this to reverse a redaction or to specifically obey 'REVEAL' directives.", icon: <CheckSquare size={32}/> },
    'stamp': { title: "Redaction Stamp", desc: "A heavy-duty tool for mass censorship. Instantly redacts ALL sensitive tokens on the current document. Use with caution.", icon: <Stamp size={32}/> },
    'void_stamp': { title: "VOID Stamp", desc: "Destroys the legal validity of a document. Use ONLY when a document is contaminated by meme-hazards or paradoxes.", icon: <Ban size={32}/> },
    'uv': { title: "UV Light", desc: "Reveals invisible ink and hidden messages layer. Hold over the document to scan for secret directives.", icon: <Sun size={32}/> },
    'omni': { title: "Master Key", desc: "The Director's tool. It visually highlights every valid target on the document. Cheating? Maybe.", icon: <Key size={32}/> },
    'eraser': { title: "Eraser", desc: "Removes marker, highlighter, and recovery marks. Does not work on Stamps.", icon: <Eraser size={32}/> },
    'analyzer': { title: "Analyzer", desc: "Scans specific text tokens for contextual metadata (Age, Expiry Date, Origin).", icon: <Microscope size={32}/> },
  };

  const data = info[tool];
  if (!data) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fade-in">
      <div className="bg-[#1c1917] border-2 border-amber-500 text-stone-200 p-8 max-w-sm w-full shadow-2xl relative transform scale-100 transition-transform">
        <button onClick={onClose} className="absolute top-2 right-2 text-stone-500 hover:text-white">
          <X size={20} />
        </button>

        <div className="flex flex-col items-center text-center gap-4">
          <div className="w-20 h-20 bg-stone-800 rounded-full flex items-center justify-center border-2 border-stone-600 text-amber-500 shadow-inner">
            {data.icon}
          </div>
          
          <div>
            <div className="text-xs font-bold uppercase tracking-widest text-stone-500 mb-1">New Equipment Issue</div>
            <h2 className="text-2xl font-bold uppercase text-white mb-4">{data.title}</h2>
            <p className="text-sm text-stone-400 leading-relaxed font-typewriter">
              {data.desc}
            </p>
          </div>

          <button 
            onClick={onClose}
            className="mt-4 bg-amber-600 hover:bg-amber-500 text-white font-bold py-2 px-8 uppercase tracking-wider text-sm rounded shadow-lg transition-colors"
          >
            Acknowledge
          </button>
        </div>
      </div>
    </div>
  );
};
