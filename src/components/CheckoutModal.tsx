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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/70 backdrop-blur-2xs overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden border border-neutral-200 my-8 animate-in fade-in zoom-in-95 duration-200">
        {orderComplete ? (
          <div className="p-6 text-center space-y-4">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-xl font-bold text-neutral-900">Order Confirmed!</h3>
            <p className="text-xs sm:text-sm text-neutral-600">
              Your order <strong className="text-emerald-800 font-mono">#{placedOrderId}</strong> has been allocated to <strong>{selectedHub}</strong>.
            </p>
            <div className="bg-neutral-50 p-4 rounded-xl text-left border border-neutral-200 text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-neutral-500">Delivery Address:</span>
                <span className="font-semibold text-neutral-800">{address}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Express Delivery ETA:</span>
                <span className="font-semibold text-emerald-700">Today within 2 Hours (Pathao Express)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Payment Tender:</span>
                <span className="font-semibold text-neutral-800 uppercase">{paymentMethod} Verified</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Club Cashback Earned:</span>
                <span className="font-bold text-amber-700">+{Math.round(cartTotal * 0.05)} Points</span>
              </div>
            </div>
            <button
              type="button"
              onClick={handleClose}
              className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm rounded-xl transition-colors shadow-sm cursor-pointer"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <div>
            {/* Modal Header */}
            <div className="p-4 border-b border-neutral-200 flex items-center justify-between bg-neutral-50">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-emerald-100 text-emerald-800 rounded-xl">
                  <CreditCard className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-neutral-900">Fast Express Checkout</h3>
                  <p className="text-[11px] text-neutral-500">FEFO Cold-Chain Dispatch · 2-Hour Dhaka Delivery</p>
                </div>
              </div>
              <button
                type="button"
                onClick={handleClose}
                className="text-neutral-400 hover:text-neutral-700 p-1.5 rounded-lg transition-colors cursor-pointer"
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
                      ? 'border-emerald-600 bg-emerald-50/50 shadow-xs'
                      : 'border-neutral-200 hover:border-neutral-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-neutral-900">2-Hour Express</span>
                    {deliverySlot === 'instant' && <Check className="w-3.5 h-3.5 text-emerald-600" />}
                  </div>
                  <div className="text-[11px] text-neutral-500 mt-0.5">Dispatched in thermal cold bag</div>
                </div>

                <div
                  onClick={() => setDeliverySlot('evening')}
                  className={`p-3 rounded-xl border cursor-pointer transition-all ${
                    deliverySlot === 'evening'
                      ? 'border-emerald-600 bg-emerald-50/50 shadow-xs'
                      : 'border-neutral-200 hover:border-neutral-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-neutral-900">Evening Slot</span>
                    {deliverySlot === 'evening' && <Check className="w-3.5 h-3.5 text-emerald-600" />}
                  </div>
                  <div className="text-[11px] text-neutral-500 mt-0.5">7:00 PM – 9:00 PM today</div>
                </div>
              </div>

              {/* Delivery Details */}
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-bold text-neutral-700 block mb-1">Customer Name:</label>
                    <input
                      type="text"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full p-2 bg-neutral-50 border border-neutral-300 rounded-lg text-neutral-900 focus:outline-none focus:border-emerald-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-neutral-700 block mb-1">Contact Phone:</label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full p-2 bg-neutral-50 border border-neutral-300 rounded-lg text-neutral-900 focus:outline-none focus:border-emerald-500"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="text-[11px] font-bold text-neutral-700 block mb-1">Delivery Address (Dhaka):</label>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full p-2 bg-neutral-50 border border-neutral-300 rounded-lg text-neutral-900 focus:outline-none focus:border-emerald-500"
                    required
                  />
                </div>
              </div>

              {/* Payment Methods */}
              <div>
                <label className="text-[11px] font-bold text-neutral-700 block mb-2">Select Payment Method:</label>
                <div className="grid grid-cols-4 gap-2">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('bkash')}
                    className={`py-2 px-1 rounded-xl text-center font-bold text-xs border transition-colors cursor-pointer ${
                      paymentMethod === 'bkash'
                        ? 'border-pink-500 bg-pink-50 text-pink-700 font-bold'
                        : 'border-neutral-200 hover:border-neutral-300 text-neutral-700'
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
                        : 'border-neutral-200 hover:border-neutral-300 text-neutral-700'
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
                        : 'border-neutral-200 hover:border-neutral-300 text-neutral-700'
                    }`}
                  >
                    Cash On Del.
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`py-2 px-1 rounded-xl text-center font-bold text-xs border transition-colors cursor-pointer ${
                      paymentMethod === 'card'
                        ? 'border-sky-500 bg-sky-50 text-sky-700 font-bold'
                        : 'border-neutral-200 hover:border-neutral-300 text-neutral-700'
                    }`}
                  >
                    Visa / MC
                  </button>
                </div>
              </div>

              {/* Order Breakdown */}
              <div className="p-3.5 bg-neutral-50 rounded-xl border border-neutral-200 space-y-1.5 text-xs text-neutral-600">
                <div className="flex justify-between">
                  <span>Cart Items ({cart.length}):</span>
                  <span className="font-semibold text-neutral-900">৳ {cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Dhaka Express Dispatch:</span>
                  <span className="text-emerald-700 font-semibold">FREE</span>
                </div>
                <div className="flex justify-between font-black text-sm text-neutral-950 pt-1 border-t border-neutral-200">
                  <span>Total Amount:</span>
                  <span className="text-emerald-700 text-base">৳ {cartTotal.toFixed(2)}</span>
                </div>
              </div>

              <button
                type="submit"
                disabled={isProcessing}
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 disabled:bg-neutral-300 text-white font-bold text-xs sm:text-sm rounded-xl transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer active:scale-98"
              >
                {isProcessing ? (
                  <span>Allocating Dispatch Hub...</span>
                ) : (
                  <span>Confirm Order (৳ {cartTotal.toFixed(0)})</span>
                )}
              </button>
              <div className="text-center text-[10px] text-neutral-400">
                Protected by 256-Bit SSL Encrypted Gateway · 100% FEFO Cold Chain Guarantee
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
