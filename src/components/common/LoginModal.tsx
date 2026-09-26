import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  X, 
  Tractor, 
  Building2, 
  ShieldCheck, 
  ArrowRight, 
  Smartphone, 
  KeyRound, 
  UserCheck, 
  Lock, 
  Building,
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import { UserSession } from '../../types';

export const LoginModal: React.FC = () => {
  const { 
    isLoginModalOpen, 
    setIsLoginModalOpen, 
    loginTab, 
    setLoginTab, 
    loginAs,
    centres,
    t 
  } = useApp();

  // Farmer form state
  const [farmerPhone, setFarmerPhone] = useState('98451 23450');
  const [farmerFid, setFarmerFid] = useState('KA-FARM-882190');
  const [farmerOtp, setFarmerOtp] = useState(['4', '8', '2', '1']);

  // Operator form state
  const [operatorId, setOperatorId] = useState('OP-KAR-2041');
  const [operatorCentre, setOperatorCentre] = useState(centres[0]?.name || 'Bengaluru Agricultural Procurement Centre');
  const [operatorBay, setOperatorBay] = useState('Bay Counter #2 (Direct Gate)');
  const [operatorPin, setOperatorPin] = useState('2041');

  // Admin form state
  const [adminEmail, setAdminEmail] = useState('director.marketing@karnataka.gov.in');
  const [adminDepartment, setAdminDepartment] = useState('Department of Food, Civil Supplies & Consumer Affairs');
  const [adminPasskey, setAdminPasskey] = useState('••••••••');

  if (!isLoginModalOpen) return null;

  // Handlers
  const handleFarmerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const session: UserSession = {
      role: 'farmer',
      name: 'Ravi Kumar',
      identifier: farmerFid || 'KA-FARM-882190',
      registeredNumber: farmerFid || 'KA-FARM-882190',
      centreName: operatorCentre,
      phone: farmerPhone,
      avatarInitials: 'RK'
    };
    loginAs(session);
  };

  const handleOperatorSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const session: UserSession = {
      role: 'operator',
      name: 'Anil Kumar',
      identifier: `Operator ID: ${operatorId || 'OP-KAR-2041'} · Bay #2`,
      registeredNumber: operatorId || 'OP-KAR-2041',
      centreName: operatorCentre,
      avatarInitials: 'AK'
    };
    loginAs(session);
  };

  const handleAdminSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const session: UserSession = {
      role: 'admin',
      name: 'Dr. K. Srinivas',
      identifier: 'Statewide APMC Mandi Director',
      registeredNumber: 'SSO-DIR-KA01',
      centreName: 'Karnataka State APMC Directorate',
      avatarInitials: 'KS'
    };
    loginAs(session);
  };

  const handleQuickLoginFarmer = () => {
    loginAs({
      role: 'farmer',
      name: 'Ravi Kumar',
      identifier: 'FID: KA-FARM-882190 (Token A-124)',
      registeredNumber: 'KA-FARM-882190',
      centreName: 'Bengaluru APMC Mandi',
      phone: '98451 23450',
      avatarInitials: 'RK'
    });
  };

  const handleQuickLoginOperator = () => {
    loginAs({
      role: 'operator',
      name: 'Anil Kumar',
      identifier: 'Operator ID: OP-KAR-2041 · Bay #2',
      registeredNumber: 'OP-KAR-2041',
      centreName: 'Bengaluru APMC Mandi',
      avatarInitials: 'AK'
    });
  };

  const handleQuickLoginAdmin = () => {
    loginAs({
      role: 'admin',
      name: 'Dr. K. Srinivas',
      identifier: 'Statewide APMC Mandi Director',
      registeredNumber: 'SSO-DIR-KA01',
      centreName: 'Karnataka State APMC Directorate',
      avatarInitials: 'KS'
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        onClick={() => setIsLoginModalOpen(false)}
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col z-10 animate-in zoom-in-95 duration-150">
        
        {/* Modal Top Bar */}
        <div className="p-5 sm:p-6 pb-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/60">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#165a36] text-white flex items-center justify-center shadow-xs">
              <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22v-9" />
                <path d="M12 13a5 5 0 0 0 5-5V4a5 5 0 0 0-5 5v4z" />
                <path d="M12 13a5 5 0 0 1-5-5V4a5 5 0 0 1 5 5v4z" />
              </svg>
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900 leading-tight">APMC Portal Access</h2>
              <p className="text-xs text-slate-500">Sign in with specific credentials to continue</p>
            </div>
          </div>

          <button
            onClick={() => setIsLoginModalOpen(false)}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-xl hover:bg-slate-200/60 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 3 Specific Login Category Tabs */}
        <div className="p-3 bg-slate-100/70 border-b border-slate-200/80">
          <div className="grid grid-cols-3 gap-1 bg-white/80 p-1 rounded-2xl border border-slate-200 shadow-2xs">
            <button
              type="button"
              onClick={() => setLoginTab('farmer')}
              className={`py-2 px-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                loginTab === 'farmer'
                  ? 'bg-[#165a36] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Tractor className="w-3.5 h-3.5" />
              <span>Farmer ID / OTP</span>
            </button>

            <button
              type="button"
              onClick={() => setLoginTab('operator')}
              className={`py-2 px-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                loginTab === 'operator'
                  ? 'bg-[#165a36] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>Weighbridge Bay</span>
            </button>

            <button
              type="button"
              onClick={() => setLoginTab('admin')}
              className={`py-2 px-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                loginTab === 'admin'
                  ? 'bg-[#165a36] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Directorate SSO</span>
            </button>
          </div>
        </div>

        {/* Form Body */}
        <div className="p-6">
          {/* TAB 1: FARMER LOGIN */}
          {loginTab === 'farmer' && (
            <form onSubmit={handleFarmerSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Registered Mobile Number
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-semibold text-slate-500 font-mono">
                    +91
                  </span>
                  <input
                    type="tel"
                    value={farmerPhone}
                    onChange={(e) => setFarmerPhone(e.target.value)}
                    className="w-full pl-14 pr-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-mono tracking-wider focus:outline-none focus:ring-2 focus:ring-[#165a36]"
                    placeholder="98451 23450"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Farmer ID (FID / FRUITS ID)
                </label>
                <input
                  type="text"
                  value={farmerFid}
                  onChange={(e) => setFarmerFid(e.target.value.toUpperCase())}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-mono font-semibold uppercase focus:outline-none focus:ring-2 focus:ring-[#165a36]"
                  placeholder="KA-FARM-882190"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  One-Time Passcode (OTP)
                </label>
                <div className="flex gap-2 justify-center py-1">
                  {farmerOtp.map((digit, idx) => (
                    <input
                      key={idx}
                      type="text"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => {
                        const newOtp = [...farmerOtp];
                        newOtp[idx] = e.target.value;
                        setFarmerOtp(newOtp);
                      }}
                      className="w-12 h-12 text-center text-lg font-bold font-mono rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#165a36]"
                    />
                  ))}
                </div>
                <span className="text-[11px] text-slate-400 text-center block mt-1">
                  Demo SMS code pre-filled (4821)
                </span>
              </div>

              <button
                type="submit"
                className="w-full h-11 bg-[#165a36] hover:bg-[#124b2d] active:bg-[#0e3b23] text-white font-bold text-sm rounded-xl flex items-center justify-center gap-2 transition-colors shadow-xs cursor-pointer mt-2"
              >
                <span>Authenticate &amp; Enter Farmer Portal</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={handleQuickLoginFarmer}
                  className="w-full py-2 px-3 bg-emerald-50 hover:bg-emerald-100 text-[#165a36] border border-emerald-200/80 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>1-Click Quick Demo Login (Farmer Ravi Kumar · Token A-124)</span>
                </button>
              </div>
            </form>
          )}

          {/* TAB 2: OPERATOR LOGIN */}
          {loginTab === 'operator' && (
            <form onSubmit={handleOperatorSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Weighbridge Operator ID
                </label>
                <input
                  type="text"
                  value={operatorId}
                  onChange={(e) => setOperatorId(e.target.value.toUpperCase())}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-mono font-semibold uppercase focus:outline-none focus:ring-2 focus:ring-[#165a36]"
                  placeholder="OP-KAR-2041"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Assigned Mandi Yard
                </label>
                <select
                  value={operatorCentre}
                  onChange={(e) => setOperatorCentre(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-medium bg-white focus:outline-none focus:ring-2 focus:ring-[#165a36] cursor-pointer"
                >
                  {centres.map((c) => (
                    <option key={c.id} value={c.name}>{c.name}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Weighbridge Station
                  </label>
                  <input
                    type="text"
                    value={operatorBay}
                    onChange={(e) => setOperatorBay(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#165a36]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Security PIN
                  </label>
                  <input
                    type="password"
                    value={operatorPin}
                    onChange={(e) => setOperatorPin(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-sm font-mono tracking-widest focus:outline-none focus:ring-2 focus:ring-[#165a36]"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full h-11 bg-slate-900 hover:bg-slate-800 active:bg-slate-950 text-white font-bold text-sm rounded-xl flex items-center justify-center gap-2 transition-colors shadow-xs cursor-pointer mt-2"
              >
                <span>Authorize &amp; Open Weighbridge Terminal</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={handleQuickLoginOperator}
                  className="w-full py-2 px-3 bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
                  <span>1-Click Quick Demo Login (Anil Kumar, Bay #2)</span>
                </button>
              </div>
            </form>
          )}

          {/* TAB 3: AUTHORITY / ADMIN LOGIN */}
          {loginTab === 'admin' && (
            <form onSubmit={handleAdminSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Official Directorate Email
                </label>
                <input
                  type="email"
                  value={adminEmail}
                  onChange={(e) => setAdminEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-[#165a36]"
                  placeholder="director.marketing@karnataka.gov.in"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Department / Authority
                </label>
                <input
                  type="text"
                  value={adminDepartment}
                  onChange={(e) => setAdminDepartment(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#165a36]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Govt SSO Security Token
                </label>
                <input
                  type="password"
                  value={adminPasskey}
                  onChange={(e) => setAdminPasskey(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-mono tracking-widest focus:outline-none focus:ring-2 focus:ring-[#165a36]"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full h-11 bg-slate-900 hover:bg-slate-800 active:bg-slate-950 text-white font-bold text-sm rounded-xl flex items-center justify-center gap-2 transition-colors shadow-xs cursor-pointer mt-2"
              >
                <span>Authorize &amp; Launch Command Centre</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={handleQuickLoginAdmin}
                  className="w-full py-2 px-3 bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
                  <span>1-Click Quick Demo Login (Directorate Admin)</span>
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Footer info badge */}
        <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-100 text-[11px] text-slate-500 flex items-center justify-between">
          <span>APMC Encrypted Access Gate</span>
          <span className="font-mono text-emerald-700 font-semibold">256-Bit SSL · Aadhaar Verified</span>
        </div>

      </div>
    </div>
  );
};
