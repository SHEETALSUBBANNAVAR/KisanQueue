import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { CropType, RecommendedSlot } from '../../types';
import { getRecommendedSlots } from '../../services/predictiveEngine';
import { 
  ArrowLeft, 
  ArrowRight, 
  Check, 
  Sparkles, 
  MapPin, 
  Calendar, 
  Clock, 
  Search, 
  CalendarPlus, 
  CheckCircle2, 
  Wheat, 
  ShieldCheck,
  TrendingDown,
  Building2
} from 'lucide-react';

export const FarmerBookingFlow: React.FC = () => {
  const {
    farmerScreen,
    setFarmerScreen,
    centres,
    bookingDraft,
    updateBookingDraft,
    confirmBooking,
    addToast,
    t
  } = useApp();

  // F05: Crop Selection State
  const [selectedCrop, setSelectedCrop] = useState<CropType>(bookingDraft.crop);
  const [quantity, setQuantity] = useState<number>(bookingDraft.quantityKg);

  // F06: Centre Selection State
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCentreId, setActiveCentreId] = useState(bookingDraft.centreId || centres[0].id);

  // F07: Slot Recommendation State
  const [slotDayOffset, setSlotDayOffset] = useState<number>(0);
  const slots: RecommendedSlot[] = getRecommendedSlots(14 + slotDayOffset * 2, 4, selectedCrop);
  const [selectedSlot, setSelectedSlot] = useState<RecommendedSlot>(slots[0]);

  // F08: Confirmation Token
  const [bookedAppointment, setBookedAppointment] = useState<any>(null);

  // Step 1: Submit Crop & Quantity
  const handleCropSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quantity || quantity <= 0) {
      addToast('Invalid Quantity', 'Please enter a valid harvest quantity in kg', 'error');
      return;
    }
    updateBookingDraft({ crop: selectedCrop, quantityKg: quantity });
    setFarmerScreen('centre_select');
  };

  // Step 2: Select Centre
  const handleCentreSelect = (centreId: string) => {
    setActiveCentreId(centreId);
    updateBookingDraft({ centreId });
    setFarmerScreen('slot_recommendation');
  };

  // Step 3: Confirm Slot Booking
  const handleSlotConfirm = (slotToBook: RecommendedSlot) => {
    updateBookingDraft({ slot: slotToBook });
    const newApt = confirmBooking();
    setBookedAppointment(newApt);
    setFarmerScreen('booking_confirmation');
  };

  // Real .ics Calendar File Download Handler
  const handleDownloadCalendar = () => {
    const apt = bookedAppointment || {
      tokenNumber: 'A-124',
      centreName: 'Bengaluru Agricultural Procurement Centre',
      timeSlot: '10:30 AM',
      crop: 'Rice (Paddy)'
    };

    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//KisanQueue//APMC Appointment//EN',
      'BEGIN:VEVENT',
      `SUMMARY:KisanQueue APMC Procurement - Token ${apt.tokenNumber}`,
      `DESCRIPTION:Produce: ${apt.crop}. Appointment at ${apt.centreName}. Arrive with tractor for weighbridge counter inspection.`,
      `LOCATION:${apt.centreName}`,
      'DTSTART:20260926T103000',
      'DTEND:20260926T111500',
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `KisanQueue_Appointment_${apt.tokenNumber}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    addToast('Calendar Exported', 'Appointment file (.ics) downloaded to your device', 'success');
  };

  // ----------------------------------------------------
  // F05 — SELECT CROP
  // ----------------------------------------------------
  if (farmerScreen === 'crop_select') {
    const crops: { name: CropType; icon: string; desc: string; msp: string }[] = [
      { name: 'Rice (Paddy)', icon: '🌾', desc: 'Common / Grade-A Paddy', msp: '₹2,320 / qtl' },
      { name: 'Wheat', icon: '🌿', desc: 'Sharbati & Mill-grade Wheat', msp: '₹2,425 / qtl' },
      { name: 'Maize', icon: '🌽', desc: 'Yellow Feed & Food Maize', msp: '₹2,225 / qtl' },
      { name: 'Ragi (Finger Millet)', icon: '🌱', desc: 'Nutri-cereal / Mandi standard', msp: '₹4,290 / qtl' },
      { name: 'Other', icon: '📦', desc: 'Pulses & Coarse Cereals', msp: 'Govt MSP Rates' }
    ];

    return (
      <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-xs">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-5">
          <button
            onClick={() => setFarmerScreen('home')}
            className="text-xs font-semibold text-slate-600 hover:text-slate-900 flex items-center gap-1 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{t('cancel')}</span>
          </button>
          <span className="text-xs font-mono font-semibold text-emerald-800">
            Step 1 of 3
          </span>
        </div>

        <h1 className="text-xl sm:text-2xl font-bold text-slate-900">{t('whatBringingToday')}</h1>
        <p className="text-xs text-slate-600 mt-1">
          {t('selectCropDesc')}
        </p>

        <form onSubmit={handleCropSubmit} className="mt-5 space-y-5">
          {/* Responsive Crop Cards Grid (2 cols on tablet/desktop) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {crops.map((crop) => {
              const isSelected = selectedCrop === crop.name;
              return (
                <div
                  key={crop.name}
                  onClick={() => setSelectedCrop(crop.name)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                    isSelected
                      ? 'border-emerald-600 bg-emerald-50/70 shadow-xs ring-2 ring-emerald-600'
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-3xl" role="img" aria-label={crop.name}>
                      {crop.icon}
                    </span>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 leading-tight">
                        {crop.name}
                      </h4>
                      <p className="text-[11px] text-slate-500 mt-0.5">{crop.desc}</p>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-xs font-mono font-semibold text-slate-700 block">
                      {crop.msp}
                    </span>
                    {isSelected && (
                      <span className="inline-block mt-0.5 text-xs text-emerald-700 font-bold">
                        ✓ Selected
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="pt-4 border-t border-slate-100">
            <label className="block text-xs font-bold text-slate-800 mb-1.5">
              {t('cropQuantityKg')}
            </label>
            <div className="relative max-w-md">
              <input
                type="number"
                min="50"
                step="10"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="w-full px-4 py-3 rounded-xl border border-slate-300 text-lg font-mono font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-700"
                placeholder="500"
                required
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-slate-500">
                Kilograms (kg)
              </span>
            </div>
            <p className="text-[11px] text-slate-500 mt-1.5">
              Standard tractor trolley capacity: ~2,500 – 4,000 kg. Mini-tempo: ~500 – 1,000 kg.
            </p>
          </div>

          <button
            type="submit"
            className="w-full sm:w-auto px-8 h-12 bg-emerald-800 hover:bg-emerald-900 text-white font-semibold text-sm rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-xs"
          >
            <span>{t('continue')}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      </div>
    );
  }

  // ----------------------------------------------------
  // F06 — SELECT PROCUREMENT CENTRE
  // ----------------------------------------------------
  if (farmerScreen === 'centre_select') {
    const filteredCentres = centres.filter((c) =>
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.district.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
      <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-xs">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
          <button
            onClick={() => setFarmerScreen('crop_select')}
            className="text-xs font-semibold text-slate-600 hover:text-slate-900 flex items-center gap-1 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{t('back')}</span>
          </button>
          <span className="text-xs font-mono font-semibold text-emerald-800">
            Step 2 of 3
          </span>
        </div>

        <h1 className="text-xl sm:text-2xl font-bold text-slate-900">{t('selectCentre')}</h1>
        <p className="text-xs text-slate-600 mt-1">
          Choose a mandi yard near you with optimal counter capacity.
        </p>

        {/* Search */}
        <div className="relative mt-4 mb-3">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={t('searchCentrePlaceholder')}
            className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-700"
          />
        </div>

        {/* Responsive Grid: On Desktop, Map and List are Side-by-Side! */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-4">
          {/* Interactive Map Visual */}
          <div className="relative w-full h-56 lg:h-auto min-h-[220px] bg-emerald-950 rounded-xl overflow-hidden border border-emerald-900">
            <div className="absolute inset-0 bg-[radial-gradient(#15803d_1px,transparent_1px)] [background-size:16px_16px] opacity-25" />
            <svg className="absolute inset-0 w-full h-full opacity-30" viewBox="0 0 400 200">
              <path d="M 20 100 Q 120 50 220 110 T 380 90" fill="none" stroke="#22c55e" strokeWidth="2" strokeDasharray="4 4" />
              <path d="M 60 160 Q 180 90 300 140" fill="none" stroke="#16a34a" strokeWidth="1.5" />
            </svg>

            {/* Interactive Centre Pins */}
            {centres.map((c) => {
              const isSelected = c.id === activeCentreId;
              return (
                <button
                  key={c.id}
                  onClick={() => setActiveCentreId(c.id)}
                  style={{ left: `${c.coordinates.x}%`, top: `${c.coordinates.y}%` }}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 px-2 py-1 rounded-md text-[10px] font-mono font-bold flex items-center gap-1 shadow-md transition-transform hover:scale-110 cursor-pointer ${
                    isSelected
                      ? 'bg-emerald-400 text-slate-950 ring-2 ring-white z-20'
                      : 'bg-slate-900/90 text-emerald-200 border border-emerald-600/50 z-10'
                  }`}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                  <span className="truncate max-w-[80px]">{c.name.split(' ')[0]}</span>
                </button>
              );
            })}

            <div className="absolute bottom-2 left-3 text-[10px] text-emerald-200/80 font-mono bg-slate-950/80 px-2 py-0.5 rounded backdrop-blur-xs">
              District Radius: 45 km · Real-time load mapping
            </div>
          </div>

          {/* Centre Cards List */}
          <div className="space-y-3 max-h-[360px] overflow-y-auto pr-1">
            {filteredCentres.map((centre) => {
              const isSelected = centre.id === activeCentreId;
              return (
                <div
                  key={centre.id}
                  onClick={() => setActiveCentreId(centre.id)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'border-emerald-600 bg-emerald-50/60 ring-2 ring-emerald-600 shadow-xs'
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 leading-tight">
                        {centre.name}
                      </h4>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        {centre.district} · {centre.distanceKm} km away
                      </p>
                    </div>
                    <span className={`text-[11px] font-bold font-mono px-2 py-0.5 rounded ${
                      centre.expectedLoad === 'Low'
                        ? 'bg-emerald-100 text-emerald-800'
                        : centre.expectedLoad === 'Medium'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-rose-100 text-rose-800'
                    }`}>
                      {centre.expectedLoad} Load
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-2 mt-3 pt-2.5 border-t border-slate-100 text-[11px] text-slate-600 font-mono">
                    <div>
                      <span className="text-slate-500 block text-[10px]">Queue</span>
                      <strong>{centre.currentQueueLength} in line</strong>
                    </div>
                    <div>
                      <span className="text-slate-500 block text-[10px]">Est. Wait</span>
                      <strong>~{centre.avgWaitMinutes} min</strong>
                    </div>
                    <div>
                      <span className="text-slate-500 block text-[10px]">Active Bays</span>
                      <strong>{centre.activeCounters} / {centre.totalCounters}</strong>
                    </div>
                  </div>

                  {isSelected && (
                    <button
                      onClick={() => handleCentreSelect(centre.id)}
                      className="w-full mt-3 py-2 bg-emerald-800 hover:bg-emerald-900 text-white font-semibold text-xs rounded-lg flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <span>Select Centre & View Slots</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // ----------------------------------------------------
  // F07 — SMART SLOT RECOMMENDATION (CORE FEATURE)
  // ----------------------------------------------------
  if (farmerScreen === 'slot_recommendation') {
    const chosenCentre = centres.find((c) => c.id === activeCentreId) || centres[0];

    return (
      <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-xs">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
          <button
            onClick={() => setFarmerScreen('centre_select')}
            className="text-xs font-semibold text-slate-600 hover:text-slate-900 flex items-center gap-1 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Change Centre</span>
          </button>
          <span className="text-xs font-mono font-semibold text-emerald-800">
            Step 3 of 3
          </span>
        </div>

        <div className="mb-4">
          <div className="flex items-center gap-1.5 text-xs text-emerald-800 font-semibold mb-1">
            <Sparkles className="w-4 h-4 text-emerald-600" />
            <span>AI Predictive Load Allocation</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900">{t('recommendedSlots')}</h1>
          <p className="text-xs text-slate-600 mt-1 leading-relaxed max-w-2xl">
            {t('recommendedSlotsDesc')}
          </p>
        </div>

        {/* Selected Centre Snapshot */}
        <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 mb-4 flex items-center justify-between text-xs">
          <div>
            <span className="text-slate-500 block text-[10px]">{t('procurementCentre')}</span>
            <span className="font-semibold text-slate-900">{chosenCentre.name}</span>
          </div>
          <div className="text-right">
            <span className="text-slate-500 block text-[10px]">{t('crop')} & {t('quantity')}</span>
            <span className="font-mono font-semibold text-slate-900">{bookingDraft.crop} · {bookingDraft.quantityKg} kg</span>
          </div>
        </div>

        {/* Responsive Slots Grid: 3 columns on tablet/desktop */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
          {slots.map((slot) => {
            const isSelected = selectedSlot.id === slot.id;
            return (
              <div
                key={slot.id}
                onClick={() => setSelectedSlot(slot)}
                className={`p-4 rounded-xl border transition-all cursor-pointer relative flex flex-col justify-between ${
                  slot.isRecommended
                    ? isSelected
                      ? 'border-emerald-600 bg-emerald-50/80 ring-2 ring-emerald-600 shadow-sm'
                      : 'border-emerald-300 bg-emerald-50/40 hover:border-emerald-400'
                    : isSelected
                    ? 'border-slate-800 bg-slate-50 ring-2 ring-slate-800'
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                <div>
                  {slot.isRecommended && (
                    <div className="inline-flex items-center gap-1 px-2 py-0.5 bg-emerald-800 text-white rounded text-[10px] font-bold tracking-wide uppercase mb-2">
                      <Sparkles className="w-3 h-3 text-emerald-300" />
                      <span>{t('recommended')}</span>
                    </div>
                  )}

                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-emerald-800 shrink-0" />
                      <div>
                        <h4 className="text-base font-bold text-slate-900 font-mono">
                          {slot.timeString}
                        </h4>
                        <p className="text-xs text-slate-600 mt-0.5">
                          {slot.expectedLoad} expected load · <strong className="text-emerald-800">~{slot.estimatedWaitMinutes}m wait</strong>
                        </p>
                      </div>
                    </div>

                    <div className="w-5 h-5 rounded-full border border-slate-300 flex items-center justify-center shrink-0 mt-0.5">
                      {isSelected && (
                        <div className="w-3 h-3 rounded-full bg-emerald-800" />
                      )}
                    </div>
                  </div>
                </div>

                {slot.recommendedReason && (
                  <p className="text-[11px] text-slate-600 mt-3 pt-2 border-t border-slate-200/60 leading-snug">
                    {slot.recommendedReason}
                  </p>
                )}
              </div>
            );
          })}
        </div>

        {/* Buttons */}
        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => handleSlotConfirm(selectedSlot)}
            className="flex-1 h-12 bg-emerald-800 hover:bg-emerald-900 active:bg-emerald-950 text-white font-bold text-sm rounded-xl flex items-center justify-center gap-2 transition-colors shadow-xs cursor-pointer"
          >
            <span>{t('bookRecommendedSlot')} ({selectedSlot.timeString.split(' - ')[0]})</span>
            <Check className="w-4 h-4" />
          </button>

          <button
            onClick={() => {
              setSlotDayOffset((prev) => (prev + 1) % 4);
              addToast('Alternate Slots Loaded', 'Loaded afternoon and next-day arrival slots', 'info');
            }}
            className="h-12 px-5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-xl flex items-center justify-center transition-colors cursor-pointer"
          >
            <span>{t('chooseAnotherTime')}</span>
          </button>
        </div>

        <p className="text-center text-[11px] text-slate-500 mt-3">
          Simulated predictive load balancing · Gradient Boosting Regressor engine.
        </p>
      </div>
    );
  }

  // ----------------------------------------------------
  // F08 — BOOKING CONFIRMATION
  // ----------------------------------------------------
  if (farmerScreen === 'booking_confirmation') {
    const apt = bookedAppointment || {
      tokenNumber: 'A-124',
      centreName: 'Bengaluru Agricultural Procurement Centre',
      date: '26 September 2026',
      timeSlot: '10:30 AM',
      crop: 'Rice (Paddy)',
      bookedQuantityKg: 500
    };

    return (
      <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between min-h-[560px]">
        <div>
          {/* Success Check Banner */}
          <div className="text-center pb-4 border-b border-slate-100">
            <div className="w-14 h-14 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto mb-2">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
              {t('slotSuccessfullyBooked')}
            </h1>
            <p className="text-xs text-slate-600 mt-1">
              Your appointment is recorded in the APMC Central Register.
            </p>
          </div>

          {/* Responsive Layout: On desktop, Token and Details sit side-by-side! */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 my-5">
            {/* Digital Token Card */}
            <div className="p-5 bg-gradient-to-br from-emerald-950 to-slate-900 text-white rounded-2xl shadow-md border border-emerald-800/50 flex flex-col items-center text-center justify-center">
              <span className="text-xs text-emerald-300 uppercase tracking-widest font-semibold">
                Digital Queue Token
              </span>
              <div className="text-5xl font-extrabold font-mono tracking-wider text-white my-1">
                {apt.tokenNumber}
              </div>
              <div className="text-xs text-emerald-200">
                {t('estimatedWait')}: <strong className="text-white">~35 minutes</strong>
              </div>

              {/* Generated QR Code Visual */}
              <div className="mt-4 p-3 bg-white rounded-xl shadow-xs">
                <svg className="w-28 h-28" viewBox="0 0 100 100" fill="none">
                  <rect width="100" height="100" fill="white" />
                  <rect x="10" y="10" width="26" height="26" fill="#0F172A" rx="2" />
                  <rect x="15" y="15" width="16" height="16" fill="white" />
                  <rect x="19" y="19" width="8" height="8" fill="#0F172A" />
                  <rect x="64" y="10" width="26" height="26" fill="#0F172A" rx="2" />
                  <rect x="69" y="15" width="16" height="16" fill="white" />
                  <rect x="73" y="19" width="8" height="8" fill="#0F172A" />
                  <rect x="10" y="64" width="26" height="26" fill="#0F172A" rx="2" />
                  <rect x="15" y="69" width="16" height="16" fill="white" />
                  <rect x="19" y="73" width="8" height="8" fill="#0F172A" />
                  <rect x="42" y="14" width="6" height="6" fill="#166534" />
                  <rect x="52" y="24" width="6" height="6" fill="#0F172A" />
                  <rect x="42" y="38" width="8" height="8" fill="#166534" />
                  <rect x="56" y="44" width="6" height="6" fill="#0F172A" />
                  <rect x="44" y="60" width="6" height="6" fill="#166534" />
                  <rect x="64" y="64" width="8" height="8" fill="#0F172A" />
                  <rect x="76" y="76" width="10" height="10" fill="#166534" />
                </svg>
              </div>
              <span className="text-[10px] text-emerald-300/80 font-mono mt-2">
                Scan at Weighbridge Entry Gate
              </span>
            </div>

            {/* Appointment Snapshot Details */}
            <div className="space-y-3 flex flex-col justify-between">
              <div className="space-y-2.5 text-xs text-slate-700 bg-slate-50 p-4 rounded-xl border border-slate-200">
                <div className="flex justify-between">
                  <span className="text-slate-500">{t('procurementCentre')}:</span>
                  <strong className="text-slate-900 text-right">{apt.centreName}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">{t('date')} & {t('slot')}:</span>
                  <strong className="text-slate-900">{apt.date} · {apt.timeSlot}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">{t('crop')}:</span>
                  <strong className="text-slate-900">{apt.crop} ({apt.bookedQuantityKg} kg)</strong>
                </div>
                <div className="flex justify-between pt-1 border-t border-slate-200">
                  <span className="text-slate-500">Gate Bay:</span>
                  <strong className="text-emerald-800">Weighbridge Counter #2</strong>
                </div>
              </div>

              <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl text-xs text-blue-900 flex items-start gap-2">
                <Clock className="w-4 h-4 text-blue-700 shrink-0 mt-0.5" />
                <p>
                  <strong>Smart Notification:</strong> You will receive an automated turn-approaching alert when you are 3–5 farmers away.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => setFarmerScreen('live_queue')}
            className="flex-1 h-12 bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-sm rounded-xl flex items-center justify-center gap-2 transition-colors shadow-xs cursor-pointer"
          >
            <span>{t('trackLiveQueue')}</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={handleDownloadCalendar}
            className="h-12 px-6 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <CalendarPlus className="w-4 h-4 text-emerald-800" />
            <span>{t('addToCalendar')} (.ics)</span>
          </button>
        </div>
      </div>
    );
  }

  return null;
};
