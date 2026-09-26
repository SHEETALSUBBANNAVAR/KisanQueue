import React from 'react';
import { useApp } from '../../context/AppContext';
import { FarmerWelcome } from './FarmerWelcome';
import { FarmerAuth } from './FarmerAuth';
import { FarmerDashboard } from './FarmerDashboard';
import { FarmerBookingFlow } from './FarmerBookingFlow';
import { FarmerLiveQueue } from './FarmerLiveQueue';
import { FarmerProcurementStatus } from './FarmerProcurementStatus';
import { FarmerHistory } from './FarmerHistory';
import { 
  Home, 
  PlusCircle, 
  Activity, 
  Receipt, 
  History as HistoryIcon,
  ShieldCheck,
  Building2,
  ChevronRight,
  PhoneCall,
  MapPin,
  Clock
} from 'lucide-react';
import { FarmerScreen } from '../../context/AppContext';

export const FarmerApp: React.FC = () => {
  const {
    farmerScreen,
    setFarmerScreen,
    currentFarmer,
    userSession,
    selectedCentre,
    farmersAheadCount,
    activeFarmerAppointment,
    t
  } = useApp();

  const isAuthOrWelcome = ['welcome', 'login', 'register'].includes(farmerScreen);

  const renderCurrentScreen = () => {
    switch (farmerScreen) {
      case 'welcome':
        return <FarmerWelcome />;
      case 'login':
      case 'register':
        return <FarmerAuth />;
      case 'crop_select':
      case 'centre_select':
      case 'slot_recommendation':
      case 'booking_confirmation':
        return <FarmerBookingFlow />;
      case 'live_queue':
        return <FarmerLiveQueue />;
      case 'procurement_status':
      case 'payment_status':
        return <FarmerProcurementStatus />;
      case 'history':
        return <FarmerHistory />;
      case 'home':
      default:
        return <FarmerDashboard />;
    }
  };

  // If in auth / welcome state, render full-screen view
  if (isAuthOrWelcome) {
    return (
      <div className="min-h-screen bg-slate-100 py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {renderCurrentScreen()}
        </div>
      </div>
    );
  }

  const isBookingActive = ['crop_select', 'centre_select', 'slot_recommendation', 'booking_confirmation'].includes(farmerScreen);
  const isProcurementActive = ['procurement_status', 'payment_status'].includes(farmerScreen);

  const navItems = [
    {
      id: 'home' as FarmerScreen,
      label: t('overview'),
      shortLabel: 'Home',
      subtext: 'Summary & Active Token',
      icon: Home,
      isActive: farmerScreen === 'home',
      onClick: () => setFarmerScreen('home')
    },
    {
      id: 'crop_select' as FarmerScreen,
      label: t('bookSlot'),
      shortLabel: 'Book',
      subtext: 'Select crop, mandi & time',
      icon: PlusCircle,
      isActive: isBookingActive,
      onClick: () => setFarmerScreen('crop_select')
    },
    {
      id: 'live_queue' as FarmerScreen,
      label: t('liveQueue'),
      shortLabel: 'Queue',
      subtext: 'Real-time token & wait',
      icon: Activity,
      isActive: farmerScreen === 'live_queue',
      badge: farmersAheadCount > 0 ? `${farmersAheadCount} ahead` : 'Serving',
      hasAlert: farmersAheadCount > 0 && farmersAheadCount <= 4,
      onClick: () => setFarmerScreen('live_queue')
    },
    {
      id: 'procurement_status' as FarmerScreen,
      label: t('procurementStatus'),
      shortLabel: 'Slip & DBT',
      subtext: 'Digital receipt & PFMS',
      icon: Receipt,
      isActive: isProcurementActive,
      onClick: () => setFarmerScreen('procurement_status')
    },
    {
      id: 'history' as FarmerScreen,
      label: t('history'),
      shortLabel: 'History',
      subtext: 'Past weighment ledger',
      icon: HistoryIcon,
      isActive: farmerScreen === 'history',
      onClick: () => setFarmerScreen('history')
    }
  ];

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-100 flex flex-row">
      
      {/* ---------------------------------------------------- */}
      {/* LEFT SIDEBAR NAVBAR — DOCKED TO LEFT (NOT AT BOTTOM) */}
      {/* ---------------------------------------------------- */}
      <aside className="w-16 sm:w-20 md:w-64 lg:w-72 shrink-0 bg-white border-r border-slate-200 sticky top-16 h-[calc(100vh-4rem)] z-30 flex flex-col justify-between select-none shadow-xs">
        
        {/* Top: Farmer Identity Card & Section Title */}
        <div className="flex flex-col">
          {/* Desktop Farmer Profile Banner */}
          <div className="hidden md:block p-4 border-b border-slate-100 bg-slate-50/80">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 border border-emerald-300/80 text-[#165a36] font-bold text-sm flex items-center justify-center shadow-2xs shrink-0">
                {userSession?.avatarInitials || 'RK'}
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-sm font-bold text-slate-900 truncate">
                  {userSession?.name || currentFarmer.name}
                </div>
                <div className="text-[11px] font-mono text-emerald-800 font-semibold truncate">
                  FID: {userSession?.registeredNumber || currentFarmer.farmerId}
                </div>
              </div>
            </div>
            
            <div className="mt-2.5 pt-2.5 border-t border-slate-200/70 flex items-center justify-between text-[11px] text-slate-500">
              <div className="flex items-center gap-1.5 truncate">
                <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span className="truncate">{currentFarmer.village}, {currentFarmer.district}</span>
              </div>
            </div>
          </div>

          {/* Mobile Top Mini Avatar */}
          <div className="md:hidden py-3 px-1 border-b border-slate-100 flex flex-col items-center">
            <div className="w-9 h-9 rounded-xl bg-emerald-100 border border-emerald-300/80 text-[#165a36] font-bold text-xs flex items-center justify-center shadow-2xs">
              {userSession?.avatarInitials || 'RK'}
            </div>
            <span className="text-[9px] font-mono text-slate-500 mt-1 font-semibold truncate max-w-[56px]">
              {userSession?.registeredNumber ? userSession.registeredNumber.slice(-6) : 'FARM'}
            </span>
          </div>

          {/* Section Kicker */}
          <div className="hidden md:block px-4 pt-4 pb-2">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 font-sans">
              Farmer Services
            </span>
          </div>

          {/* Navigation Link Items */}
          <nav className="p-1.5 md:p-3 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={item.onClick}
                  title={item.label}
                  className={`w-full flex items-center transition-all cursor-pointer rounded-xl group ${
                    item.isActive
                      ? 'bg-[#165a36] text-white shadow-sm font-bold md:ring-1 md:ring-emerald-700/50'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/90 font-medium'
                  } ${
                    /* Mobile: vertical centered pill */
                    'flex-col md:flex-row py-2.5 px-1 md:py-2.5 md:px-3 justify-center md:justify-start gap-1 md:gap-3 text-center md:text-left'
                  }`}
                >
                  <div className="relative shrink-0">
                    <Icon className={`w-5 h-5 ${item.isActive ? 'text-white' : 'text-slate-500 group-hover:text-slate-800'}`} />
                    {item.hasAlert && (
                      <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-amber-400 ring-2 ring-white animate-pulse" />
                    )}
                  </div>

                  {/* Desktop Label + Subtext */}
                  <div className="hidden md:block flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1">
                      <span className="text-xs truncate">{item.label}</span>
                      {item.badge && (
                        <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded-md font-bold ${
                          item.isActive
                            ? 'bg-emerald-800/80 text-emerald-100'
                            : 'bg-amber-100 text-amber-900 border border-amber-200'
                        }`}>
                          {item.badge}
                        </span>
                      )}
                    </div>
                    <div className={`text-[10px] truncate ${item.isActive ? 'text-emerald-100/80' : 'text-slate-400'}`}>
                      {item.subtext}
                    </div>
                  </div>

                  {/* Mobile Micro Label */}
                  <span className="md:hidden text-[9px] leading-tight truncate max-w-[54px]">
                    {item.shortLabel}
                  </span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Mandi Yard Status Info (Desktop) */}
        <div className="hidden md:block p-3.5 m-3 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-2">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-bold text-slate-800 text-[11px] truncate">
              {selectedCentre.name}
            </span>
          </div>

          <div className="text-[10px] text-slate-500 space-y-1">
            <div className="flex items-center justify-between">
              <span>Gate Hours:</span>
              <span className="font-mono text-slate-700">08:30 – 17:30</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Token Assigned:</span>
              <span className="font-mono font-bold text-emerald-800">
                {activeFarmerAppointment?.tokenNumber || 'A-124'}
              </span>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-[10px] text-slate-500">
            <span className="flex items-center gap-1 font-mono">
              <PhoneCall className="w-3 h-3 text-emerald-700" />
              1800-425-1551
            </span>
            <span className="text-[9px] font-semibold text-emerald-800 bg-emerald-100/80 px-1.5 py-0.5 rounded">
              Toll Free
            </span>
          </div>
        </div>

        {/* Mobile Bottom Status Dot */}
        <div className="md:hidden py-3 flex flex-col items-center justify-center border-t border-slate-100 text-[9px] text-slate-400">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse mb-1" />
          <span className="font-mono text-[8px] font-bold text-slate-600">A-124</span>
        </div>

      </aside>

      {/* ---------------------------------------------------- */}
      {/* MAIN CONTENT VIEWPORT (OCCUPIES REMAINING WIDTH)     */}
      {/* ---------------------------------------------------- */}
      <main className="flex-1 min-w-0 p-3 sm:p-5 lg:p-7 overflow-y-auto">
        <div className="max-w-5xl mx-auto space-y-4">
          
          {/* Top Breadcrumb Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 bg-white px-4 py-2.5 rounded-xl border border-slate-200 shadow-2xs">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-600" />
              <span className="text-xs font-bold text-slate-800 font-sans truncate">
                {selectedCentre.name} · Bay Counter #2
              </span>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono text-slate-600">
              <span className="bg-slate-100 text-slate-700 px-2.5 py-0.5 rounded-lg border border-slate-200 font-semibold text-[11px]">
                Reg: {userSession?.registeredNumber || currentFarmer.farmerId}
              </span>
            </div>
          </div>

          {/* Active Screen View */}
          <div className="w-full">
            {renderCurrentScreen()}
          </div>

        </div>
      </main>

    </div>
  );
};
