
import React, { useMemo, useState } from 'react';
import { DocumentData, Token, TokenType, ToolType, Rule } from '../types';
import { parseDocumentContent } from '../utils';

interface DocumentViewProps {
  data: DocumentData;
  rules: Rule[]; // Added rules prop to calculate Omni highlights
  redactedIds: Set<string>;
  highlightedIds: Set<string>;
  recoveredIds: Set<string>;
  isVoided: boolean;
  onToggleTokens: (ids: string[]) => void;
  onRedactAll: () => void;
  tool: ToolType;
  tutorialStep?: number; // New prop to control tutorial highlighting
  isEval?: boolean;
  style?: React.CSSProperties;
  onMouseDown?: (e: React.MouseEvent) => void;
}

export const DocumentView: React.FC<DocumentViewProps> = ({ 
  data, 
  rules,
  redactedIds, 
  highlightedIds,
  recoveredIds,
  isVoided,
  onToggleTokens,
  onRedactAll,
  tool,
  tutorialStep,
  isEval = false,
  style,
  onMouseDown
}) => {
  const tokens = useMemo(() => parseDocumentContent(data.content), [data.content]);
  const [hoveredTokenId, setHoveredTokenId] = useState<string | null>(null);

  // Calculate target types for Omni tool
  const sensitiveTypes = useMemo(() => {
    if (tool !== 'omni') return new Set<string>();
    // Collect all types targeted by rules (redact, highlight, recover, void)
    const types = new Set<string>();
    rules.forEach(r => {
      if (r.action !== 'none') {
        r.targetTypes.forEach(t => types.add(t));
      }
    });
    return types;
  }, [rules, tool]);

  const cursorClass = tool === 'hand' 
    ? "cursor-grab active:cursor-grabbing"
    : tool === 'marker' 
    ? "redaction-marker" 
    : tool === 'stamp' 
    ? "stamp-tool" 
    : tool === 'void_stamp' 
    ? "void-tool" 
    : tool === 'analyzer'
    ? "cursor-crosshair"
    : tool === 'uv'
    ? "uv-tool"
    : tool === 'omni'
    ? "cursor-help"
    : "cursor-default";

  const isFullBlackout = useMemo(() => {
    const tokensCount = tokens.length;
    if (tokensCount === 0) return false;
    return redactedIds.size >= tokensCount * 0.9; 
  }, [redactedIds, tokens]);

  const hoveredToken = useMemo(() => tokens.find(t => t.id === hoveredTokenId), [hoveredTokenId, tokens]);

  return (
    <div 
      className={`absolute transition-shadow duration-300 ${!isEval ? cursorClass : ''}`}
      style={style}
      onMouseDown={onMouseDown}
    >
      {/* Physical Paper Container */}
      <div 
        className="relative w-[850px] min-h-[1100px] bg-[#f8f5f2] shadow-[0_20px_50px_rgba(0,0,0,0.5)] transform rotate-[0.5deg] paper-texture p-16 text-black font-typewriter text-lg leading-relaxed z-10"
        onClick={() => {
           // Visual shake effect on full stamp or void stamp
           if ((tool === 'stamp' || tool === 'void_stamp') && !isEval) {
             const shakeElement = document.getElementById('desk-container');
             shakeElement?.classList.remove('shake');
             void shakeElement?.offsetWidth; // Trigger reflow
             shakeElement?.classList.add('shake');
             onRedactAll();
           }
         }}
      >
        
        {/* Coffee Stain SVG (Decoration) */}
        <div className="absolute top-10 right-10 opacity-10 pointer-events-none rotate-45 mix-blend-multiply">
           <svg width="150" height="150" viewBox="0 0 100 100">
             <circle cx="50" cy="50" r="40" fill="none" stroke="#5d4037" strokeWidth="8" strokeDasharray="60 20" filter="blur(2px)"/>
             <circle cx="50" cy="50" r="35" fill="none" stroke="#5d4037" strokeWidth="2" opacity="0.5"/>
           </svg>
        </div>

        {/* Document Header */}
        <div className="border-b-4 border-black mb-12 pb-4 flex justify-between items-end opacity-90">
          <div className="flex flex-col">
            <span className="uppercase tracking-[0.2em] text-xs font-bold text-stone-600 mb-1">Bureau of Records Integrity</span>
            <span className="uppercase tracking-widest text-xs font-bold text-stone-400">Security Clearance: LEVEL 4</span>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-xl font-bold uppercase tracking-tight border-2 border-black px-2 py-1 rotate-[-2deg]">{data.id}</span>
          </div>
        </div>

        {/* Document Content */}
        <div className="whitespace-pre-wrap relative z-10 text-justify">
          {tokens.map((token) => {
            const isRedacted = redactedIds.has(token.id);
            const isHighlighted = highlightedIds.has(token.id);
            const isRecovered = recoveredIds.has(token.id);
            const isWhitespace = token.text.trim() === '';
            
            const isUVActive = tool === 'uv' && hoveredTokenId === token.id;
            const isAnalyzerActive = tool === 'analyzer' && hoveredTokenId === token.id;
            
            // OMNI Tool Logic: Highlight if token type matches active rules
            const isOmniTarget = tool === 'omni' && sensitiveTypes.has(token.type);

            // Tutorial Logic: Highlight Guest Names in Step 2 and Step 3
            const isTutorialTarget = (tutorialStep === 2 || tutorialStep === 3) && token.type === 'name';

            const isPartOfHoveredGroup = hoveredToken?.groupId && token.groupId === hoveredToken.groupId;

            return (
              <span
                key={token.id}
                onMouseEnter={() => setHoveredTokenId(token.id)}
                onMouseLeave={() => setHoveredTokenId(null)}
                onClick={(e) => {
                  // Disable interaction if using Hand tool or Omni tool (Omni is just for viewing)
                  if (tool === 'hand' || tool === 'omni') return;

                  if (!isEval && !isWhitespace && !['stamp', 'uv', 'void_stamp', 'analyzer'].includes(tool)) {
                    e.stopPropagation();
                    // Toggle whole group if it exists, otherwise just this token
                    const idsToToggle = token.groupId 
                      ? tokens.filter(t => t.groupId === token.groupId).map(t => t.id)
                      : [token.id];
                    onToggleTokens(idsToToggle);
                  }
                }}
                className={`
                  inline-block relative transition-all duration-75 selection:bg-transparent
                  ${isWhitespace ? 'min-w-[0.5em]' : 'cursor-pointer hover:bg-stone-300/30'}
                  ${isRedacted 
                    ? 'bg-black text-black' 
                    : isRecovered
                      ? 'bg-green-200/50 text-green-900 font-bold box-decoration-clone px-0.5 -mx-0.5 border-b-2 border-green-500'
                      : isHighlighted 
                        ? 'bg-yellow-200/50 text-black font-bold box-decoration-clone px-0.5 -mx-0.5' 
                        : ''}
                  ${!isRedacted && isPartOfHoveredGroup && !['stamp', 'uv', 'void_stamp', 'analyzer', 'omni'].includes(tool) && tool !== 'hand'
                    ? 'bg-stone-300/30' 
                    : ''}
                  ${isOmniTarget && !isRedacted && !isRecovered && !isHighlighted 
                    ? 'outline outline-2 outline-red-500 bg-red-100/50 text-red-900 font-bold animate-pulse' 
                    : ''}
                  ${isTutorialTarget && !isRedacted
                    ? 'ring-4 ring-yellow-400 ring-offset-2 animate-pulse bg-yellow-100/50 z-50 rounded-sm'
                    : ''}
                `}
              >
                {token.text}
                
                {/* UV Tool Effect */}
                {!isRedacted && isUVActive && token.uvText && (
                  <span className="absolute left-1/2 -translate-x-1/2 top-full mt-2 bg-purple-900 text-purple-100 text-[10px] px-3 py-1 rounded shadow-xl whitespace-nowrap uv-reveal border border-purple-500 z-50">
                    HIDDEN: {token.uvText}
                  </span>
                )}

                {/* ANALYZER Tool Effect */}
                {isAnalyzerActive && token.analysis && (
                  <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 z-50 pointer-events-none">
                     <div className="bg-sky-950 border-2 border-cyan-400 text-cyan-400 p-3 rounded shadow-[0_0_15px_rgba(34,211,238,0.5)] min-w-[180px]">
                        <div className="flex justify-between items-center border-b border-cyan-900 pb-1 mb-1">
                          <span className="text-[10px] font-bold uppercase tracking-widest">SCANNING...</span>
                          <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></span>
                        </div>
                        <div className="text-xs font-mono font-bold leading-tight">
                           {token.analysis.toUpperCase()}
                        </div>
                        <div className="mt-2 h-1 bg-cyan-900 rounded-full overflow-hidden">
                           <div className="h-full bg-cyan-400 w-[80%] animate-pulse"></div>
                        </div>
                     </div>
                     {/* Connector Arrow */}
                     <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-cyan-400 mx-auto"></div>
                  </div>
                )}
              </span>
            );
          })}
        </div>

        {/* Full Blackout / Stamp Overlay */}
        {isFullBlackout && !isVoided && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-40 overflow-hidden mix-blend-multiply">
            <div className={`stamp-effect border-8 p-10 rounded-xl font-stamp font-bold text-8xl uppercase tracking-[0.2em] rotate-[-25deg] select-none opacity-80 border-red-800 text-red-800`}>
              REDACTED
            </div>
          </div>
        )}

        {/* VOID Stamp Overlay */}
        {isVoided && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-50 overflow-hidden mix-blend-multiply">
             <div className="stamp-effect border-[12px] border-red-700 p-12 rounded-sm font-black text-9xl uppercase tracking-[0.2em] -rotate-12 text-red-700 opacity-90">
               VOID
             </div>
          </div>
        )}

        {/* Footer Classification */}
        <div className="absolute bottom-16 left-1/2 -translate-x-1/2 text-center opacity-50">
           <span className="font-bold uppercase tracking-[0.5em] text-red-900/50 border-t border-b border-red-900/50 py-1">Top Secret // Noforn</span>
        </div>
      </div>
    </div>
  );
};
