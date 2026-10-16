import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { X, CheckCircle2, CreditCard, Check } from 'lucide-react';
import { supabaseService } from '@/lib/supabase';

export const CheckoutModal: React.FC = () => {
  const { isCheckoutOpen, setIsCheckoutOpen, cart, cartTotal, clearCart, showToast, setUserPoints, selectedHub } = useApp();
  const [paymentMethod, setPaymentMethod] = useState<'bkash' | 'nagad' | 'cod' | 'card'>('bkash');
  const [customerName, setCustomerName] = useState('Tanvir Ahmed');
  const [phone, setPhone] = useState('01712-345678');
  const [address, setAddress] = useState('House 42, Road 7/A, Dhanmondi, Dhaka');
  const [deliverySlot, setDeliverySlot] = useState('instant');
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [placedOrderId, setPlacedOrderId] = useState('');

  if (!isCheckoutOpen) return null;

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    const newOrderId = `BC-${Math.floor(10000 + Math.random() * 90000)}`;
    setPlacedOrderId(newOrderId);

    // Persist order via Supabase (with automatic local fallback)
    supabaseService.createOrder({
      orderId: newOrderId,
      customerName,
      phone,
      address,
      hub: selectedHub,
      paymentMethod,
      totalAmount: cartTotal,
      items: cart.map((item) => ({
        productId: item.productId,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
      })),
    });
    setTimeout(() => {
      setIsProcessing(false);
      setOrderComplete(true);
      const earned = Math.round(cartTotal * 0.05);
      setUserPoints((prev) => prev + earned);
      clearCart();
      showToast('Order Placed Successfully!', `Order #${newOrderId} dispatched to ${selectedHub}. Earned +${earned} Pts!`, 'success');
    }, 1200);
  };

  const handleClose = () => {
    setOrderComplete(false);
    setIsCheckoutOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#061124]/75 backdrop-blur-2xs overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden border border-blue-100 my-8 animate-in fade-in zoom-in-95 duration-200">
        {orderComplete ? (
          <div className="p-6 text-center space-y-4">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto shadow-inner border border-emerald-200">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">Order Confirmed!</h3>
            <p className="text-xs sm:text-sm text-slate-600">
              Your order <strong className="text-blue-700 font-mono">#{placedOrderId}</strong> has been allocated to <strong>{selectedHub}</strong>.
            </p>
            <div className="bg-blue-50/50 p-4 rounded-xl text-left border border-blue-100 text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-500">Delivery Address:</span>
                <span className="font-semibold text-slate-800">{address}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Express Delivery ETA:</span>
                <span className="font-semibold text-emerald-700">Today within 2 Hours (Pathao Express)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Payment Tender:</span>
                <span className="font-semibold text-slate-800 uppercase">{paymentMethod} Verified</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Club Cashback Earned:</span>
                <span className="font-bold text-blue-700">+{Math.round(cartTotal * 0.05)} Points</span>
              </div>
            </div>
            <button
              type="button"
              onClick={handleClose}
              className="w-full py-3 bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700 text-white font-bold text-xs sm:text-sm rounded-xl transition-all shadow-md shadow-blue-500/20 cursor-pointer"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <div>
            {/* Modal Header */}
            <div className="p-4 border-b border-blue-100 flex items-center justify-between bg-blue-50/70">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-blue-600 text-white rounded-xl shadow-xs">
                  <CreditCard className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Fast Express Checkout</h3>
                  <p className="text-[11px] text-slate-500">FEFO Cold-Chain Dispatch · 2-Hour Dhaka Delivery</p>
                </div>
              </div>
              <button
                type="button"
                onClick={handleClose}
                className="text-slate-400 hover:text-slate-700 p-1.5 rounded-lg hover:bg-blue-100/60 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handlePlaceOrder} className="p-5 space-y-4 text-xs">
              {/* Dispatch Hub & Slot */}
              <div className="grid grid-cols-2 gap-3">
                <div
                  onClick={() => setDeliverySlot('instant')}
                  className={`p-3 rounded-xl border cursor-pointer transition-all ${
                    deliverySlot === 'instant'
                      ? 'border-blue-600 bg-blue-50/70 shadow-xs ring-1 ring-blue-500/20'
                      : 'border-slate-200 hover:border-blue-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900">2-Hour Express</span>
                    {deliverySlot === 'instant' && <Check className="w-3.5 h-3.5 text-blue-600" />}
                  </div>
                  <div className="text-[11px] text-slate-500 mt-0.5">Dispatched in thermal cold bag</div>
                </div>

                <div
                  onClick={() => setDeliverySlot('evening')}
                  className={`p-3 rounded-xl border cursor-pointer transition-all ${
                    deliverySlot === 'evening'
                      ? 'border-blue-600 bg-blue-50/70 shadow-xs ring-1 ring-blue-500/20'
                      : 'border-slate-200 hover:border-blue-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900">Evening Slot</span>
                    {deliverySlot === 'evening' && <Check className="w-3.5 h-3.5 text-blue-600" />}
                  </div>
                  <div className="text-[11px] text-slate-500 mt-0.5">7:00 PM – 9:00 PM today</div>
                </div>
              </div>

              {/* Delivery Details */}
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-bold text-slate-700 block mb-1">Customer Name:</label>
                    <input
                      type="text"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full p-2 bg-blue-50/20 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-500/20"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-slate-700 block mb-1">Contact Phone:</label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full p-2 bg-blue-50/20 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-500/20"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="text-[11px] font-bold text-slate-700 block mb-1">Delivery Address (Dhaka):</label>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full p-2 bg-blue-50/20 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-500/20"
                    required
                  />
                </div>
              </div>

              {/* Payment Methods */}
              <div>
                <label className="text-[11px] font-bold text-slate-700 block mb-2">Select Payment Method:</label>
                <div className="grid grid-cols-4 gap-2">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('bkash')}
                    className={`py-2 px-1 rounded-xl text-center font-bold text-xs border transition-colors cursor-pointer ${
                      paymentMethod === 'bkash'
                        ? 'border-pink-500 bg-pink-50 text-pink-700 font-bold'
                        : 'border-slate-200 hover:border-slate-300 text-slate-700'
                    }`}
                  >
                    bKash
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('nagad')}
                    className={`py-2 px-1 rounded-xl text-center font-bold text-xs border transition-colors cursor-pointer ${
                      paymentMethod === 'nagad'
                        ? 'border-orange-500 bg-orange-50 text-orange-700 font-bold'
                        : 'border-slate-200 hover:border-slate-300 text-slate-700'
                    }`}
                  >
                    Nagad
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('cod')}
                    className={`py-2 px-1 rounded-xl text-center font-bold text-xs border transition-colors cursor-pointer ${
                      paymentMethod === 'cod'
                        ? 'border-emerald-500 bg-emerald-50 text-emerald-800 font-bold'
                        : 'border-slate-200 hover:border-slate-300 text-slate-700'
                    }`}
                  >
                    Cash On Del.
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`py-2 px-1 rounded-xl text-center font-bold text-xs border transition-colors cursor-pointer ${
                      paymentMethod === 'card'
                        ? 'border-blue-600 bg-blue-50 text-blue-700 font-bold'
                        : 'border-slate-200 hover:border-slate-300 text-slate-700'
                    }`}
                  >
                    Visa / MC
                  </button>
                </div>
              </div>

              {/* Order Breakdown */}
              <div className="p-3.5 bg-blue-50/40 rounded-xl border border-blue-100 space-y-1.5 text-xs text-slate-600">
                <div className="flex justify-between">
                  <span>Cart Items ({cart.length}):</span>
                  <span className="font-semibold text-slate-900">৳ {cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Dhaka Express Dispatch:</span>
                  <span className="text-emerald-700 font-semibold">FREE</span>
                </div>
                <div className="flex justify-between font-black text-sm text-slate-950 pt-1 border-t border-blue-100">
                  <span>Total Amount:</span>
                  <span className="text-blue-700 text-base">৳ {cartTotal.toFixed(2)}</span>
                </div>
              </div>

              <button
                type="submit"
                disabled={isProcessing}
                className="w-full py-3 bg-gradient-to-r from-blue-600 via-blue-700 to-emerald-600 hover:from-blue-700 hover:to-emerald-700 disabled:opacity-50 text-white font-bold text-xs sm:text-sm rounded-xl transition-all shadow-md shadow-blue-500/20 flex items-center justify-center gap-2 cursor-pointer active:scale-98"
              >
                {isProcessing ? (
                  <span>Allocating Dispatch Hub...</span>
                ) : (
                  <span>Confirm Order (৳ {cartTotal.toFixed(0)})</span>
                )}
              </button>
              <div className="text-center text-[10px] text-slate-400">
                Protected by 256-Bit SSL Encrypted Gateway · 100% FEFO Cold Chain Guarantee
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
