import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Building2, 
  Users, 
  Clock, 
  CheckCircle2, 
  Scale, 
  QrCode, 
  Search, 
  Volume2, 
  FileText, 
  ArrowRight, 
  Check, 
  X,
  Sparkles,
  ChevronRight,
  Filter,
  RefreshCw
} from 'lucide-react';
import { Appointment } from '../../types';

export const OperatorDashboard: React.FC = () => {
  const {
    selectedCentre,
    appointments,
    currentServingTokenNumber,
    currentServingTokenString,
    callNextFarmer,
    verifyFarmerToken,
    completeProcurementEntry,
    addToast,
    t
  } = useApp();

  // Verification modal state
  const [isVerifyModalOpen, setIsVerifyModalOpen] = useState(false);
  const [tokenInput, setTokenInput] = useState('A-124');
  const [scannedFarmerApt, setScannedFarmerApt] = useState<Appointment | null>(null);

  // Procurement entry modal state
  const [isProcurementModalOpen, setIsProcurementModalOpen] = useState(false);
  const [procurementForm, setProcurementForm] = useState({
    actualQuantityKg: 492,
    moisturePercent: 13.4,
    qualityStatus: 'Grade A (FAQ Standard)',
    weighbridgeSlipNo: 'WB-2026-0926-048'
  });

  // Filter for appointment table
  const [statusFilter, setStatusFilter] = useState<string>('ALL');

  const nextTokenString = `A-${currentServingTokenNumber + 1}`;

  // Filter centre appointments
  const centreAppointments = appointments.filter((a) => a.centreId === selectedCentre.id);
  const filteredAppointments = centreAppointments.filter((a) => {
    if (statusFilter !== 'ALL' && a.status !== statusFilter) return false;
    return true;
  });

  const handleOpenVerifyModal = (prefillToken?: string) => {
    const targetToken = prefillToken || currentServingTokenString;
    setTokenInput(targetToken);
    const found = verifyFarmerToken(targetToken);
    setScannedFarmerApt(found);
    setIsVerifyModalOpen(true);
  };

  const handleSearchToken = (e: React.FormEvent) => {
    e.preventDefault();
    const found = verifyFarmerToken(tokenInput.trim());
    if (found) {
      setScannedFarmerApt(found);
      addToast('Farmer Verified', `FID: ${found.farmerId} · ${found.farmerName}`, 'success');
    } else {
      setScannedFarmerApt(null);
      addToast('Token Not Found', `No active slot found for ${tokenInput}`, 'error');
    }
  };

  const handleProceedToProcurement = () => {
    setIsVerifyModalOpen(false);
    setIsProcurementModalOpen(true);
  };

  const handleSaveProcurement = (e: React.FormEvent) => {
    e.preventDefault();
    if (!scannedFarmerApt) return;

    completeProcurementEntry({
      appointmentId: scannedFarmerApt.id,
      actualQuantityKg: procurementForm.actualQuantityKg,
      moisturePercent: procurementForm.moisturePercent,
      qualityStatus: procurementForm.qualityStatus,
      weighbridgeSlipNo: procurementForm.weighbridgeSlipNo
    });

    setIsProcurementModalOpen(false);
    setScannedFarmerApt(null);
  };

  return (
    <div className="min-h-screen bg-slate-100 p-4 sm:p-6 lg:p-8 pb-10">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Operator Header Bar */}
        <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 uppercase tracking-wider">
              <Building2 className="w-4 h-4 text-emerald-800" />
              <span>{t('centreOperator')} · Weighbridge Bay Counter #2</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mt-1">
              {selectedCentre.name}
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Officer in Charge: Anil Kumar (ID: OP-KAR-2041) · Shift: 08:30 AM – 05:30 PM · {selectedCentre.district}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={() => handleOpenVerifyModal('A-124')}
              className="px-4 py-2.5 bg-emerald-800 hover:bg-emerald-900 active:bg-emerald-950 text-white font-semibold text-xs rounded-xl flex items-center gap-2 transition-colors shadow-xs cursor-pointer"
            >
              <QrCode className="w-4 h-4" />
              <span>{t('verifyFarmer')} (A-124)</span>
            </button>

            <button
              onClick={callNextFarmer}
              className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 active:bg-slate-950 text-white font-semibold text-xs rounded-xl flex items-center gap-2 transition-colors shadow-xs cursor-pointer"
            >
              <Volume2 className="w-4 h-4 text-emerald-400" />
              <span>{t('callNextFarmer')}</span>
            </button>
          </div>
        </div>

        {/* Overview KPI Cards (From prompt: 128 Today, 32 Waiting, 86 Completed, 4 Active Counters, 7 min Processing) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
            <span className="text-[11px] font-medium text-slate-500 block">{t('farmersToday')}</span>
            <div className="text-2xl font-extrabold text-slate-900 font-mono mt-0.5">128</div>
            <span className="text-[10px] text-slate-500 font-medium">Daily target intake</span>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
            <span className="text-[11px] font-medium text-slate-500 block">{t('waiting')}</span>
            <div className="text-2xl font-extrabold text-amber-700 font-mono mt-0.5">32</div>
            <span className="text-[10px] text-amber-700 font-medium font-mono">Tokens in yard</span>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
            <span className="text-[11px] font-medium text-slate-500 block">{t('completed')}</span>
            <div className="text-2xl font-extrabold text-emerald-700 font-mono mt-0.5">86</div>
            <span className="text-[10px] text-emerald-700 font-medium">Slips sent to PFMS</span>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
            <span className="text-[11px] font-medium text-slate-500 block">{t('activeCounters')}</span>
            <div className="text-2xl font-extrabold text-slate-900 font-mono mt-0.5">4 of 5</div>
            <span className="text-[10px] text-slate-500 font-medium">Bays 1, 2, 3, 4</span>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs col-span-2 sm:col-span-1">
            <span className="text-[11px] font-medium text-slate-500 block">{t('avgProcessingTime')}</span>
            <div className="text-2xl font-extrabold text-slate-900 font-mono mt-0.5">7 min</div>
            <span className="text-[10px] text-slate-500 font-medium">Gross + tare cycle</span>
          </div>
        </div>

        {/* Live Queue Controller Bar (Hero operator action) */}
        <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-emerald-950 text-white rounded-2xl p-6 shadow-xl border border-emerald-800/40">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <span className="text-xs uppercase font-bold tracking-wider text-emerald-400">
                Live Weighbridge Bay #2 Dispatch Controller
              </span>
              <div className="flex items-center gap-6 mt-2">
                <div>
                  <span className="text-xs text-emerald-200/80 block">{t('nowServing')}</span>
                  <div className="text-4xl sm:text-5xl font-extrabold font-mono text-emerald-400">
                    {currentServingTokenString}
                  </div>
                </div>

                <div className="h-10 w-px bg-slate-700" />

                <div>
                  <span className="text-xs text-emerald-200/80 block">Next in Line</span>
                  <div className="text-3xl sm:text-4xl font-extrabold font-mono text-slate-300">
                    {nextTokenString}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
              <button
                onClick={callNextFarmer}
                className="flex-1 md:flex-none px-6 py-3.5 bg-emerald-500 hover:bg-emerald-400 active:bg-emerald-600 text-slate-950 font-bold rounded-xl text-sm flex items-center justify-center gap-2 shadow-lg transition-colors cursor-pointer"
              >
                <Volume2 className="w-5 h-5" />
                <span>{t('callNextFarmer')}</span>
              </button>

              <button
                onClick={() => handleOpenVerifyModal('A-124')}
                className="flex-1 md:flex-none px-5 py-3.5 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl text-sm border border-white/20 flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <QrCode className="w-5 h-5 text-emerald-400" />
                <span>{t('verifyFarmer')} (A-124)</span>
              </button>
            </div>
          </div>
        </div>

        {/* Today's Appointments List Table */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="p-4 sm:p-5 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h3 className="text-base font-bold text-slate-900">Today's Appointment Register</h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Live registry of booked tractor arrivals and weighbridge status.
              </p>
            </div>

            {/* Status Filter */}
            <div className="flex items-center gap-2 text-xs">
              <span className="text-slate-500 font-medium">{t('filterBy')}:</span>
              <div className="flex gap-1 bg-slate-100 p-1 rounded-lg">
                {['ALL', 'WAITING', 'NOW_SERVING', 'COMPLETED'].map((st) => (
                  <button
                    key={st}
                    onClick={() => setStatusFilter(st)}
                    className={`px-2.5 py-1 rounded text-[11px] font-semibold transition-colors cursor-pointer ${
                      statusFilter === st
                        ? 'bg-white text-slate-900 shadow-2xs font-bold'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {st === 'ALL' ? t('allStatus') : st.replace('_', ' ')}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="py-3 px-4">{t('token')}</th>
                  <th className="py-3 px-4">{t('farmer')}</th>
                  <th className="py-3 px-4">{t('crop')}</th>
                  <th className="py-3 px-4 text-right">{t('quantity')}</th>
                  <th className="py-3 px-4">{t('slot')}</th>
                  <th className="py-3 px-4">{t('status')}</th>
                  <th className="py-3 px-4 text-right">{t('action')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-mono">
                {filteredAppointments.slice(0, 12).map((apt) => {
                  const isCurrent = apt.tokenNumber === currentServingTokenString;
                  const isSpotlight = apt.tokenNumber === 'A-124';

                  return (
                    <tr
                      key={apt.id}
                      className={`hover:bg-slate-50/80 transition-colors ${
                        isCurrent ? 'bg-emerald-50/70 font-semibold' : ''
                      }`}
                    >
                      <td className="py-3 px-4">
                        <span className="font-extrabold text-slate-900 text-sm">
                          {apt.tokenNumber}
                        </span>
                        {isSpotlight && (
                          <span className="ml-2 text-[10px] font-sans font-bold text-emerald-800 bg-emerald-100 px-1.5 py-0.5 rounded">
                            Demo Spotlight
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-4 font-sans font-medium text-slate-900">
                        {apt.farmerName}
                        <span className="block text-[11px] font-mono text-slate-500">
                          {apt.farmerPhone}
                        </span>
                      </td>
                      <td className="py-3 px-4 font-sans text-slate-700">
                        {apt.crop}
                      </td>
                      <td className="py-3 px-4 text-right font-bold text-slate-900">
                        {apt.bookedQuantityKg} kg
                      </td>
                      <td className="py-3 px-4 text-slate-600 font-sans">
                        {apt.timeSlot}
                      </td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-sans font-bold uppercase tracking-wider ${
                          apt.status === 'COMPLETED'
                            ? 'bg-slate-100 text-slate-700'
                            : apt.status === 'NOW_SERVING'
                            ? 'bg-emerald-100 text-emerald-800 animate-pulse'
                            : 'bg-amber-100 text-amber-800'
                        }`}>
                          {apt.status.replace('_', ' ')}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right font-sans">
                        <button
                          onClick={() => handleOpenVerifyModal(apt.tokenNumber)}
                          className="px-2.5 py-1 bg-slate-100 hover:bg-emerald-800 hover:text-white text-slate-700 rounded-lg text-[11px] font-semibold transition-colors cursor-pointer"
                        >
                          Verify & Intake
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* ---------------------------------------------------- */}
      {/* O04 — FARMER VERIFICATION MODAL                     */}
      {/* ---------------------------------------------------- */}
      {isVerifyModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <QrCode className="w-5 h-5 text-emerald-800" />
                <h3 className="text-base font-bold text-slate-900">{t('verifyFarmer')}</h3>
              </div>
              <button
                onClick={() => setIsVerifyModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scan or Enter Token Input */}
            <form onSubmit={handleSearchToken} className="mt-4">
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Enter Token Number or Scan QR Code
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={tokenInput}
                  onChange={(e) => setTokenInput(e.target.value.toUpperCase())}
                  placeholder="e.g. A-124"
                  className="flex-1 px-3.5 py-2 rounded-xl border border-slate-300 font-mono font-bold text-base focus:outline-none focus:ring-2 focus:ring-emerald-700"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-emerald-800 hover:bg-emerald-900 text-white font-semibold text-xs rounded-xl cursor-pointer"
                >
                  Lookup
                </button>
              </div>
            </form>

            {/* Farmer Details */}
            {scannedFarmerApt ? (
              <div className="mt-5 p-4 bg-emerald-50/60 border border-emerald-200 rounded-2xl space-y-3">
                <div className="flex items-start justify-between pb-2 border-b border-emerald-200/60">
                  <div>
                    <h4 className="text-base font-bold text-slate-900">
                      {scannedFarmerApt.farmerName}
                    </h4>
                    <span className="text-xs font-mono text-emerald-900">
                      FID: {scannedFarmerApt.farmerId} · Ph: {scannedFarmerApt.farmerPhone}
                    </span>
                  </div>
                  <div className="text-2xl font-extrabold font-mono text-emerald-900">
                    {scannedFarmerApt.tokenNumber}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs text-slate-700 font-mono">
                  <div>
                    <span className="text-slate-500 font-sans block text-[10px]">Crop Produce</span>
                    <strong>{scannedFarmerApt.crop}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 font-sans block text-[10px]">Booked Quantity</span>
                    <strong>{scannedFarmerApt.bookedQuantityKg} kg</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 font-sans block text-[10px]">Slot Window</span>
                    <strong className="font-sans">{scannedFarmerApt.timeSlot}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 font-sans block text-[10px]">Verification Gate</span>
                    <strong className="text-emerald-700 font-sans">Aadhaar Linked ✓</strong>
                  </div>
                </div>

                <div className="pt-3 border-t border-emerald-200/60 flex items-center justify-between gap-3">
                  <button
                    onClick={handleProceedToProcurement}
                    className="w-full py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 shadow-xs cursor-pointer"
                  >
                    <span>Verify Farmer & Proceed to Procurement</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="mt-5 p-6 bg-slate-50 rounded-2xl border border-dashed border-slate-300 text-center text-xs text-slate-500">
                Enter token (e.g. A-124) or click Lookup to verify credentials.
              </div>
            )}
          </div>
        </div>
      )}

      {/* ---------------------------------------------------- */}
      {/* O05 — PROCUREMENT ENTRY MODAL                       */}
      {/* ---------------------------------------------------- */}
      {isProcurementModalOpen && scannedFarmerApt && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Scale className="w-5 h-5 text-emerald-800" />
                <h3 className="text-base font-bold text-slate-900">Procurement Intake & Weighment</h3>
              </div>
              <button
                onClick={() => setIsProcurementModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProcurement} className="mt-4 space-y-4">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs flex items-center justify-between">
                <div>
                  <span className="text-slate-500 block text-[10px]">Farmer & Token</span>
                  <strong className="text-slate-900">{scannedFarmerApt.farmerName} ({scannedFarmerApt.tokenNumber})</strong>
                </div>
                <div className="text-right">
                  <span className="text-slate-500 block text-[10px]">Crop</span>
                  <strong className="text-slate-900">{scannedFarmerApt.crop}</strong>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Booked Quantity
                  </label>
                  <input
                    type="text"
                    disabled
                    value={`${scannedFarmerApt.bookedQuantityKg} kg`}
                    className="w-full px-3 py-2 rounded-xl bg-slate-100 border border-slate-200 text-xs font-mono font-bold text-slate-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Actual Weighbridge Qty *
                  </label>
                  <input
                    type="number"
                    value={procurementForm.actualQuantityKg}
                    onChange={(e) =>
                      setProcurementForm({ ...procurementForm, actualQuantityKg: Number(e.target.value) })
                    }
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-mono font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-700"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Quality Status
                  </label>
                  <select
                    value={procurementForm.qualityStatus}
                    onChange={(e) =>
                      setProcurementForm({ ...procurementForm, qualityStatus: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs bg-white font-medium focus:outline-none focus:ring-2 focus:ring-emerald-700 cursor-pointer"
                  >
                    <option value="Grade A (FAQ Standard)">Grade A (FAQ Standard)</option>
                    <option value="Grade B">Grade B</option>
                    <option value="Standard">Standard</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Moisture % (Max 14%)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={procurementForm.moisturePercent}
                    onChange={(e) =>
                      setProcurementForm({ ...procurementForm, moisturePercent: Number(e.target.value) })
                    }
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-mono font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-700"
                  />
                </div>
              </div>

              <div className="p-3.5 bg-emerald-50/70 border border-emerald-200 rounded-xl flex items-center justify-between text-xs">
                <div>
                  <span className="text-emerald-800 text-[10px] block">Calculated Total MSP Amount</span>
                  <div className="text-xl font-extrabold text-emerald-950 font-mono">
                    ₹42,500
                  </div>
                </div>
                <span className="text-[11px] font-mono text-emerald-800">
                  Rate: ₹2,320 / quintal
                </span>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Weighbridge Slip Reference
                </label>
                <input
                  type="text"
                  value={procurementForm.weighbridgeSlipNo}
                  onChange={(e) =>
                    setProcurementForm({ ...procurementForm, weighbridgeSlipNo: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-mono font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-700"
                  required
                />
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => setIsProcurementModalOpen(false)}
                  className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-xl cursor-pointer"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 shadow-xs cursor-pointer"
                >
                  <Check className="w-4 h-4" />
                  <span>{t('completeProcurement')}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
