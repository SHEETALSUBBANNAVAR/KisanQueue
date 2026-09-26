import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  ChevronRight, 
  PlusCircle, 
  Activity, 
  ClipboardCheck, 
  CreditCard, 
  Bell, 
  RefreshCw,
  Tractor,
  Layers,
  ArrowRight,
  ShieldCheck,
  Building2,
  PhoneCall
} from 'lucide-react';

export const FarmerDashboard: React.FC = () => {
  const {
    currentFarmer,
    setFarmerScreen,
    activeFarmerAppointment,
    currentServingTokenString,
    farmersAheadCount,
    isTurnApproaching,
    isNowServingFarmer,
    lastQueueUpdateSecondsAgo,
    selectedCentre,
    addToast,
    t
  } = useApp();

  const handleRefresh = () => {
    addToast(t('refreshQueue'), 'Latest APMC telemetry updated', 'info');
  };

  const handleDirectDirections = () => {
    addToast('Opening Directions', `Navigating to ${selectedCentre.name}`, 'info');
  };

  return (
    <div className="space-y-5">
      {/* Top Greeting Header */}
      <div className="bg-gradient-to-r from-emerald-900 via-emerald-950 to-slate-900 text-white rounded-2xl p-5 sm:p-6 shadow-md border border-emerald-800/60">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-emerald-300 font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>FID: {currentFarmer.farmerId} · {currentFarmer.village}, {currentFarmer.district}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight mt-1 text-white">
              {t('goodMorning')}, {currentFarmer.name}
            </h1>
            <p className="text-xs text-emerald-200/90 mt-1 max-w-xl">
              APMC Smart Procurement Gate System · Real-time queue telemetry and biometric token dispatch.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={handleRefresh}
              className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-emerald-200 hover:text-white transition-colors cursor-pointer border border-white/10"
              title={t('refreshQueue')}
            >
              <RefreshCw className="w-4 h-4" />
            </button>
            <div className="w-11 h-11 rounded-xl bg-emerald-800 border border-emerald-600 flex items-center justify-center font-bold text-sm text-emerald-100 shadow-inner">
              RG
            </div>
          </div>
        </div>

        {/* Turn Approaching Emergency Notification Card (F10 logic trigger) */}
        {isTurnApproaching && (
          <div className="mt-4 p-4 bg-amber-500/20 border-2 border-amber-400 rounded-xl text-amber-100 flex items-start gap-3.5 animate-pulse">
            <Bell className="w-6 h-6 text-amber-300 shrink-0 mt-0.5" />
            <div className="flex-1 text-xs">
              <p className="font-bold text-base text-amber-200">
                {t('turnApproachingTitle')}
              </p>
              <p className="mt-1 text-amber-100/90 leading-relaxed text-xs">
                {t('turnApproachingDesc')}
              </p>
              <div className="mt-3 flex flex-wrap items-center gap-2">
                <button
                  onClick={() => setFarmerScreen('live_queue')}
                  className="px-3.5 py-1.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold rounded-lg text-xs inline-flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <span>{t('trackLiveQueue')}</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={handleDirectDirections}
                  className="px-3 py-1.5 bg-slate-900/80 hover:bg-slate-900 text-amber-200 rounded-lg text-xs font-semibold cursor-pointer"
                >
                  {t('openDirections')}
                </button>
              </div>
            </div>
          </div>
        )}

        {isNowServingFarmer && (
          <div className="mt-4 p-4 bg-emerald-500/25 border-2 border-emerald-400 rounded-xl text-emerald-100 flex items-start gap-3.5">
            <div className="w-3 h-3 rounded-full bg-emerald-400 animate-ping shrink-0 mt-1" />
            <div className="text-xs">
              <p className="font-bold text-base text-white">
                {t('nowServingTitle')}
              </p>
              <p className="mt-1 text-emerald-100/90 leading-relaxed text-xs">
                {t('nowServingDesc')}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Responsive Grid for Tablets and Desktops */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {/* Card 1: Primary Live Queue Card */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-pulse" />
                <h2 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                  {t('yourQueue')}
                </h2>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-slate-500 font-mono">
                <span>{t('status')}:</span>
                <span className="font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded text-[11px]">
                  {t('queueActive')}
                </span>
              </div>
            </div>

            <div className="py-4 flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-500 font-medium">{t('yourToken')}</span>
                <div className="text-4xl font-extrabold text-slate-900 tracking-tight font-mono">
                  # {activeFarmerAppointment?.tokenNumber || 'A-124'}
                </div>
                <div className="mt-1 text-xs text-slate-600 font-medium flex items-center gap-1.5">
                  <span className="text-emerald-700 font-bold font-mono">
                    {farmersAheadCount > 0 ? `${farmersAheadCount} ${t('farmersAhead')}` : 'At counter now'}
                  </span>
                </div>
              </div>

              <div className="text-right">
                <span className="text-xs text-slate-500 font-medium">{t('estimatedWait')}</span>
                <div className="text-2xl font-bold text-slate-900 font-mono mt-0.5">
                  {farmersAheadCount === 0 ? '0 min' : `~${Math.max(10, Math.round(farmersAheadCount * 3.7))} min`}
                </div>
                <span className="text-[10px] text-slate-400 font-mono block mt-0.5">
                  {lastQueueUpdateSecondsAgo} {t('updatedSecondsAgo')}
                </span>
              </div>
            </div>

            {/* Progress Bar Micro Indicator */}
            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden my-2">
              <div
                className="bg-emerald-600 h-full rounded-full transition-all duration-500"
                style={{
                  width: `${Math.min(100, Math.max(10, 100 - (farmersAheadCount / 14) * 100))}%`
                }}
              />
            </div>

            <div className="flex items-center justify-between text-xs font-mono text-slate-600 pt-1">
              <span>{t('nowServing')}: <strong>{currentServingTokenString}</strong></span>
              <span>Target: <strong>A-124</strong></span>
            </div>
          </div>

          <div className="pt-4 mt-3 border-t border-slate-100">
            <button
              onClick={() => setFarmerScreen('live_queue')}
              className="w-full py-2.5 bg-emerald-800 hover:bg-emerald-900 active:bg-emerald-950 text-white font-semibold text-xs rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-xs"
            >
              <span>{t('trackLiveQueue')}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Card 2: Current Appointment Details */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-emerald-800" />
                <h2 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                  {t('currentAppointment')}
                </h2>
              </div>
              <span className="text-[11px] font-mono font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
                {activeFarmerAppointment?.timeSlot || '10:30 AM'}
              </span>
            </div>

            <div className="py-3 space-y-2.5 text-xs text-slate-700">
              <div className="flex justify-between items-start">
                <span className="text-slate-500">{t('procurementCentre')}:</span>
                <strong className="text-slate-900 text-right font-medium max-w-[200px]">
                  {activeFarmerAppointment?.centreName || 'Bengaluru APMC Mandi'}
                </strong>
              </div>

              <div className="flex justify-between">
                <span className="text-slate-500">{t('date')}:</span>
                <strong className="text-slate-900 font-mono">
                  {activeFarmerAppointment?.date || '26 September 2026'}
                </strong>
              </div>

              <div className="flex justify-between">
                <span className="text-slate-500">{t('crop')} & {t('quantity')}:</span>
                <strong className="text-emerald-800 font-mono font-bold">
                  {activeFarmerAppointment?.crop || 'Rice (Paddy)'} · {activeFarmerAppointment?.bookedQuantityKg || 500} kg
                </strong>
              </div>

              <div className="flex justify-between">
                <span className="text-slate-500">Weighbridge Bay:</span>
                <span className="font-mono text-slate-800 font-semibold">Bay Counter #2 (Direct Gate)</span>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
            <button
              onClick={() => setFarmerScreen('crop_select')}
              className="flex-1 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs rounded-xl flex items-center justify-center gap-1 transition-colors cursor-pointer"
            >
              <PlusCircle className="w-3.5 h-3.5 text-emerald-800" />
              <span>{t('bookSlot')}</span>
            </button>
            <button
              onClick={() => setFarmerScreen('procurement_status')}
              className="flex-1 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-900 font-semibold text-xs rounded-xl flex items-center justify-center gap-1 transition-colors cursor-pointer"
            >
              <span>{t('procurement')}</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Card 3: Quick Navigation Actions (4 Essential Buttons) */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs flex flex-col justify-between col-span-1 md:col-span-2 lg:col-span-1">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h2 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                {t('quickActions')}
              </h2>
              <span className="text-[10px] text-slate-500 font-mono">1-Tap Portal</span>
            </div>

            <div className="grid grid-cols-2 gap-2.5 mt-3">
              {/* Quick Action 1: Book Slot */}
              <button
                onClick={() => setFarmerScreen('crop_select')}
                className="p-3 rounded-xl border border-slate-200 hover:border-emerald-600 hover:bg-emerald-50/50 flex flex-col items-center text-center transition-all cursor-pointer group"
              >
                <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <PlusCircle className="w-5 h-5" />
                </div>
                <span className="text-xs font-bold text-slate-900 mt-2 block">
                  {t('bookSlot')}
                </span>
                <span className="text-[10px] text-slate-500 mt-0.5">New harvest slot</span>
              </button>

              {/* Quick Action 2: Live Queue */}
              <button
                onClick={() => setFarmerScreen('live_queue')}
                className="p-3 rounded-xl border border-slate-200 hover:border-emerald-600 hover:bg-emerald-50/50 flex flex-col items-center text-center transition-all cursor-pointer group"
              >
                <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Activity className="w-5 h-5" />
                </div>
                <span className="text-xs font-bold text-slate-900 mt-2 block">
                  {t('liveQueue')}
                </span>
                <span className="text-[10px] text-slate-500 mt-0.5">Track position</span>
              </button>

              {/* Quick Action 3: Procurement Slip */}
              <button
                onClick={() => setFarmerScreen('procurement_status')}
                className="p-3 rounded-xl border border-slate-200 hover:border-emerald-600 hover:bg-emerald-50/50 flex flex-col items-center text-center transition-all cursor-pointer group"
              >
                <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <ClipboardCheck className="w-5 h-5" />
                </div>
                <span className="text-xs font-bold text-slate-900 mt-2 block">
                  {t('procurement')}
                </span>
                <span className="text-[10px] text-slate-500 mt-0.5">Weighbridge slip</span>
              </button>

              {/* Quick Action 4: Payments DBT */}
              <button
                onClick={() => setFarmerScreen('payment_status')}
                className="p-3 rounded-xl border border-slate-200 hover:border-emerald-600 hover:bg-emerald-50/50 flex flex-col items-center text-center transition-all cursor-pointer group"
              >
                <div className="w-9 h-9 rounded-xl bg-purple-100 text-purple-800 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <CreditCard className="w-5 h-5" />
                </div>
                <span className="text-xs font-bold text-slate-900 mt-2 block">
                  {t('payments')}
                </span>
                <span className="text-[10px] text-slate-500 mt-0.5">DBT Bank transfer</span>
              </button>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span className="font-mono">APMC Helpline: 1800-425-1551</span>
            <button
              onClick={() => setFarmerScreen('history')}
              className="text-emerald-800 hover:underline font-semibold cursor-pointer"
            >
              {t('history')} →
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Centre Snapshot & Live Load Banner */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center shrink-0">
            <Building2 className="w-5 h-5" />
          </div>
          <div>
            <span className="font-bold text-slate-900 block text-sm">
              {selectedCentre.name}
            </span>
            <span className="text-slate-500">
              {selectedCentre.address} · Helpline: {selectedCentre.contactNumber}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3 font-mono text-slate-700 shrink-0">
          <div className="text-right">
            <span className="text-slate-400 block text-[10px] font-sans">Active Counters</span>
            <strong>{selectedCentre.activeCounters} of {selectedCentre.totalCounters} Active</strong>
          </div>
          <div className="h-6 w-px bg-slate-200" />
          <div className="text-right">
            <span className="text-slate-400 block text-[10px] font-sans">Today's Load</span>
            <strong className="text-emerald-700 font-bold">{selectedCentre.expectedLoad} Congestion</strong>
          </div>
        </div>
      </div>
    </div>
  );
};
