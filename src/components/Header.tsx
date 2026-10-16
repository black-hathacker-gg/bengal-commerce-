import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import {
  ShoppingBag,
  Search,
  Heart,
  Store,
  Sparkles,
  MapPin,
  ChevronDown,
  Phone,
  Layers,
  ShieldCheck,
  Zap,
  Check,
  Clock,
  X,
} from 'lucide-react';
import { DHAKA_HUBS, FLASH_PRODUCTS } from '@/data/mockData';

export const Header: React.FC = () => {
  const {
    currentScreen,
    setCurrentScreen,
    selectedHub,
    setSelectedHub,
    language,
    setLanguage,
    cartCount,
    cartTotal,
    setIsCartOpen,
    wishlist,
    userPoints,
    searchQuery,
    setSearchQuery,
  } = useApp();

  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  const [isHubDropdownOpen, setIsHubDropdownOpen] = useState(false);

  const filteredProducts = FLASH_PRODUCTS.filter(
    (p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.nameBn && p.nameBn.includes(searchQuery))
  );

  return (
    <header className="sticky top-0 z-40 w-full bg-white border-b border-neutral-200 shadow-xs">
      {/* 1. Top Utility & Location Strip */}
      <div className="bg-neutral-900 text-neutral-300 text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          {/* Left: Delivery Hub & Express Notification */}
          <div className="flex items-center gap-3 text-[11px] sm:text-xs">
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsHubDropdownOpen(!isHubDropdownOpen)}
                className="flex items-center gap-1.5 font-medium text-white hover:text-emerald-400 transition-colors cursor-pointer bg-neutral-850 px-2.5 py-0.5 rounded-full border border-neutral-700"
              >
                <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                <span className="font-semibold">{selectedHub}</span>
                <span className="text-neutral-400">· 35 min delivery</span>
                <ChevronDown className="w-3 h-3 text-neutral-400" />
              </button>

              {/* Hub Dropdown Popover */}
              {isHubDropdownOpen && (
                <div
                  className="absolute top-full left-0 mt-2 w-72 bg-white rounded-xl shadow-xl border border-neutral-200 overflow-hidden z-50 p-2 space-y-1 text-neutral-800 animate-in fade-in slide-in-from-top-1"
                  onMouseLeave={() => setIsHubDropdownOpen(false)}
                >
                  <div className="text-[10px] font-bold text-neutral-400 px-2 py-1 uppercase tracking-wider">
                    Select Nearest Dhaka Dispatch Hub
                  </div>
                  {DHAKA_HUBS.map((hub) => (
                    <button
                      type="button"
                      key={hub.id}
                      onClick={() => {
                        setSelectedHub(hub.name);
                        setIsHubDropdownOpen(false);
                      }}
                      className={`w-full text-left p-2.5 rounded-lg text-xs transition-colors flex items-start justify-between cursor-pointer ${
                        selectedHub === hub.name
                          ? 'bg-emerald-50 text-emerald-950 font-semibold border border-emerald-200'
                          : 'hover:bg-neutral-50 text-neutral-700'
                      }`}
                    >
                      <div>
                        <div className="font-medium text-neutral-900">{hub.name}</div>
                        <div className="text-[11px] text-neutral-500">{hub.address}</div>
                        <div className="text-[10px] text-emerald-600 font-medium mt-0.5">Cold Vault: {hub.temp}</div>
                      </div>
                      {selectedHub === hub.name && <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="hidden md:flex items-center gap-2 text-neutral-400">
              <span className="text-emerald-400">FEFO Cold Chain Monitored:</span>
              <span>4.2°C Vaults</span>
            </div>
          </div>

          {/* Right: Hotline, Language & Merchant POS Portal */}
          <div className="flex items-center gap-3 text-[11px] text-neutral-400">
            <div className="hidden sm:flex items-center gap-1.5">
              <Phone className="w-3 h-3 text-emerald-400" />
              <span>Hotline: 09612-000000 (8 AM – 11 PM)</span>
            </div>
            <div className="h-3 w-px bg-neutral-700 hidden sm:block" />

            {/* Language Toggle */}
            <button
              type="button"
              onClick={() => setLanguage(language === 'EN' ? 'BN' : 'EN')}
              className="text-white hover:text-emerald-400 font-semibold transition-colors px-1 cursor-pointer"
            >
              <span>{language === 'EN' ? 'বাংলা' : 'English'}</span>
            </button>
            <div className="h-3 w-px bg-neutral-700" />

            {/* Merchant / Staff ERP & POS Switcher */}
            <button
              type="button"
              onClick={() => setCurrentScreen(currentScreen === 'retail-pos' ? 'storefront' : 'retail-pos')}
              className={`flex items-center gap-1.5 px-2.5 py-0.5 rounded-md font-medium text-[11px] transition-all cursor-pointer ${
                currentScreen === 'retail-pos'
                  ? 'bg-emerald-600 text-white font-semibold'
                  : 'bg-neutral-800 text-neutral-200 hover:bg-neutral-700 hover:text-white border border-neutral-700'
              }`}
            >
              <Layers className="w-3.5 h-3.5 text-emerald-400" />
              <span>{currentScreen === 'retail-pos' ? 'Exit to Storefront' : 'Retail ERP & POS Terminal'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4 md:gap-8">
          {/* Brand Identity */}
          <div
            onClick={() => setCurrentScreen('storefront')}
            className="flex items-center gap-2.5 cursor-pointer select-none shrink-0"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-xs">
              <Store className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-xl tracking-tight text-neutral-900 leading-none">
                  Bengal<span className="text-emerald-600">Fresh</span>
                </span>
                <span className="text-[10px] font-bold tracking-wider text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                  DHAKA
                </span>
              </div>
              <p className="text-[11px] text-neutral-500 font-medium leading-tight mt-0.5">
                {language === 'EN' ? 'Online Superstore & FEFO Cold Chain' : 'অনলাইন সুপারস্টোর ও কোল্ড-চেইন সাপ্লাই'}
              </p>
            </div>
          </div>

          {/* Search Bar with live autocomplete */}
          <div className="relative flex-1 max-w-xl hidden md:block">
            <div className="relative">
              <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3" />
              <input
                type="text"
                placeholder={language === 'EN' ? 'Search milk, mustard oil, rice, tea, fresh eggs...' : 'দুধ, সরিষার তেল, চাল, চা বা ডিম খুঁজুন...'}
                value={searchQuery}
                onFocus={() => setShowSearchDropdown(true)}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full text-xs pl-10 pr-9 py-2.5 rounded-xl border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-neutral-50/70 hover:bg-white transition-colors"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-2.5 text-xs text-neutral-400 hover:text-neutral-600 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Dropdown Suggestions */}
            {showSearchDropdown && searchQuery && (
              <div
                className="absolute top-full left-0 right-0 mt-1.5 bg-white rounded-xl shadow-xl border border-neutral-200 overflow-hidden z-50 p-2 space-y-1"
                onMouseLeave={() => setShowSearchDropdown(false)}
              >
                <div className="text-[10px] font-bold text-neutral-400 px-2 py-1 uppercase tracking-wider">
                  Matching Dhaka Staples
                </div>
                {filteredProducts.length === 0 ? (
                  <div className="p-4 text-xs text-neutral-500 text-center">No matching products found in stock.</div>
                ) : (
                  filteredProducts.map((p) => (
                    <div
                      key={p.id}
                      onClick={() => {
                        setCurrentScreen('product-detail');
                        setShowSearchDropdown(false);
                      }}
                      className="flex items-center gap-3 p-2 rounded-lg hover:bg-neutral-50 cursor-pointer transition-colors"
                    >
                      <img
                        src={p.imageUrl}
                        alt={p.name}
                        referrerPolicy="no-referrer"
                        className="w-9 h-9 rounded-md object-cover border border-neutral-200 bg-neutral-100"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-semibold text-neutral-800 truncate">{p.name}</div>
                        <div className="text-[11px] text-neutral-500">{p.category} · {p.weight}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs font-bold text-emerald-700">৳ {p.price.toFixed(2)}</div>
                        <div className="text-[10px] text-neutral-400 line-through">৳ {p.oldPrice.toFixed(2)}</div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>

          {/* User Fast Controls: Loyalty, Wishlist, Cart */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Loyalty Rewards */}
            <div
              className="flex items-center gap-1.5 bg-amber-50 border border-amber-200 px-3 py-1.5 rounded-xl text-xs font-semibold text-amber-900"
              title="Club Rewards & Points"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500 fill-amber-400" />
              <span>{userPoints.toLocaleString()}</span>
              <span className="text-[11px] text-amber-700 hidden sm:inline font-normal">pts</span>
            </div>

            {/* Wishlist */}
            <button
              type="button"
              onClick={() => setCurrentScreen('storefront')}
              className="relative p-2 rounded-xl text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 transition-colors cursor-pointer"
              title="Saved Wishlist"
            >
              <Heart className={`w-5 h-5 ${wishlist.length > 0 ? 'text-rose-500 fill-rose-500' : ''}`} />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Cart Trigger */}
            <button
              type="button"
              onClick={() => setIsCartOpen(true)}
              className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-3.5 py-2 rounded-xl text-xs font-semibold shadow-xs transition-all active:scale-98 cursor-pointer"
            >
              <div className="relative">
                <ShoppingBag className="w-4 h-4" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-amber-400 text-neutral-950 text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-xs">
                    {cartCount}
                  </span>
                )}
              </div>
              <span className="font-bold">৳ {cartTotal.toFixed(0)}</span>
            </button>
          </div>
        </div>

        {/* Mobile Search Input */}
        <div className="mt-2.5 md:hidden">
          <div className="relative">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder={language === 'EN' ? 'Search milk, mustard oil, rice, tea...' : 'দুধ, সরিষার তেল, চাল খুঁজুন...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full text-xs pl-9 pr-3 py-2 rounded-lg border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-neutral-50"
            />
          </div>
        </div>
      </div>

      {/* 3. Category Strip */}
      <div className="bg-neutral-50 border-t border-neutral-200 px-4 py-2 overflow-x-auto scrollbar-none">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-xs text-neutral-600 gap-6 whitespace-nowrap">
          <div className="flex items-center gap-6 font-medium">
            <button
              type="button"
              onClick={() => setCurrentScreen('storefront')}
              className={`cursor-pointer transition-colors ${currentScreen === 'storefront' ? 'text-emerald-700 font-bold' : 'hover:text-emerald-600'}`}
            >
              {language === 'EN' ? 'All Staples & Pantry' : 'সকল মুদি ও প্যান্ট্রি'}
            </button>
            <button
              type="button"
              onClick={() => setCurrentScreen('product-detail')}
              className={`cursor-pointer flex items-center gap-1.5 transition-colors ${currentScreen === 'product-detail' ? 'text-emerald-700 font-bold' : 'hover:text-emerald-600'}`}
            >
              <span>{language === 'EN' ? 'Dairy & Chilled Milk' : 'দুগ্ধ ও তরল দুধ'}</span>
              <span className="bg-emerald-100 text-emerald-800 text-[10px] px-1.5 py-0.2 rounded-full font-semibold">
                FEFO Batch
              </span>
            </button>
            <button
              type="button"
              onClick={() => setCurrentScreen('storefront')}
              className="cursor-pointer hover:text-emerald-600"
            >
              {language === 'EN' ? 'Edible Oils & Pure Ghee' : 'ভোজ্যতেল ও খাঁটি ঘি'}
            </button>
            <button
              type="button"
              onClick={() => setCurrentScreen('storefront')}
              className="cursor-pointer hover:text-emerald-600"
            >
              {language === 'EN' ? 'Rice, Atta & Grains' : 'চাল, আটা ও ডাল'}
            </button>
            <button
              type="button"
              onClick={() => setCurrentScreen('storefront')}
              className="cursor-pointer hover:text-emerald-600"
            >
              {language === 'EN' ? 'Tea & Beverages' : 'চা ও পানীয়'}
            </button>
            <button
              type="button"
              onClick={() => setCurrentScreen('storefront')}
              className="cursor-pointer text-rose-600 font-semibold flex items-center gap-1"
            >
              <Zap className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
              <span>{language === 'EN' ? 'Flash Deals & Clearance' : 'ফ্ল্যাশ ডিল ও ছাড়'}</span>
            </button>
          </div>

          <div className="hidden lg:flex items-center gap-4 text-neutral-500 text-[11px]">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>BSTI BDS-CAC-1:2008 Certified</span>
            </span>
            <span>·</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-neutral-400" />
              <span>Guaranteed 2-Hr Express Dispatch</span>
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};
