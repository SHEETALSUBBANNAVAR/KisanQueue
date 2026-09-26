import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ArrowLeft, Filter, Calendar, Receipt, Download, CheckCircle2, Clock } from 'lucide-react';

export const FarmerHistory: React.FC = () => {
  const { setFarmerScreen, procurementRecords, currentFarmer, addToast, t } = useApp();

  const [cropFilter, setCropFilter] = useState<string>('ALL');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');

  // Filter records for current farmer (or display all mock records)
  const farmerRecords = procurementRecords.filter((r) => r.farmerId === currentFarmer.id);
  const displayRecords = farmerRecords.length > 0 ? farmerRecords : procurementRecords;

  const filtered = displayRecords.filter((rec) => {
    if (cropFilter !== 'ALL' && !rec.crop.toLowerCase().includes(cropFilter.toLowerCase())) {
      return false;
    }
    return true;
  });

  const handleDownloadSlip = (slipNo: string, crop: string, qty: number, amt: number) => {
    const textContent = `
======================================================
  GOVERNMENT OF KARNATAKA - APMC PROCUREMENT ARCHIVE
  CERTIFIED DIGITAL WEIGHBRIDGE RECEIPT
======================================================
Receipt ID:       ${slipNo}
Farmer Name:      ${currentFarmer.name} (FID: ${currentFarmer.farmerId})
Produce:          ${crop}
Certified Weight: ${qty} kg
Settled MSP Amt:  ₹${amt.toLocaleString('en-IN')}
Status:           Disbursed via DBT / PFMS
Issued by:        Bengaluru APMC Procurement Division
======================================================
`;
    const blob = new Blob([textContent], { type: 'text/plain;charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `Slip_${slipNo}.txt`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    addToast('Weighbridge Slip Downloaded', `Slip ${slipNo} exported to your device`, 'success');
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
        <span className="text-xs font-bold text-slate-800">
          {t('history')} · APMC Ledger
        </span>
        <div className="text-xs font-mono text-slate-500">
          {filtered.length} Records
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-wrap gap-2.5 items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          <Filter className="w-3.5 h-3.5 text-slate-500" />
          <span className="font-semibold text-slate-700">{t('filterBy')}:</span>
        </div>

        <div className="flex gap-2">
          <select
            value={cropFilter}
            onChange={(e) => setCropFilter(e.target.value)}
            className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium focus:outline-none focus:ring-1 focus:ring-emerald-700 cursor-pointer"
          >
            <option value="ALL">{t('allCrops')}</option>
            <option value="Rice">Rice (Paddy)</option>
            <option value="Wheat">Wheat</option>
            <option value="Ragi">Ragi</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium focus:outline-none focus:ring-1 focus:ring-emerald-700 cursor-pointer"
          >
            <option value="ALL">{t('allStatus')}</option>
            <option value="PAID">Paid / Completed</option>
            <option value="PROCESSING">Processing</option>
          </select>
        </div>
      </div>

      {/* Responsive Records Grid: 2 columns on tablet/desktop */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
        {filtered.map((record) => {
          const isPaid = record.weighbridgeSlipNo.includes('0918') || record.procurementAmount === 41200;
          return (
            <div
              key={record.id}
              className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-3 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between pb-2 border-b border-slate-100">
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 leading-tight">
                      {record.crop}
                    </h4>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      {record.centreName.split(' ')[0]} Centre · {new Date(record.completedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-extrabold text-slate-900 font-mono block">
                      ₹{record.procurementAmount.toLocaleString('en-IN')}
                    </span>
                    <span className={`text-[10px] font-bold font-mono px-2 py-0.5 rounded inline-block mt-0.5 ${
                      isPaid ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {isPaid ? 'Paid (DBT)' : 'Bank Processing'}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 text-[11px] font-mono text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-100 mt-2">
                  <div>
                    <span className="text-slate-400 block text-[9px] uppercase font-sans">Weighed</span>
                    <strong>{record.actualQuantityKg} kg</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[9px] uppercase font-sans">Quality</span>
                    <strong className="text-emerald-700">Grade A</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[9px] uppercase font-sans">Slip No</span>
                    <span className="truncate block">{record.weighbridgeSlipNo.split('-').slice(-2).join('-')}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-100">
                <span className="text-slate-500 text-[11px] font-mono">
                  Token: <strong>{record.tokenNumber}</strong>
                </span>

                <button
                  onClick={() => handleDownloadSlip(record.weighbridgeSlipNo, record.crop, record.actualQuantityKg, record.procurementAmount)}
                  className="px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-semibold text-[11px] rounded-lg flex items-center gap-1.5 cursor-pointer transition-colors"
                >
                  <Download className="w-3 h-3" />
                  <span>{t('downloadSlip')}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
