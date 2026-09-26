import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Building2, 
  TrendingUp, 
  Clock, 
  Users, 
  CreditCard, 
  AlertTriangle, 
  MapPin, 
  Download, 
  Sparkles, 
  BarChart3, 
  CheckCircle2, 
  Filter, 
  ChevronRight,
  ShieldAlert,
  Cpu,
  RefreshCw,
  X
} from 'lucide-react';
import { 
  getCongestionForecast, 
  getDemandForecast, 
  getMLModelComparison 
} from '../../services/predictiveEngine';
import { ProcurementCentre } from '../../types';

export const AdminDashboard: React.FC = () => {
  const { centres, alerts, addToast, t } = useApp();

  const [activeAdminTab, setActiveAdminTab] = useState<
    'overview' | 'map' | 'congestion' | 'waiting' | 'demand' | 'performance' | 'alerts' | 'reports'
  >('overview');

  const [selectedMapCentre, setSelectedMapCentre] = useState<ProcurementCentre>(centres[0]);
  const [isMLModalOpen, setIsMLModalOpen] = useState<boolean>(false);
  const [centreSearch, setCentreSearch] = useState<string>('');
  const [centreStatusFilter, setCentreStatusFilter] = useState<string>('ALL');

  const hourlyForecast = getCongestionForecast();
  const demandData = getDemandForecast();
  const modelMetrics = getMLModelComparison();

  const handleExport = (format: 'CSV' | 'PDF') => {
    if (format === 'CSV') {
      const headers = ['Centre ID', 'Centre Name', 'District', 'Distance (km)', 'Current Queue', 'Active Counters', 'Total Counters', 'Avg Wait (min)', 'Today Completed', 'Load Status'];
      const rows = centres.map(c => [
        c.id,
        `"${c.name}"`,
        `"${c.district}"`,
        c.distanceKm,
        c.currentQueueLength,
        c.activeCounters,
        c.totalCounters,
        c.avgWaitMinutes,
        c.todayCompleted,
        c.expectedLoad
      ]);
      const csvString = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
      const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `KisanQueue_Centres_Report_${new Date().toISOString().slice(0, 10)}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      addToast('CSV Download Complete', 'State-wide mandi performance ledger exported as CSV', 'success');
    } else {
      const reportText = `
================================================================================
  DEPARTMENT OF FOOD, CIVIL SUPPLIES & CONSUMER AFFAIRS - GOVT OF KARNATAKA
  STATUTORY APMC PROCUREMENT AUDIT DIGEST & CAPACITY BENCHMARK
================================================================================
Generated: ${new Date().toLocaleString()}
Command Centre: KisanQueue Smart Procurement Terminal
Monitored Mandi Depots: 24 Centres Statewide

KEY PERFORMANCE INDICATORS:
- Total Procurement Centres: 24 Operational
- Active Registered Farmers: 1,842 Queued
- Today's Booked Appointments: 2,410 Slots
- Statewide Average Waiting Time: 38 Minutes (Down 76% from baseline)
- Intake Completed Loads: 1,620 Deliveries
- DBT Treasury Payments Pending: 214 Transactions

REGIONAL CAPACITY BREAKDOWN:
${centres.map(c => `- ${c.name} (${c.district}): Queue: ${c.currentQueueLength} | Counters: ${c.activeCounters}/${c.totalCounters} | Avg Wait: ${c.avgWaitMinutes}m | Status: ${c.expectedLoad}`).join('\n')}

================================================================================
  Certified by Director of Agricultural Marketing & Civil Supplies
================================================================================
`;
      const blob = new Blob([reportText], { type: 'text/plain;charset=utf-8;' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `KisanQueue_Procurement_Audit_Report_${new Date().toISOString().slice(0, 10)}.txt`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      addToast('Report Download Complete', 'Statutory audit digest downloaded to your device', 'success');
    }
  };

  const handleResolveAlert = (alertTitle: string) => {
    addToast('Alert Acknowledged', `${alertTitle} marked as handled`, 'info');
  };

  const filteredCentres = centres.filter((c) => {
    if (centreSearch && !c.name.toLowerCase().includes(centreSearch.toLowerCase())) return false;
    if (centreStatusFilter !== 'ALL' && c.expectedLoad.toUpperCase() !== centreStatusFilter) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-slate-100 p-4 sm:p-6 lg:p-8 pb-10">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Top Header */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 uppercase tracking-wider">
              <span>Department of Food, Civil Supplies & Consumer Affairs</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
              KisanQueue Command Centre
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Multi-Centre Telemetry · Predictive Waiting Time & Congestion Oversight
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={() => setIsMLModalOpen(true)}
              className="px-3.5 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-300 font-semibold text-xs rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Cpu className="w-4 h-4 text-emerald-700" />
              <span>ML Model Evaluation</span>
            </button>

            <button
              onClick={() => handleExport('CSV')}
              className="px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Download className="w-4 h-4 text-emerald-400" />
              <span>Export CSV</span>
            </button>
          </div>
        </div>

        {/* Global Navigation Tabs (Clean unboxed design per Constitution) */}
        <div className="flex items-center gap-1 overflow-x-auto pb-1 border-b border-slate-200 text-xs font-medium scrollbar-none">
          {[
            { id: 'overview', label: 'Command Overview' },
            { id: 'map', label: 'Centre Map' },
            { id: 'congestion', label: 'Congestion Forecast' },
            { id: 'waiting', label: 'Waiting Analytics' },
            { id: 'demand', label: 'Demand Forecast' },
            { id: 'performance', label: 'Centre Performance' },
            { id: 'alerts', label: `Alerts (${alerts.length})` },
            { id: 'reports', label: 'Reports' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveAdminTab(tab.id as any)}
              className={`px-3.5 py-2 rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
                activeAdminTab === tab.id
                  ? 'bg-emerald-800 text-white font-bold shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* ---------------------------------------------------- */}
        {/* A01 — COMMAND OVERVIEW KPI CARDS                     */}
        {/* ---------------------------------------------------- */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
            <span className="text-[11px] font-medium text-slate-500 block">Total Centres</span>
            <div className="text-2xl font-extrabold text-slate-900 font-mono mt-0.5">24</div>
            <span className="text-[10px] text-slate-500">Karnataka Region</span>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
            <span className="text-[11px] font-medium text-slate-500 block">Active Farmers</span>
            <div className="text-2xl font-extrabold text-slate-900 font-mono mt-0.5">1,842</div>
            <span className="text-[10px] text-emerald-700 font-medium">Logged in / queued</span>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
            <span className="text-[11px] font-medium text-slate-500 block">Today's Appointments</span>
            <div className="text-2xl font-extrabold text-slate-900 font-mono mt-0.5">2,410</div>
            <span className="text-[10px] text-slate-500">Pre-booked slots</span>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
            <span className="text-[11px] font-medium text-slate-500 block">Average Waiting Time</span>
            <div className="text-2xl font-extrabold text-emerald-700 font-mono mt-0.5">38 min</div>
            <span className="text-[10px] text-emerald-700 font-medium">Down 76% vs baseline</span>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
            <span className="text-[11px] font-medium text-slate-500 block">Procurement Completed</span>
            <div className="text-2xl font-extrabold text-slate-900 font-mono mt-0.5">1,620</div>
            <span className="text-[10px] text-slate-500">Loads processed</span>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
            <span className="text-[11px] font-medium text-slate-500 block">Payments Pending</span>
            <div className="text-2xl font-extrabold text-amber-700 font-mono mt-0.5">214</div>
            <span className="text-[10px] text-amber-700 font-medium font-mono">PFMS pipeline batch</span>
          </div>
        </div>

        {/* ---------------------------------------------------- */}
        {/* A02 — CENTRE MAP SECTION                             */}
        {/* ---------------------------------------------------- */}
        {(activeAdminTab === 'overview' || activeAdminTab === 'map') && (
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Regional Procurement Centre Map & Congestion Status
                </h3>
                <p className="text-xs text-slate-500">
                  Click any mandi centre pin to inspect live queue load, capacity utilization, and wait delays.
                </p>
              </div>

              {/* Congestion Legend */}
              <div className="flex items-center gap-3 text-xs font-mono">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  <span>Low</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                  <span>Medium</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                  <span>High Congestion</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Map Canvas Visual */}
              <div className="lg:col-span-2 relative h-[360px] bg-slate-950 rounded-2xl overflow-hidden border border-slate-800 p-4 shadow-inner">
                {/* Visual stylised grid */}
                <div className="absolute inset-0 bg-[radial-gradient(#15803d_1px,transparent_1px)] [background-size:24px_24px] opacity-20" />
                <svg className="absolute inset-0 w-full h-full opacity-35" viewBox="0 0 500 360">
                  <path d="M 40 180 Q 200 80 320 220 T 480 140" fill="none" stroke="#22c55e" strokeWidth="2" strokeDasharray="6 6" />
                  <path d="M 100 300 Q 240 160 380 280" fill="none" stroke="#16a34a" strokeWidth="1.5" />
                  <circle cx="290" cy="158" r="90" fill="none" stroke="#059669" strokeWidth="1" strokeDasharray="2 4" />
                </svg>

                {/* Mandi Pins */}
                {centres.map((c) => {
                  const isSelected = c.id === selectedMapCentre.id;
                  const getPinColor = () => {
                    if (c.expectedLoad === 'Low') return 'bg-emerald-500 text-slate-950';
                    if (c.expectedLoad === 'Medium') return 'bg-amber-400 text-slate-950';
                    return 'bg-rose-500 text-white animate-pulse';
                  };

                  return (
                    <button
                      key={c.id}
                      onClick={() => setSelectedMapCentre(c)}
                      style={{ left: `${c.coordinates.x}%`, top: `${c.coordinates.y}%` }}
                      className={`absolute -translate-x-1/2 -translate-y-1/2 px-2.5 py-1.5 rounded-xl text-xs font-mono font-bold flex items-center gap-1.5 shadow-xl transition-all hover:scale-110 cursor-pointer ${
                        isSelected ? 'ring-2 ring-white scale-110 z-30' : 'z-20'
                      } ${getPinColor()}`}
                    >
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{c.name.split(' ')[0]}</span>
                    </button>
                  );
                })}

                <div className="absolute bottom-3 left-4 text-xs text-slate-400 font-mono bg-slate-900/90 px-3 py-1.5 rounded-xl border border-slate-800">
                  Karnataka Southern Mandi Zone · 5 Monitored APMC Depots
                </div>
              </div>

              {/* Centre Details Inspector Panel (A02 Click Target) */}
              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                    <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider font-mono">
                      Centre Inspector
                    </span>
                    <span className={`text-[10px] font-bold font-mono px-2 py-0.5 rounded ${
                      selectedMapCentre.expectedLoad === 'Low'
                        ? 'bg-emerald-100 text-emerald-800'
                        : selectedMapCentre.expectedLoad === 'Medium'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-rose-100 text-rose-800'
                    }`}>
                      {selectedMapCentre.expectedLoad} Congestion
                    </span>
                  </div>

                  <h4 className="text-base font-bold text-slate-900 mt-2">
                    {selectedMapCentre.name}
                  </h4>
                  <p className="text-xs text-slate-500 mt-0.5">{selectedMapCentre.address}</p>

                  <div className="grid grid-cols-2 gap-3 mt-4 text-xs font-mono">
                    <div className="p-2.5 bg-white rounded-xl border border-slate-200">
                      <span className="text-slate-400 block text-[10px] font-sans">Current Queue</span>
                      <strong className="text-base text-slate-900">{selectedMapCentre.currentQueueLength} in line</strong>
                    </div>

                    <div className="p-2.5 bg-white rounded-xl border border-slate-200">
                      <span className="text-slate-400 block text-[10px] font-sans">Active Counters</span>
                      <strong className="text-base text-slate-900">{selectedMapCentre.activeCounters} / {selectedMapCentre.totalCounters}</strong>
                    </div>

                    <div className="p-2.5 bg-white rounded-xl border border-slate-200">
                      <span className="text-slate-400 block text-[10px] font-sans">Avg Wait Time</span>
                      <strong className="text-base text-emerald-800">~{selectedMapCentre.avgWaitMinutes} min</strong>
                    </div>

                    <div className="p-2.5 bg-white rounded-xl border border-slate-200">
                      <span className="text-slate-400 block text-[10px] font-sans">Today's Completed</span>
                      <strong className="text-base text-slate-900">{selectedMapCentre.todayCompleted}</strong>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-200 text-xs">
                    <div className="flex justify-between text-slate-600 mb-1">
                      <span>Capacity Utilization:</span>
                      <strong className="font-mono text-slate-900">{selectedMapCentre.capacityUtilizationPercent}%</strong>
                    </div>
                    <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${
                          selectedMapCentre.capacityUtilizationPercent > 85
                            ? 'bg-rose-600'
                            : selectedMapCentre.capacityUtilizationPercent > 65
                            ? 'bg-amber-500'
                            : 'bg-emerald-600'
                        }`}
                        style={{ width: `${selectedMapCentre.capacityUtilizationPercent}%` }}
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-4">
                  <button
                    onClick={() => {
                      addToast('Balancing Activated', `Rerouted 40 overflow bookings from ${selectedMapCentre.name}`, 'info');
                    }}
                    className="w-full py-2 bg-emerald-800 hover:bg-emerald-900 text-white font-semibold text-xs rounded-xl transition-colors cursor-pointer"
                  >
                    Adjust Counter Allocation
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ---------------------------------------------------- */}
        {/* A03 — CONGESTION FORECAST (CORE REQUIREMENT)        */}
        {/* ---------------------------------------------------- */}
        {(activeAdminTab === 'overview' || activeAdminTab === 'congestion') && (
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Centre Congestion Forecast
                </h3>
                <p className="text-xs text-slate-500">
                  Hourly expected tractor arrivals vs centre processing capacity (9:00 AM – 5:00 PM).
                </p>
              </div>
              <div className="text-xs text-slate-500 font-mono bg-slate-50 px-3 py-1 rounded-lg border border-slate-200">
                Bengaluru Agricultural Procurement Centre
              </div>
            </div>

            {/* Custom Responsive SVG Hourly Bar & Line Forecast Chart */}
            <div className="pt-4">
              <div className="h-64 w-full relative">
                <svg className="w-full h-full" viewBox="0 0 900 240" preserveAspectRatio="none">
                  {/* Grid lines */}
                  <line x1="0" y1="40" x2="900" y2="40" stroke="#f1f5f9" strokeWidth="1" />
                  <line x1="0" y1="100" x2="900" y2="100" stroke="#f1f5f9" strokeWidth="1" />
                  <line x1="0" y1="160" x2="900" y2="160" stroke="#f1f5f9" strokeWidth="1" />
                  <line x1="0" y1="210" x2="900" y2="210" stroke="#e2e8f0" strokeWidth="1" />

                  {/* Hourly data points */}
                  {hourlyForecast.map((item, idx) => {
                    const x = 50 + idx * 95;
                    const maxVal = 70;
                    const farmerHeight = (item.expectedFarmers / maxVal) * 170;
                    const capacityY = 210 - (item.processingCapacity / maxVal) * 170;

                    const getBarFill = () => {
                      if (item.predictedLoad === 'Low') return '#10b981';
                      if (item.predictedLoad === 'Medium') return '#f59e0b';
                      return '#ef4444';
                    };

                    return (
                      <g key={item.hourLabel}>
                        {/* Arrival Bar */}
                        <rect
                          x={x - 18}
                          y={210 - farmerHeight}
                          width={36}
                          height={farmerHeight}
                          rx={4}
                          fill={getBarFill()}
                          opacity={0.85}
                        />

                        {/* Capacity target line segment */}
                        <line
                          x1={x - 28}
                          y1={capacityY}
                          x2={x + 28}
                          y2={capacityY}
                          stroke="#1e293b"
                          strokeWidth="2.5"
                          strokeDasharray="4 2"
                        />

                        {/* Number on top */}
                        <text
                          x={x}
                          y={200 - farmerHeight}
                          fill="#0f172a"
                          fontSize="11"
                          fontWeight="bold"
                          fontFamily="monospace"
                          textAnchor="middle"
                        >
                          {item.expectedFarmers}
                        </text>

                        {/* X-axis label */}
                        <text
                          x={x}
                          y="232"
                          fill="#64748b"
                          fontSize="10"
                          fontFamily="monospace"
                          textAnchor="middle"
                        >
                          {item.hourLabel.split(' ')[0]}
                        </text>
                      </g>
                    );
                  })}
                </svg>
              </div>

              {/* Chart Legend */}
              <div className="flex flex-wrap items-center justify-between text-xs pt-3 border-t border-slate-100 text-slate-600 gap-2">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded bg-emerald-500" />
                    <span>Low Load (&lt;25)</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded bg-amber-500" />
                    <span>Medium Load (25-45)</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded bg-rose-500" />
                    <span>High Load (&gt;45)</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-4 h-0.5 bg-slate-900 inline-block border-b border-dashed border-slate-900" />
                    <span>Intake Capacity (28/hr)</span>
                  </div>
                </div>

                <div className="text-slate-600 text-[11px] font-mono">
                  * Prediction based on historical demand, current bookings, and centre capacity.
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ---------------------------------------------------- */}
        {/* A04 & A05 — WAITING TIME & DEMAND ANALYTICS          */}
        {/* ---------------------------------------------------- */}
        {(activeAdminTab === 'overview' || activeAdminTab === 'waiting' || activeAdminTab === 'demand') && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Waiting Time Analytics (A04) */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    Waiting Time Analytics
                  </h3>
                  <p className="text-xs text-slate-500">
                    Mean waiting time and queue length across operating shifts.
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-slate-500 block uppercase font-sans">Current Average</span>
                  <span className="text-xl font-extrabold text-emerald-800 font-mono">38 min</span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs font-mono">
                <div>
                  <span className="text-[10px] text-slate-400 block font-sans">Peak Wait Period</span>
                  <strong className="text-rose-700">12:00 – 01:30 PM</strong>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block font-sans">Avg Process Time</span>
                  <strong className="text-slate-900">7.2 min / load</strong>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block font-sans">Active Queue</span>
                  <strong className="text-slate-900">14 at Bengaluru</strong>
                </div>
              </div>

              {/* Waiting Time Trend Visual */}
              <div className="pt-2">
                <span className="text-xs font-semibold text-slate-700 block mb-2">
                  Average Wait by Hour (Minutes)
                </span>
                <div className="h-32 w-full">
                  <svg className="w-full h-full" viewBox="0 0 500 120" preserveAspectRatio="none">
                    <polyline
                      fill="none"
                      stroke="#166534"
                      strokeWidth="2.5"
                      points="20,95 80,75 140,55 200,25 260,20 320,40 380,65 440,90 480,105"
                    />
                    {/* Dots */}
                    {[
                      { x: 20, y: 95, val: '16m' },
                      { x: 80, y: 75, val: '28m' },
                      { x: 140, y: 55, val: '38m' },
                      { x: 200, y: 25, val: '58m' },
                      { x: 260, y: 20, val: '62m' },
                      { x: 320, y: 40, val: '46m' },
                      { x: 380, y: 65, val: '32m' },
                      { x: 440, y: 90, val: '18m' },
                      { x: 480, y: 105, val: '12m' }
                    ].map((pt, i) => (
                      <g key={i}>
                        <circle cx={pt.x} cy={pt.y} r="4" fill="#22c55e" stroke="#166534" strokeWidth="2" />
                        <text x={pt.x} y={pt.y - 7} fill="#166534" fontSize="9" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
                          {pt.val}
                        </text>
                      </g>
                    ))}
                  </svg>
                </div>
                <div className="flex justify-between text-[10px] text-slate-400 font-mono mt-1">
                  <span>09:00 AM</span>
                  <span>12:00 PM (Peak)</span>
                  <span>05:00 PM</span>
                </div>
              </div>
            </div>

            {/* Demand Forecast (A05) */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    Demand Forecast (7 Days Past → Next 3 Days)
                  </h3>
                  <p className="text-xs text-slate-500">
                    Gradient Boosting projection against 2,200/day aggregate regional capacity.
                  </p>
                </div>
                <span className="text-[10px] font-mono font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
                  Simulated GBR Model
                </span>
              </div>

              {/* Demand 10-day chart */}
              <div className="h-44 w-full">
                <svg className="w-full h-full" viewBox="0 0 500 160" preserveAspectRatio="none">
                  {/* Capacity threshold */}
                  <line x1="0" y1="50" x2="500" y2="50" stroke="#cbd5e1" strokeWidth="1.5" strokeDasharray="4 4" />
                  <text x="495" y="44" fill="#94a3b8" fontSize="9" fontFamily="monospace" textAnchor="end">
                    Capacity 2,200/day
                  </text>

                  {/* Bars */}
                  {demandData.map((d, i) => {
                    const x = 25 + i * 48;
                    const val = d.historical || d.forecast || 2000;
                    const barHeight = (val / 3000) * 120;
                    const isForecast = !!d.forecast;

                    return (
                      <g key={d.dateLabel}>
                        <rect
                          x={x - 14}
                          y={140 - barHeight}
                          width={28}
                          height={barHeight}
                          rx={3}
                          fill={isForecast ? '#3b82f6' : '#166534'}
                          opacity={isForecast ? 0.75 : 0.9}
                        />
                        <text
                          x={x}
                          y={134 - barHeight}
                          fill="#0f172a"
                          fontSize="9"
                          fontWeight="bold"
                          fontFamily="monospace"
                          textAnchor="middle"
                        >
                          {val}
                        </text>
                        <text
                          x={x}
                          y="155"
                          fill="#64748b"
                          fontSize="8"
                          fontFamily="monospace"
                          textAnchor="middle"
                        >
                          {d.dateLabel.split(' ')[0]}
                        </text>
                      </g>
                    );
                  })}
                </svg>
              </div>

              <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-100 text-slate-600">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded bg-emerald-800" />
                    <span>Past 7 Days (Historical)</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded bg-blue-500" />
                    <span>Next 3 Days (Forecast)</span>
                  </div>
                </div>
                <span className="text-[11px] text-slate-400 font-mono">
                  Demo Simulated Data
                </span>
              </div>
            </div>
          </div>
        )}

        {/* ---------------------------------------------------- */}
        {/* A06 — CENTRE PERFORMANCE TABLE                       */}
        {/* ---------------------------------------------------- */}
        {(activeAdminTab === 'overview' || activeAdminTab === 'performance') && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
            <div className="p-4 sm:p-5 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Centre Operational Performance
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Throughput, average wait times, active counters, and load status.
                </p>
              </div>

              {/* Filters */}
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Filter centre name..."
                  value={centreSearch}
                  onChange={(e) => setCentreSearch(e.target.value)}
                  className="px-3 py-1.5 rounded-lg border border-slate-200 text-xs focus:outline-none focus:ring-1 focus:ring-emerald-700"
                />

                <select
                  value={centreStatusFilter}
                  onChange={(e) => setCentreStatusFilter(e.target.value)}
                  className="px-2.5 py-1.5 rounded-lg border border-slate-200 text-xs bg-white focus:outline-none focus:ring-1 focus:ring-emerald-700 font-medium"
                >
                  <option value="ALL">All Loads</option>
                  <option value="LOW">Low</option>
                  <option value="MEDIUM">Medium</option>
                  <option value="HIGH">High</option>
                </select>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-sans font-semibold uppercase tracking-wider text-[11px]">
                  <tr>
                    <th className="py-3 px-4">Centre Name</th>
                    <th className="py-3 px-4 text-right">Farmers Served</th>
                    <th className="py-3 px-4 text-right">Avg Wait</th>
                    <th className="py-3 px-4 text-right">Processing Time</th>
                    <th className="py-3 px-4 text-right">Capacity Util.</th>
                    <th className="py-3 px-4">Counters</th>
                    <th className="py-3 px-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredCentres.map((centre) => (
                    <tr key={centre.id} className="hover:bg-slate-50 transition-colors">
                      <td className="py-3.5 px-4 font-sans font-bold text-slate-900">
                        {centre.name}
                        <span className="block text-[11px] font-normal text-slate-500 font-mono">
                          {centre.district} · {centre.operatingHours}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right text-slate-900 font-bold">
                        {centre.todayCompleted}
                      </td>
                      <td className="py-3.5 px-4 text-right font-bold text-emerald-800">
                        ~{centre.avgWaitMinutes} min
                      </td>
                      <td className="py-3.5 px-4 text-right text-slate-700">
                        {centre.avgProcessingMinutes} min
                      </td>
                      <td className="py-3.5 px-4 text-right font-bold text-slate-900">
                        {centre.capacityUtilizationPercent}%
                      </td>
                      <td className="py-3.5 px-4 text-slate-600 font-sans">
                        {centre.activeCounters} of {centre.totalCounters} active
                      </td>
                      <td className="py-3.5 px-4 font-sans">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                          centre.expectedLoad === 'Low'
                            ? 'bg-emerald-100 text-emerald-800'
                            : centre.expectedLoad === 'Medium'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-rose-100 text-rose-800'
                        }`}>
                          {centre.expectedLoad} Congestion
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ---------------------------------------------------- */}
        {/* A07 — ACTIONABLE ALERTS                              */}
        {/* ---------------------------------------------------- */}
        {(activeAdminTab === 'overview' || activeAdminTab === 'alerts') && (
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Actionable Operational Alerts
                </h3>
                <p className="text-xs text-slate-500">
                  Live anomaly detection for counter capacity bottlenecks, congestion, and DBT delays.
                </p>
              </div>
              <span className="text-xs text-amber-800 font-semibold font-mono">
                {alerts.length} Pending
              </span>
            </div>

            <div className="space-y-3">
              {alerts.map((alert) => (
                <div
                  key={alert.id}
                  className={`p-4 rounded-xl border flex flex-col md:flex-row md:items-center justify-between gap-3 ${
                    alert.severity === 'critical'
                      ? 'bg-rose-50/70 border-rose-200 text-rose-950'
                      : alert.severity === 'warning'
                      ? 'bg-amber-50/70 border-amber-200 text-amber-950'
                      : 'bg-blue-50/70 border-blue-200 text-blue-950'
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <ShieldAlert className="w-4 h-4 shrink-0 text-amber-700" />
                      <h4 className="text-sm font-bold">{alert.title}</h4>
                      <span className="text-[10px] font-mono text-slate-500">· {alert.timestamp}</span>
                    </div>
                    <p className="text-xs text-slate-700 leading-relaxed">
                      {alert.message}
                    </p>
                    <p className="text-[11px] font-semibold text-emerald-900">
                      Recommended Action: {alert.actionRequired}
                    </p>
                  </div>

                  <div className="shrink-0 flex items-center gap-2">
                    <button
                      onClick={() => handleResolveAlert(alert.title)}
                      className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs rounded-lg transition-colors cursor-pointer"
                    >
                      Acknowledge & Act
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ---------------------------------------------------- */}
        {/* A08 — REPORTS & EXPORT                               */}
        {/* ---------------------------------------------------- */}
        {activeAdminTab === 'reports' && (
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-6">
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Statutory Procurement Reports & Audit Slips
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Download certified procurement digests for state auditing, PFMS reconciliation, and capacity planning.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex flex-col justify-between">
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Daily Procurement Digest</h4>
                  <p className="text-xs text-slate-500 mt-1">
                    Total grain tonnage, moisture checks, grade breakdown, and weighbridge slips for today.
                  </p>
                </div>
                <button
                  onClick={() => handleExport('PDF')}
                  className="mt-4 py-2 bg-emerald-800 hover:bg-emerald-900 text-white font-semibold text-xs rounded-lg flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download PDF Report</span>
                </button>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex flex-col justify-between">
                <div>
                  <h4 className="text-sm font-bold text-slate-900">DBT Bank Clearing Ledger</h4>
                  <p className="text-xs text-slate-500 mt-1">
                    PFMS transaction references, bank account hashes, and pending settlement records.
                  </p>
                </div>
                <button
                  onClick={() => handleExport('CSV')}
                  className="mt-4 py-2 bg-emerald-800 hover:bg-emerald-900 text-white font-semibold text-xs rounded-lg flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Export CSV Ledger</span>
                </button>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex flex-col justify-between">
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Yard Waiting Time Audit</h4>
                  <p className="text-xs text-slate-500 mt-1">
                    Hourly queue distributions, delay anomalies, and ML prediction variance benchmarks.
                  </p>
                </div>
                <button
                  onClick={() => handleExport('CSV')}
                  className="mt-4 py-2 bg-emerald-800 hover:bg-emerald-900 text-white font-semibold text-xs rounded-lg flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Export Analytics (CSV)</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ---------------------------------------------------- */}
      {/* ML PREDICTIVE INTELLIGENCE BENCHMARK MODAL           */}
      {/* ---------------------------------------------------- */}
      {isMLModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Cpu className="w-5 h-5 text-emerald-800" />
                <h3 className="text-base font-bold text-slate-900">
                  ML Predictive Architecture (SIH 2026 Engine Specification)
                </h3>
              </div>
              <button
                onClick={() => setIsMLModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="text-xs text-slate-600 space-y-2 leading-relaxed">
              <p>
                The KisanQueue waiting time engine predicts arrival delays using a trained <strong>Gradient Boosting Regressor</strong> pipeline. Below is the empirical model comparison benchmarked on 45,000 simulated harvest procurement records across Karnataka APMC mandis:
              </p>
            </div>

            {/* Model Comparison Table */}
            <div className="overflow-x-auto border border-slate-200 rounded-xl">
              <table className="w-full text-left text-xs font-mono">
                <thead className="bg-slate-50 text-slate-600 font-sans font-semibold uppercase text-[10px]">
                  <tr>
                    <th className="py-2.5 px-3">Candidate Model</th>
                    <th className="py-2.5 px-3 text-right">MAE (Error)</th>
                    <th className="py-2.5 px-3 text-right">RMSE</th>
                    <th className="py-2.5 px-3 text-right">R² Score</th>
                    <th className="py-2.5 px-3 text-right">Inference Latency</th>
                    <th className="py-2.5 px-3 text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {modelMetrics.map((m) => (
                    <tr
                      key={m.modelName}
                      className={m.isChampion ? 'bg-emerald-50/70 font-semibold' : ''}
                    >
                      <td className="py-2.5 px-3 font-sans text-slate-900">
                        {m.modelName}
                      </td>
                      <td className="py-2.5 px-3 text-right text-emerald-800 font-bold">
                        ±{m.mae} min
                      </td>
                      <td className="py-2.5 px-3 text-right">{m.rmse}</td>
                      <td className="py-2.5 px-3 text-right font-bold">{m.r2Score}</td>
                      <td className="py-2.5 px-3 text-right">{m.latencyMs} ms</td>
                      <td className="py-2.5 px-3 text-center font-sans">
                        {m.isChampion ? (
                          <span className="text-[10px] font-bold text-white bg-emerald-800 px-2 py-0.5 rounded">
                            Champion Model
                          </span>
                        ) : (
                          <span className="text-[10px] text-slate-400">Candidate</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-600 space-y-1">
              <p className="font-semibold text-slate-800">
                Input Feature Vectors:
              </p>
              <p className="font-mono text-[11px] text-slate-500">
                [queue_length, farmers_ahead, active_weighbridge_bays, moisture_test_speed, time_of_day, crop_type_encoded, vehicle_trolley_weight_kg]
              </p>
              <p className="text-[11px] text-slate-500 pt-1">
                * Note: Model endpoints are designed for clean FastAPI/Python microservice plug-in. Simulated values are demonstrated for prototype evaluation.
              </p>
            </div>

            <div className="pt-2 text-right">
              <button
                onClick={() => setIsMLModalOpen(false)}
                className="px-4 py-2 bg-slate-900 text-white font-semibold text-xs rounded-xl cursor-pointer"
              >
                Close Specification
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
