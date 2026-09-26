import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  ArrowLeft, 
  CheckCircle2, 
  Clock, 
  CreditCard, 
  Receipt, 
  ShieldCheck, 
  ChevronRight, 
  Sparkles, 
  Building2, 
  FileText,
  Download
} from 'lucide-react';

export const FarmerProcurementStatus: React.FC = () => {
  const {
    farmerScreen,
    setFarmerScreen,
    currentFarmer,
    procurementRecords,
    paymentRecords,
    activeFarmerAppointment,
    advancePaymentStep,
    addToast,
    t
  } = useApp();

  // Find the primary procurement record for Ramesh Gowda
  const record = procurementRecords.find((r) => r.farmerId === currentFarmer.id) || procurementRecords[0];
  const payment = paymentRecords.find((p) => p.farmerId === currentFarmer.id) || paymentRecords[0];

  const [activeTab, setActiveTab] = useState<'procurement' | 'payment'>(
    farmerScreen === 'payment_status' ? 'payment' : 'procurement'
  );

  const handleSimulatePaymentAdvance = () => {
    if (payment) {
      advancePaymentStep(payment.id);
    }
  };

  const handleDownloadReceipt = () => {
    const slipNo = record?.weighbridgeSlipNo || 'WB-2026-0923-018';
    const amount = (record?.procurementAmount || 42500).toLocaleString('en-IN');
    const content = `
======================================================
  GOVERNMENT OF KARNATAKA - APMC PROCUREMENT RECEIPT
  DIGITAL WEIGHBRIDGE CERTIFICATE & MSP SETTLEMENT
======================================================
Slip Number:       ${slipNo}
Date & Time:       26-Sep-2026 11:15 AM
Procurement Hub:   Bengaluru Agricultural Procurement Centre
Counter / Bay:     Bay Counter #2 (Officer: Anil Kumar)
------------------------------------------------------
FARMER INFORMATION:
Name:              ${currentFarmer.name}
Farmer ID (FID):   ${currentFarmer.farmerId}
Mobile:            ${currentFarmer.phone}
Village & Dist:    ${currentFarmer.village}, ${currentFarmer.district}
Aadhaar Auth:      Verified Biometric Gate Pass
------------------------------------------------------
PRODUCE & WEIGHBRIDGE DATA:
Commodity:         ${record?.crop || 'Rice (Paddy)'}
Booked Quantity:   ${record?.bookedQuantityKg || 500} kg
Gross Weight:      2,892 kg (with tractor trolley)
Tare Weight:       2,400 kg
Net Actual Weight: ${record?.actualQuantityKg || 492} kg
Moisture Analysis: 13.4% (FAQ Limit: max 14.0%)
Quality Grade:     Grade A (Accepted Standard)
------------------------------------------------------
FINANCIAL DISBURSEMENT:
Govt MSP Rate:     ₹2,320 / quintal
Total Payable:     ₹${amount}
Payment Pipeline:  Direct Benefit Transfer (DBT) to PFMS
Beneficiary A/C:   ${payment?.bankAccountMasked || 'SBIN••••••4821'}
IFSC Code:         ${payment?.ifscCode || 'SBIN0040182'}
PFMS Reference:    ${payment?.referenceId || 'KQ20260923001'}
======================================================
This is a certified digital slip issued via KisanQueue.
`;
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `Procurement_Slip_${slipNo}.txt`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    addToast('Receipt Downloaded', `Digital weighbridge slip ${slipNo} exported`, 'success');
  };

  return (
    <div className="space-y-4">
      {/* Navigation Header */}
      <div className="flex items-center justify-between bg-white px-4 py-3 rounded-2xl border border-slate-200 shadow-xs">
        <button
          onClick={() => setFarmerScreen('home')}
          className="text-xs font-semibold text-slate-600 hover:text-slate-900 flex items-center gap-1 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{t('overview')}</span>
        </button>

        {/* Tab Switcher */}
        <div className="flex items-center p-1 bg-slate-100 rounded-lg text-xs font-medium">
          <button
            onClick={() => setActiveTab('procurement')}
            className={`px-3 py-1 rounded transition-colors cursor-pointer ${
              activeTab === 'procurement'
                ? 'bg-white text-slate-900 font-bold shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {t('procurementStatus')}
          </button>
          <button
            onClick={() => setActiveTab('payment')}
            className={`px-3 py-1 rounded transition-colors cursor-pointer ${
              activeTab === 'payment'
                ? 'bg-white text-slate-900 font-bold shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {t('paymentStatus')} (DBT)
          </button>
        </div>
      </div>

      {/* -------------------------------------------------- */}
      {/* F11 — PROCUREMENT STATUS VIEW                     */}
      {/* -------------------------------------------------- */}
      {activeTab === 'procurement' && (
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-6">
          <div className="border-b border-slate-100 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">
                  {t('weighbridgeSlip')}
                </span>
                <span className="text-xs font-mono font-bold text-slate-500">
                  {record?.weighbridgeSlipNo || 'WB-2026-0923-018'}
                </span>
              </div>
              <h1 className="text-2xl font-extrabold text-slate-900 mt-1">
                {t('procurementCompleted')}
              </h1>
              <p className="text-xs text-slate-600 mt-0.5">
                Agricultural Produce Market Committee · Bengaluru Hub
              </p>
            </div>

            <button
              onClick={handleDownloadReceipt}
              className="px-4 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-300 font-semibold text-xs rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer self-start sm:self-auto"
            >
              <Download className="w-3.5 h-3.5 text-emerald-800" />
              <span>{t('downloadSlip')}</span>
            </button>
          </div>

          {/* Core Produce & Quantity Card (Responsive multi-column on desktop) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-emerald-50/70 border border-emerald-200/80 rounded-2xl space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-emerald-200/60 text-xs">
                <div>
                  <span className="text-emerald-800 text-[11px] block">{t('crop')}</span>
                  <strong className="text-base font-bold text-emerald-950">
                    {record?.crop || 'Rice (Paddy)'}
                  </strong>
                </div>
                <div className="text-right">
                  <span className="text-emerald-800 text-[11px] block">{t('qualityStatus')}</span>
                  <span className="inline-block px-2 py-0.5 bg-emerald-700 text-white rounded text-[11px] font-bold">
                    {t('acceptedGradeA')}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-slate-500 block text-[11px]">{t('bookedQuantity')}</span>
                  <strong className="text-base text-slate-800 font-mono">
                    {record?.bookedQuantityKg || 500} kg
                  </strong>
                </div>
                <div>
                  <span className="text-slate-500 block text-[11px]">{t('actualQuantity')}</span>
                  <strong className="text-base text-emerald-800 font-mono">
                    {record?.actualQuantityKg || 492} kg
                  </strong>
                </div>
              </div>

              <div className="pt-2 border-t border-emerald-200/60 flex items-center justify-between">
                <span className="text-xs text-emerald-900 font-semibold">
                  {t('procurementAmount')}:
                </span>
                <span className="text-xl font-extrabold text-emerald-950 font-mono">
                  ₹{(record?.procurementAmount || 42500).toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            {/* Weighbridge Tare Breakdown */}
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-2 text-xs font-mono">
              <span className="font-bold text-slate-800 uppercase tracking-wider text-[10px] font-sans block mb-2">
                Tare & Moisture Verification
              </span>
              <div className="flex justify-between">
                <span className="text-slate-500">Gross Loaded Weight:</span>
                <strong className="text-slate-900">2,892 kg</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Tractor Tare Weight:</span>
                <strong className="text-slate-900">-2,400 kg</strong>
              </div>
              <div className="flex justify-between text-emerald-800 font-bold border-t border-slate-200 pt-1">
                <span>Net Certified Produce:</span>
                <span>492 kg</span>
              </div>
              <div className="flex justify-between pt-1">
                <span className="text-slate-500">Moisture Content:</span>
                <strong className="text-slate-900">13.4% ({t('moistureLimit')} &lt; 14.0%)</strong>
              </div>
            </div>
          </div>

          {/* F11 — Visual Procurement Timeline */}
          <div>
            <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-4">
              Procurement Verification Stages
            </h3>

            <div className="space-y-4 relative pl-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
              <div className="relative">
                <div className="absolute -left-6 top-0.5 w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Farmer Verified</h4>
                  <p className="text-[11px] text-slate-500">
                    Aadhaar FID & biometric gate authentication confirmed
                  </p>
                </div>
              </div>

              <div className="relative">
                <div className="absolute -left-6 top-0.5 w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Crop Received at Bay 2</h4>
                  <p className="text-[11px] text-slate-500">
                    Tractor unloaded into designated inspection silo
                  </p>
                </div>
              </div>

              <div className="relative">
                <div className="absolute -left-6 top-0.5 w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Quality Checked & Moisture Analyzed</h4>
                  <p className="text-[11px] text-slate-500">
                    Moisture 13.4% within FAQ limit (max 14%) · Grade A
                  </p>
                </div>
              </div>

              <div className="relative">
                <div className="absolute -left-6 top-0.5 w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Quantity Recorded on Electronic Weighbridge</h4>
                  <p className="text-[11px] text-slate-500">
                    Gross weight minus tare weight recorded: 492 kg
                  </p>
                </div>
              </div>

              <div className="relative">
                <div className="absolute -left-6 top-0.5 w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Procurement Completed</h4>
                  <p className="text-[11px] text-slate-500">
                    Electronic procurement slip issued by Operator Anil Kumar
                  </p>
                </div>
              </div>

              <div className="relative">
                <div className="absolute -left-6 top-0.5 w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center">
                  <Clock className="w-3 h-3" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-blue-900">Payment Processing</h4>
                  <p className="text-[11px] text-slate-500">
                    DBT transaction submitted to PFMS treasury gateway
                  </p>
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={() => setActiveTab('payment')}
            className="w-full h-12 bg-emerald-800 hover:bg-emerald-900 text-white font-semibold text-xs rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-xs"
          >
            <CreditCard className="w-4 h-4" />
            <span>View DBT Payment Details</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* -------------------------------------------------- */}
      {/* F12 — PAYMENT STATUS VIEW                         */}
      {/* -------------------------------------------------- */}
      {activeTab === 'payment' && (
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-6">
          <div className="border-b border-slate-100 pb-4 text-center">
            <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">
              {t('dbtTransferred')}
            </span>
            <div className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight font-mono my-2">
              ₹{(payment?.amount || 42500).toLocaleString('en-IN')}
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold font-mono bg-amber-50 text-amber-800 border border-amber-200">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
              <span>
                {t('status')}: {payment?.status === 'COMPLETED' ? t('paymentCompleted') : t('paymentProcessing')}
              </span>
            </div>
          </div>

          {/* Bank Account Details */}
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-2">
            <div className="flex justify-between">
              <span className="text-slate-500">Beneficiary:</span>
              <strong className="text-slate-900">{currentFarmer.name}</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Bank Account:</span>
              <strong className="text-slate-900 font-mono">{payment?.bankAccountMasked || 'SBIN••••••4821'}</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">IFSC Code:</span>
              <strong className="text-slate-900 font-mono">{payment?.ifscCode || 'SBIN0040182'}</strong>
            </div>
            <div className="flex justify-between pt-1 border-t border-slate-200">
              <span className="text-slate-500">PFMS Reference ID:</span>
              <strong className="text-emerald-800 font-mono">{payment?.referenceId || 'KQ20260923001'}</strong>
            </div>
          </div>

          {/* Payment Lifecycle Timeline */}
          <div>
            <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-4">
              Disbursement Lifecycle
            </h3>

            <div className="space-y-4 relative pl-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
              <div className="relative">
                <div className="absolute -left-6 top-0.5 w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Procurement Completed ✓</h4>
                  <p className="text-[11px] text-slate-500">Slip WB-2026-0923-018 certified by APMC Officer</p>
                </div>
              </div>

              <div className="relative">
                <div className="absolute -left-6 top-0.5 w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Payment Initiated ✓</h4>
                  <p className="text-[11px] text-slate-500">Automated MSP voucher created on DBT State Portal</p>
                </div>
              </div>

              <div className="relative">
                <div className={`absolute -left-6 top-0.5 w-5 h-5 rounded-full text-white flex items-center justify-center ${
                  payment?.status === 'COMPLETED' ? 'bg-emerald-600' : 'bg-amber-500'
                }`}>
                  {payment?.status === 'COMPLETED' ? (
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  ) : (
                    <Clock className="w-3 h-3" />
                  )}
                </div>
                <div>
                  <h4 className={`text-xs font-bold ${
                    payment?.status === 'COMPLETED' ? 'text-slate-900' : 'text-amber-800'
                  }`}>
                    Bank Processing {payment?.status === 'COMPLETED' ? '✓' : '●'}
                  </h4>
                  <p className="text-[11px] text-slate-500">
                    Clearing through Reserve Bank NACH / PFMS pipeline
                  </p>
                </div>
              </div>

              <div className="relative">
                <div className={`absolute -left-6 top-0.5 w-5 h-5 rounded-full text-white flex items-center justify-center ${
                  payment?.status === 'COMPLETED' ? 'bg-emerald-600' : 'bg-slate-300'
                }`}>
                  {payment?.status === 'COMPLETED' ? (
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  ) : (
                    <span className="w-2 h-2 rounded-full bg-slate-500" />
                  )}
                </div>
                <div>
                  <h4 className={`text-xs font-bold ${
                    payment?.status === 'COMPLETED' ? 'text-emerald-800 font-extrabold' : 'text-slate-400'
                  }`}>
                    Payment Completed {payment?.status === 'COMPLETED' ? '✓' : '○'}
                  </h4>
                  <p className="text-[11px] text-slate-500">
                    {payment?.status === 'COMPLETED'
                      ? 'Credited to State Bank account ending in 4821'
                      : 'Expected credit within 24–48 banking hours'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive button to test advance payment */}
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-3">
            <button
              onClick={handleSimulatePaymentAdvance}
              className="w-full py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
              <span>
                {payment?.status === 'COMPLETED'
                  ? 'Payment Already Verified (PFMS Settled)'
                  : 'Simulate Bank Clearance (Advance DBT Step)'}
              </span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
