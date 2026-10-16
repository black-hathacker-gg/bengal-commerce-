import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { ShoppingBag, X, Trash2, Plus, Minus, ArrowRight, ShieldCheck, Tag } from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const { isCartOpen, setIsCartOpen, cart, updateCartQuantity, removeFromCart, cartTotal, setIsCheckoutOpen, showToast, selectedHub } = useApp();
  const [couponCode, setCouponCode] = useState('');
  const [discountApplied, setDiscountApplied] = useState(false);

  if (!isCartOpen) return null;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    const code = couponCode.trim().toUpperCase();
    if (code === 'RAMADAN25' || code === 'BENGAL200' || code === 'BENGAL50' || code === 'BENGAL150') {
      setDiscountApplied(true);
      showToast('Promo Code Applied', '৳ 50.00 discount applied to your order!', 'success');
    } else {
      showToast('Invalid Code', 'Try using code RAMADAN25 or BENGAL50', 'warning');
    }
  };

  const discountAmount = discountApplied ? 50 : 0;
  const deliveryFee = cartTotal > 999 || cart.length === 0 ? 0 : 40;
  const grandTotal = Math.max(0, cartTotal - discountAmount + deliveryFee);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-[#061124]/70 backdrop-blur-2xs transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col border-l border-blue-100">
          {/* Header */}
          <div className="p-4 border-b border-blue-100 flex items-center justify-between bg-blue-50/70">
            <div className="flex items-center gap-2.5">
              <div className="p-2 bg-blue-600 text-white rounded-xl shadow-xs">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-sm font-bold text-slate-900">Your Freshness Basket</h2>
                <p className="text-[11px] text-slate-500">{cart.length} item(s) · Dispatched from {selectedHub}</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-blue-100/60 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {cart.length === 0 ? (
              <div className="text-center py-16 px-4 space-y-3">
                <div className="w-16 h-16 bg-blue-50 text-blue-400 rounded-full flex items-center justify-center mx-auto border border-blue-100">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="text-sm font-semibold text-slate-800">Your basket is empty</h3>
                <p className="text-xs text-slate-500 max-w-xs mx-auto">
                  Add fresh dairy, cold-chain eggs, mustard oil, or daily staples to trigger 2-hour Dhaka express dispatch.
                </p>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.id}
                  className="p-3 bg-blue-50/30 rounded-xl border border-blue-100/90 flex gap-3 items-center hover:border-blue-300 transition-colors"
                >
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    referrerPolicy="no-referrer"
                    className="w-14 h-14 object-cover rounded-lg bg-white border border-slate-200 shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-bold text-slate-900 truncate">{item.name}</h4>
                    <p className="text-[11px] text-slate-500">{item.variant}</p>
                    {item.batchId && (
                      <span className="inline-block mt-0.5 text-[10px] font-mono text-emerald-800 bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-200">
                        Batch: {item.batchId}
                      </span>
                    )}
                    <div className="text-xs font-bold text-blue-700 mt-1">৳ {item.price.toFixed(2)}</div>
                  </div>

                  <div className="flex flex-col items-end gap-1.5">
                    <button
                      type="button"
                      onClick={() => removeFromCart(item.id)}
                      className="text-slate-400 hover:text-rose-600 transition-colors p-1 cursor-pointer"
                      title="Remove item"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                    <div className="flex items-center border border-blue-200 rounded-lg bg-white overflow-hidden shadow-2xs">
                      <button
                        type="button"
                        onClick={() => updateCartQuantity(item.id, -1)}
                        className="px-2 py-0.5 text-slate-600 hover:bg-blue-50 transition-colors cursor-pointer"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-2 text-xs font-bold text-slate-900">{item.quantity}</span>
                      <button
                        type="button"
                        onClick={() => updateCartQuantity(item.id, 1)}
                        className="px-2 py-0.5 text-slate-600 hover:bg-blue-50 transition-colors cursor-pointer"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Coupon Code Strip */}
          {cart.length > 0 && (
            <div className="p-4 bg-blue-50/40 border-t border-blue-100">
              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    placeholder="Promo Code (RAMADAN25)"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="w-full text-xs pl-8 pr-3 py-2 bg-white border border-blue-200 rounded-lg uppercase placeholder:normal-case focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-500/20"
                  />
                </div>
                <button
                  type="submit"
                  className="px-3.5 py-2 bg-[#09152b] hover:bg-[#0f244a] text-white font-semibold text-xs rounded-lg transition-colors cursor-pointer"
                >
                  Apply
                </button>
              </form>
            </div>
          )}

          {/* Summary & Checkout Button */}
          {cart.length > 0 && (
            <div className="p-4 border-t border-blue-100 bg-white space-y-3 text-xs">
              <div className="space-y-1.5 text-slate-600">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span className="font-semibold text-slate-800">৳ {cartTotal.toFixed(2)}</span>
                </div>
                {discountApplied && (
                  <div className="flex justify-between text-emerald-700 font-semibold">
                    <span>Voucher Discount:</span>
                    <span>- ৳ {discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Dhaka Express Delivery:</span>
                  <span className="font-semibold text-slate-800">
                    {deliveryFee === 0 ? <strong className="text-emerald-700">FREE (Orders &gt; ৳ 999)</strong> : `৳ ${deliveryFee.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-black text-slate-950 pt-1 border-t border-slate-200">
                  <span>Total Payable:</span>
                  <span className="text-blue-700 text-base">৳ {grandTotal.toFixed(2)}</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  setIsCartOpen(false);
                  setIsCheckoutOpen(true);
                }}
                className="w-full py-3 bg-gradient-to-r from-blue-600 via-blue-700 to-emerald-600 hover:from-blue-700 hover:to-emerald-700 text-white font-bold text-xs sm:text-sm rounded-xl transition-all shadow-md shadow-blue-500/20 flex items-center justify-center gap-2 cursor-pointer active:scale-98"
              >
                <span>Proceed to Express Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <div className="flex items-center justify-center gap-1.5 text-[10px] text-slate-400">
                <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                <span>24-Hour Instant Swap Guarantee Active</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
