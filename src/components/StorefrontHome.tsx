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
    <div className="min-h-screen bg-neutral-50/70 pb-16">
      {/* 1. High-Conversion Professional Retail Hero */}
      <div className="max-w-7xl mx-auto px-4 pt-6 pb-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Main Hero Card (8 cols) */}
          <div className="lg:col-span-8 bg-gradient-to-br from-emerald-950 via-emerald-900 to-neutral-900 text-white rounded-2xl p-6 sm:p-10 relative overflow-hidden shadow-sm flex flex-col justify-between">
            <div className="space-y-4 relative z-10 max-w-xl">
              <div className="inline-flex items-center gap-2 bg-emerald-500/20 border border-emerald-400/30 px-3 py-1 rounded-full text-xs font-semibold text-emerald-200">
                <span>Express Dispatch Active: 2-Hour Dhaka Delivery</span>
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white leading-tight">
                {language === 'EN' ? (
                  <>
                    Fresh Groceries You Can Trace. <br />
                    <span className="text-emerald-300">FEFO Cold-Chain Certified.</span>
                  </>
                ) : (
                  <>
                    খাঁটি খাদ্যপণ্য সরাসরি খামার থেকে। <br />
                    <span className="text-emerald-300">FEFO কোল্ড-চেইন সার্টিফাইড।</span>
                  </>
                )}
              </h1>
              <p className="text-xs sm:text-sm text-neutral-200 leading-relaxed">
                {language === 'EN'
                  ? 'Bangladesh\'s first digitally audited grocery network. Every milk carton, mustard oil bottle, and fresh egg batch is tracked from cooperative farms to your kitchen with verifiable expiry standards.'
                  : 'বাংলাদেশের প্রথম ডিজিটালি অডিটেড গ্রোসারি নেটওয়ার্ক। সিরাজগঞ্জ ও বগুড়ার খামার থেকে সরাসরি আপনার রান্নাঘরে সর্বোচ্চ সতেজতায় পৌঁছে দেওয়া হয়।'}
              </p>
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setCurrentScreen('product-detail')}
                  className="px-5 py-2.5 bg-white text-neutral-900 font-bold rounded-xl text-xs sm:text-sm shadow-xs hover:bg-emerald-50 transition-all flex items-center gap-2 cursor-pointer active:scale-98"
                >
                  <ShoppingBag className="w-4 h-4 text-emerald-700" />
                  <span>Shop Featured Milk (৳ 95)</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setCurrentScreen('retail-pos')}
                  className="px-4 py-2.5 bg-neutral-800/90 hover:bg-neutral-800 text-neutral-100 font-medium rounded-xl text-xs sm:text-sm border border-neutral-700 transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Layers className="w-4 h-4 text-emerald-400" />
                  <span>Open Staff POS Terminal</span>
                </button>
              </div>
            </div>

            {/* Hero Trust Badges Row */}
            <div className="grid grid-cols-3 gap-3 pt-8 border-t border-emerald-700/50 mt-8 relative z-10 text-[11px] text-neutral-300">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>100% BSTI BDS-CAC Certified</span>
              </div>
              <div className="flex items-center gap-2">
                <Thermometer className="w-4 h-4 text-sky-300 shrink-0" />
                <span>4.2°C Constant Cold Chain</span>
              </div>
              <div className="flex items-center gap-2">
                <RotateCcw className="w-4 h-4 text-amber-300 shrink-0" />
                <span>24-Hour Instant Swap Policy</span>
              </div>
            </div>
          </div>

          {/* Right Highlight Bento Cards (4 cols) */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            {/* Spotlight FEFO Deal Card */}
            <div className="bg-white rounded-2xl p-5 border border-neutral-200 shadow-xs flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    Spotlight FEFO Batch
                  </span>
                  <span className="text-[11px] text-neutral-500 font-medium">
                    Vault: <strong className="text-emerald-700">4.2°C</strong>
                  </span>
                </div>
                <div className="flex items-center gap-3.5 mt-3">
                  <img
                    src="/src/assets/images/bengal_milk_carton_1792138091407.jpg"
                    alt="Pran UHT Milk"
                    referrerPolicy="no-referrer"
                    className="w-16 h-16 object-cover rounded-xl border border-neutral-200 bg-neutral-50 shrink-0"
                  />
                  <div>
                    <h3 className="text-xs sm:text-sm font-bold text-neutral-900 leading-tight">
                      Pran UHT Full Cream Milk 1L
                    </h3>
                    <p className="text-[11px] text-neutral-500 mt-0.5 font-mono">Batch: BNG-2024-089</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-sm font-bold text-emerald-700">৳ 95.00</span>
                      <span className="text-xs text-neutral-400 line-through">৳ 120.00</span>
                      <span className="text-[10px] font-bold text-rose-600 bg-rose-50 px-1.5 rounded">21% OFF</span>
                    </div>
                  </div>
                </div>
                <div className="bg-neutral-50 rounded-xl p-2.5 mt-3 text-[11px] space-y-1 border border-neutral-100">
                  <div className="flex justify-between text-neutral-600">
                    <span>Expiry Horizon:</span>
                    <span className="font-semibold text-neutral-900">184 Days Safe (98%)</span>
                  </div>
                  <div className="w-full bg-neutral-200 rounded-full h-1.5 overflow-hidden">
                    <div className="bg-emerald-500 h-full rounded-full w-[98%]" />
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
                  className="flex-1 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs rounded-xl transition-colors text-center cursor-pointer"
                >
                  + Add to Basket
                </button>
                <button
                  type="button"
                  onClick={() => setCurrentScreen('product-detail')}
                  className="px-3 py-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 font-medium text-xs rounded-xl transition-colors cursor-pointer"
                  title="Inspect Batch"
                >
                  Inspect
                </button>
              </div>
            </div>

            {/* Quick Promo: Dhanmondi Express Dispatch */}
            <div className="bg-amber-50/80 rounded-2xl p-4 border border-amber-200 text-amber-950 flex items-center justify-between gap-3">
              <div className="space-y-0.5">
                <div className="flex items-center gap-1.5 text-xs font-bold text-amber-900">
                  <Truck className="w-3.5 h-3.5 text-amber-700" />
                  <span>2-Hour Dhaka Express</span>
                </div>
                <p className="text-[11px] text-amber-800">
                  Order by 4:30 PM for guaranteed same-day delivery in {selectedHub.replace(' Hub #04', '')}, Gulshan & Mirpur.
                </p>
              </div>
              <span className="text-[10px] font-bold bg-amber-200/90 text-amber-950 px-2 py-1 rounded-md shrink-0">
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
            <h2 className="text-base sm:text-lg font-bold text-neutral-900">
              {language === 'EN' ? 'Explore Grocery Categories' : 'গ্রোসারি ক্যাটাগরি'}
            </h2>
            <p className="text-xs text-neutral-500">
              {language === 'EN' ? 'Fresh daily essentials directly dispatched from local cold vaults' : 'লোকাল কোল্ড-ভল্ট থেকে সরাসরি ডেলিভারি'}
            </p>
          </div>
          <span className="text-xs font-semibold text-emerald-700 hidden sm:inline">
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
                  ? 'bg-neutral-900 text-white shadow-xs font-semibold'
                  : 'bg-white text-neutral-700 hover:bg-neutral-100 border border-neutral-200'
              }`}
            >
              <span>{language === 'EN' ? cat.name : cat.nameBn}</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                  selectedCategory === cat.id ? 'bg-neutral-700 text-neutral-200' : 'bg-neutral-100 text-neutral-500'
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
        <div className="bg-white rounded-2xl border border-neutral-200 p-5 sm:p-6 shadow-xs">
          {/* Flash Deals Header with Real Countdown Clock */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-neutral-100">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center font-bold">
                <Zap className="w-5 h-5 fill-rose-500 text-rose-500" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-bold text-neutral-900">
                    {language === 'EN' ? "Today's Fresh Deals & FEFO Clearance" : 'আজকের ফ্রেশ ডিল ও FEFO ক্লিয়ারেন্স'}
                  </h3>
                  <span className="bg-rose-100 text-rose-700 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                    Save up to 25%
                  </span>
                </div>
                <p className="text-xs text-neutral-500">
                  Inspected batch codes with guaranteed shelf-life & double loyalty points
                </p>
              </div>
            </div>

            {/* Countdown Badge */}
            <div className="flex items-center gap-2 self-start sm:self-auto bg-neutral-100/80 px-3 py-1.5 rounded-xl border border-neutral-200">
              <Clock className="w-3.5 h-3.5 text-neutral-600" />
              <span className="text-xs text-neutral-600 font-medium">Deals refresh in:</span>
              <div className="font-mono font-bold text-xs text-neutral-900 flex items-center gap-1">
                <span className="bg-neutral-900 text-white px-1.5 py-0.5 rounded text-[11px]">
                  {String(timeLeft.hours).padStart(2, '0')}h
                </span>
                <span>:</span>
                <span className="bg-neutral-900 text-white px-1.5 py-0.5 rounded text-[11px]">
                  {String(timeLeft.minutes).padStart(2, '0')}m
                </span>
                <span>:</span>
                <span className="bg-neutral-900 text-white px-1.5 py-0.5 rounded text-[11px]">
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
                  className="group bg-white rounded-xl border border-neutral-200/90 hover:border-emerald-500/50 hover:shadow-md transition-all duration-200 flex flex-col justify-between overflow-hidden relative"
                >
                  {/* Image & Badges Container */}
                  <div className="relative bg-neutral-50/70 p-4 flex items-center justify-center overflow-hidden">
                    {/* Discount & FEFO Badges */}
                    <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 z-10">
                      <span className="bg-neutral-900 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-2xs">
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
                      className="absolute top-2.5 right-2.5 p-1.5 rounded-lg bg-white/90 hover:bg-white text-neutral-400 hover:text-rose-500 shadow-2xs transition-colors z-10 cursor-pointer"
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
                      <div className="text-[11px] text-neutral-500 font-medium">{product.brand}</div>
                      <h4
                        onClick={() => setCurrentScreen('product-detail')}
                        className="text-xs sm:text-sm font-semibold text-neutral-900 hover:text-emerald-700 transition-colors cursor-pointer line-clamp-2 mt-0.5 leading-snug"
                      >
                        {language === 'EN' ? product.name : product.nameBn || product.name}
                      </h4>
                      {language === 'EN' && product.nameBn && (
                        <p className="text-[11px] text-neutral-400 truncate mt-0.5">{product.nameBn}</p>
                      )}
                      <div className="text-[11px] text-neutral-500 mt-1 font-medium">{product.weight}</div>
                    </div>

                    {/* Price & Rating */}
                    <div>
                      <div className="flex items-center justify-between text-xs">
                        <div className="flex items-baseline gap-1.5">
                          <span className="text-base font-bold text-neutral-900">৳ {product.price.toFixed(2)}</span>
                          <span className="text-xs text-neutral-400 line-through">৳ {product.oldPrice.toFixed(2)}</span>
                        </div>
                        <span className="text-[11px] font-semibold text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded">
                          ★ {product.rating} ({product.reviews})
                        </span>
                      </div>

                      {/* Interactive Cart Action */}
                      <div className="pt-3">
                        {cartItem ? (
                          /* Inline Quantity Stepper */
                          <div className="flex items-center justify-between bg-emerald-50 border border-emerald-300 rounded-xl px-2 py-1 text-emerald-950 font-bold text-xs">
                            <button
                              type="button"
                              onClick={() => updateCartQuantity(cartItem.id, -1)}
                              className="p-1 hover:bg-emerald-200/60 rounded text-emerald-800 transition-colors cursor-pointer"
                              title="Decrease quantity"
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <span className="font-semibold">{cartItem.quantity} in basket</span>
                            <button
                              type="button"
                              onClick={() => updateCartQuantity(cartItem.id, 1)}
                              className="p-1 hover:bg-emerald-200/60 rounded text-emerald-800 transition-colors cursor-pointer"
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
                            className="w-full py-2 bg-neutral-900 hover:bg-emerald-700 text-white text-xs font-semibold rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs active:scale-98"
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
        <div className="bg-white rounded-2xl border border-neutral-200 p-5 sm:p-6 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-neutral-100">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-neutral-900">
                  Live Dispatch Tracking · Order #{orderTracking.orderId}
                </h3>
                <span className="bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] font-semibold px-2 py-0.5 rounded-full">
                  In Transit
                </span>
              </div>
              <p className="text-xs text-neutral-500 mt-0.5">
                Pathao Cold Fleet assigned · {orderTracking.estimatedDelivery}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setShowRiderMap(!showRiderMap)}
                className="px-3 py-1.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 text-xs font-medium rounded-lg transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <MapPin className="w-3.5 h-3.5 text-emerald-600" />
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
                      ? 'bg-emerald-50 border-emerald-400 shadow-xs'
                      : isDone
                      ? 'bg-neutral-50 border-neutral-200'
                      : 'bg-white border-neutral-100 opacity-60'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-bold uppercase text-neutral-400">Step {step.id}</span>
                    {isDone ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    ) : isCurrent ? (
                      <span className="text-xs font-bold text-emerald-600">Active</span>
                    ) : null}
                  </div>
                  <div className="text-xs font-semibold text-neutral-900">{step.label}</div>
                  <div className="text-[11px] text-neutral-500 mt-0.5 leading-tight">{step.subtext}</div>
                </div>
              );
            })}
          </div>

          {/* Expanded Rider Map Modal */}
          {showRiderMap && (
            <div className="bg-neutral-900 text-white rounded-xl p-4 sm:p-5 text-xs space-y-3 mt-4">
              <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-emerald-500 text-neutral-950 font-bold flex items-center justify-center">
                    SH
                  </div>
                  <div>
                    <div className="font-semibold text-neutral-100">{orderTracking.riderName}</div>
                    <div className="text-[11px] text-neutral-400">Pathao Insulated Cold-Chain Rider</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <a
                    href={`tel:${orderTracking.riderPhone}`}
                    className="flex items-center gap-1 bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1.5 rounded-lg font-medium transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>Call Rider</span>
                  </a>
                </div>
              </div>

              {/* Visual Simulated Route */}
              <div className="relative h-28 bg-neutral-800 rounded-lg p-3 flex flex-col justify-between overflow-hidden border border-neutral-700">
                <div className="flex items-center justify-between text-neutral-300">
                  <span>Dispatch: {selectedHub}</span>
                  <span className="text-emerald-400 font-bold">1.2 km away · ETA 14 mins</span>
                  <span>Destination: Road 7/A, Dhanmondi</span>
                </div>
                <div className="relative flex items-center">
                  <div className="h-1 bg-neutral-700 w-full rounded-full" />
                  <div className="absolute left-0 h-1 bg-emerald-500 w-3/4 rounded-full" />
                  <div className="absolute left-3/4 -translate-x-1/2 p-1 bg-emerald-500 text-neutral-950 rounded-full shadow-md">
                    <Truck className="w-3.5 h-3.5" />
                  </div>
                </div>
                <div className="text-[11px] text-neutral-400 flex items-center gap-1.5">
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
        <div className="bg-white rounded-2xl border border-neutral-200 p-6 shadow-xs">
          <div className="text-center max-w-2xl mx-auto space-y-1.5 mb-8">
            <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
              The Bengal Fresh Standard
            </span>
            <h3 className="text-lg sm:text-xl font-bold text-neutral-900">
              How FEFO Digital Auditing Protects Your Family
            </h3>
            <p className="text-xs text-neutral-500">
              Unlike traditional superstores that push near-expiry stock manually, our algorithmically managed First-Expired, First-Out routing ensures peak safety.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="space-y-2 p-4 rounded-xl bg-neutral-50/70 border border-neutral-100">
              <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 font-bold flex items-center justify-center text-sm">
                01
              </div>
              <h4 className="font-bold text-neutral-900 text-xs sm:text-sm">Direct Cooperative Sourcing</h4>
              <p className="text-xs text-neutral-500 leading-relaxed">
                Raw milk & staples collected from certified farmers in Sirajganj & Pabna within 4 hours of production.
              </p>
            </div>

            <div className="space-y-2 p-4 rounded-xl bg-neutral-50/70 border border-neutral-100">
              <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 font-bold flex items-center justify-center text-sm">
                02
              </div>
              <h4 className="font-bold text-neutral-900 text-xs sm:text-sm">Laser Batch Verification</h4>
              <p className="text-xs text-neutral-500 leading-relaxed">
                BSTI compliance stamps & laser barcodes registered into Dhaka cold vaults with digital expiry countdowns.
              </p>
            </div>

            <div className="space-y-2 p-4 rounded-xl bg-neutral-50/70 border border-neutral-100">
              <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 font-bold flex items-center justify-center text-sm">
                03
              </div>
              <h4 className="font-bold text-neutral-900 text-xs sm:text-sm">Automated Price Clearance</h4>
              <p className="text-xs text-neutral-500 leading-relaxed">
                Items entering under 30-day thresholds automatically discount 25% to eliminate food waste while remaining 100% safe.
              </p>
            </div>

            <div className="space-y-2 p-4 rounded-xl bg-neutral-50/70 border border-neutral-100">
              <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 font-bold flex items-center justify-center text-sm">
                04
              </div>
              <h4 className="font-bold text-neutral-900 text-xs sm:text-sm">Thermal Bag Delivery</h4>
              <p className="text-xs text-neutral-500 leading-relaxed">
                Dispatched in chilled thermal carrier bags ensuring milk and fresh eggs arrive cool to touch at your doorstep.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 6. Member Loyalty & Referral Card */}
      <div className="max-w-7xl mx-auto px-4 pt-6">
        <div className="bg-gradient-to-r from-amber-500 to-amber-600 rounded-2xl p-6 sm:p-8 text-neutral-950 shadow-xs flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl text-center md:text-left">
            <div className="inline-flex items-center gap-1.5 bg-neutral-950 text-amber-300 px-3 py-1 rounded-full text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Bengal Club Rewards</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-neutral-950 tracking-tight">
              Earn 5% Cash Points with Every Grocery Order
            </h3>
            <p className="text-xs sm:text-sm text-neutral-900 font-medium">
              You currently have <strong className="font-black text-neutral-950">{userPoints.toLocaleString()} Club Points</strong> (Equivalent to ৳ {(userPoints / 10).toFixed(0)} checkout credit). Share your Dhaka code with neighbors to earn ৳ 200 bonus credit!
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
            <div className="bg-white/95 border border-amber-300 rounded-xl px-4 py-2.5 text-xs font-mono font-bold text-neutral-900 flex items-center gap-3 shadow-xs w-full sm:w-auto justify-between">
              <span>BENGAL-DHAKA-2025</span>
              <button
                type="button"
                onClick={handleCopyReferral}
                className="text-emerald-700 hover:text-emerald-900 font-sans text-xs font-bold transition-colors cursor-pointer"
              >
                {copiedCode ? 'Copied!' : 'Copy'}
              </button>
            </div>
            <button
              type="button"
              onClick={() => {
                showToast('Reward Redeemed', '৳ 50 Voucher applied to your current checkout session!', 'success');
              }}
              className="w-full sm:w-auto px-5 py-2.5 bg-neutral-950 hover:bg-neutral-900 text-white font-bold text-xs rounded-xl transition-colors cursor-pointer shadow-xs whitespace-nowrap"
            >
              Redeem ৳ 50 Discount Voucher
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
