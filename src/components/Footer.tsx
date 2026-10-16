import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import {
  Store,
  ShieldCheck,
  Truck,
  RotateCcw,
  MapPin,
  Phone,
  Mail,
  ArrowRight,
  Check,
  Copy,
  Sparkles,
  ArrowUp,
  CheckCircle2,
  Award,
  Smartphone,
  QrCode,
  CreditCard,
  X,
  MessageCircle,
  Thermometer,
  Layers,
  ChevronRight,
  Shield,
  HelpCircle,
  Database,
} from 'lucide-react';
import { DHAKA_HUBS } from '@/data/mockData';
import { isSupabaseConfigured } from '@/lib/supabase';

export const Footer: React.FC = () => {
  const { setCurrentScreen, selectedHub, setSelectedHub, showToast } = useApp();

  // Newsletter subscription state
  const [emailInput, setEmailInput] = useState('');
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [subscribedCoupon, setSubscribedCoupon] = useState<string | null>(null);

  // Active info modal state
  const [activeModal, setActiveModal] = useState<'fefo' | 'hubs' | 'bsti' | 'faq' | 'supabase' | null>(null);

  // Copy helper
  const handleCopy = (text: string, label: string) => {
    navigator.clipboard?.writeText(text);
    showToast('Copied to Clipboard', `${label}: ${text}`, 'success');
  };

  // Newsletter submit
  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput || !emailInput.includes('@')) {
      showToast('Invalid Email', 'Please enter a valid email address.', 'warning');
      return;
    }
    setIsSubscribing(true);
    setTimeout(() => {
      setIsSubscribing(false);
      setSubscribedCoupon('BENGAL150');
      showToast('Welcome to BengalFresh!', 'Your ৳ 150 voucher code BENGAL150 is ready.', 'success');
    }, 600);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <footer id="main-footer" className="bg-slate-950 text-slate-300 border-t border-slate-800 text-xs antialiased selection:bg-emerald-600 selection:text-white">
        {/* 1. Value Proposition & Trust Guarantees Bar */}
        <div className="border-b border-slate-800/80 bg-slate-900/60 backdrop-blur-xs">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
              {/* Feature 1 */}
              <div className="flex items-start gap-3.5 group">
                <div className="w-11 h-11 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/20 group-hover:bg-emerald-500/20 group-hover:border-emerald-500/40 transition-all duration-200">
                  <Truck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-white text-sm tracking-tight flex items-center gap-1.5">
                    2-Hour Dhaka Express
                    <span className="text-[10px] font-bold px-1.5 py-0.2 bg-emerald-500/20 text-emerald-300 rounded border border-emerald-500/30">
                      LIVE
                    </span>
                  </h4>
                  <p className="text-slate-400 text-xs mt-1 leading-relaxed">
                    Insulated cold-box dispatch within 120 minutes across 12 major Dhaka zones.
                  </p>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="flex items-start gap-3.5 group">
                <div className="w-11 h-11 rounded-xl bg-sky-500/10 text-sky-400 flex items-center justify-center shrink-0 border border-sky-500/20 group-hover:bg-sky-500/20 group-hover:border-sky-500/40 transition-all duration-200">
                  <Thermometer className="w-5 h-5" />
                </div>
                <div>
                  <button
                    type="button"
                    onClick={() => setActiveModal('fefo')}
                    className="font-semibold text-white text-sm tracking-tight hover:text-sky-300 transition-colors text-left flex items-center gap-1 cursor-pointer"
                  >
                    100% FEFO Cold-Chain
                    <ChevronRight className="w-3.5 h-3.5 text-sky-400" />
                  </button>
                  <p className="text-slate-400 text-xs mt-1 leading-relaxed">
                    First-Expired First-Out audit. Vaults maintained strictly at 2°C–4.2°C.
                  </p>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="flex items-start gap-3.5 group">
                <div className="w-11 h-11 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center shrink-0 border border-amber-500/20 group-hover:bg-amber-500/20 group-hover:border-amber-500/40 transition-all duration-200">
                  <RotateCcw className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-white text-sm tracking-tight">
                    24-Hour Instant Swap
                  </h4>
                  <p className="text-slate-400 text-xs mt-1 leading-relaxed">
                    Zero-hassle replacement or refund if freshness, seal or taste is compromised.
                  </p>
                </div>
              </div>

              {/* Feature 4 */}
              <div className="flex items-start gap-3.5 group">
                <div className="w-11 h-11 rounded-xl bg-violet-500/10 text-violet-400 flex items-center justify-center shrink-0 border border-violet-500/20 group-hover:bg-violet-500/20 group-hover:border-violet-500/40 transition-all duration-200">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <button
                    type="button"
                    onClick={() => setActiveModal('bsti')}
                    className="font-semibold text-white text-sm tracking-tight hover:text-violet-300 transition-colors text-left flex items-center gap-1 cursor-pointer"
                  >
                    BSTI & BFSA Certified
                    <ChevronRight className="w-3.5 h-3.5 text-violet-400" />
                  </button>
                  <p className="text-slate-400 text-xs mt-1 leading-relaxed">
                    Directly contracted partner farms in Gazipur & Bogura with lab purity audits.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 2. Newsletter / VIP Fresh Club Strip (Rich Sapphire & Emerald) */}
        <div className="border-b border-blue-950 bg-gradient-to-r from-blue-950/60 via-slate-900 to-[#07242e]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
              <div className="max-w-xl text-center lg:text-left">
                <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-sky-300 text-[11px] font-semibold mb-2">
                  <Sparkles className="w-3.5 h-3.5 text-sky-400" />
                  <span>Dhaka Freshness Club</span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                  Get ৳ 150 off your first cold-chain grocery order
                </h3>
                <p className="text-slate-400 text-xs mt-1 leading-relaxed">
                  Subscribe to receive weekly farm-gate harvest drops, clearance FEFO alerts, and priority dispatch slots.
                </p>
              </div>

              {/* Newsletter Form */}
              <div className="w-full lg:w-auto shrink-0">
                {subscribedCoupon ? (
                  <div className="flex items-center gap-3 bg-blue-950/60 border border-blue-500/40 rounded-xl px-4 py-3 text-sky-200">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                    <div>
                      <div className="font-semibold text-white text-xs">Coupon Unlocked: {subscribedCoupon}</div>
                      <div className="text-[11px] text-sky-300">৳ 150 off orders over ৳ 799 at checkout</div>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleCopy(subscribedCoupon, 'Coupon Code')}
                      className="ml-2 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500 text-slate-950 font-bold text-xs hover:bg-emerald-400 transition-colors cursor-pointer"
                    >
                      <Copy className="w-3.5 h-3.5" />
                      Copy Code
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2 w-full max-w-md">
                    <div className="relative flex-1">
                      <Mail className="w-4 h-4 text-sky-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="email"
                        value={emailInput}
                        onChange={(e) => setEmailInput(e.target.value)}
                        placeholder="Enter your email address..."
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-blue-900 text-white placeholder-slate-500 text-xs focus:outline-hidden focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={isSubscribing}
                      className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-500 hover:to-emerald-500 text-white font-semibold text-xs tracking-tight transition-all duration-200 flex items-center justify-center gap-1.5 cursor-pointer shrink-0 disabled:opacity-70 shadow-md shadow-blue-600/20"
                    >
                      {isSubscribing ? 'Processing...' : 'Claim ৳ 150 Off'}
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </form>
                )}
                <p className="text-[11px] text-slate-500 mt-2 text-center lg:text-left">
                  Zero spam. You can unsubscribe in 1 click at any time.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 3. Main Footer Links & Company Details (6-Column Grid) */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 lg:gap-10">
            {/* Column 1 & 2: Brand Identity & Dhaka Operations */}
            <div className="lg:col-span-2 space-y-4">
              <div
                onClick={() => {
                  setCurrentScreen('storefront');
                  scrollToTop();
                }}
                className="flex items-center gap-2.5 cursor-pointer select-none group w-fit"
              >
                <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 via-blue-700 to-emerald-500 text-white flex items-center justify-center shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
                  <Store className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-black text-lg tracking-tight text-white leading-none">
                      Bengal<span className="text-emerald-400">Fresh</span>
                    </span>
                    <span className="bg-blue-900/60 text-sky-300 border border-blue-500/30 text-[9px] font-bold px-1.5 py-0.5 rounded">
                      DHAKA
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-400 font-medium leading-tight mt-0.5">
                    Cold-Chain & FEFO Grocery Retail
                  </p>
                </div>
              </div>

              <p className="text-slate-400 leading-relaxed text-xs max-w-sm">
                Bangladesh&apos;s pioneering omni-channel retail ecosystem combining automated First-Expired First-Out (FEFO) cold-chain routing, 2-hour express dispatch, and integrated cloud POS terminals.
              </p>

              {/* Active Hub Card */}
              <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2 max-w-sm">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-slate-400 flex items-center gap-1.5">
                    Dispatching Hub:
                  </span>
                  <button
                    type="button"
                    onClick={() => setActiveModal('hubs')}
                    className="text-emerald-400 hover:text-emerald-300 font-semibold cursor-pointer flex items-center gap-0.5"
                  >
                    Change Hub <ChevronRight className="w-3 h-3" />
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <div className="font-semibold text-white text-xs flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>{selectedHub}</span>
                  </div>
                  <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">
                    Vault: 4.2°C
                  </span>
                </div>
                <div className="text-[11px] text-slate-400 border-t border-slate-800/80 pt-1.5 flex items-center justify-between">
                  <span>Flagship Vault: Dhanmondi 27, Dhaka</span>
                  <span className="text-emerald-400 font-medium">35 min avg delivery</span>
                </div>
              </div>

              {/* Contact Helpline & WhatsApp */}
              <div className="space-y-1.5 pt-1">
                <div className="flex items-center gap-2 text-slate-300 text-xs">
                  <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span className="text-slate-400">Order Hotline:</span>
                  <a href="tel:09612000000" className="font-semibold text-white hover:text-emerald-400 transition-colors">
                    09612-000000
                  </a>
                  <span className="text-[10px] text-slate-500">(8 AM – 11 PM)</span>
                </div>
                <div className="flex items-center gap-2 text-slate-300 text-xs">
                  <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span className="text-slate-400">WhatsApp Care:</span>
                  <button
                    type="button"
                    onClick={() => handleCopy('+8801700000000', 'WhatsApp Number')}
                    className="font-semibold text-white hover:text-emerald-400 transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    +880 1700-000000
                    <Copy className="w-3 h-3 text-slate-500 hover:text-white" />
                  </button>
                </div>
              </div>
            </div>

            {/* Column 3: Fresh Categories */}
            <div className="space-y-3">
              <h5 className="font-bold text-white text-xs uppercase tracking-wider text-slate-200">
                Fresh Departments
              </h5>
              <ul className="space-y-2.5 text-slate-400 text-xs">
                <li>
                  <button
                    type="button"
                    onClick={() => {
                      setCurrentScreen('product-detail');
                      scrollToTop();
                    }}
                    className="hover:text-emerald-400 transition-colors cursor-pointer text-left flex items-center justify-between w-full group"
                  >
                    <span>Dairy & Pran UHT Milk</span>
                    <span className="text-[10px] font-semibold text-emerald-400 bg-emerald-950/60 px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                      Featured
                    </span>
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => {
                      setCurrentScreen('storefront');
                      scrollToTop();
                    }}
                    className="hover:text-white transition-colors cursor-pointer text-left"
                  >
                    Cold-Vault Poultry & Fish
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => {
                      setCurrentScreen('storefront');
                      scrollToTop();
                    }}
                    className="hover:text-white transition-colors cursor-pointer text-left"
                  >
                    Farm Fresh Greens & Veggies
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => {
                      setCurrentScreen('storefront');
                      scrollToTop();
                    }}
                    className="hover:text-white transition-colors cursor-pointer text-left"
                  >
                    Mustard Oils, Ghee & Spices
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => {
                      setCurrentScreen('storefront');
                      scrollToTop();
                    }}
                    className="hover:text-white transition-colors cursor-pointer text-left"
                  >
                    Daily Bakery & Breakfast
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => {
                      setCurrentScreen('storefront');
                      scrollToTop();
                    }}
                    className="text-amber-400 hover:text-amber-300 transition-colors cursor-pointer text-left font-medium flex items-center gap-1"
                  >
                    <Sparkles className="w-3 h-3" />
                    <span>Daily FEFO Clearance (-40%)</span>
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 4: Customer Care & Transparency */}
            <div className="space-y-3">
              <h5 className="font-bold text-white text-xs uppercase tracking-wider text-slate-200">
                Customer Care
              </h5>
              <ul className="space-y-2.5 text-slate-400 text-xs">
                <li>
                  <button
                    type="button"
                    onClick={() => setActiveModal('fefo')}
                    className="hover:text-emerald-400 transition-colors cursor-pointer text-left flex items-center gap-1"
                  >
                    <Shield className="w-3.5 h-3.5 text-emerald-400" />
                    <span>FEFO Freshness Guarantee</span>
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => setActiveModal('hubs')}
                    className="hover:text-white transition-colors cursor-pointer text-left flex items-center gap-1"
                  >
                    <MapPin className="w-3.5 h-3.5 text-sky-400" />
                    <span>Dhaka 12-Zone Delivery Map</span>
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => setActiveModal('bsti')}
                    className="hover:text-white transition-colors cursor-pointer text-left flex items-center gap-1"
                  >
                    <Award className="w-3.5 h-3.5 text-violet-400" />
                    <span>BSTI Quality Certificate</span>
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => setActiveModal('faq')}
                    className="hover:text-white transition-colors cursor-pointer text-left flex items-center gap-1"
                  >
                    <HelpCircle className="w-3.5 h-3.5 text-slate-400" />
                    <span>Returns & Refund Policy</span>
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => {
                      showToast('Corporate Supply', 'Please call 09612-000000 Ext 4 for B2B institutional orders.', 'info');
                    }}
                    className="hover:text-white transition-colors cursor-pointer text-left"
                  >
                    Institutional & Bulk Supply
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => setActiveModal('faq')}
                    className="hover:text-white transition-colors cursor-pointer text-left"
                  >
                    Frequently Asked Questions
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 5: Ecosystem & ERP */}
            <div className="space-y-3">
              <h5 className="font-bold text-white text-xs uppercase tracking-wider text-slate-200">
                Ecosystem & ERP
              </h5>
              <ul className="space-y-2.5 text-slate-400 text-xs">
                <li>
                  <button
                    type="button"
                    onClick={() => setActiveModal('supabase')}
                    className="text-emerald-400 hover:text-emerald-300 transition-colors cursor-pointer text-left flex items-center gap-1.5 font-medium"
                  >
                    <Database className="w-3.5 h-3.5" />
                    <span>Supabase Backend (PostgreSQL)</span>
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => {
                      setCurrentScreen('retail-pos');
                      scrollToTop();
                    }}
                    className="hover:text-white transition-colors cursor-pointer text-left flex items-center gap-1.5"
                  >
                    <Layers className="w-3.5 h-3.5" />
                    <span>Retail ERP & POS Terminal</span>
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => setActiveModal('fefo')}
                    className="hover:text-white transition-colors cursor-pointer text-left"
                  >
                    Cold Vault IoT Telemetry
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => {
                      showToast('Direct Farm Portal', 'Sourcing connections active with 180+ Gazipur farmers.', 'info');
                    }}
                    className="hover:text-white transition-colors cursor-pointer text-left"
                  >
                    Direct Farm Sourcing Portal
                  </button>
                </li>
                <li>
                  <span className="text-slate-400 flex items-center gap-1.5">
                    NBR VAT Invoicing (API 2.0)
                  </span>
                </li>
                <li>
                  <span className="text-slate-400 flex items-center gap-1.5">
                    Pathao Insulated Cold Dispatch
                  </span>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => {
                      showToast('Careers', 'We are hiring cold-chain dispatch managers and software engineers in Dhaka!', 'info');
                    }}
                    className="hover:text-white transition-colors cursor-pointer text-left flex items-center gap-1"
                  >
                    <span>Careers</span>
                    <span className="text-[9px] bg-emerald-500/20 text-emerald-300 px-1.5 py-0.5 rounded font-bold">
                      HIRING
                    </span>
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 6: App Download & Badges */}
            <div className="space-y-3">
              <h5 className="font-bold text-white text-xs uppercase tracking-wider text-slate-200">
                Experience On Mobile
              </h5>
              <p className="text-slate-400 text-[11px] leading-relaxed">
                Scan or download for instant batch lookup, push alerts on fresh milk arrivals & 30-min express checkout.
              </p>
              {/* App Buttons */}
              <div className="space-y-2 pt-1">
                {/* iOS App Store Badge */}
                <button
                  type="button"
                  onClick={() => showToast('App Store', 'BengalFresh iOS App launching on App Store shortly!', 'info')}
                  className="w-full flex items-center gap-3 px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-850 border border-slate-800 hover:border-slate-700 transition-all text-left group cursor-pointer"
                >
                  <div className="w-7 h-7 rounded-lg bg-black text-white flex items-center justify-center shrink-0 border border-slate-800">
                    <Smartphone className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div>
                    <div className="text-[9px] text-slate-400 uppercase tracking-wider font-semibold">Download on the</div>
                    <div className="text-xs font-bold text-white tracking-tight leading-none group-hover:text-emerald-400 transition-colors">
                      Apple App Store
                    </div>
                  </div>
                </button>
                {/* Android Google Play Badge */}
                <button
                  type="button"
                  onClick={() => showToast('Google Play', 'BengalFresh Android App launching on Google Play shortly!', 'info')}
                  className="w-full flex items-center gap-3 px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-850 border border-slate-800 hover:border-slate-700 transition-all text-left group cursor-pointer"
                >
                  <div className="w-7 h-7 rounded-lg bg-black text-emerald-400 flex items-center justify-center shrink-0 border border-slate-800">
                    <QrCode className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div>
                    <div className="text-[9px] text-slate-400 uppercase tracking-wider font-semibold">GET IT ON</div>
                    <div className="text-xs font-bold text-white tracking-tight leading-none group-hover:text-emerald-400 transition-colors">
                      Google Play Store
                    </div>
                  </div>
                </button>
              </div>
              {/* App Rating Pill */}
              <div className="pt-1 flex items-center justify-between text-[11px] text-slate-400 bg-slate-900/60 px-2.5 py-1.5 rounded-lg border border-slate-800">
                <span className="flex items-center gap-1 text-amber-400 font-bold">
                  ★ 4.9 / 5.0
                </span>
                <span>45,000+ App Downloads</span>
              </div>
            </div>
          </div>
        </div>

        {/* 4. Payment Gateways & Compliance Bar */}
        <div className="border-t border-slate-800/80 bg-slate-900/40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
              {/* Left: Secured Payment Gateways */}
              <div className="flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left">
                <div className="flex items-center gap-1.5 text-slate-400 text-xs shrink-0">
                  <CreditCard className="w-4 h-4 text-emerald-400" />
                  <span className="font-semibold text-slate-300">Accepted MFS & Cards:</span>
                </div>
                {/* Payment Gateway Logos */}
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-1.5">
                  <span
                    title="bKash Direct Gateway"
                    className="inline-flex items-center px-2.5 py-1 rounded-md bg-[#D12053] text-white font-black text-[11px] shadow-xs tracking-tight select-none"
                  >
                    bKash
                  </span>
                  <span
                    title="Nagad Instant Checkout"
                    className="inline-flex items-center px-2.5 py-1 rounded-md bg-[#F7931E] text-white font-black text-[11px] shadow-xs tracking-tight select-none"
                  >
                    Nagad
                  </span>
                  <span
                    title="DBBL Rocket"
                    className="inline-flex items-center px-2.5 py-1 rounded-md bg-[#8C3494] text-white font-black text-[11px] shadow-xs tracking-tight select-none"
                  >
                    Rocket
                  </span>
                  <span
                    title="Upay MFS"
                    className="inline-flex items-center px-2 py-1 rounded-md bg-[#005BAA] text-white font-bold text-[11px] shadow-xs tracking-tight select-none"
                  >
                    Upay
                  </span>
                  <span
                    title="Visa Secured"
                    className="inline-flex items-center px-2.5 py-1 rounded-md bg-[#1A1F71] text-white font-black italic text-[11px] shadow-xs select-none"
                  >
                    VISA
                  </span>
                  <span
                    title="MasterCard Identity Check"
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-[#222222] text-white font-bold text-[11px] shadow-xs border border-slate-700 select-none"
                  >
                    <span className="w-2.5 h-2.5 rounded-full bg-[#EB001B] inline-block -mr-1 opacity-95" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#F79E1B] inline-block opacity-95" />
                    <span className="ml-1">Mastercard</span>
                  </span>
                  <span
                    title="American Express"
                    className="inline-flex items-center px-2 py-1 rounded-md bg-[#006FCF] text-white font-black text-[10px] shadow-xs select-none"
                  >
                    AMEX
                  </span>
                  <span
                    title="Cash on Insulated Delivery"
                    className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-emerald-950/80 text-emerald-300 border border-emerald-500/30 font-semibold text-[11px] select-none"
                  >
                    <Check className="w-3 h-3 text-emerald-400" />
                    Cash on Delivery
                  </span>
                </div>
              </div>

              {/* Right: Security & Compliance Badges */}
              <div className="flex flex-wrap items-center justify-center gap-4 text-[11px] text-slate-400">
                <span className="flex items-center gap-1 text-slate-300">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>256-Bit SSL Encrypted</span>
                </span>
                <span className="text-slate-700 hidden sm:inline">·</span>
                <span className="flex items-center gap-1">
                  <span>NBR VAT BIN:</span>
                  <span className="font-mono text-slate-300">002910481-0101</span>
                </span>
                <span className="text-slate-700 hidden sm:inline">·</span>
                <span className="flex items-center gap-1">
                  <span>Trade License:</span>
                  <span className="font-mono text-slate-300">DNCC-019284</span>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 5. Sub-Footer Legal, Copyright & Scroll to Top */}
        <div className="border-t border-slate-900 bg-black/40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
              {/* Copyright */}
              <div className="text-center sm:text-left">
                <p>
                  © {new Date().getFullYear()} Bengal Commerce Technologies Ltd. All rights reserved.
                </p>
                <p className="text-[10px] text-slate-600 mt-0.5">
                  Operating under Bangladesh Food Safety Authority (BFSA) & BSTI BDS Standards.
                </p>
              </div>

              {/* Legal Links */}
              <div className="flex flex-wrap items-center justify-center gap-5 text-slate-400">
                <button
                  type="button"
                  onClick={() => setActiveModal('faq')}
                  className="hover:text-slate-200 transition-colors cursor-pointer"
                >
                  Privacy Policy
                </button>
                <button
                  type="button"
                  onClick={() => setActiveModal('faq')}
                  className="hover:text-slate-200 transition-colors cursor-pointer"
                >
                  Terms of Service
                </button>
                <button
                  type="button"
                  onClick={() => setActiveModal('fefo')}
                  className="hover:text-slate-200 transition-colors cursor-pointer"
                >
                  FEFO Audit Certificate
                </button>
                <button
                  type="button"
                  onClick={() => setActiveModal('bsti')}
                  className="hover:text-slate-200 transition-colors cursor-pointer"
                >
                  Food Safety Compliance
                </button>
                {/* Back to top button */}
                <button
                  type="button"
                  onClick={scrollToTop}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 hover:border-slate-700 transition-all cursor-pointer shadow-xs ml-1"
                >
                  <span>Back to top</span>
                  <ArrowUp className="w-3.5 h-3.5 text-emerald-400" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* 6. Interactive Modal Dialogs for Footer Links */}
      {activeModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in duration-150"
          onClick={() => setActiveModal(null)}
        >
          <div
            className="bg-slate-900 border border-slate-800 text-slate-200 rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4 relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setActiveModal(null)}
              className="absolute top-4 right-4 p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Modal: Supabase Integration */}
            {activeModal === 'supabase' && (
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
                  <Database className="w-6 h-6" />
                </div>
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-white tracking-tight">
                    Supabase PostgreSQL Backend
                  </h3>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${
                    isSupabaseConfigured
                      ? 'bg-emerald-950/80 text-emerald-300 border-emerald-500/40'
                      : 'bg-amber-950/80 text-amber-300 border-amber-500/40'
                  }`}>
                    {isSupabaseConfigured ? 'Connected & Live' : 'Local Fallback Mode'}
                  </span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Connect your Bengal Commerce application to a free Supabase PostgreSQL cloud database for persistent products, FEFO batches, real-time express orders, and customer reviews.
                </p>
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-slate-200">How to Connect in 3 Quick Steps:</span>
                    <button
                      type="button"
                      onClick={() => {
                        const sql = `-- BENGAL COMMERCE SUPABASE SCHEMA
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS public.products (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    name_bn TEXT,
    brand TEXT NOT NULL,
    category TEXT NOT NULL,
    category_slug TEXT NOT NULL,
    weight TEXT NOT NULL,
    price NUMERIC(10, 2) NOT NULL,
    old_price NUMERIC(10, 2) NOT NULL,
    rating NUMERIC(2, 1) DEFAULT 4.8,
    reviews INTEGER DEFAULT 0,
    badge_text TEXT,
    discount TEXT,
    points_text TEXT,
    image_url TEXT NOT NULL,
    batch_id TEXT,
    in_stock BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.batches (
    batch_id TEXT PRIMARY KEY,
    sku TEXT NOT NULL,
    product_name TEXT NOT NULL,
    category TEXT NOT NULL,
    location TEXT NOT NULL,
    supplier TEXT NOT NULL,
    expiry_date DATE NOT NULL,
    days_remaining_text TEXT NOT NULL,
    status TEXT NOT NULL,
    discount_badge TEXT,
    cost_price NUMERIC(10, 2) NOT NULL,
    sell_price NUMERIC(10, 2) NOT NULL,
    stock_qty INTEGER NOT NULL DEFAULT 0,
    reserved_qty INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.orders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_id TEXT UNIQUE NOT NULL,
    customer_name TEXT NOT NULL,
    phone TEXT NOT NULL,
    address TEXT NOT NULL,
    hub TEXT NOT NULL DEFAULT 'Dhanmondi Hub #04',
    payment_method TEXT NOT NULL,
    total_amount NUMERIC(10, 2) NOT NULL,
    items JSONB NOT NULL DEFAULT '[]'::jsonb,
    status TEXT NOT NULL DEFAULT 'in_transit',
    current_step INTEGER DEFAULT 4,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.reviews (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    product_id TEXT NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
    author TEXT NOT NULL,
    location TEXT NOT NULL,
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    comment TEXT NOT NULL,
    verified BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.hubs (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    address TEXT NOT NULL,
    temp TEXT NOT NULL DEFAULT '4.2°C',
    status TEXT NOT NULL DEFAULT 'Active'
);

ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.batches ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.hubs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public products viewable by all" ON public.products FOR SELECT USING (true);
CREATE POLICY "Public hubs viewable by all" ON public.hubs FOR SELECT USING (true);
CREATE POLICY "Public batches viewable by all" ON public.batches FOR SELECT USING (true);
CREATE POLICY "Public reviews viewable by all" ON public.reviews FOR SELECT USING (true);
CREATE POLICY "Public can insert orders" ON public.orders FOR INSERT WITH CHECK (true);
CREATE POLICY "Public can view own orders" ON public.orders FOR SELECT USING (true);
CREATE POLICY "Public can submit verified reviews" ON public.reviews FOR INSERT WITH CHECK (true);
CREATE POLICY "Staff can insert batches" ON public.batches FOR INSERT WITH CHECK (true);
CREATE POLICY "Staff can update batches" ON public.batches FOR UPDATE USING (true);

INSERT INTO public.hubs (id, name, address, temp, status) VALUES
  ('dhanmondi', 'Dhanmondi Hub #04', 'Road 27, Dhanmondi, Dhaka 1209', '4.2°C', 'Active'),
  ('gulshan', 'Gulshan-2 Avenue Hub', 'Avenue Center, Gulshan-2, Dhaka 1212', '3.8°C', 'Active')
ON CONFLICT (id) DO NOTHING;
`;
                        handleCopy(sql, 'Full SQL Schema Script');
                      }}
                      className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded text-[10px] font-bold cursor-pointer transition-colors flex items-center gap-1 shadow-2xs"
                    >
                      <Copy className="w-3 h-3" />
                      <span>Copy SQL Script</span>
                    </button>
                  </div>
                  <ol className="list-decimal list-inside space-y-1 text-slate-400 text-[11px] leading-relaxed">
                    <li>Create a free project at <strong className="text-white">supabase.com</strong>.</li>
                    <li>Click <strong className="text-emerald-400">Copy SQL Script</strong> button above, open Supabase&apos;s <strong className="text-white">SQL Editor</strong>, paste and hit <strong className="text-emerald-400">Run</strong>.</li>
                    <li>Go to <strong className="text-white">Project Settings &rarr; API</strong>, copy your <strong className="text-white">Project URL</strong> and <strong className="text-white">anon public key</strong>.</li>
                  </ol>
                </div>
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1 font-mono text-[11px] text-slate-300">
                  <div className="text-slate-400 text-[10px] uppercase font-bold">Client Environment Variables:</div>
                  <div className="text-emerald-400">VITE_SUPABASE_URL=https://xyzcompany.supabase.co</div>
                  <div className="text-emerald-400">VITE_SUPABASE_ANON_KEY=eyJh...</div>
                </div>
                <div className="pt-2 flex justify-end">
                  <button
                    type="button"
                    onClick={() => setActiveModal(null)}
                    className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs cursor-pointer transition-colors"
                  >
                    Got It
                  </button>
                </div>
              </div>
            )}

            {/* Modal: FEFO Audit Certificate */}
            {activeModal === 'fefo' && (
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white tracking-tight">
                  FEFO Freshness Audit & Cold-Chain Protocol
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Every perishable SKU at Bengal Fresh is barcoded upon entry into our Dhaka cold vaults. Our algorithms enforce strict First-Expired, First-Out (FEFO) automated routing:
                </p>
                <div className="space-y-2 bg-slate-950 p-3.5 rounded-xl border border-slate-800 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Vault Temperature Standard:</span>
                    <span className="font-mono text-emerald-400 font-bold">2.0°C - 4.2°C (Logged every 10s)</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Insulated Transit Tolerance:</span>
                    <span className="font-mono text-emerald-400 font-bold">Max 6.5°C up to 120 mins</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Clearance Trigger:</span>
                    <span className="font-mono text-amber-400 font-bold">35% off when &lt; 7 days remaining</span>
                  </div>
                </div>
                <div className="pt-2 flex justify-end">
                  <button
                    type="button"
                    onClick={() => {
                      setActiveModal(null);
                      showToast('Audit Verified', 'All cold chain logs verified with Dhanmondi Vault #04.', 'success');
                    }}
                    className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs cursor-pointer transition-colors"
                  >
                    Acknowledged
                  </button>
                </div>
              </div>
            )}

            {/* Modal: Dhaka 12-Zone Delivery Map */}
            {activeModal === 'hubs' && (
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-sky-500/10 text-sky-400 flex items-center justify-center border border-sky-500/30">
                  <MapPin className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white tracking-tight">
                  Dhaka Cold-Dispatch Hub Network
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Select your nearest dispatch vault to prioritize local stock and fastest delivery times:
                </p>
                <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                  {DHAKA_HUBS.map((hub) => (
                    <button
                      key={hub.id}
                      type="button"
                      onClick={() => {
                        setSelectedHub(hub.name);
                        setActiveModal(null);
                        showToast('Hub Updated', `Switched active dispatch hub to ${hub.name}`, 'success');
                      }}
                      className={`w-full text-left p-2.5 rounded-xl text-xs transition-all flex items-center justify-between border cursor-pointer ${
                        selectedHub === hub.name
                          ? 'bg-emerald-950/60 text-white border-emerald-500/50 font-semibold'
                          : 'bg-slate-950/60 text-slate-300 border-slate-800 hover:bg-slate-850 hover:text-white'
                      }`}
                    >
                      <div>
                        <div className="font-semibold text-white">{hub.name}</div>
                        <div className="text-[11px] text-slate-400">{hub.address}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-mono text-emerald-400 text-[11px]">{hub.temp}</div>
                        <div className="text-[10px] text-slate-500 font-medium">Active Fleet</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Modal: BSTI Quality Certificate */}
            {activeModal === 'bsti' && (
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-violet-500/10 text-violet-400 flex items-center justify-center border border-violet-500/30">
                  <Award className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white tracking-tight">
                  BSTI & BFSA Compliance Certifications
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Bengal Commerce strictly adheres to the Bangladesh Standards and Testing Institution (BSTI) BDS standards for pasteurized and UHT milk, edible oils, spices, and packaged food products.
                </p>
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1.5 text-xs text-slate-300">
                  <div className="flex justify-between">
                    <span className="text-slate-400">BSTI License No:</span>
                    <span className="font-mono font-semibold text-white">BSTI/CM/DHK/2024-8841</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">BFSA Registration:</span>
                    <span className="font-mono font-semibold text-white">BFSA-DNCC-R-0994</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Cold Vault Quality Inspection:</span>
                    <span className="text-emerald-400 font-medium">Passed · Weekly Microbial Test</span>
                  </div>
                </div>
                <div className="pt-2 flex justify-end">
                  <button
                    type="button"
                    onClick={() => setActiveModal(null)}
                    className="px-4 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-bold text-xs cursor-pointer transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            )}

            {/* Modal: FAQ & Return Policy */}
            {activeModal === 'faq' && (
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center border border-amber-500/30">
                  <HelpCircle className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white tracking-tight">
                  Returns, Swap & Freshness Policy
                </h3>
                <div className="space-y-2.5 text-xs text-slate-300 max-h-60 overflow-y-auto pr-1">
                  <div className="p-2.5 bg-slate-950 rounded-xl border border-slate-800">
                    <h5 className="font-bold text-white text-xs">What if a milk or meat item is warm on arrival?</h5>
                    <p className="text-slate-400 mt-1 text-[11px] leading-relaxed">
                      Reject the delivery right at your door with our rider, or contact 09612-000000 within 24 hours. We offer immediate replacement or a 100% refund to your original payment method.
                    </p>
                  </div>
                  <div className="p-2.5 bg-slate-950 rounded-xl border border-slate-800">
                    <h5 className="font-bold text-white text-xs">How fast does Dhaka delivery take?</h5>
                    <p className="text-slate-400 mt-1 text-[11px] leading-relaxed">
                      Our dispatch target is under 120 minutes. Dhanmondi and Gulshan express orders routinely arrive within 35 to 45 minutes.
                    </p>
                  </div>
                  <div className="p-2.5 bg-slate-950 rounded-xl border border-slate-800">
                    <h5 className="font-bold text-white text-xs">What payment methods are supported?</h5>
                    <p className="text-slate-400 mt-1 text-[11px] leading-relaxed">
                      We support bKash, Nagad, Rocket, Upay, Visa, MasterCard, AMEX, and Cash on Delivery (COD) across all Dhaka delivery zones.
                    </p>
                  </div>
                </div>
                <div className="pt-2 flex justify-end">
                  <button
                    type="button"
                    onClick={() => setActiveModal(null)}
                    className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs cursor-pointer transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};
