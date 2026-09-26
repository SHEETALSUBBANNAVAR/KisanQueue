import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  ArrowLeft, 
  RefreshCw, 
  MapPin, 
  CheckCircle, 
  Clock, 
  Navigation, 
  BellRing,
  AlertTriangle,
  ChevronRight,
  ShieldCheck,
  Building2,
  X
} from 'lucide-react';

export const FarmerLiveQueue: React.FC = () => {
  const {
    setFarmerScreen,
    currentFarmer,
    activeFarmerAppointment,
    currentServingTokenNumber,
    currentServingTokenString,
    farmersAheadCount,
    isTurnApproaching,
    isNowServingFarmer,
    lastQueueUpdateSecondsAgo,
    selectedCentre,
    addToast,
    t
  } = useApp();

  const [isDirectionsModalOpen, setIsDirectionsModalOpen] = useState(false);

  const handleRefresh = () => {
    addToast(t('refreshQueue'), 'Real-time telemetry updated with active counters', 'info');
  };

  // Generate tokens for queue progress visualization:
  const completedTokens = [
    `A-${currentServingTokenNumber - 2}`,
    `A-${currentServingTokenNumber - 1}`
  ];
  const waitingTokens = Array.from({ length: Math.min(8, Math.max(1, farmersAheadCount)) }, (_, i) => {
    const num = currentServingTokenNumber + 1 + i;
    return `A-${num}`;
  });

  return (
    <div className="space-y-4">
      {/* Top Bar Navigation */}
      <div className="flex items-center justify-between bg-white px-4 py-3 rounded-2xl border border-slate-200 shadow-xs">
        <button
          onClick={() => setFarmerScreen('home')}
          className="text-xs font-semibold text-slate-600 hover:text-slate-900 flex items-center gap-1 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{t('overview')}</span>
        </button>
        <span className="text-xs font-bold text-emerald-800">
          {t('liveQueue')} · APMC Mandi Telemetry
        </span>
        <button
          onClick={handleRefresh}
          className="p-1.5 text-slate-500 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
          title={t('refreshQueue')}
        >
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>

      {/* F10 — Turn Approaching Alert Banner */}
      {isTurnApproaching && (
        <div className="p-5 bg-amber-500 text-slate-950 rounded-2xl shadow-lg border border-amber-400">
          <div className="flex items-start gap-3">
            <BellRing className="w-6 h-6 text-slate-950 shrink-0 mt-0.5 animate-bounce" />
            <div className="flex-1">
              <h2 className="text-lg font-extrabold tracking-tight">
                {t('turnApproachingTitle')}
              </h2>
              <p className="text-xs font-semibold text-slate-900 mt-1 leading-relaxed">
                {t('turnApproachingDesc')}
              </p>

              <div className="mt-3 flex flex-wrap gap-2">
                <button
                  onClick={() => setIsDirectionsModalOpen(true)}
                  className="px-3.5 py-1.5 bg-slate-950 hover:bg-slate-900 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 shadow-xs cursor-pointer"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>{t('openDirections')}</span>
                </button>
                <div className="text-[11px] font-mono font-bold text-slate-950 flex items-center px-2 py-1 bg-amber-400/80 rounded-lg">
                  Gate 2 · Weighbridge Bay 2
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* F10 Variant: When Currently Serving */}
      {isNowServingFarmer && (
        <div className="p-5 bg-emerald-600 text-white rounded-2xl shadow-lg border border-emerald-500">
          <div className="flex items-start gap-3">
            <div className="w-3 h-3 rounded-full bg-white animate-ping mt-1 shrink-0" />
            <div>
              <h2 className="text-lg font-extrabold">
                {t('nowServingTitle')} {activeFarmerAppointment?.tokenNumber || 'A-124'}
              </h2>
              <p className="text-xs text-emerald-100 mt-1 leading-relaxed">
                {t('nowServingDesc')}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Main Live Queue Status Display: 2 Columns on Desktop/Tablet */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Left Column: Token Hero & Triplet Metrics */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-slate-200 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 text-xs">
              <span className="text-slate-500 font-medium">Token Allocation & Electronic Telemetry</span>
              <span className="font-mono text-slate-400">
                {lastQueueUpdateSecondsAgo} {t('updatedSecondsAgo')}
              </span>
            </div>

            {/* Large Token Hero */}
            <div className="my-6 text-center">
              <span className="text-xs font-bold text-emerald-800 uppercase tracking-widest">
                {t('yourToken')}
              </span>
              <div className="text-6xl sm:text-7xl font-extrabold text-slate-900 tracking-tight font-mono my-2">
                {activeFarmerAppointment?.tokenNumber || 'A-124'}
              </div>
              <span className="text-xs text-slate-600 font-medium">
                {currentFarmer.name} · {activeFarmerAppointment?.crop || 'Rice (Paddy)'} ({activeFarmerAppointment?.bookedQuantityKg || 500} kg)
              </span>
            </div>

            {/* Metric Triplet */}
            <div className="grid grid-cols-3 gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-100 font-mono text-center mb-6">
              <div>
                <span className="text-[10px] text-slate-500 block uppercase font-sans font-semibold">
                  {t('nowServing')}
                </span>
                <div className="text-2xl font-extrabold text-emerald-700 mt-1">
                  {currentServingTokenString}
                </div>
                <span className="text-[10px] text-slate-400 font-sans">Counter #2</span>
              </div>

              <div className="border-x border-slate-200">
                <span className="text-[10px] text-slate-500 block uppercase font-sans font-semibold">
                  {t('farmersAhead')}
                </span>
                <div className="text-2xl font-extrabold text-amber-700 mt-1">
                  {farmersAheadCount}
                </div>
                <span className="text-[10px] text-slate-400 font-sans">In queue</span>
              </div>

              <div>
                <span className="text-[10px] text-slate-500 block uppercase font-sans font-semibold">
                  {t('estimatedWait')}
                </span>
                <div className="text-2xl font-extrabold text-slate-900 mt-1">
                  {farmersAheadCount === 0 ? '0 min' : `~${Math.max(10, Math.round(farmersAheadCount * 3.7))}m`}
                </div>
                <span className="text-[10px] text-slate-400 font-sans">ML GBR model</span>
              </div>
            </div>
          </div>

          {/* Bottom Actions */}
          <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleRefresh}
              className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>{t('refreshQueue')}</span>
            </button>

            <button
              onClick={() => setIsDirectionsModalOpen(true)}
              className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <Navigation className="w-3.5 h-3.5 text-emerald-800" />
              <span>{t('openDirections')}</span>
            </button>

            <button
              onClick={() => setFarmerScreen('procurement_status')}
              className="flex-1 py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white font-semibold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-xs"
            >
              <span>{t('procurementStatus')}</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Right Column: Visual Queue Position Tracker */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                Position Tracker
              </h3>
              <span className="text-[11px] text-emerald-800 font-semibold font-mono">
                {farmersAheadCount} {t('farmersAhead')}
              </span>
            </div>

            <div className="space-y-2 mt-4 max-h-[360px] overflow-y-auto pr-1">
              {/* Completed */}
              {completedTokens.map((tok) => (
                <div
                  key={tok}
                  className="flex items-center justify-between px-3 py-2 bg-slate-50 rounded-lg text-xs font-mono text-slate-600"
                >
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{tok}</span>
                  </div>
                  <span className="text-[10px] text-emerald-700 font-sans font-medium">Completed</span>
                </div>
              ))}

              {/* Current Active Serving */}
              <div className="flex items-center justify-between px-3 py-2.5 bg-emerald-50 border border-emerald-300 rounded-lg text-xs font-mono text-emerald-950 shadow-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-ping" />
                  <strong>{currentServingTokenString}</strong>
                </div>
                <span className="text-[10px] font-sans font-bold text-emerald-800 uppercase tracking-wide">
                  Now Serving (Bay 2)
                </span>
              </div>

              {/* Waiting line preview */}
              {waitingTokens.slice(0, 4).map((tok) => {
                const isTarget = tok === (activeFarmerAppointment?.tokenNumber || 'A-124');
                return (
                  <div
                    key={tok}
                    className={`flex items-center justify-between px-3 py-2 rounded-lg text-xs font-mono ${
                      isTarget
                        ? 'bg-emerald-100 border-2 border-emerald-600 font-bold text-emerald-900 shadow-xs'
                        : 'bg-white border border-slate-200 text-slate-600'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Clock className={`w-3.5 h-3.5 ${isTarget ? 'text-emerald-800' : 'text-slate-400'}`} />
                      <span>{tok}</span>
                    </div>
                    <span className="text-[10px] font-sans">
                      {isTarget ? '★ Your Token' : 'Waiting in Queue'}
                    </span>
                  </div>
                );
              })}

              {farmersAheadCount > 4 && (
                <div className="text-center py-1 text-slate-500 text-xs font-mono">
                  ··· {farmersAheadCount - 4} more farmers in queue ···
                </div>
              )}

              {farmersAheadCount > 4 && (
                <div className="flex items-center justify-between px-3 py-2.5 bg-emerald-100/90 border-2 border-emerald-600 rounded-lg text-xs font-mono text-emerald-950 font-bold">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-800" />
                    <span>{activeFarmerAppointment?.tokenNumber || 'A-124'}</span>
                  </div>
                  <span className="text-[11px] font-sans font-bold text-emerald-900">
                    Your Spotlight Token
                  </span>
                </div>
              )}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 text-xs text-slate-500">
            <span>Dynamic Weighbridge Tare Speed: ~7 min / tractor</span>
          </div>
        </div>
      </div>

      {/* Centre Details Info Banner */}
      <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs text-xs text-slate-600 space-y-1.5">
        <div className="flex items-center gap-2 text-slate-900 font-bold">
          <Building2 className="w-4 h-4 text-emerald-800" />
          <span>{selectedCentre.name}</span>
        </div>
        <p className="text-slate-500">
          {selectedCentre.address} · Mandi Superintendent Helpline: {selectedCentre.contactNumber}
        </p>
        <div className="pt-2 flex items-center justify-between text-[11px] text-slate-600 font-mono">
          <span>Active Counters: 4 of 5 Operational</span>
          <span>Weighbridge Tare Speed: ~7m/load</span>
        </div>
      </div>

      {/* Interactive Centre Directions Modal */}
      {isDirectionsModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Navigation className="w-5 h-5 text-emerald-800" />
                <h3 className="text-base font-bold text-slate-900">Navigation & Centre Directions</h3>
              </div>
              <button
                onClick={() => setIsDirectionsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-950">
              <strong className="block font-bold text-sm">{selectedCentre.name}</strong>
              <p className="mt-0.5">{selectedCentre.address}</p>
              <div className="mt-2 flex gap-4 font-mono text-[11px]">
                <span>Distance: <strong>{selectedCentre.distanceKm} km</strong></span>
                <span>ETA: <strong>~12 mins</strong></span>
                <span>Gate: <strong>North Gate #2</strong></span>
              </div>
            </div>

            <div className="space-y-2.5 text-xs text-slate-700">
              <span className="font-bold text-slate-800 block uppercase tracking-wider text-[10px]">
                Tractor Arrival Instructions:
              </span>
              <div className="flex items-start gap-2">
                <span className="w-5 h-5 rounded-full bg-slate-100 font-mono font-bold flex items-center justify-center text-[10px] shrink-0">1</span>
                <p>Follow State Highway 104 toward the APMC Yard Freight Entrance.</p>
              </div>
              <div className="flex items-start gap-2">
                <span className="w-5 h-5 rounded-full bg-slate-100 font-mono font-bold flex items-center justify-center text-[10px] shrink-0">2</span>
                <p>Present digital token QR code (Token <strong>A-124</strong>) at Gate 2 boom barrier.</p>
              </div>
              <div className="flex items-start gap-2">
                <span className="w-5 h-5 rounded-full bg-slate-100 font-mono font-bold flex items-center justify-center text-[10px] shrink-0">3</span>
                <p>Drive tractor onto Weighbridge Bay Counter #2 for automated tare & moisture sample.</p>
              </div>
            </div>

            <div className="pt-2 flex gap-2">
              <button
                onClick={() => {
                  addToast('Directions Launched', 'Navigating to Bengaluru Mandi via GPS', 'success');
                  setIsDirectionsModalOpen(false);
                }}
                className="w-full py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white font-semibold text-xs rounded-xl transition-colors cursor-pointer"
              >
                Start Navigation
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
