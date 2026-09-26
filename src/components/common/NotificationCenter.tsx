import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Bell, 
  X, 
  CheckCheck, 
  Trash2, 
  Sparkles, 
  Clock, 
  CreditCard, 
  AlertTriangle, 
  ChevronRight, 
  Layers, 
  Scale,
  Building2,
  Wheat,
  ShieldCheck,
  CheckCircle2,
  Lock,
  Smartphone,
  UserCheck
} from 'lucide-react';
import { AppNotification } from '../../types';

export const NotificationCenter: React.FC = () => {
  const {
    notifications,
    isNotificationOpen,
    setIsNotificationOpen,
    markNotificationAsRead,
    markAllNotificationsAsRead,
    clearNotifications,
    simulateIncomingNotification,
    userSession,
    setRole,
    setFarmerScreen,
    t
  } = useApp();

  const [activeCategory, setActiveCategory] = useState<'all' | 'queue' | 'payment' | 'mandi' | 'bay_operation' | 'sso_governance'>('all');

  // ONLY show after login! Never in main or when unauthenticated
  if (!isNotificationOpen || !userSession) return null;

  // Determine user's target channel based on role
  const userChannel = userSession.role === 'farmer' ? 'farmer' : userSession.role === 'operator' ? 'bay' : 'sso';
  const registeredId = userSession.registeredNumber || userSession.identifier;

  // Filter notifications strictly addressed to this user's registered ID & channel
  const userNotifications = notifications.filter((n) => {
    const channelMatches = n.channel === userChannel;
    const regMatches = !n.registeredNumber || !userSession.registeredNumber || n.registeredNumber === userSession.registeredNumber;
    return channelMatches && regMatches;
  });

  const filteredNotifications = userNotifications.filter((notif) => {
    if (activeCategory === 'all') return true;
    if (activeCategory === 'queue') return notif.category === 'queue';
    if (activeCategory === 'payment') return notif.category === 'payment';
    if (activeCategory === 'bay_operation') return notif.category === 'bay_operation';
    if (activeCategory === 'sso_governance') return notif.category === 'sso_governance';
    if (activeCategory === 'mandi') return notif.category === 'mandi' || notif.category === 'system';
    return true;
  });

  const unreadCount = userNotifications.filter((n) => !n.read).length;

  const handleActionClick = (notif: AppNotification) => {
    markNotificationAsRead(notif.id);
    setIsNotificationOpen(false);

    if (notif.channel === 'farmer') {
      setRole('farmer');
      if (notif.actionScreen === 'booking') {
        setFarmerScreen('crop_select');
      } else if (notif.actionScreen === 'live_queue') {
        setFarmerScreen('live_queue');
      } else if (notif.actionScreen === 'procurement_status') {
        setFarmerScreen('procurement_status');
      } else if (notif.actionScreen === 'payment_status') {
        setFarmerScreen('payment_status');
      } else {
        setFarmerScreen('home');
      }
    } else if (notif.channel === 'bay') {
      setRole('operator');
    } else if (notif.channel === 'sso') {
      setRole('admin');
    }
  };

  const getCategoryIcon = (category: string, urgent?: boolean) => {
    if (urgent) return <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0" />;
    switch (category) {
      case 'queue':
        return <Clock className="w-4 h-4 text-emerald-600 shrink-0" />;
      case 'payment':
        return <CreditCard className="w-4 h-4 text-blue-600 shrink-0" />;
      case 'bay_operation':
        return <Scale className="w-4 h-4 text-indigo-600 shrink-0" />;
      case 'sso_governance':
        return <Building2 className="w-4 h-4 text-purple-600 shrink-0" />;
      case 'mandi':
        return <Layers className="w-4 h-4 text-teal-600 shrink-0" />;
      case 'system':
      default:
        return <ShieldCheck className="w-4 h-4 text-slate-500 shrink-0" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        onClick={() => setIsNotificationOpen(false)}
        className="absolute inset-0 bg-slate-900/50 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
      />

      {/* Slide-over Container */}
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-8 sm:pl-10">
        <div className="w-screen max-w-lg bg-white shadow-2xl flex flex-col border-l border-slate-200">
          
          {/* Header with Authenticated Identity & Registered Number */}
          <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/90">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-[#165a36] flex items-center justify-center shadow-xs shrink-0">
                <Bell className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-base font-bold text-slate-900 leading-tight">
                    {userSession.name}
                  </h2>
                  {unreadCount > 0 && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold font-mono bg-emerald-600 text-white">
                      {unreadCount} new
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <Lock className="w-3 h-3 text-emerald-600 shrink-0" />
                  <span className="text-[11px] font-mono font-medium text-slate-600">
                    Reg ID: <strong className="text-slate-900">{registeredId}</strong>
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setIsNotificationOpen(false)}
              className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-200/60 rounded-xl transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Authenticated Verification Badge Bar */}
          <div className="px-4 py-2 bg-emerald-50/70 border-b border-emerald-100 flex items-center justify-between text-xs">
            <div className="flex items-center gap-1.5 text-emerald-900 text-[11px] font-medium">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>
                {userSession.role === 'farmer' && 'Private Farmer SMS & Gate Token Notifications'}
                {userSession.role === 'operator' && 'Bay #2 Electronic Scale & Gross Weighment Alerts'}
                {userSession.role === 'admin' && 'State Directorate SSO Mandi Clearing Stream'}
              </span>
            </div>

            <div className="flex items-center gap-1">
              {unreadCount > 0 && (
                <button
                  onClick={() => markAllNotificationsAsRead(userChannel)}
                  title="Mark all as read"
                  className="px-2 py-1 text-[10px] font-semibold text-emerald-700 hover:bg-emerald-100/70 rounded-md transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <CheckCheck className="w-3 h-3" />
                  <span>Mark Read</span>
                </button>
              )}
              {userNotifications.length > 0 && (
                <button
                  onClick={() => clearNotifications(userChannel)}
                  title="Clear alerts"
                  className="p-1 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-md transition-colors cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Quick Filter Categories */}
          <div className="px-4 py-2 border-b border-slate-100 bg-white flex items-center gap-1.5 overflow-x-auto text-xs">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-colors cursor-pointer shrink-0 ${
                activeCategory === 'all'
                  ? 'bg-slate-900 text-white font-bold shadow-2xs'
                  : 'bg-slate-100 text-slate-600 hover:text-slate-900'
              }`}
            >
              All Alerts ({userNotifications.length})
            </button>

            {userSession.role === 'farmer' && (
              <>
                <button
                  onClick={() => setActiveCategory('queue')}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-colors cursor-pointer shrink-0 ${
                    activeCategory === 'queue'
                      ? 'bg-emerald-800 text-white font-bold shadow-2xs'
                      : 'bg-slate-100 text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Queue &amp; Tokens
                </button>
                <button
                  onClick={() => setActiveCategory('payment')}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-colors cursor-pointer shrink-0 ${
                    activeCategory === 'payment'
                      ? 'bg-blue-800 text-white font-bold shadow-2xs'
                      : 'bg-slate-100 text-slate-600 hover:text-slate-900'
                  }`}
                >
                  DBT Payments
                </button>
              </>
            )}

            {userSession.role === 'operator' && (
              <button
                onClick={() => setActiveCategory('bay_operation')}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-colors cursor-pointer shrink-0 ${
                  activeCategory === 'bay_operation'
                    ? 'bg-indigo-800 text-white font-bold shadow-2xs'
                    : 'bg-slate-100 text-slate-600 hover:text-slate-900'
                }`}
              >
                Scale &amp; Tare Cycles
              </button>
            )}

            {userSession.role === 'admin' && (
              <button
                onClick={() => setActiveCategory('sso_governance')}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-colors cursor-pointer shrink-0 ${
                  activeCategory === 'sso_governance'
                    ? 'bg-purple-800 text-white font-bold shadow-2xs'
                    : 'bg-slate-100 text-slate-600 hover:text-slate-900'
                }`}
              >
                Quota &amp; Governance
              </button>
            )}

            <button
              onClick={() => setActiveCategory('mandi')}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-colors cursor-pointer shrink-0 ${
                activeCategory === 'mandi'
                  ? 'bg-teal-800 text-white font-bold shadow-2xs'
                  : 'bg-slate-100 text-slate-600 hover:text-slate-900'
              }`}
            >
              Mandi Advisories
            </button>
          </div>

          {/* Notifications List (Strictly Scoped) */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {filteredNotifications.length === 0 ? (
              <div className="py-16 text-center space-y-2">
                <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                  <Bell className="w-6 h-6" />
                </div>
                <h3 className="text-sm font-bold text-slate-700">No New Notifications</h3>
                <p className="text-xs text-slate-500 max-w-xs mx-auto">
                  No pending alerts for registered ID <span className="font-mono font-semibold">{registeredId}</span>. All weighment, queue and payment events are up to date.
                </p>
              </div>
            ) : (
              filteredNotifications.map((notif) => (
                <div
                  key={notif.id}
                  onClick={() => markNotificationAsRead(notif.id)}
                  className={`p-3.5 rounded-2xl border transition-all text-xs relative ${
                    notif.urgent
                      ? 'bg-amber-50/70 border-amber-300 ring-1 ring-amber-300/80 shadow-2xs'
                      : !notif.read
                      ? 'bg-emerald-50/50 border-emerald-200/80 shadow-2xs'
                      : 'bg-white border-slate-200 hover:border-slate-300'
                  }`}
                >
                  {/* Unread indicator */}
                  {!notif.read && (
                    <span className="absolute top-3.5 right-3.5 w-2 h-2 rounded-full bg-emerald-600" />
                  )}

                  <div className="flex items-start gap-2.5 pr-4">
                    <div className="mt-0.5">
                      {getCategoryIcon(notif.category, notif.urgent)}
                    </div>
                    <div className="flex-1">
                      {/* Identity header chip */}
                      <div className="flex flex-wrap items-center gap-1.5 mb-1.5">
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold font-mono bg-slate-100 text-slate-800 border border-slate-200">
                          {userSession.role === 'farmer' && <Wheat className="w-3 h-3 text-emerald-700" />}
                          {userSession.role === 'operator' && <Scale className="w-3 h-3 text-indigo-700" />}
                          {userSession.role === 'admin' && <Building2 className="w-3 h-3 text-purple-700" />}
                          <span>{notif.registeredNumber ? `Reg: ${notif.registeredNumber}` : notif.recipient}</span>
                        </span>
                        {notif.urgent && (
                          <span className="px-1.5 py-0.5 rounded text-[9px] font-extrabold uppercase bg-amber-200 text-amber-900">
                            Urgent
                          </span>
                        )}
                      </div>

                      <h4 className={`font-bold leading-tight ${notif.urgent ? 'text-amber-950' : 'text-slate-900'}`}>
                        {notif.title}
                      </h4>
                      <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">
                        {notif.message}
                      </p>

                      <div className="mt-2.5 flex items-center justify-between text-[10px] text-slate-400 font-mono">
                        <span>{notif.timestamp}</span>

                        {notif.actionScreen && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleActionClick(notif);
                            }}
                            className="px-2.5 py-1 bg-white hover:bg-slate-900 hover:text-white text-slate-800 font-sans font-bold rounded-lg border border-slate-200 transition-colors flex items-center gap-1 cursor-pointer shadow-2xs"
                          >
                            <span>{notif.actionLabel || 'View Details'}</span>
                            <ChevronRight className="w-3 h-3" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Action: Send/Simulate Alert Scoped to This Registered ID */}
          <div className="p-3.5 border-t border-slate-200 bg-slate-50 space-y-2 text-xs">
            <button
              onClick={() => simulateIncomingNotification(userChannel)}
              className="w-full py-2.5 px-3 bg-white hover:bg-slate-100 text-slate-800 font-semibold rounded-xl border border-slate-300 flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-2xs text-[11px]"
            >
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>
                Simulate Incoming SMS Alert for Reg: <strong>{registeredId}</strong>
              </span>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
