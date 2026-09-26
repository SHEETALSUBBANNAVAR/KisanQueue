import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Smartphone, KeyRound, ArrowRight, UserPlus, CheckCircle2 } from 'lucide-react';

export const FarmerAuth: React.FC = () => {
  const { farmerScreen, setFarmerScreen, currentFarmer, addToast, t } = useApp();

  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [phone, setPhone] = useState('98451 23450');
  const [otp, setOtp] = useState(['4', '8', '2', '1']);

  // Registration state
  const [regForm, setRegForm] = useState({
    name: 'Ramesh Gowda',
    phone: '98451 23450',
    farmerId: 'KA-FARM-882190',
    village: 'Devenahalli Rural',
    district: 'Bengaluru Rural',
    language: 'English'
  });

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.trim().length < 10) {
      addToast('Invalid Number', 'Please enter a valid 10-digit mobile number', 'error');
      return;
    }
    setStep('otp');
    addToast('OTP Sent', `Verification code sent to +91 ${phone} (Demo OTP: 4821)`, 'info');
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    addToast('Authentication Verified', `Welcome back, ${currentFarmer.name}`, 'success');
    setFarmerScreen('home');
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!regForm.name || !regForm.phone || !regForm.farmerId) {
      addToast('Missing Details', 'Please fill in all mandatory farmer registration fields', 'error');
      return;
    }
    addToast('Account Created Successfully', `Farmer ID ${regForm.farmerId} registered`, 'success');
    setFarmerScreen('home');
  };

  if (farmerScreen === 'register') {
    return (
      <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-xs max-w-2xl mx-auto">
        <div className="mb-6">
          <span className="text-xs font-semibold text-emerald-800 uppercase tracking-wider">
            {t('farmerPortal')}
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">Farmer Registration</h2>
          <p className="text-xs text-slate-600 mt-1">
            Register with your Aadhaar-linked Farmer Identity Number (FID) for seamless MSP procurement.
          </p>
        </div>

        <form onSubmit={handleRegisterSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Full Name *
            </label>
            <input
              type="text"
              value={regForm.name}
              onChange={(e) => setRegForm({ ...regForm, name: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700"
              placeholder="e.g. Ramesh Gowda"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Mobile Number *
            </label>
            <input
              type="tel"
              value={regForm.phone}
              onChange={(e) => setRegForm({ ...regForm, phone: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700"
              placeholder="10-digit mobile number"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Farmer ID (FID / FRUITS ID) *
            </label>
            <input
              type="text"
              value={regForm.farmerId}
              onChange={(e) => setRegForm({ ...regForm, farmerId: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700 uppercase font-mono"
              placeholder="e.g. KA-FARM-882190"
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Village *
              </label>
              <input
                type="text"
                value={regForm.village}
                onChange={(e) => setRegForm({ ...regForm, village: e.target.value })}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                District *
              </label>
              <input
                type="text"
                value={regForm.district}
                onChange={(e) => setRegForm({ ...regForm, district: e.target.value })}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Preferred Language
            </label>
            <select
              value={regForm.language}
              onChange={(e) => setRegForm({ ...regForm, language: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700 bg-white cursor-pointer"
            >
              <option value="English">English</option>
              <option value="Kannada">ಕನ್ನಡ (Kannada)</option>
              <option value="Hindi">हिंदी (Hindi)</option>
              <option value="Telugu">తెలుగు (Telugu)</option>
              <option value="Tamil">தமிழ் (Tamil)</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full mt-4 h-12 bg-emerald-800 hover:bg-emerald-900 active:bg-emerald-950 text-white font-semibold text-sm rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-xs"
          >
            <UserPlus className="w-4 h-4" />
            <span>Create Account</span>
          </button>

          <p className="text-center text-xs text-slate-500 mt-2">
            Already registered?{' '}
            <button
              type="button"
              onClick={() => setFarmerScreen('login')}
              className="text-emerald-800 font-semibold underline cursor-pointer"
            >
              Login with Mobile OTP
            </button>
          </p>
        </form>
      </div>
    );
  }

  // F02: Login Flow
  return (
    <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-xs flex flex-col min-h-[520px] justify-between max-w-2xl mx-auto">
      <div>
        <div className="mb-6">
          <span className="text-xs font-semibold text-emerald-800 uppercase tracking-wider">
            {t('farmerPortal')}
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
            {step === 'phone' ? 'Enter Mobile Number' : 'Enter 4-Digit OTP'}
          </h2>
          <p className="text-xs text-slate-600 mt-1">
            {step === 'phone'
              ? 'Receive a one-time verification code on your registered SIM.'
              : `Code sent to +91 ${phone}. Use demo OTP: 4821`}
          </p>
        </div>

        {step === 'phone' ? (
          <form onSubmit={handleSendOtp} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Mobile Number
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-semibold text-slate-500 font-mono">
                  +91
                </span>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full pl-14 pr-3.5 py-3 rounded-xl border border-slate-300 text-base font-mono tracking-wider focus:outline-none focus:ring-2 focus:ring-emerald-700"
                  placeholder="98451 23450"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full h-12 bg-emerald-800 hover:bg-emerald-900 active:bg-emerald-950 text-white font-semibold text-sm rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-xs"
            >
              <Smartphone className="w-4 h-4" />
              <span>Send OTP</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerifyOtp} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-2">
                One-Time Password (OTP)
              </label>
              <div className="flex gap-2.5 justify-center">
                {otp.map((digit, idx) => (
                  <input
                    key={idx}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => {
                      const newOtp = [...otp];
                      newOtp[idx] = e.target.value;
                      setOtp(newOtp);
                    }}
                    className="w-12 h-14 text-center text-xl font-bold font-mono rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-700"
                  />
                ))}
              </div>
            </div>

            <button
              type="submit"
              className="w-full h-12 bg-emerald-800 hover:bg-emerald-900 active:bg-emerald-950 text-white font-semibold text-sm rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-xs"
            >
              <KeyRound className="w-4 h-4" />
              <span>Verify & Continue</span>
            </button>

            <div className="flex justify-between items-center text-xs text-slate-500 pt-1">
              <button
                type="button"
                onClick={() => setStep('phone')}
                className="text-emerald-800 hover:underline cursor-pointer"
              >
                Change Number
              </button>
              <button
                type="button"
                onClick={() => addToast('Resent', 'OTP resent to mobile number', 'info')}
                className="text-slate-600 hover:text-slate-900 cursor-pointer"
              >
                Resend Code (30s)
              </button>
            </div>
          </form>
        )}
      </div>

      {/* Demo shortcuts */}
      <div className="pt-6 border-t border-slate-100 space-y-3">
        <button
          type="button"
          onClick={() => {
            addToast('Demo Access', 'LoggedIn as Ramesh Gowda', 'success');
            setFarmerScreen('home');
          }}
          className="w-full h-11 bg-slate-50 hover:bg-slate-100 text-emerald-800 font-semibold text-xs rounded-xl border border-slate-200 flex items-center justify-center gap-2 transition-colors cursor-pointer"
        >
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>{t('tryFarmerDemo')} (Ramesh Gowda)</span>
        </button>

        <div className="text-center text-xs text-slate-500">
          New farmer without FID?{' '}
          <button
            type="button"
            onClick={() => setFarmerScreen('register')}
            className="text-emerald-800 font-semibold underline cursor-pointer"
          >
            Create New Account
          </button>
        </div>
      </div>
    </div>
  );
};
