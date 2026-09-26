import React from 'react';
import { useApp } from '../../context/AppContext';
import { Bell, ArrowRight, LogOut, User } from 'lucide-react';

export const Header: React.FC = () => {
  const { 
    userSession, 
    logout, 
    setIsLoginModalOpen, 
    language, 
    setLanguage, 
    unreadNotificationCount, 
    setIsNotificationOpen,
    setRole,
    t
  } = useApp();

  const handleLogoClick = () => {
    setRole('landing');
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        
        {/* Brand Logo matching reference */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleLogoClick}
            className="flex items-center gap-2.5 text-left group cursor-pointer"
          >
            <div className="w-8 h-8 rounded-lg bg-[#165a36] text-white flex items-center justify-center shadow-xs">
              <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22v-9" />
                <path d="M12 13a5 5 0 0 0 5-5V4a5 5 0 0 0-5 5v4z" />
                <path d="M12 13a5 5 0 0 1-5-5V4a5 5 0 0 1 5 5v4z" />
              </svg>
            </div>
            <span className="text-xl font-extrabold tracking-tight text-slate-900 leading-none">
              Kisan<span className="text-[#166534]">Queue</span>
            </span>
          </button>
        </div>

        {/* SIH 2026 Prototype Pill */}
        <div className="hidden sm:flex items-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-slate-200/80 bg-slate-50/60 text-xs font-medium text-slate-700 shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[12px] font-sans">{t('prototypeLabel')}</span>
          </div>
        </div>

        {/* Right Section: Language, Notification Bell & Login / User Profile */}
        <div className="flex items-center gap-3 sm:gap-3.5">
          
          {/* Language Selector */}
          <div className="flex items-center gap-0.5 bg-slate-100/80 p-0.5 rounded-lg text-xs font-medium">
            <button
              onClick={() => setLanguage('en')}
              className={`px-2 py-1 rounded text-[11px] transition-colors cursor-pointer ${
                language === 'en'
                  ? 'bg-white text-slate-900 shadow-2xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              EN
            </button>
            <button
              onClick={() => setLanguage('kn')}
              className={`px-2 py-1 rounded text-[11px] transition-colors cursor-pointer ${
                language === 'kn'
                  ? 'bg-white text-slate-900 shadow-2xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              ಕನ್ನಡ
            </button>
            <button
              onClick={() => setLanguage('hi')}
              className={`px-2 py-1 rounded text-[11px] transition-colors cursor-pointer ${
                language === 'hi'
                  ? 'bg-white text-slate-900 shadow-2xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              हिंदी
            </button>
          </div>

          {/* User Profile & Scoped Notifications (Shown ONLY After Login, Not in Main) */}
          {userSession ? (
            <div className="flex items-center gap-2 sm:gap-3 pl-1 border-l border-slate-200">
              {/* Notification Center Bell Trigger (Scoped to Registered Number) */}
              <button
                onClick={() => setIsNotificationOpen(true)}
                aria-label="Open notifications"
                title={`${userSession.name} (${userSession.registeredNumber || userSession.identifier}) Notifications (${unreadNotificationCount} new)`}
                className="relative p-2 text-slate-600 hover:text-[#165a36] hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
              >
                <Bell className="w-5 h-5" />
                {unreadNotificationCount > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-emerald-600 text-white font-mono font-bold text-[10px] rounded-full flex items-center justify-center ring-2 ring-white animate-pulse">
                    {unreadNotificationCount}
                  </span>
                )}
              </button>

              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-emerald-100 border border-emerald-300/80 text-[#165a36] font-bold text-xs flex items-center justify-center shadow-2xs">
                  {userSession.avatarInitials || 'AP'}
                </div>
                <div className="hidden md:block text-left">
                  <div className="text-xs font-bold text-slate-900 leading-tight">
                    {userSession.name}
                  </div>
                  <div className="text-[10px] text-slate-500 font-mono truncate max-w-[150px]">
                    {userSession.registeredNumber ? `Reg: ${userSession.registeredNumber}` : userSession.identifier}
                  </div>
                </div>
              </div>

              <button
                onClick={logout}
                title={t('signOutLabel')}
                className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer flex items-center gap-1 text-xs font-medium"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline text-[11px]">{t('signOutLabel')}</span>
              </button>
            </div>
          ) : (
            <button
              onClick={() => setIsLoginModalOpen(true)}
              className="flex items-center gap-1.5 text-sm font-bold text-slate-900 hover:text-[#165a36] transition-colors py-1.5 px-2 cursor-pointer group"
            >
              <span>{t('loginLabel')}</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </button>
          )}

        </div>
      </div>
    </header>
  );
};
