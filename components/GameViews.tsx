
import React from 'react';
import { DayConfig, GameState, AuditLogEntry, UpgradeType } from '../types';
import { FileText, ShieldAlert, CheckCircle, Newspaper, Highlighter, PenLine, AlertOctagon, DollarSign, XCircle, AlertTriangle, Skull, Handshake, Flame, ShoppingCart, Coffee, Scan, Sun, Stamp, ShieldCheck, Crown, Eye, ArrowLeft, Paperclip } from 'lucide-react';

export const BriefingView: React.FC<{ day: DayConfig; onStart: () => void }> = ({ day, onStart }) => (
  <div className="w-full h-full flex items-center justify-center p-8 bg-black/60 backdrop-blur-sm z-50 animate-slide-up">
    {/* The Dossier Folder */}
    <div className="relative w-[800px] min-h-[600px] bg-[#d2b48c] shadow-[0_20px_60px_rgba(0,0,0,0.8)] rotate-1 border-t-2 border-[#e6c9a3] rounded-sm transform transition-transform hover:rotate-0 duration-500">
      
      {/* Tab */}
      <div className="absolute -top-6 left-0 w-48 h-8 bg-[#d2b48c] rounded-t-md border-t-2 border-[#e6c9a3] flex items-center justify-center shadow-md">
         <span className="font-typewriter font-bold text-red-900 tracking-widest text-xs">CASE FILE #{day.day}</span>
      </div>

      {/* Paper Texture Overlay */}
      <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cardboard.png')] pointer-events-none rounded-sm"></div>
      
      {/* Inner Paper Page */}
      <div className="absolute top-4 left-4 right-4 bottom-4 bg-[#f4f1ea] shadow-inner p-8 md:p-12 flex flex-col gap-6 transform -rotate-1 origin-top-left paper-texture text-stone-900">
        
        {/* Paperclip */}
        <div className="absolute -top-4 right-12 text-stone-400">
           <Paperclip className="w-16 h-16 drop-shadow-lg transform rotate-12" />
        </div>

        {/* Coffee Stain */}
        <div className="absolute bottom-12 right-12 opacity-10 pointer-events-none mix-blend-multiply rotate-[120deg]">
           <svg width="120" height="120" viewBox="0 0 100 100">
             <circle cx="50" cy="50" r="40" fill="none" stroke="#5d4037" strokeWidth="6" strokeDasharray="80 10" filter="blur(1px)"/>
           </svg>
        </div>

        {/* Header */}
        <div className="border-b-4 border-double border-stone-800 pb-4 flex justify-between items-end">
          <div>
            <div className="text-xs font-bold uppercase tracking-[0.3em] text-stone-500 mb-2">Bureau of Records Integrity</div>
            <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-stone-900 leading-none">
              {day.title}
            </h1>
          </div>
          <div className="border-2 border-red-700 text-red-700 font-bold px-2 py-1 uppercase text-xs rotate-[-5deg] opacity-80 mix-blend-multiply">
            Eyes Only
          </div>
        </div>

        {/* Body Text */}
        <div className="flex-1 font-typewriter text-sm md:text-base leading-relaxed text-justify relative">
           <span className="float-left text-6xl font-black mr-3 mt-[-10px] opacity-20 font-serif">
             {day.day}
           </span>
           <p>{day.briefing}</p>
        </div>

        {/* Directives / Rules Section */}
        <div className="bg-stone-200/50 border-l-4 border-stone-800 p-6 relative">
          <div className="absolute -top-3 left-4 bg-stone-800 text-stone-100 text-[10px] font-bold px-2 py-0.5 uppercase tracking-widest">
            Operational Protocols
          </div>
          <ul className="space-y-3 mt-2 font-mono text-sm">
            {day.rules.map((rule, idx) => {
               const isHighlight = rule.action === 'highlight';
               const isRecover = rule.action === 'recover';
               const isVoid = rule.action === 'void';
               
               return (
                <li key={idx} className="flex gap-3 items-start">
                  {isHighlight ? (
                    <Highlighter className="w-5 h-5 text-amber-600 mt-0.5 shrink-0" />
                  ) : isRecover ? (
                    <CheckCircle className="w-5 h-5 text-green-700 mt-0.5 shrink-0" />
                  ) : isVoid ? (
                    <AlertOctagon className="w-5 h-5 text-red-700 mt-0.5 shrink-0" />
                  ) : (
                    <PenLine className="w-5 h-5 text-stone-900 mt-0.5 shrink-0" />
                  )}
                  <span className={`font-bold ${
                    isHighlight ? "text-amber-800" : 
                    isRecover ? "text-green-800" : 
                    isVoid ? "text-red-800" :
                    "text-stone-900"
                  }`}>
                    {rule.description}
                  </span>
                </li>
               );
            })}
          </ul>
        </div>

        {/* Signature / Accept */}
        <div className="mt-4 flex justify-between items-end">
           <div className="text-[10px] font-mono opacity-50">
             Authorized By: Director Voss<br/>
             Ref: {Math.random().toString(36).substring(7).toUpperCase()}
           </div>
           
           <button 
             onClick={onStart}
             className="group relative"
           >
             <div className="absolute inset-0 bg-red-800 rounded blur opacity-20 group-hover:opacity-40 transition-opacity"></div>
             <div className="relative border-4 border-red-800 text-red-800 font-stamp font-bold text-2xl px-6 py-2 uppercase tracking-widest rotate-[-2deg] group-hover:scale-105 transition-transform bg-[#f4f1ea] mix-blend-multiply cursor-pointer">
               Accept Assignment
             </div>
           </button>
        </div>

      </div>
    </div>
  </div>
);

export const EvaluationView: React.FC<{ 
  score: { correct: number, missed: number, overRedacted: number, totalSensitive: number }; 
  financials: { bribe: number, penalty: number, wage: number };
  totalFunds: number;
  auditLogs?: AuditLogEntry[];
  onNext: () => void;
}> = ({ score, financials, totalFunds, auditLogs = [], onNext }) => {
  const deductions = (score.missed * 10) + (score.overRedacted * 5) + financials.penalty;
  const netPay = financials.wage + financials.bribe - deductions;
  const currentBalance = totalFunds + netPay;
  
  return (
    <div className="flex gap-8 items-start h-[80vh]">
      {/* LEFT: Pay Slip */}
      <div className="max-w-md w-full bg-[#f4f1ea] text-stone-900 shadow-2xl font-typewriter relative transform rotate-1 flex-shrink-0">
        <div className="bg-stone-800 text-stone-100 p-4 border-b-4 border-double border-stone-600">
          <h2 className="text-xl font-bold uppercase text-center tracking-widest">Daily Performance</h2>
          <div className="text-center text-xs opacity-70">Employee ID: 882-1A</div>
        </div>

        <div className="p-8 space-y-6">
          <div className="flex justify-between items-end border-b border-stone-300 pb-2">
            <span className="uppercase text-sm font-bold">Base Wage</span>
            <span className="text-lg text-green-700">+${financials.wage}.00</span>
          </div>

          {financials.bribe > 0 && (
            <div className="flex justify-between items-end border-b border-stone-300 pb-2">
              <span className="uppercase text-sm font-bold text-amber-700 flex items-center gap-1">
                <Handshake className="w-4 h-4" /> Discretionary Bonus
              </span>
              <span className="text-lg text-amber-700">+${financials.bribe}.00</span>
            </div>
          )}

          <div className="bg-red-50 p-4 border border-red-200 rounded-sm">
             <h3 className="text-xs font-bold uppercase text-red-900 mb-2 border-b border-red-200 pb-1">Deductions</h3>
             <div className="flex justify-between text-sm text-red-800">
               <span>Protocol Violations ({score.missed})</span>
               <span>-${score.missed * 10}</span>
             </div>
             <div className="flex justify-between text-sm text-red-800">
               <span>Carelessness ({score.overRedacted})</span>
               <span>-${score.overRedacted * 5}</span>
             </div>
             {financials.penalty > 0 && (
                <div className="flex justify-between text-sm text-red-900 font-bold">
                  <span>Infractions & Fines</span>
                  <span>-${financials.penalty}</span>
                </div>
             )}
          </div>

          <div className="border-t-2 border-black pt-4 flex flex-col gap-1">
            <div className="flex justify-between items-center">
              <span className="font-bold text-xl uppercase">Net Pay</span>
              <span className={`text-2xl font-bold ${netPay < 0 ? 'text-red-600' : 'text-stone-900'}`}>
                {netPay >= 0 ? '+' : ''}${netPay}.00
              </span>
            </div>
            
            <div className="flex justify-between items-center text-sm opacity-75 mt-2 pt-2 border-t border-dotted border-stone-400">
               <span>CURRENT BALANCE:</span>
               <span className={`${currentBalance < 0 ? 'text-red-600 font-bold' : ''}`}>${currentBalance}.00</span>
            </div>
          </div>
          
          <button 
            onClick={onNext}
            className="w-full bg-stone-800 hover:bg-black text-white font-bold py-3 px-6 rounded shadow-lg mt-6 transition-transform active:scale-95 uppercase tracking-wider"
          >
            Review Ledger
          </button>
        </div>
      </div>

      {/* RIGHT: Audit Log / Corrections */}
      <div className="w-[400px] bg-white shadow-2xl rotate-[-1deg] flex flex-col h-full overflow-hidden border-t-8 border-red-800">
        <div className="bg-stone-200 p-4 border-b border-stone-300">
           <h2 className="font-bold text-red-900 uppercase tracking-widest text-lg flex items-center gap-2">
             <AlertOctagon className="w-5 h-5"/> Case File Audit
           </h2>
           <p className="text-[10px] text-stone-500 font-mono">Review infraction details below.</p>
        </div>
        
        <div className="flex-1 overflow-y-auto p-6 font-mono text-xs space-y-6 bg-[url('https://www.transparenttextures.com/patterns/graphy.png')]">
           {auditLogs.length === 0 ? (
             <div className="text-center text-stone-400 mt-10">
               <CheckCircle className="w-12 h-12 mx-auto mb-2 opacity-50"/>
               <p>NO INFRACTIONS RECORDED</p>
             </div>
           ) : (
             auditLogs.map((log, i) => (
               <div key={i} className="border-b border-stone-300 pb-4">
                 <h3 className="font-bold text-stone-800 mb-2 uppercase bg-stone-100 inline-block px-1">
                   {log.docId === 'SECURITY_BREACH' ? '!!! SECURITY ALERT !!!' : `${i+1}. ${log.docTitle}`}
                 </h3>
                 
                 {log.mistakes.length === 0 ? (
                   <div className="text-green-700 flex items-center gap-1 italic opacity-70">
                     <CheckCircle className="w-3 h-3"/> No errors found.
                   </div>
                 ) : (
                   <ul className="space-y-2 pl-2">
                     {log.mistakes.map((m, idx) => (
                       <li key={idx} className="flex gap-2 items-start leading-tight">
                         {m.type === 'MISSED' && <XCircle className="w-3 h-3 text-red-600 shrink-0 mt-0.5"/>}
                         {m.type === 'MISSED_HIGHLIGHT' && <AlertTriangle className="w-3 h-3 text-amber-600 shrink-0 mt-0.5"/>}
                         {m.type === 'OVER_REDACTED' && <XCircle className="w-3 h-3 text-stone-400 shrink-0 mt-0.5"/>}
                         {m.type === 'ILLEGAL_DEFIANCE' && <ShieldAlert className="w-3 h-3 text-purple-800 shrink-0 mt-0.5"/>}
                         {m.type === 'SECURITY_RISK' && <Flame className="w-3 h-3 text-orange-600 shrink-0 mt-0.5"/>}
                         
                         <div>
                           <span className={
                             m.type === 'MISSED' ? "text-red-700 font-bold" :
                             m.type === 'MISSED_HIGHLIGHT' ? "text-amber-700 font-bold" :
                             m.type === 'ILLEGAL_DEFIANCE' ? "text-purple-800 font-bold" :
                             m.type === 'SECURITY_RISK' ? "text-orange-600 font-black animate-pulse" :
                             "text-stone-500 line-through"
                           }>
                             "{m.text}"
                           </span>
                           <div className="text-[10px] uppercase tracking-wide opacity-75">
                             {m.type === 'MISSED' && `MISSED SENSITIVE INFO (${m.hint})`}
                             {m.type === 'MISSED_HIGHLIGHT' && `FAILED TO HIGHLIGHT (${m.hint})`}
                             {m.type === 'OVER_REDACTED' && `UNNECESSARY REDACTION`}
                             {m.type === 'ILLEGAL_DEFIANCE' && `DIRECT ORDER VIOLATION`}
                             {m.type === 'SECURITY_RISK' && `FAILURE TO DISPOSE CLASSIFIED MATERIAL`}
                           </div>
                         </div>
                       </li>
                     ))}
                   </ul>
                 )}
               </div>
             ))
           )}
        </div>
        
        <div className="p-2 bg-stone-100 text-center text-[10px] text-stone-400 border-t border-stone-300">
           BUREAU OF RECORDS INTEGRITY // QA DEPT
        </div>
      </div>
    </div>
  );
};

export const ShopView: React.FC<{ 
  funds: number; 
  expenses: { rent: number, food: number, heat: number, rentDue: boolean, daysUntilRent: number };
  purchasedUpgrades: UpgradeType[];
  onBuy: (type: UpgradeType, cost: number) => void;
  onNext: () => void;
}> = ({ funds, expenses, purchasedUpgrades, onBuy, onNext }) => {
  const totalExpenses = (expenses.rentDue ? expenses.rent : 0) + expenses.food + expenses.heat;
  
  const shopItems = [
    { 
      id: 'stamp' as UpgradeType, 
      name: 'Auto-Stamper', 
      price: 150, 
      icon: <Stamp className="w-8 h-8"/>,
      desc: 'Instantly redact entire pages. Efficiency is key to survival.' 
    },
    { 
      id: 'uv' as UpgradeType, 
      name: 'UV Light Emitter', 
      price: 200, 
      icon: <Sun className="w-8 h-8"/>,
      desc: 'Reveals hidden messages and invisible ink markers on documents.' 
    },
    { 
      id: 'lens' as UpgradeType, 
      name: 'Analyst Lens', 
      price: 175, 
      icon: <Scan className="w-8 h-8"/>,
      desc: 'Automated OCR assistance. Highlights 3 sensitive words per document.' 
    },
    { 
      id: 'seal' as UpgradeType, 
      name: 'The Official Seal', 
      price: 120, 
      icon: <ShieldCheck className="w-8 h-8"/>,
      desc: 'Instantly verify and submit documents without redaction. Risky, but fast.' 
    },
  ];

  return (
    <div className="flex gap-8 items-center h-[80vh] w-full max-w-5xl">
       {/* LEFT: The Bill */}
       <div className="w-80 bg-stone-100 shadow-2xl rotate-[-2deg] p-6 font-typewriter text-sm border-t-8 border-red-900 relative">
          <div className="absolute top-4 right-4 w-20 h-20 border-4 border-red-800 rounded-full flex items-center justify-center opacity-40 rotate-12">
             <span className="text-red-900 font-bold text-xs uppercase text-center leading-none">PAID<br/>IN FULL</span>
          </div>
          
          <h2 className="text-xl font-bold uppercase mb-6 border-b border-black pb-2 text-center">Living Expenses</h2>
          
          <div className="space-y-2 mb-6">
            <div className="flex justify-between items-center">
              <div>
                <span>Housing Unit 4B</span>
                {!expenses.rentDue && (
                  <span className="block text-[10px] text-stone-500 italic">Next Due: {expenses.daysUntilRent} day(s)</span>
                )}
              </div>
              <span className={!expenses.rentDue ? "line-through text-stone-400" : ""}>${expenses.rent}.00</span>
            </div>
            <div className="flex justify-between">
              <span>Standard Rations</span>
              <span>${expenses.food}.00</span>
            </div>
            <div className="flex justify-between">
              <span>Heating (Communal)</span>
              <span>${expenses.heat}.00</span>
            </div>
            <div className="border-t border-black border-dashed pt-2 mt-2 flex justify-between font-bold text-lg">
              <span>TOTAL DEDUCTED</span>
              <span className="text-red-700">-${totalExpenses}.00</span>
            </div>
          </div>

          <div className="bg-stone-200 p-4 text-center">
             <span className="block text-xs uppercase opacity-60">Remaining Funds</span>
             <span className={`text-2xl font-bold ${funds < 0 ? 'text-red-600' : 'text-black'}`}>${funds}.00</span>
          </div>
          {funds < 0 && (
            <div className="mt-4 text-red-600 text-xs font-bold text-center animate-pulse">
               WARNING: ACCOUNT OVERDRAWN. LIQUIDATION IMMINENT.
            </div>
          )}
       </div>

       {/* RIGHT: The Catalog */}
       <div className="flex-1 bg-[#2a2522] p-8 rounded-lg shadow-2xl border border-stone-600 text-stone-200">
          <div className="flex items-center gap-4 mb-8 border-b border-stone-600 pb-4">
            <ShoppingCart className="w-8 h-8 text-amber-500" />
            <h1 className="text-2xl font-bold uppercase tracking-widest text-amber-500">Requisitions & Black Market</h1>
          </div>
          
          <p className="text-xs text-stone-400 mb-6 font-mono border-l-2 border-stone-600 pl-2">
             NOTICE: These items are non-standard issue. Purchase permanently unlocks enhanced capabilities for complex assignments.
          </p>

          <div className="grid grid-cols-2 gap-4">
             {shopItems.map(item => {
               const isOwned = purchasedUpgrades.includes(item.id);
               const canAfford = funds >= item.price;

               return (
                 <div key={item.id} className={`p-4 border border-stone-600 rounded bg-stone-800 flex flex-col gap-2 ${isOwned ? 'opacity-50' : ''}`}>
                    <div className="flex justify-between items-start">
                       <div className="bg-stone-900 p-2 rounded text-stone-400">
                          {item.icon}
                       </div>
                       <span className="font-bold text-amber-500 text-lg">${item.price}</span>
                    </div>
                    <div>
                       <h3 className="font-bold text-white uppercase">{item.name}</h3>
                       <p className="text-xs text-stone-400 leading-tight mt-1">{item.desc}</p>
                    </div>
                    
                    <button 
                       disabled={isOwned || !canAfford}
                       onClick={() => onBuy(item.id, item.price)}
                       className={`mt-auto py-2 text-xs font-bold uppercase tracking-wider rounded transition-colors
                         ${isOwned 
                           ? 'bg-green-900 text-green-200 cursor-default' 
                           : canAfford 
                             ? 'bg-amber-600 hover:bg-amber-500 text-white' 
                             : 'bg-stone-700 text-stone-500 cursor-not-allowed'
                         }
                       `}
                    >
                       {isOwned ? 'ACQUIRED' : canAfford ? 'PURCHASE' : 'INSUFFICIENT FUNDS'}
                    </button>
                 </div>
               );
             })}
          </div>

          <div className="mt-8 flex justify-end">
             <button onClick={onNext} className="px-8 py-3 bg-stone-100 text-black font-bold uppercase hover:bg-white transition-colors">
                Return to Quarters
             </button>
          </div>
       </div>
    </div>
  );
};

export const FeedView: React.FC<{ feed: DayConfig['feed']; onNextDay: () => void }> = ({ feed, onNextDay }) => (
  <div className="max-w-2xl w-full bg-stone-100 text-stone-900 p-8 shadow-2xl flex flex-col gap-6 border-t-8 border-stone-900">
    <div className="flex items-center justify-between border-b-2 border-stone-900 pb-4">
      <div className="flex items-center gap-3">
        <Newspaper className="w-8 h-8" />
        <h1 className="text-3xl font-black uppercase tracking-tighter">The Evening Post</h1>
      </div>
      <span className="font-typewriter text-sm">LATE EDITION</span>
    </div>

    <div className="space-y-4">
      <h2 className="text-4xl font-serif font-bold leading-tight">
        {feed.headline}
      </h2>
      <div className="flex gap-4">
        <div className="w-full text-lg font-serif leading-relaxed text-justify">
          <span className="float-left text-5xl font-black mr-2 mt-[-10px]">{feed.body.charAt(0)}</span>
          {feed.body.slice(1)}
        </div>
      </div>
    </div>

    <div className="border-t border-stone-300 pt-6 mt-4 flex justify-end">
      <button 
        onClick={onNextDay}
        className="bg-stone-900 text-white font-bold py-3 px-8 hover:bg-stone-700 transition-colors"
      >
        PROCEED TO LEDGER
      </button>
    </div>
  </div>
);

export const GameOverView: React.FC<{ funds: number; onBackToMenu: () => void }> = ({ funds, onBackToMenu }) => (
  <div className="max-w-xl w-full bg-black text-red-600 border-4 border-red-800 p-10 shadow-2xl flex flex-col gap-6 items-center text-center font-typewriter">
    <Skull className="w-24 h-24 text-red-700 animate-pulse" />
    <h1 className="text-5xl font-black uppercase tracking-widest text-red-500">TERMINATED</h1>
    <div className="w-full h-px bg-red-900 my-4"></div>
    <p className="text-xl">
      Employee #882-1A, your financial insolvency (Funds: ${funds}) renders you a security risk. 
    </p>
    <p className="text-lg text-white/70">
      The Bureau does not employ those who cannot manage their own assets. You have been designated for immediate liquidation.
    </p>
    <button onClick={onBackToMenu} className="mt-8 bg-red-900 hover:bg-red-700 text-white px-8 py-4 font-bold uppercase tracking-widest transition-colors">
      RESTART LIFE CYCLE
    </button>
  </div>
);

export const VictoryView: React.FC<{ funds: number; moralScore: number; onBackToMenu: () => void }> = ({ funds, moralScore, onBackToMenu }) => {
  const isCorrupt = moralScore <= -1; // Negative moral score means you took bribes/obeyed corrupt orders
  
  return (
    <div className="max-w-3xl w-full bg-black/90 p-12 shadow-2xl flex flex-col gap-8 text-center animate-slide-up border-8 border-double relative">
      <div className={`absolute inset-0 opacity-20 pointer-events-none ${isCorrupt ? 'bg-amber-900' : 'bg-blue-900'}`}></div>
      
      <div className="z-10 flex flex-col items-center">
        {isCorrupt ? (
           <Crown className="w-32 h-32 text-amber-500 mb-6 drop-shadow-[0_0_15px_rgba(245,158,11,0.5)]" />
        ) : (
           <Eye className="w-32 h-32 text-blue-400 mb-6 drop-shadow-[0_0_15px_rgba(96,165,250,0.5)]" />
        )}

        <h1 className={`text-6xl md:text-7xl font-black uppercase tracking-tighter mb-4 ${isCorrupt ? 'text-amber-500' : 'text-blue-400'}`}>
          {isCorrupt ? "The Inner Circle" : "The Whistleblower"}
        </h1>
        
        <div className={`w-32 h-1 mb-8 ${isCorrupt ? 'bg-amber-700' : 'bg-blue-700'}`}></div>

        <p className="text-2xl font-typewriter text-stone-300 leading-relaxed mb-8">
          {isCorrupt 
            ? "Your loyalty has been noted. The Directives were a test, and you passed. You are no longer just a clerk; you are an architect of history. Welcome to the Directorate."
            : "You refused to be silenced. You burned the bribes and rejected the lies. The files you leaked have sparked a revolution. You may be on the run, but the truth is free."
          }
        </p>

        <div className="grid grid-cols-2 gap-8 w-full border-t border-stone-800 pt-8 mt-4">
           <div>
             <span className="block text-xs uppercase text-stone-500 tracking-widest mb-2">Final Balance</span>
             <span className="text-4xl font-bold text-white">${funds}</span>
           </div>
           <div>
             <span className="block text-xs uppercase text-stone-500 tracking-widest mb-2">Morality Index</span>
             <span className={`text-4xl font-bold ${isCorrupt ? 'text-red-500' : 'text-green-500'}`}>
               {moralScore > 0 ? '+' : ''}{moralScore}
             </span>
           </div>
        </div>
        
        <button onClick={onBackToMenu} className={`mt-12 px-10 py-4 font-bold uppercase tracking-[0.2em] transition-all hover:scale-105 ${isCorrupt ? 'bg-amber-700 hover:bg-amber-600 text-white' : 'bg-blue-800 hover:bg-blue-700 text-white'}`}>
          {isCorrupt ? "Accept Promotion" : "Vanish Into The Night"}
        </button>
      </div>
    </div>
  );
};
