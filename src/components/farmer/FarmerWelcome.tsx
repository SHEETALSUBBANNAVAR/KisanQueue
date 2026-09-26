import React from 'react';
import { useApp } from '../../context/AppContext';
import { ArrowRight, UserCheck, ShieldCheck, Clock, CheckCircle } from 'lucide-react';

export const FarmerWelcome: React.FC = () => {
  const { setFarmerScreen, currentFarmer, t } = useApp();

  return (
    <div className="flex flex-col min-h-[580px] justify-between p-6 bg-white rounded-2xl border border-slate-200 shadow-xs max-w-2xl mx-auto">
      <div className="pt-2">
        {/* Brand Tag */}
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 rounded-lg bg-emerald-800 text-white font-bold text-sm flex items-center justify-center">
            KQ
          </div>
          <span className="text-xs font-semibold text-emerald-800 uppercase tracking-wider">
            {t('farmerPortal')}
          </span>
        </div>

        {/* Hero Graphic / Illustration */}
        <div className="my-6 p-6 rounded-2xl bg-gradient-to-br from-emerald-50 via-slate-50 to-emerald-100/50 border border-emerald-100 flex flex-col items-center justify-center text-center">
          <div className="relative w-28 h-28 mb-3 flex items-center justify-center">
            <svg viewBox="0 0 120 120" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="15" y="70" width="90" height="42" rx="4" fill="#E2E8F0" stroke="#CBD5E1" strokeWidth="2" />
              <polygon points="10,70 60,35 110,70" fill="#166534" />
              <rect x="45" y="80" width="30" height="32" rx="2" fill="#FFFFFF" stroke="#94A3B8" strokeWidth="1.5" />
              <circle cx="60" cy="94" r="5" fill="#22C55E" />
              <g transform="translate(68, 18)">
                <rect width="44" height="28" rx="6" fill="#0F172A" />
                <text x="22" y="18" fill="#4ADE80" fontSize="11" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
                  A-124
                </text>
              </g>
              <circle cx="32" cy="74" r="7" fill="#FBBF24" />
              <path d="M22 96 C22 84 42 84 42 96" fill="#166534" />
            </svg>
          </div>
          <p className="text-xs font-medium text-emerald-800">
            Smart Procurement Centre & Predictive Token System
          </p>
        </div>

        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight leading-tight">
          {t('appName')}
        </h1>
        <p className="text-base font-semibold text-emerald-800 mt-1">
          {t('tagline')}
        </p>
        <p className="text-sm text-slate-600 mt-3 leading-relaxed">
          {t('heroSubtitle')}
        </p>

        {/* Benefits list */}
        <div className="mt-6 space-y-2.5 text-xs text-slate-600">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Eliminates 8–12 hours of overnight tractor queues</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Turn-approaching SMS/push alerts before your slot</span>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Transparent digital weighbridge slip and DBT status</span>
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="pt-8 space-y-3">
        <button
          onClick={() => setFarmerScreen('login')}
          className="w-full h-12 bg-emerald-800 hover:bg-emerald-900 active:bg-emerald-950 text-white font-semibold text-sm rounded-xl flex items-center justify-center gap-2 transition-colors shadow-xs cursor-pointer"
        >
          <span>{t('bookSlot')}</span>
          <ArrowRight className="w-4 h-4" />
        </button>

        <button
          onClick={() => setFarmerScreen('home')}
          className="w-full h-11 bg-slate-100 hover:bg-slate-200 active:bg-slate-300 text-slate-800 font-medium text-xs rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer"
        >
          <UserCheck className="w-4 h-4 text-emerald-700" />
          <span>{t('tryFarmerDemo')} ({currentFarmer.name})</span>
        </button>
      </div>
    </div>
  );
};
