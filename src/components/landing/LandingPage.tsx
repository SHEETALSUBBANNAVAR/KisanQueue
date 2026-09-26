import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  ArrowRight, 
  MapPin, 
  Check, 
  Clock, 
  Calendar, 
  ListOrdered, 
  Bell, 
  ShieldCheck,
  TrendingDown,
  Building2,
  Wheat,
  Scale
} from 'lucide-react';
import heroFarmerImg from '../../assets/images/authentic_farmer_hero_1790413779425.jpg';

export const LandingPage: React.FC = () => {
  const { setIsLoginModalOpen, setLoginTab, t } = useApp();

  return (
    <div className="min-h-screen bg-white text-slate-900">
      {/* ---------------------------------------------------- */}
      {/* HERO SECTION — EXACT PIXEL MATCH TO REFERENCE IMAGE */}
      {/* ---------------------------------------------------- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 pb-16 lg:pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Typography & CTAs */}
          <div className="lg:col-span-7 xl:col-span-6 pr-0 lg:pr-4">
            {/* Top Green Accent Kicker */}
            <div className="flex items-center gap-2.5 mb-5">
              <div className="w-7 h-[3px] bg-emerald-600 rounded-full" />
              <span className="text-[11px] font-extrabold tracking-widest text-emerald-800 uppercase font-sans">
                {t('smartCentresTag')}
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-[4rem] font-bold text-slate-900 tracking-tight leading-[1.12]">
              {t('mainHeroHeadingLine1')}<br className="hidden sm:inline" />{' '}
              <span className="text-[#165a36]">{t('mainHeroHeadingLine2')}</span>
            </h1>

            {/* Subtitle */}
            <p className="mt-6 text-base sm:text-lg text-slate-500 max-w-lg leading-relaxed font-normal">
              {t('mainHeroSubtitle')}
            </p>

            {/* CTAs */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button
                onClick={() => {
                  setLoginTab('farmer');
                  setIsLoginModalOpen(true);
                }}
                className="px-6 py-3.5 bg-[#165a36] hover:bg-[#124b2d] active:bg-[#0e3b23] text-white font-bold rounded-xl flex items-center gap-2 shadow-sm transition-all cursor-pointer text-sm"
              >
                <span>{t('accessPortalBookSlot')}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => {
                  setIsLoginModalOpen(true);
                }}
                className="px-5 py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-sm rounded-xl transition-colors cursor-pointer border border-slate-200"
              >
                {t('signInWithCredentials')}
              </button>
            </div>

            {/* Built For Avatars / Social Proof */}
            <div className="mt-9 flex items-center gap-3">
              <div className="flex -space-x-1.5 overflow-hidden">
                <div className="w-6 h-6 rounded-full bg-amber-100 text-amber-900 border-2 border-white flex items-center justify-center text-[9px] font-bold">
                  RK
                </div>
                <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-900 border-2 border-white flex items-center justify-center text-[9px] font-bold">
                  AS
                </div>
                <div className="w-6 h-6 rounded-full bg-teal-100 text-teal-900 border-2 border-white flex items-center justify-center text-[9px] font-bold">
                  PM
                </div>
                <div className="w-6 h-6 rounded-full bg-slate-100 text-slate-700 border-2 border-white flex items-center justify-center text-[8px] font-bold">
                  +24k
                </div>
              </div>
              <span className="text-xs text-slate-500 font-medium">
                {t('verifiedNetworkSocial')}
              </span>
            </div>
          </div>

          {/* Right Column: Hero Image with Floating Reference Badges */}
          <div className="lg:col-span-5 xl:col-span-6 relative flex justify-center lg:justify-end py-4 sm:py-0">
            <div className="relative w-full max-w-[420px] sm:max-w-[460px] lg:max-w-[500px]">
              
              {/* Overlaid Floating Badge: Top-Left (Slot confirmed) - elevated so it does not cover the farmer's face */}
              <div className="absolute -top-3 left-2 sm:-left-6 sm:top-6 bg-white/95 sm:bg-white backdrop-blur-xs rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl p-2 sm:p-3 px-3 sm:px-4 border border-slate-100/90 flex items-center gap-2.5 sm:gap-3 z-20 max-w-[82%] sm:max-w-none">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg sm:rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                  <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[3]" />
                </div>
                <div className="min-w-0">
                  <div className="text-[11px] sm:text-xs font-bold text-slate-900 leading-tight truncate">
                    {t('slotConfirmedTag')}
                  </div>
                  <div className="text-[10px] sm:text-[11px] text-slate-500 font-mono mt-0.5 truncate">
                    A-124 · {t('slotConfirmedTime')}
                  </div>
                </div>
              </div>

              {/* Main Rounded Image Container - generous square aspect on mobile so farmer portrait is fully visible */}
              <div className="rounded-[2rem] sm:rounded-[2.75rem] overflow-hidden aspect-square relative shadow-xl sm:shadow-2xl bg-emerald-950 border border-slate-100">
                <img
                  src={heroFarmerImg}
                  alt="Indian rural farmer in agricultural field with crop"
                  className="w-full h-full object-cover object-top sm:object-center"
                />
                
                {/* Subtle vignette scrim */}
                <div className="absolute inset-x-0 bottom-0 h-24 sm:h-32 bg-gradient-to-t from-black/75 via-black/35 to-transparent pointer-events-none" />

                {/* Overlaid Tag: Bottom-Left inside Image */}
                <div className="absolute bottom-3 left-3 sm:bottom-5 sm:left-5 flex items-center gap-1.5 text-white/95 text-[10px] sm:text-xs font-medium z-10 drop-shadow-md">
                  <MapPin className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-emerald-400 shrink-0" />
                  <span className="truncate">{t('procurementPredictableTag')}</span>
                </div>
              </div>

              {/* Overlaid Floating Badge: Bottom-Right (12 farmers ahead) */}
              <div className="absolute -bottom-3 right-2 sm:-right-6 sm:bottom-6 bg-white/95 sm:bg-white backdrop-blur-xs rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl p-2 sm:p-3 px-3 sm:px-4 border border-slate-100/90 flex items-center gap-2.5 sm:gap-3 z-20 max-w-[82%] sm:max-w-none">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg sm:rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center shrink-0">
                  <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </div>
                <div className="min-w-0">
                  <div className="text-[11px] sm:text-xs font-bold text-slate-900 leading-tight truncate">
                    12 {t('farmersAhead')}
                  </div>
                  <div className="text-[10px] sm:text-[11px] text-slate-500 font-mono mt-0.5 truncate">
                    {t('estimatedWait')} · 45 min
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* SUB-SECTION — HOW IT WORKS                                       */}
      {/* ---------------------------------------------------------------- */}
      <section className="border-t border-slate-200 mt-6 pt-16 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-start">
            
            {/* Left Column: Heading */}
            <div className="lg:col-span-4 pr-0 lg:pr-6">
              <span className="text-[11px] font-extrabold tracking-widest text-emerald-800 uppercase font-sans block mb-3">
                {t('howItWorksHeading')}
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                {t('threeStepsHeading')}
              </h2>
            </div>

            {/* Right Column: 3 Steps with Vertical Dividers */}
            <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-0">
              
              {/* Step 01: Book your slot */}
              <div className="sm:border-l sm:border-slate-200 sm:pl-6 sm:pr-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-medium text-slate-400">01</span>
                  <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                    <Calendar className="w-4 h-4" />
                  </div>
                </div>
                <h3 className="text-base font-bold text-slate-900 mt-4 leading-tight">
                  {t('step1Title')}
                </h3>
                <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                  {t('step1Desc')}
                </p>
              </div>

              {/* Step 02: Track your queue */}
              <div className="sm:border-l sm:border-slate-200 sm:pl-6 sm:pr-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-medium text-slate-400">02</span>
                  <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                    <ListOrdered className="w-4 h-4" />
                  </div>
                </div>
                <h3 className="text-base font-bold text-slate-900 mt-4 leading-tight">
                  {t('step2Title')}
                </h3>
                <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                  {t('step2Desc')}
                </p>
              </div>

              {/* Step 03: Get notified */}
              <div className="sm:border-l sm:border-slate-200 sm:pl-6">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-medium text-slate-400">03</span>
                  <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                    <Bell className="w-4 h-4" />
                  </div>
                </div>
                <h3 className="text-base font-bold text-slate-900 mt-4 leading-tight">
                  {t('step3Title')}
                </h3>
                <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                  {t('step3Desc')}
                </p>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* ---------------------------------------------------- */}
      {/* APMC MANDI EFFICIENCY & REAL-TIME IMPACT BENCHMARK  */}
      {/* ---------------------------------------------------- */}
      <section className="bg-slate-50/80 border-t border-slate-200 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-2xs">
              <span className="text-slate-400 text-[11px] font-sans font-medium block">
                {t('waitingReductionTitle')}
              </span>
              <div className="text-2xl sm:text-3xl font-extrabold text-[#165a36] font-mono mt-1">
                -76%
              </div>
              <span className="text-[10px] text-slate-500 mt-0.5 block">
                {t('waitingReductionDesc')}
              </span>
            </div>

            <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-2xs">
              <span className="text-slate-400 text-[11px] font-sans font-medium block">
                {t('dailyFarmersTitle')}
              </span>
              <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-mono mt-1">
                2,480+
              </div>
              <span className="text-[10px] text-slate-500 mt-0.5 block">
                {t('dailyFarmersDesc')}
              </span>
            </div>

            <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-2xs">
              <span className="text-slate-400 text-[11px] font-sans font-medium block">
                {t('tareSpeedTitle')}
              </span>
              <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-mono mt-1">
                7.2 min
              </div>
              <span className="text-[10px] text-slate-500 mt-0.5 block">
                {t('tareSpeedDesc')}
              </span>
            </div>

            <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-2xs">
              <span className="text-slate-400 text-[11px] font-sans font-medium block">
                {t('dbtSlaTitle')}
              </span>
              <div className="text-2xl sm:text-3xl font-extrabold text-emerald-700 font-mono mt-1">
                &lt; 24 Hrs
              </div>
              <span className="text-[10px] text-slate-500 mt-0.5 block">
                {t('dbtSlaDesc')}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------- */}
      {/* FOOTER                                              */}
      {/* ---------------------------------------------------- */}
      <footer className="border-t border-slate-200 py-8 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Left Brand & Subtitle */}
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-lg bg-[#165a36] text-white flex items-center justify-center shadow-2xs">
              <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22v-9" />
                <path d="M12 13a5 5 0 0 0 5-5V4a5 5 0 0 0-5 5v4z" />
                <path d="M12 13a5 5 0 0 1-5-5V4a5 5 0 0 1 5 5v4z" />
              </svg>
            </div>
            <span className="text-base font-extrabold tracking-tight text-slate-900 leading-none">
              Kisan<span className="text-[#166534]">Queue</span>
            </span>
            <span className="hidden md:inline text-xs text-slate-400 font-medium ml-2">
              {t('footerSubtitle')}
            </span>
          </div>

          {/* Right Copyright */}
          <div className="text-xs text-slate-400 font-mono">
            &copy; 2026 {t('prototypeLabel')}
          </div>
        </div>
      </footer>
    </div>
  );
};
