import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import {
  Heart,
  Share2,
  ShieldCheck,
  Truck,
  CheckCircle2,
  Clock,
  Plus,
  Minus,
  ShoppingBag,
  Zap,
  RotateCcw,
  ChevronRight,
  ArrowLeft,
} from 'lucide-react';
import {
  PRAN_MILK_PRODUCT,
  BUNDLE_ITEMS,
  REVIEWS_LIST,
} from '@/data/mockData';
import { ReviewModal } from '@/components/ReviewModal';

export const ProductDetail: React.FC = () => {
  const {
    addToCart,
    wishlist,
    toggleWishlist,
    setIsCheckoutOpen,
    setIsReviewModalOpen,
    showToast,
    setCurrentScreen,
    selectedHub,
  } = useApp();

  const product = PRAN_MILK_PRODUCT;
  const [selectedVariant, setSelectedVariant] = useState(product.variants[0]);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'specs' | 'fefo' | 'reviews' | 'delivery'>('specs');

  // Bundle items checkbox state
  const [bundleChecked, setBundleChecked] = useState<{ [key: string]: boolean }>({
    'pran-milk-1l': true,
    'teer-soyabean-5l': true,
    'ispahani-tea-100s': true,
  });

  // Dynamic reviews list
  const [reviews, setReviews] = useState(REVIEWS_LIST);
  const isFavorite = wishlist.includes(product.id);

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    showToast('Product Link Copied', 'Share this FEFO certified staple with friends.', 'success');
  };

  const handleAddReview = (newReview: { author: string; initials: string; location: string; rating: number; comment: string }) => {
    const item = {
      id: `rev-${Date.now()}`,
      author: newReview.author,
      initials: newReview.initials,
      location: newReview.location,
      timeAgo: 'Just now',
      rating: newReview.rating,
      comment: newReview.comment,
      verified: true,
    };
    setReviews([item, ...reviews]);
  };

  // Bundle pricing calculation
  const totalBundlePrice = BUNDLE_ITEMS.reduce((sum, item) => {
    return bundleChecked[item.id] ? sum + item.price : sum;
  }, 0);
  const totalBundleOriginalPrice = BUNDLE_ITEMS.reduce((sum, item) => {
    return bundleChecked[item.id] ? sum + item.originalPrice : sum;
  }, 0);
  const bundleSavings = totalBundleOriginalPrice - totalBundlePrice;

  const handleAddBundleToCart = () => {
    const checkedItems = BUNDLE_ITEMS.filter((item) => bundleChecked[item.id]);
    checkedItems.forEach((item) => {
      addToCart({
        id: item.id,
        name: item.name,
        price: item.price,
        imageUrl: item.imageUrl,
        variant: 'Bundle Offer Pack',
      });
    });
    showToast('Bundle Added to Basket!', `${checkedItems.length} items added with ৳ ${bundleSavings.toFixed(0)} savings.`, 'success');
  };

  return (
    <div className="min-h-screen bg-neutral-50/70 pb-16">
      {/* 1. Breadcrumbs & Quick Back Navigation */}
      <div className="max-w-7xl mx-auto px-4 py-3 border-b border-neutral-200/80 bg-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-neutral-500 font-medium overflow-x-auto whitespace-nowrap">
            <button
              type="button"
              onClick={() => setCurrentScreen('storefront')}
              className="flex items-center gap-1 text-neutral-700 hover:text-emerald-700 font-semibold cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Storefront</span>
            </button>
            <ChevronRight className="w-3 h-3 text-neutral-300" />
            <button
              type="button"
              onClick={() => setCurrentScreen('storefront')}
              className="hover:text-emerald-700 cursor-pointer text-neutral-600"
            >
              {product.category}
            </button>
            <ChevronRight className="w-3 h-3 text-neutral-300" />
            <span className="text-neutral-800 font-semibold truncate">{product.name}</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleShare}
              className="p-1.5 rounded-lg border border-neutral-200 text-neutral-600 hover:bg-neutral-50 transition-colors cursor-pointer"
              title="Share link"
            >
              <Share2 className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => toggleWishlist(product.id)}
              className="p-1.5 rounded-lg border border-neutral-200 text-neutral-600 hover:bg-neutral-50 transition-colors cursor-pointer"
              title="Save wishlist"
            >
              <Heart className={`w-4 h-4 ${isFavorite ? 'text-rose-500 fill-rose-500' : ''}`} />
            </button>
          </div>
        </div>
      </div>

      {/* 2. Main Product Layout */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="bg-white rounded-2xl border border-neutral-200 p-5 sm:p-8 shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Column: Gallery & Vault Badges (5 cols) */}
            <div className="lg:col-span-5 space-y-4">
              {/* Main Image Container */}
              <div className="relative bg-neutral-50 rounded-2xl border border-neutral-200/90 p-6 flex items-center justify-center overflow-hidden h-96">
                <img
                  src={product.images.gallery[activeImageIndex]?.url || product.images.main}
                  alt={product.images.gallery[activeImageIndex]?.alt || product.name}
                  referrerPolicy="no-referrer"
                  className="max-h-80 max-w-full object-contain transition-transform duration-300 hover:scale-105"
                />
                {/* Floating Badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-1.5">
                  <span className="bg-emerald-50 text-emerald-800 border border-emerald-300 text-[10px] font-bold px-2 py-0.5 rounded shadow-2xs">
                    Cold Chain 4.2°C
                  </span>
                  <span className="bg-neutral-900 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-2xs">
                    BSTI BDS-CAC-1
                  </span>
                </div>
              </div>

              {/* Thumbnails Row */}
              <div className="grid grid-cols-4 gap-2.5">
                {product.images.gallery.map((img, idx) => (
                  <button
                    key={img.id}
                    type="button"
                    onClick={() => setActiveImageIndex(idx)}
                    className={`p-1.5 rounded-xl border transition-all cursor-pointer bg-neutral-50 ${
                      activeImageIndex === idx
                        ? 'border-emerald-600 ring-2 ring-emerald-500/20 shadow-xs'
                        : 'border-neutral-200 hover:border-neutral-300 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={img.url}
                      alt={img.label}
                      referrerPolicy="no-referrer"
                      className="w-full h-16 object-contain rounded-lg"
                    />
                    <span className="block text-[10px] text-center font-medium text-neutral-600 mt-1 truncate">
                      {img.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Right Column: Product Info & Commerce Controls (7 cols) */}
            <div className="lg:col-span-7 space-y-5">
              {/* Header Title & Ratings */}
              <div>
                <div className="flex items-center gap-2 text-xs text-neutral-500 font-medium">
                  <span className="text-emerald-700 font-bold">{product.brand}</span>
                  <span>·</span>
                  <span>SKU: {product.sku}</span>
                  <span>·</span>
                  <span className="text-neutral-500">{product.monthlyOrders} delivered this month</span>
                </div>
                <h1 className="text-xl sm:text-2xl font-black text-neutral-900 tracking-tight mt-1">
                  {product.name}
                </h1>
                {product.nameBn && (
                  <p className="text-xs sm:text-sm text-neutral-500 mt-0.5 font-medium">{product.nameBn}</p>
                )}
                {/* Rating */}
                <div className="flex items-center gap-3 mt-2 text-xs">
                  <div className="flex items-center gap-1 bg-amber-50 text-amber-900 border border-amber-200 px-2 py-0.5 rounded font-bold">
                    <span>★ {product.rating}</span>
                    <span className="text-neutral-500 font-normal">({product.reviewsCount} verified reviews)</span>
                  </div>
                  <span className="text-emerald-700 font-medium">· In Stock at {selectedHub}</span>
                </div>
              </div>

              {/* Price Block */}
              <div className="bg-neutral-50 p-4 rounded-xl border border-neutral-200/80 flex items-baseline justify-between">
                <div>
                  <div className="flex items-baseline gap-2.5">
                    <span className="text-2xl sm:text-3xl font-black text-neutral-950">
                      ৳ {selectedVariant.price.toFixed(2)}
                    </span>
                    <span className="text-sm text-neutral-400 line-through">
                      ৳ {product.oldPrice.toFixed(2)}
                    </span>
                    <span className="bg-rose-100 text-rose-700 text-xs font-bold px-2 py-0.5 rounded">
                      Save ৳ 25 (21% OFF)
                    </span>
                  </div>
                  <p className="text-[11px] text-neutral-500 mt-1">
                    {product.unitRate} · Includes 5% Bangladesh VAT
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-[11px] font-bold text-amber-800 bg-amber-100 px-2 py-1 rounded">
                    +10 Loyalty Points
                  </span>
                </div>
              </div>

              {/* Variant Selector */}
              <div>
                <label className="text-xs font-bold text-neutral-900 block mb-2">
                  Select Pack Size & Format:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {product.variants.map((variant) => (
                    <button
                      key={variant.id}
                      type="button"
                      onClick={() => setSelectedVariant(variant)}
                      className={`p-3 rounded-xl border text-left transition-all cursor-pointer relative ${
                        selectedVariant.id === variant.id
                          ? 'border-emerald-600 bg-emerald-50/50 ring-2 ring-emerald-500/20 shadow-xs'
                          : 'border-neutral-200 hover:border-neutral-300 bg-white'
                      }`}
                    >
                      {variant.badge && (
                        <span className="absolute -top-2 right-2 bg-rose-600 text-white text-[9px] font-bold px-1.5 py-0.2 rounded">
                          {variant.badge}
                        </span>
                      )}
                      <div className="font-bold text-xs text-neutral-900">{variant.name}</div>
                      <div className="text-[11px] text-neutral-500">{variant.subtext}</div>
                      <div className="text-xs font-bold text-emerald-800 mt-1">৳ {variant.price.toFixed(2)}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* FEFO Batch Freshness Card */}
              <div className="bg-emerald-50/70 border border-emerald-200 rounded-xl p-4 text-xs space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-emerald-950 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-700" />
                    <span>Verified FEFO Batch: {product.fefoStatus.batchId}</span>
                  </span>
                  <span className="text-[11px] font-mono font-semibold text-emerald-800">
                    Vault: {product.fefoStatus.temperature}
                  </span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] pt-1">
                  <div>
                    <span className="text-neutral-500 block">Packed Date</span>
                    <strong className="text-neutral-800">{product.fefoStatus.packedDate}</strong>
                  </div>
                  <div>
                    <span className="text-neutral-500 block">Expiry Date</span>
                    <strong className="text-neutral-800">{product.fefoStatus.expiryDate}</strong>
                  </div>
                  <div>
                    <span className="text-neutral-500 block">Safe Days Remaining</span>
                    <strong className="text-emerald-700">{product.fefoStatus.daysRemaining} Days</strong>
                  </div>
                  <div>
                    <span className="text-neutral-500 block">Dispatch Hub</span>
                    <strong className="text-neutral-800">{product.fefoStatus.dispatchHub}</strong>
                  </div>
                </div>

                {/* Freshness Bar */}
                <div className="space-y-1 pt-1">
                  <div className="flex justify-between text-[10px] font-semibold text-emerald-900">
                    <span>Freshness Index: 98%</span>
                    <span>Guaranteed Fresh Shelf-Life</span>
                  </div>
                  <div className="w-full bg-emerald-200 rounded-full h-1.5">
                    <div className="bg-emerald-600 h-full rounded-full w-[98%]" />
                  </div>
                </div>
              </div>

              {/* Quantity Stepper & Add to Basket / Express Checkout */}
              <div className="space-y-3 pt-2">
                <div className="flex flex-col sm:flex-row items-stretch gap-3">
                  {/* Stepper */}
                  <div className="flex items-center justify-between border border-neutral-300 rounded-xl bg-neutral-50 px-3 py-2 sm:w-36">
                    <button
                      type="button"
                      onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                      className="p-1 hover:bg-neutral-200 rounded text-neutral-600 cursor-pointer transition-colors"
                      title="Decrease"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="font-bold text-sm text-neutral-900">{quantity}</span>
                    <button
                      type="button"
                      onClick={() => setQuantity((prev) => prev + 1)}
                      className="p-1 hover:bg-neutral-200 rounded text-neutral-600 cursor-pointer transition-colors"
                      title="Increase"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Add to Basket */}
                  <button
                    type="button"
                    onClick={() => {
                      addToCart(
                        {
                          id: product.id,
                          name: product.name,
                          price: selectedVariant.price,
                          imageUrl: product.images.main,
                          variant: selectedVariant.name,
                        },
                        quantity
                      );
                    }}
                    className="flex-1 py-3 bg-neutral-900 hover:bg-neutral-800 text-white font-bold text-xs sm:text-sm rounded-xl transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer active:scale-98"
                  >
                    <ShoppingBag className="w-4 h-4 text-emerald-400" />
                    <span>Add {quantity} to Basket · ৳ {(selectedVariant.price * quantity).toFixed(0)}</span>
                  </button>

                  {/* Instant Checkout */}
                  <button
                    type="button"
                    onClick={() => {
                      addToCart(
                        {
                          id: product.id,
                          name: product.name,
                          price: selectedVariant.price,
                          imageUrl: product.images.main,
                          variant: selectedVariant.name,
                        },
                        quantity
                      );
                      setIsCheckoutOpen(true);
                    }}
                    className="px-5 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm rounded-xl transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer active:scale-98 whitespace-nowrap"
                  >
                    <Zap className="w-4 h-4" />
                    <span>Instant 2-Hr Checkout</span>
                  </button>
                </div>

                {/* Delivery Note */}
                <div className="flex items-center gap-2 text-xs text-neutral-500 pt-1">
                  <Clock className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>
                    Order within <strong>42 mins</strong> for guaranteed delivery today by <strong>4:30 PM</strong> in Dhanmondi & Gulshan.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Tabbed Specifications, FEFO Cold Chain, and Reviews */}
      <div className="max-w-7xl mx-auto px-4 pt-4">
        <div className="bg-white rounded-2xl border border-neutral-200 shadow-xs overflow-hidden">
          {/* Tab Navigation */}
          <div className="flex border-b border-neutral-200 bg-neutral-50/70 overflow-x-auto scrollbar-none text-xs font-semibold">
            <button
              type="button"
              onClick={() => setActiveTab('specs')}
              className={`px-5 py-3.5 transition-colors whitespace-nowrap cursor-pointer ${
                activeTab === 'specs'
                  ? 'bg-white text-emerald-800 border-b-2 border-emerald-600 font-bold'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              Nutrition & Specifications
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('fefo')}
              className={`px-5 py-3.5 transition-colors whitespace-nowrap cursor-pointer ${
                activeTab === 'fefo'
                  ? 'bg-white text-emerald-800 border-b-2 border-emerald-600 font-bold'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              FEFO Cold Chain Audit
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('reviews')}
              className={`px-5 py-3.5 transition-colors whitespace-nowrap cursor-pointer ${
                activeTab === 'reviews'
                  ? 'bg-white text-emerald-800 border-b-2 border-emerald-600 font-bold'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              Customer Reviews ({reviews.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('delivery')}
              className={`px-5 py-3.5 transition-colors whitespace-nowrap cursor-pointer ${
                activeTab === 'delivery'
                  ? 'bg-white text-emerald-800 border-b-2 border-emerald-600 font-bold'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              24-Hour Swap & Guarantee
            </button>
          </div>

          {/* Tab 1: Specs */}
          {activeTab === 'specs' && (
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Nutrition Table */}
                <div className="space-y-3">
                  <h3 className="text-sm font-bold text-neutral-900">Nutrition Information (Per 100ml)</h3>
                  <div className="border border-neutral-200 rounded-xl overflow-hidden text-xs">
                    <table className="w-full text-left">
                      <thead className="bg-neutral-50 text-neutral-600 border-b border-neutral-200">
                        <tr>
                          <th className="p-2.5 font-semibold">Nutrient</th>
                          <th className="p-2.5 font-semibold">Amount</th>
                          <th className="p-2.5 font-semibold text-right">% Daily Value</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-neutral-100">
                        {product.nutritionFacts.map((row, i) => (
                          <tr key={i} className="hover:bg-neutral-50/50">
                            <td className="p-2.5 font-medium text-neutral-800">{row.nutrient}</td>
                            <td className="p-2.5 text-neutral-600">{row.amount}</td>
                            <td className="p-2.5 text-right font-semibold text-emerald-700">{row.dailyValue}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Standards & Certifications */}
                <div className="space-y-3">
                  <h3 className="text-sm font-bold text-neutral-900">Regulatory Certifications</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {product.standards.map((std, i) => (
                      <div key={i} className="p-3 bg-neutral-50 rounded-xl border border-neutral-200/80 space-y-1">
                        <div className="flex items-center gap-1.5 text-emerald-800 font-bold text-xs">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>{std.title}</span>
                        </div>
                        <div className="text-[10px] font-mono text-neutral-500">{std.code}</div>
                        <p className="text-[11px] text-neutral-600 leading-snug">{std.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: FEFO Cold Chain Audit */}
          {activeTab === 'fefo' && (
            <div className="p-6 space-y-5 text-xs">
              <div className="bg-neutral-50 rounded-xl p-4 border border-neutral-200 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-neutral-900 text-sm">Cold Chain Telemetry Log</h4>
                  <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded">
                    Audit Certified
                  </span>
                </div>
                <p className="text-neutral-600">
                  This batch was collected from Sirajganj dairy milk chilling centers, transported via refrigerated cold-van at 3.9°C, and inspected by Bangladesh Standards and Testing Institution (BSTI) inspectors before allocation into Dhanmondi Vault #04.
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 text-[11px]">
                  <div className="bg-white p-2.5 rounded-lg border border-neutral-200">
                    <span className="text-neutral-400 block">Vault Ambient Temp</span>
                    <strong className="text-emerald-700 text-sm">4.2°C Stable</strong>
                  </div>
                  <div className="bg-white p-2.5 rounded-lg border border-neutral-200">
                    <span className="text-neutral-400 block">Storage Advice</span>
                    <strong className="text-neutral-800">Below 25°C dry</strong>
                  </div>
                  <div className="bg-white p-2.5 rounded-lg border border-neutral-200">
                    <span className="text-neutral-400 block">Once Opened</span>
                    <strong className="text-neutral-800">Refrigerate 2–4°C</strong>
                  </div>
                  <div className="bg-white p-2.5 rounded-lg border border-neutral-200">
                    <span className="text-neutral-400 block">Barcode Laser</span>
                    <strong className="text-neutral-800 font-mono">8941100128921</strong>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tab 3: Reviews */}
          {activeTab === 'reviews' && (
            <div className="p-6 space-y-5">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-neutral-900">Verified Dhaka Customer Feedback</h3>
                  <p className="text-xs text-neutral-500">Real feedback from verified orders with cold-bag delivery</p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsReviewModalOpen(true)}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs rounded-xl transition-colors cursor-pointer"
                >
                  + Write a Review
                </button>
              </div>

              <div className="space-y-3">
                {reviews.map((rev) => (
                  <div key={rev.id} className="p-4 bg-neutral-50 rounded-xl border border-neutral-200/80 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-emerald-700 text-white font-bold flex items-center justify-center text-[10px]">
                          {rev.initials}
                        </div>
                        <div>
                          <div className="font-bold text-neutral-900 flex items-center gap-1.5">
                            <span>{rev.author}</span>
                            {rev.verified && (
                              <span className="text-[10px] text-emerald-700 font-semibold bg-emerald-100 px-1.5 rounded">
                                Verified Purchase
                              </span>
                            )}
                          </div>
                          <div className="text-[10px] text-neutral-400">{rev.location}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 text-amber-600 font-bold text-xs">
                        {'★'.repeat(rev.rating)}
                      </div>
                    </div>
                    <p className="text-xs text-neutral-700 leading-relaxed">{rev.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab 4: Delivery Guarantee */}
          {activeTab === 'delivery' && (
            <div className="p-6 space-y-4 text-xs">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-200 space-y-2">
                  <Truck className="w-5 h-5 text-emerald-600" />
                  <h4 className="font-bold text-neutral-900 text-sm">2-Hour Express Dispatch</h4>
                  <p className="text-neutral-600 leading-relaxed">
                    Orders received before 4:30 PM are packed in cold-chain thermal bags and dispatched with Pathao riders within 2 hours.
                  </p>
                </div>
                <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-200 space-y-2">
                  <RotateCcw className="w-5 h-5 text-amber-600" />
                  <h4 className="font-bold text-neutral-900 text-sm">24-Hour Instant Swap</h4>
                  <p className="text-neutral-600 leading-relaxed">
                    If container seal is compromised, temperature is improper, or taste is unsatisfactory, we swap it at your doorstep with zero questions asked.
                  </p>
                </div>
                <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-200 space-y-2">
                  <ShieldCheck className="w-5 h-5 text-sky-600" />
                  <h4 className="font-bold text-neutral-900 text-sm">BSTI Standard Compliance</h4>
                  <p className="text-neutral-600 leading-relaxed">
                    Every batch code is registered in national food safety databases and verified prior to warehouse shelf placement.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 4. Frequently Bought Together Bundle Builder */}
      <div className="max-w-7xl mx-auto px-4 pt-6">
        <div className="bg-white rounded-2xl border border-neutral-200 p-6 shadow-xs space-y-4">
          <div>
            <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              Smart Breakfast Pantry Bundle
            </span>
            <h3 className="text-base sm:text-lg font-bold text-neutral-900 mt-1">
              Frequently Bought Together with Pran Milk
            </h3>
            <p className="text-xs text-neutral-500">
              Bundle fresh milk with cooking oil and morning tea to save extra ৳ {bundleSavings.toFixed(0)} and get free delivery
            </p>
          </div>

          <div className="flex flex-col lg:flex-row items-center justify-between gap-6 pt-2">
            {/* Bundle Items Selection */}
            <div className="flex flex-wrap items-center gap-4">
              {BUNDLE_ITEMS.map((item, idx) => (
                <React.Fragment key={item.id}>
                  {idx > 0 && <span className="text-lg font-bold text-neutral-400">+</span>}
                  <div
                    onClick={() => setBundleChecked((prev) => ({ ...prev, [item.id]: !prev[item.id] }))}
                    className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                      bundleChecked[item.id]
                        ? 'border-emerald-600 bg-emerald-50/40 shadow-xs'
                        : 'border-neutral-200 bg-neutral-50 opacity-60'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={!!bundleChecked[item.id]}
                      onChange={() => {}}
                      className="rounded text-emerald-600 focus:ring-emerald-500"
                    />
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      referrerPolicy="no-referrer"
                      className="w-12 h-12 object-contain bg-white rounded-lg border border-neutral-200"
                    />
                    <div>
                      <div className="text-xs font-bold text-neutral-900">{item.name}</div>
                      <div className="text-xs font-bold text-emerald-800">৳ {item.price.toFixed(2)}</div>
                    </div>
                  </div>
                </React.Fragment>
              ))}
            </div>

            {/* Bundle Action */}
            <div className="bg-neutral-50 p-4 rounded-xl border border-neutral-200 text-center lg:text-right w-full lg:w-auto space-y-2">
              <div className="text-xs text-neutral-500">
                Total Bundle Price: <span className="line-through">৳ {totalBundleOriginalPrice.toFixed(0)}</span>
              </div>
              <div className="text-xl font-black text-neutral-950">
                ৳ {totalBundlePrice.toFixed(2)}
              </div>
              <button
                type="button"
                onClick={handleAddBundleToCart}
                className="w-full px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl transition-colors cursor-pointer shadow-xs"
              >
                + Add All to Basket (Save ৳ {bundleSavings.toFixed(0)})
              </button>
            </div>
          </div>
        </div>
      </div>

      <ReviewModal onAddReview={handleAddReview} />
    </div>
  );
};
