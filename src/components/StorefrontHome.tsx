import React, { useState, useEffect } from 'react';
import { useApp } from '@/context/AppContext';
import {
  Sparkles,
  Clock,
  CheckCircle2,
  Truck,
  ArrowRight,
  Heart,
  ShoppingBag,
  ShieldCheck,
  Zap,
  MapPin,
  Thermometer,
  RotateCcw,
  Plus,
  Minus,
  Phone,
  Layers,
} from 'lucide-react';
import {
  FLASH_PRODUCTS,
  INITIAL_ORDER_TRACKING,
  CATEGORIES,
} from '@/data/mockData';

export const StorefrontHome: React.FC = () => {
  const {
    setCurrentScreen,
    addToCart,
    cart,
    updateCartQuantity,
    wishlist,
    toggleWishlist,
    userPoints,
    showToast,
    selectedHub,
    language,
  } = useApp();

  const [selectedCategory, setSelectedCategory] = useState('all');
  const [timeLeft, setTimeLeft] = useState({ hours: 4, minutes: 18, seconds: 42 });
  const [orderTracking, setOrderTracking] = useState(INITIAL_ORDER_TRACKING);
  const [showRiderMap, setShowRiderMap] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);

  // Live countdown timer for daily flash deals
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 4, minutes: 30, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleCopyReferral = () => {
    navigator.clipboard?.writeText('BENGAL-DHAKA-2025');
    setCopiedCode(true);
    showToast('Referral Code Copied!', 'Code BENGAL-DHAKA-2025 copied. Share with Dhaka friends to both earn ৳ 200!', 'success');
    setTimeout(() => setCopiedCode(false), 3000);
  };

  const handleStepClick = (stepId: number) => {
    setOrderTracking((prev) => ({
      ...prev,
      currentStep: stepId,
      steps: prev.steps.map((s) => ({
        ...s,
        status: s.id < stepId ? 'completed' : s.id === stepId ? 'current' : 'pending',
      })),
    }));
    showToast('Order Status Inspected', `Viewing dispatch checkpoint ${stepId}.`, 'info');
  };

  const filteredProducts =
    selectedCategory === 'all'
      ? FLASH_PRODUCTS
      : FLASH_PRODUCTS.filter((p) => p.categorySlug === selectedCategory);

  const getCartItem = (productId: string) => {
    return cart.find((item) => item.productId === productId);
  };

  return (
    <div className="min-h-screen bg-[#f5f8fc] pb-16">
      {/* 1. High-Conversion Professional Retail Hero (Deep Sapphire Oceanic Blue & Fresh Emerald) */}
      <div className="max-w-7xl mx-auto px-4 pt-6 pb-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Main Hero Card (8 cols) */}
          <div className="lg:col-span-8 bg-gradient-to-br from-[#06152d] via-[#0b2447] to-[#073635] text-white rounded-2xl p-6 sm:p-10 relative overflow-hidden shadow-lg shadow-blue-950/10 flex flex-col justify-between border border-blue-900/50">
            {/* Ambient luminous glow orbs */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/15 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />

            <div className="space-y-4 relative z-10 max-w-xl">
              <div className="inline-flex items-center gap-2 bg-blue-500/20 border border-sky-400/30 px-3 py-1 rounded-full text-xs font-semibold text-sky-200 backdrop-blur-xs">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Express Dispatch Active: 2-Hour Dhaka Delivery</span>
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white leading-tight">
                {language === 'EN' ? (
                  <>
                    Fresh Groceries You Can Trace. <br />
                    <span className="bg-gradient-to-r from-sky-300 via-blue-200 to-emerald-400 bg-clip-text text-transparent">
                      FEFO Cold-Chain Certified.
                    </span>
                  </>
                ) : (
                  <>
                    খাঁটি খাদ্যপণ্য সরাসরি খামার থেকে। <br />
                    <span className="bg-gradient-to-r from-sky-300 via-blue-200 to-emerald-400 bg-clip-text text-transparent">
                      FEFO কোল্ড-চেইন সার্টিফাইড।
                    </span>
                  </>
                )}
              </h1>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-normal">
                {language === 'EN'
                  ? "Bangladesh's first digitally audited grocery network. Every milk carton, mustard oil bottle, and fresh egg batch is tracked from cooperative farms to your kitchen with verifiable expiry standards."
                  : 'বাংলাদেশের প্রথম ডিজিটালি অডিটেড গ্রোসারি নেটওয়ার্ক। সিরাজগঞ্জ ও বগুড়ার খামার থেকে সরাসরি আপনার রান্নাঘরে সর্বোচ্চ সতেজতায় পৌঁছে দেওয়া হয়।'}
              </p>
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setCurrentScreen('product-detail')}
                  className="px-5 py-2.5 bg-gradient-to-r from-blue-600 via-blue-700 to-emerald-600 hover:from-blue-500 hover:to-emerald-500 text-white font-bold rounded-xl text-xs sm:text-sm shadow-md shadow-blue-600/30 transition-all flex items-center gap-2 cursor-pointer active:scale-98"
                >
                  <ShoppingBag className="w-4 h-4 text-white" />
                  <span>Shop Featured Milk (৳ 95)</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setCurrentScreen('retail-pos')}
                  className="px-4 py-2.5 bg-[#0e2142]/90 hover:bg-[#152e5c] text-sky-100 font-medium rounded-xl text-xs sm:text-sm border border-blue-800/80 transition-all flex items-center gap-2 cursor-pointer backdrop-blur-xs"
                >
                  <Layers className="w-4 h-4 text-emerald-400" />
                  <span>Open Staff POS Terminal</span>
                </button>
              </div>
            </div>

            {/* Hero Trust Badges Row */}
            <div className="grid grid-cols-3 gap-3 pt-8 border-t border-blue-900/60 mt-8 relative z-10 text-[11px] text-slate-300">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>100% BSTI Certified</span>
              </div>
              <div className="flex items-center gap-2">
                <Thermometer className="w-4 h-4 text-sky-300 shrink-0" />
                <span>4.2°C Constant Cold Chain</span>
              </div>
              <div className="flex items-center gap-2">
                <RotateCcw className="w-4 h-4 text-teal-300 shrink-0" />
                <span>24-Hour Instant Swap</span>
              </div>
            </div>
          </div>

          {/* Right Highlight Bento Cards (4 cols) */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            {/* Spotlight FEFO Deal Card */}
            <div className="bg-white rounded-2xl p-5 border border-blue-100 shadow-sm flex-1 flex flex-col justify-between hover:border-blue-300 transition-colors">
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-blue-950 bg-blue-50 px-2.5 py-0.5 rounded border border-blue-200">
                    Spotlight FEFO Batch
                  </span>
                  <span className="text-[11px] text-slate-500 font-medium">
                    Vault: <strong className="text-emerald-700">4.2°C</strong>
                  </span>
                </div>
                <div className="flex items-center gap-3.5 mt-3">
                  <img
                    src="/src/assets/images/bengal_milk_carton_1792138091407.jpg"
                    alt="Pran UHT Milk"
                    referrerPolicy="no-referrer"
                    className="w-16 h-16 object-cover rounded-xl border border-blue-100 bg-slate-50 shrink-0"
                  />
                  <div>
                    <h3 className="text-xs sm:text-sm font-bold text-slate-900 leading-tight">
                      Pran UHT Full Cream Milk 1L
                    </h3>
                    <p className="text-[11px] text-slate-500 mt-0.5 font-mono">Batch: BNG-2024-089</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-sm font-bold text-blue-700">৳ 95.00</span>
                      <span className="text-xs text-slate-400 line-through">৳ 120.00</span>
                      <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-1.5 rounded border border-emerald-200">21% OFF</span>
                    </div>
                  </div>
                </div>
                <div className="bg-blue-50/50 rounded-xl p-2.5 mt-3 text-[11px] space-y-1 border border-blue-100/70">
                  <div className="flex justify-between text-slate-600">
                    <span>Expiry Horizon:</span>
                    <span className="font-semibold text-slate-900">184 Days Safe (98%)</span>
                  </div>
                  <div className="w-full bg-blue-100 rounded-full h-1.5 overflow-hidden">
                    <div className="bg-gradient-to-r from-blue-600 to-emerald-500 h-full rounded-full w-[98%]" />
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 mt-4 pt-2">
                <button
                  type="button"
                  onClick={() =>
                    addToCart({
                      id: 'pran-milk-1l',
                      name: 'Pran UHT Full Cream Milk 1L',
                      price: 95.0,
                      imageUrl: '/src/assets/images/bengal_milk_carton_1792138091407.jpg',
                      variant: '1L Tetrapak',
                    })
                  }
                  className="flex-1 py-2 bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700 text-white font-semibold text-xs rounded-xl transition-all text-center cursor-pointer shadow-sm shadow-blue-500/20"
                >
                  + Add to Basket
                </button>
                <button
                  type="button"
                  onClick={() => setCurrentScreen('product-detail')}
                  className="px-3 py-2 bg-blue-50 hover:bg-blue-100 text-blue-900 font-semibold text-xs rounded-xl transition-colors cursor-pointer border border-blue-200"
                  title="Inspect Batch"
                >
                  Inspect
                </button>
              </div>
            </div>

            {/* Quick Promo: Express Dispatch */}
            <div className="bg-gradient-to-r from-blue-50/90 to-sky-50/90 rounded-2xl p-4 border border-blue-200 text-blue-950 flex items-center justify-between gap-3 shadow-xs">
              <div className="space-y-0.5">
                <div className="flex items-center gap-1.5 text-xs font-bold text-blue-950">
                  <Truck className="w-3.5 h-3.5 text-blue-600" />
                  <span>2-Hour Dhaka Express</span>
                </div>
                <p className="text-[11px] text-blue-900/80">
                  Order by 4:30 PM for guaranteed same-day delivery in {selectedHub.replace(' Hub #04', '')}, Gulshan & Mirpur.
                </p>
              </div>
              <span className="text-[10px] font-bold bg-blue-600 text-white px-2 py-1 rounded-md shrink-0 shadow-xs">
                ACTIVE
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Interactive Category Filter Rail */}
      <div className="max-w-7xl mx-auto px-4 pt-6 pb-2">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900">
              {language === 'EN' ? 'Explore Grocery Categories' : 'গ্রোসারি ক্যাটাগরি'}
            </h2>
            <p className="text-xs text-slate-500">
              {language === 'EN' ? 'Fresh daily essentials directly dispatched from local cold vaults' : 'লোকাল কোল্ড-ভল্ট থেকে সরাসরি ডেলিভারি'}
            </p>
          </div>
          <span className="text-xs font-semibold text-blue-700 hidden sm:inline bg-blue-50 px-2 py-1 rounded-md border border-blue-200">
            {FLASH_PRODUCTS.length} Items Available
          </span>
        </div>
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedCategory(cat.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium transition-all whitespace-nowrap cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-blue-600 text-white shadow-sm shadow-blue-600/30 font-semibold'
                  : 'bg-white text-slate-700 hover:bg-blue-50/60 hover:text-blue-700 border border-slate-200 hover:border-blue-300'
              }`}
            >
              <span>{language === 'EN' ? cat.name : cat.nameBn}</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                  selectedCategory === cat.id ? 'bg-blue-800 text-white' : 'bg-blue-50 text-blue-700'
                }`}
              >
                {cat.id === 'all' ? FLASH_PRODUCTS.length : cat.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* 3. Flash Deals & FEFO Clearance Section */}
      <div className="max-w-7xl mx-auto px-4 pt-4">
        <div className="bg-white rounded-2xl border border-blue-100/90 p-5 sm:p-6 shadow-sm">
          {/* Flash Deals Header with Real Countdown Clock */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-blue-50">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold shadow-md shadow-blue-500/25">
                <Zap className="w-5 h-5 fill-white text-white" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-bold text-slate-900">
                    {language === 'EN' ? "Today's Fresh Deals & FEFO Clearance" : 'আজকের ফ্রেশ ডিল ও FEFO ক্লিয়ারেন্স'}
                  </h3>
                  <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase border border-emerald-200">
                    Save up to 25%
                  </span>
                </div>
                <p className="text-xs text-slate-500">
                  Inspected batch codes with guaranteed shelf-life & double loyalty points
                </p>
              </div>
            </div>

            {/* Countdown Badge in Deep Sapphire Box */}
            <div className="flex items-center gap-2 self-start sm:self-auto bg-blue-50/80 px-3 py-1.5 rounded-xl border border-blue-200">
              <Clock className="w-3.5 h-3.5 text-blue-700" />
              <span className="text-xs text-blue-900 font-semibold">Deals refresh in:</span>
              <div className="font-mono font-bold text-xs text-slate-900 flex items-center gap-1">
                <span className="bg-[#09152b] text-sky-300 border border-blue-800 px-1.5 py-0.5 rounded text-[11px]">
                  {String(timeLeft.hours).padStart(2, '0')}h
                </span>
                <span>:</span>
                <span className="bg-[#09152b] text-sky-300 border border-blue-800 px-1.5 py-0.5 rounded text-[11px]">
                  {String(timeLeft.minutes).padStart(2, '0')}m
                </span>
                <span>:</span>
                <span className="bg-[#09152b] text-sky-300 border border-blue-800 px-1.5 py-0.5 rounded text-[11px]">
                  {String(timeLeft.seconds).padStart(2, '0')}s
                </span>
              </div>
            </div>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5 pt-6">
            {filteredProducts.map((product) => {
              const cartItem = getCartItem(product.id);
              const isWishlisted = wishlist.includes(product.id);

              return (
                <div
                  key={product.id}
                  className="group bg-white rounded-xl border border-slate-200/90 hover:border-blue-400 hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-200 flex flex-col justify-between overflow-hidden relative"
                >
                  {/* Image & Badges Container */}
                  <div className="relative bg-blue-50/30 p-4 flex items-center justify-center overflow-hidden">
                    {/* Discount & FEFO Badges */}
                    <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 z-10">
                      <span className="bg-[#09152b] text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-xs">
                        {product.discount}
                      </span>
                      <span className="bg-emerald-50 text-emerald-800 border border-emerald-200 text-[9px] font-semibold px-1.5 py-0.5 rounded">
                        {product.badgeText}
                      </span>
                    </div>

                    {/* Wishlist Button */}
                    <button
                      type="button"
                      onClick={() => toggleWishlist(product.id)}
                      className="absolute top-2.5 right-2.5 p-1.5 rounded-lg bg-white/90 hover:bg-white text-slate-400 hover:text-rose-500 shadow-xs transition-colors z-10 cursor-pointer"
                      title="Save to Wishlist"
                    >
                      <Heart className={`w-4 h-4 ${isWishlisted ? 'text-rose-500 fill-rose-500' : ''}`} />
                    </button>

                    {/* Product Image */}
                    <div
                      onClick={() => setCurrentScreen('product-detail')}
                      className="w-full h-44 flex items-center justify-center cursor-pointer"
                    >
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        referrerPolicy="no-referrer"
                        className="max-h-40 max-w-full object-contain group-hover:scale-105 transition-transform duration-200"
                        loading="lazy"
                      />
                    </div>
                  </div>

                  {/* Product Details */}
                  <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                    <div>
                      <div className="text-[11px] text-blue-700 font-semibold">{product.brand}</div>
                      <h4
                        onClick={() => setCurrentScreen('product-detail')}
                        className="text-xs sm:text-sm font-semibold text-slate-900 hover:text-blue-700 transition-colors cursor-pointer line-clamp-2 mt-0.5 leading-snug"
                      >
                        {language === 'EN' ? product.name : product.nameBn || product.name}
                      </h4>
                      {language === 'EN' && product.nameBn && (
                        <p className="text-[11px] text-slate-400 truncate mt-0.5">{product.nameBn}</p>
                      )}
                      <div className="text-[11px] text-slate-500 mt-1 font-medium">{product.weight}</div>
                    </div>

                    {/* Price & Rating */}
                    <div>
                      <div className="flex items-center justify-between text-xs">
                        <div className="flex items-baseline gap-1.5">
                          <span className="text-base font-bold text-slate-900">৳ {product.price.toFixed(2)}</span>
                          <span className="text-xs text-slate-400 line-through">৳ {product.oldPrice.toFixed(2)}</span>
                        </div>
                        <span className="text-[11px] font-semibold text-blue-900 bg-blue-50 px-1.5 py-0.5 rounded border border-blue-200">
                          ★ {product.rating} ({product.reviews})
                        </span>
                      </div>

                      {/* Interactive Cart Action */}
                      <div className="pt-3">
                        {cartItem ? (
                          /* Inline Quantity Stepper */
                          <div className="flex items-center justify-between bg-blue-50 border border-blue-300 rounded-xl px-2 py-1 text-blue-950 font-bold text-xs">
                            <button
                              type="button"
                              onClick={() => updateCartQuantity(cartItem.id, -1)}
                              className="p-1 hover:bg-blue-200/60 rounded text-blue-800 transition-colors cursor-pointer"
                              title="Decrease quantity"
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <span className="font-semibold">{cartItem.quantity} in basket</span>
                            <button
                              type="button"
                              onClick={() => updateCartQuantity(cartItem.id, 1)}
                              className="p-1 hover:bg-blue-200/60 rounded text-blue-800 transition-colors cursor-pointer"
                              title="Increase quantity"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ) : (
                          /* Standard Add Button */
                          <button
                            type="button"
                            onClick={() =>
                              addToCart({
                                id: product.id,
                                name: product.name,
                                price: product.price,
                                imageUrl: product.imageUrl,
                                variant: product.weight,
                              })
                            }
                            className="w-full py-2 bg-gradient-to-r from-blue-600 via-blue-700 to-emerald-600 hover:from-blue-700 hover:to-emerald-700 text-white text-xs font-semibold rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-sm shadow-blue-500/20 active:scale-98"
                          >
                            <ShoppingBag className="w-3.5 h-3.5" />
                            <span>Add to Basket</span>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 4. Active Dhaka Express Order Tracking Bar */}
      <div className="max-w-7xl mx-auto px-4 pt-6">
        <div className="bg-white rounded-2xl border border-blue-100 p-5 sm:p-6 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-blue-50">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-slate-900">
                  Live Dispatch Tracking · Order #{orderTracking.orderId}
                </h3>
                <span className="bg-blue-50 text-blue-800 border border-blue-200 text-[10px] font-semibold px-2.5 py-0.5 rounded-full">
                  In Transit
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Pathao Cold Fleet assigned · {orderTracking.estimatedDelivery}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setShowRiderMap(!showRiderMap)}
                className="px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-900 text-xs font-semibold rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 border border-blue-200"
              >
                <MapPin className="w-3.5 h-3.5 text-blue-600" />
                <span>{showRiderMap ? 'Hide Route Map' : 'View Live Route'}</span>
              </button>
            </div>
          </div>

          {/* Stepper Progress */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-2">
            {orderTracking.steps.map((step) => {
              const isDone = step.status === 'completed';
              const isCurrent = step.status === 'current';
              return (
                <div
                  key={step.id}
                  onClick={() => handleStepClick(step.id)}
                  className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                    isCurrent
                      ? 'bg-blue-50/90 border-blue-500 shadow-sm ring-1 ring-blue-500/20'
                      : isDone
                      ? 'bg-slate-50 border-slate-200'
                      : 'bg-white border-slate-100 opacity-60'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-bold uppercase text-slate-400">Step {step.id}</span>
                    {isDone ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    ) : isCurrent ? (
                      <span className="text-xs font-bold text-blue-600">Active</span>
                    ) : null}
                  </div>
                  <div className="text-xs font-semibold text-slate-900">{step.label}</div>
                  <div className="text-[11px] text-slate-500 mt-0.5 leading-tight">{step.subtext}</div>
                </div>
              );
            })}
          </div>

          {/* Expanded Rider Map Modal (Deep Sapphire Terminal Style) */}
          {showRiderMap && (
            <div className="bg-[#08152b] text-white rounded-xl p-4 sm:p-5 text-xs space-y-3 mt-4 border border-blue-900 shadow-md">
              <div className="flex items-center justify-between border-b border-blue-900/80 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center shadow-xs">
                    SH
                  </div>
                  <div>
                    <div className="font-semibold text-slate-100">{orderTracking.riderName}</div>
                    <div className="text-[11px] text-sky-200/80">Pathao Insulated Cold-Chain Rider</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <a
                    href={`tel:${orderTracking.riderPhone}`}
                    className="flex items-center gap-1 bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700 text-white px-3 py-1.5 rounded-lg font-medium transition-colors shadow-xs"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>Call Rider</span>
                  </a>
                </div>
              </div>

              {/* Visual Simulated Route */}
              <div className="relative h-28 bg-[#040c1a] rounded-lg p-3 flex flex-col justify-between overflow-hidden border border-blue-950">
                <div className="flex items-center justify-between text-slate-300">
                  <span>Dispatch: {selectedHub}</span>
                  <span className="text-sky-400 font-bold">1.2 km away · ETA 14 mins</span>
                  <span>Destination: Road 7/A, Dhanmondi</span>
                </div>
                <div className="relative flex items-center">
                  <div className="h-1 bg-blue-950 w-full rounded-full" />
                  <div className="absolute left-0 h-1 bg-gradient-to-r from-blue-500 via-sky-400 to-emerald-400 w-3/4 rounded-full" />
                  <div className="absolute left-3/4 -translate-x-1/2 p-1 bg-emerald-500 text-slate-950 rounded-full shadow-md">
                    <Truck className="w-3.5 h-3.5" />
                  </div>
                </div>
                <div className="text-[11px] text-sky-200/80 flex items-center gap-1.5">
                  <Thermometer className="w-3.5 h-3.5 text-sky-400" />
                  <span>Thermal Bag Sensor: 4.1°C (Within Freshness Target)</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 5. FEFO Quality Journey & Cold Chain Assurance */}
      <div className="max-w-7xl mx-auto px-4 pt-6">
        <div className="bg-white rounded-2xl border border-blue-100 p-6 shadow-sm">
          <div className="text-center max-w-2xl mx-auto space-y-1.5 mb-8">
            <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
              The Bengal Fresh Standard
            </span>
            <h3 className="text-lg sm:text-xl font-bold text-slate-900">
              How FEFO Digital Auditing Protects Your Family
            </h3>
            <p className="text-xs text-slate-500">
              Unlike traditional superstores that push near-expiry stock manually, our algorithmically managed First-Expired, First-Out routing ensures peak safety.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="space-y-2 p-4 rounded-xl bg-blue-50/40 border border-blue-100/90 hover:border-blue-300 transition-all">
              <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 font-bold flex items-center justify-center text-sm border border-blue-200">
                01
              </div>
              <h4 className="font-bold text-slate-900 text-xs sm:text-sm">Direct Cooperative Sourcing</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Raw milk & staples collected from certified farmers in Sirajganj & Pabna within 4 hours of production.
              </p>
            </div>

            <div className="space-y-2 p-4 rounded-xl bg-blue-50/40 border border-blue-100/90 hover:border-blue-300 transition-all">
              <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 font-bold flex items-center justify-center text-sm border border-emerald-200">
                02
              </div>
              <h4 className="font-bold text-slate-900 text-xs sm:text-sm">Laser Batch Verification</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                BSTI compliance stamps & laser barcodes registered into Dhaka cold vaults with digital expiry countdowns.
              </p>
            </div>

            <div className="space-y-2 p-4 rounded-xl bg-blue-50/40 border border-blue-100/90 hover:border-blue-300 transition-all">
              <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 font-bold flex items-center justify-center text-sm border border-blue-200">
                03
              </div>
              <h4 className="font-bold text-slate-900 text-xs sm:text-sm">Automated Price Clearance</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Items entering under 30-day thresholds automatically discount 25% to eliminate food waste while remaining 100% safe.
              </p>
            </div>

            <div className="space-y-2 p-4 rounded-xl bg-blue-50/40 border border-blue-100/90 hover:border-blue-300 transition-all">
              <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 font-bold flex items-center justify-center text-sm border border-emerald-200">
                04
              </div>
              <h4 className="font-bold text-slate-900 text-xs sm:text-sm">Thermal Bag Delivery</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Dispatched in chilled thermal carrier bags ensuring milk and fresh eggs arrive cool to touch at your doorstep.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 6. Member Loyalty & Referral Card */}
      <div className="max-w-7xl mx-auto px-4 pt-6">
        <div className="bg-gradient-to-r from-[#06152d] via-[#0b2447] to-[#073635] rounded-2xl p-6 sm:p-8 text-white shadow-lg shadow-blue-950/10 flex flex-col md:flex-row items-center justify-between gap-6 border border-blue-900/60">
          <div className="space-y-2 max-w-xl text-center md:text-left">
            <div className="inline-flex items-center gap-1.5 bg-blue-500/20 text-sky-200 border border-blue-400/30 px-3 py-1 rounded-full text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5 text-sky-400" />
              <span>Bengal Club Rewards</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Earn 5% Cash Points with Every Grocery Order
            </h3>
            <p className="text-xs sm:text-sm text-slate-200 font-medium">
              You currently have <strong className="font-black text-emerald-400">{userPoints.toLocaleString()} Club Points</strong> (Equivalent to ৳ {(userPoints / 10).toFixed(0)} checkout credit). Share your Dhaka code with neighbors to earn ৳ 200 bonus credit!
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
            <div className="bg-[#060f1e]/90 border border-blue-500/40 rounded-xl px-4 py-2.5 text-xs font-mono font-bold text-white flex items-center gap-3 shadow-xs w-full sm:w-auto justify-between">
              <span className="text-sky-300">BENGAL-DHAKA-2025</span>
              <button
                type="button"
                onClick={handleCopyReferral}
                className="text-emerald-400 hover:text-emerald-300 font-sans text-xs font-bold transition-colors cursor-pointer"
              >
                {copiedCode ? 'Copied!' : 'Copy'}
              </button>
            </div>
            <button
              type="button"
              onClick={() => {
                showToast('Reward Redeemed', '৳ 50 Voucher applied to your current checkout session!', 'success');
              }}
              className="w-full sm:w-auto px-5 py-2.5 bg-gradient-to-r from-blue-600 via-blue-700 to-emerald-600 hover:from-blue-500 hover:to-emerald-500 text-white font-bold text-xs rounded-xl transition-all cursor-pointer shadow-md shadow-blue-600/30 whitespace-nowrap"
            >
              Redeem ৳ 50 Discount Voucher
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
