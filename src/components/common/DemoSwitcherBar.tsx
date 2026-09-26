import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  StepForward, 
  BellRing, 
  RotateCcw, 
  Sparkles, 
  ChevronUp, 
  ChevronDown 
} from 'lucide-react';

export const DemoSwitcherBar: React.FC = () => {
  const {
    simulateAdvanceQueue,
    simulateTriggerTurnApproaching,
    resetDemoData,
    currentServingTokenString,
    farmersAheadCount
  } = useApp();

  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <aside 
      aria-label="APMC Queue Simulation Controls"
      className="fixed bottom-3 right-4 z-40 bg-slate-900/90 hover:bg-slate-900 backdrop-blur-md text-white rounded-2xl p-2.5 px-3.5 shadow-xl border border-slate-700/70 transition-all text-xs"
    >
      <div className="flex items-center gap-3">
        {/* Simulator Badge */}
        <div className="flex items-center gap-1.5 text-emerald-400 font-mono text-[11px] font-semibold">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Queue Telemetry:</span>
          <strong className="text-white bg-slate-800 px-1.5 py-0.5 rounded font-bold">
            {currentServingTokenString}
          </strong>
          <span className="hidden sm:inline text-slate-400">
            ({farmersAheadCount} ahead of A-124)
          </span>
        </div>

        {/* Collapsible toggle */}
        <div className="flex items-center gap-1.5">
          {!isCollapsed && (
            <>
              <button
                onClick={simulateAdvanceQueue}
                title="Advance queue by calling next token (+1)"
                className="px-2.5 py-1 bg-slate-800 hover:bg-emerald-800 active:bg-emerald-900 border border-slate-700 text-slate-200 hover:text-white rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer text-[11px] font-medium"
              >
                <StepForward className="w-3 h-3 text-emerald-400" />
                <span>Call Next (+1)</span>
              </button>

              <button
                onClick={simulateTriggerTurnApproaching}
                title="Jump queue to A-120 (triggers turn approaching notification)"
                className="px-2.5 py-1 bg-amber-950/70 hover:bg-amber-900 active:bg-amber-950 border border-amber-800/80 text-amber-200 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer text-[11px] font-medium"
              >
                <BellRing className="w-3 h-3 text-amber-400" />
                <span className="hidden sm:inline">Turn Near (A-120)</span>
                <span className="sm:hidden">A-120</span>
              </button>

              <button
                onClick={resetDemoData}
                title="Reset queue and test data"
                className="p-1 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-400 hover:text-white rounded-lg transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
              </button>
            </>
          )}

          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-1 text-slate-400 hover:text-white rounded-lg cursor-pointer"
            title={isCollapsed ? 'Expand Simulator' : 'Collapse Simulator'}
          >
            {isCollapsed ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>
    </aside>
  );
};
