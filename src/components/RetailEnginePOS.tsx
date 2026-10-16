import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import {
  Layers,
  Store,
  AlertTriangle,
  Barcode,
  Printer,
  Trash2,
  Plus,
  Minus,
  RefreshCw,
  Search,
  ShieldCheck,
  X,
  Thermometer,
  ArrowLeft,
  PackagePlus,
} from 'lucide-react';
import { FEFO_BATCHES } from '@/data/mockData';
import { BatchItem } from '@/types';
import { supabaseService } from '@/lib/supabase';

interface POSCartItem {
  id: string;
  name: string;
  price: number;
  qty: number;
  batchId?: string;
  discount?: number;
}

export const RetailEnginePOS: React.FC = () => {
  const { setCurrentScreen, showToast, selectedHub } = useApp();
  const [batches, setBatches] = useState<BatchItem[]>(FEFO_BATCHES);
  const [filterMode, setFilterMode] = useState<'all' | 'critical' | 'dairy' | 'oil'>('all');
  const [searchFilter, setSearchFilter] = useState('');

  // POS Register Cart State
  const [posCart, setPosCart] = useState<POSCartItem[]>([
    { id: 'pos-1', name: 'Pran UHT Milk 1L', price: 95.0, qty: 2, batchId: 'BNG-2024-089', discount: 10 },
    { id: 'pos-2', name: 'Radhuni Mustard Oil 500ml', price: 195.0, qty: 1, batchId: 'BNG-2024-094' },
    { id: 'pos-3', name: 'Teer Soyabean Oil 5L', price: 890.0, qty: 1, batchId: 'BNG-2024-102' },
  ]);

  const [paymentMode, setPaymentMode] = useState<'cash' | 'bkash' | 'nagad' | 'card'>('bkash');
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);
  const [showReceiveGRNModal, setShowReceiveGRNModal] = useState(false);
  const [lastSettledInvoice, setLastSettledInvoice] = useState<{ id: string; total: number; method: string } | null>(null);

  // New GRN state
  const [newBatchName, setNewBatchName] = useState('Pran UHT Full Cream Milk 1L');
  const [newBatchQty, setNewBatchQty] = useState(50);
  const [newBatchExp, setNewBatchExp] = useState('2026-11-30');
  const [newBatchSupplier, setNewBatchSupplier] = useState('Pran Dairy Ltd');

  // Push batch into POS register
  const handlePushToPOS = (batch: BatchItem) => {
    const existing = posCart.find((item) => item.batchId === batch.batchId);
    if (existing) {
      setPosCart((prev) =>
        prev.map((item) => (item.id === existing.id ? { ...item, qty: item.qty + 1 } : item))
      );
    } else {
      setPosCart((prev) => [
        ...prev,
        {
          id: `pos-${Date.now()}`,
          name: batch.productName,
          price: batch.sellPrice,
          qty: 1,
          batchId: batch.batchId,
          discount: batch.status === 'critical' ? batch.sellPrice * 0.2 : 0,
        },
      ]);
    }
    showToast('Batch Queued on Register', `${batch.productName} (${batch.batchId}) added to terminal.`, 'success');
  };

  const updatePOSQty = (id: string, delta: number) => {
    setPosCart((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const next = item.qty + delta;
            return next > 0 ? { ...item, qty: next } : null;
          }
          return item;
        })
        .filter(Boolean) as POSCartItem[]
    );
  };

  const removePOSItem = (id: string) => {
    setPosCart((prev) => prev.filter((item) => item.id !== id));
  };

  const handleCreateGRN = (e: React.FormEvent) => {
    e.preventDefault();
    const newBatchId = `BNG-2025-${Math.floor(200 + Math.random() * 800)}`;
    const newBatch: BatchItem = {
      batchId: newBatchId,
      sku: 'PRN-MLK-01',
      productName: newBatchName,
      category: 'Dairy & Chilled / Cold Vault A2',
      location: 'Dhanmondi Vault',
      supplier: newBatchSupplier,
      expiryDate: newBatchExp,
      daysRemainingText: 'Fresh Batch (>240d)',
      status: 'safe',
      costPrice: 78.0,
      sellPrice: 95.0,
      stockQty: Number(newBatchQty),
      reservedQty: 0,
    };
    setBatches([newBatch, ...batches]);
    supabaseService.createBatch(newBatch);
    setShowReceiveGRNModal(false);
    showToast('GRN Receipt Logged', `Batch ${newBatchId} registered into ${selectedHub} inventory.`, 'success');
  };

  // Calculations
  const subtotal = posCart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const discountsTotal = posCart.reduce((sum, item) => sum + (item.discount || 0) * item.qty, 0);
  const vatAmount = Math.round((subtotal - discountsTotal) * 0.05); // 5% VAT
  const grandTotal = Math.max(0, subtotal - discountsTotal + vatAmount);

  const handleCompleteSale = () => {
    if (posCart.length === 0) {
      showToast('Register Empty', 'Please add items before completing sale.', 'warning');
      return;
    }
    const invId = `INV-2026-${Math.floor(10000 + Math.random() * 90000)}`;
    setLastSettledInvoice({ id: invId, total: grandTotal, method: paymentMode.toUpperCase() });
    setShowInvoiceModal(true);
    setPosCart([]);
    showToast('Sale Completed', `Tax invoice ${invId} generated & printed. Cash drawer opened.`, 'success');
  };

  // Filtered batch list
  const filteredBatches = batches.filter((b) => {
    const matchesSearch =
      b.productName.toLowerCase().includes(searchFilter.toLowerCase()) ||
      b.batchId.toLowerCase().includes(searchFilter.toLowerCase()) ||
      b.sku.toLowerCase().includes(searchFilter.toLowerCase());
    if (!matchesSearch) return false;
    if (filterMode === 'critical') return b.status === 'critical';
    if (filterMode === 'dairy') return b.category.includes('Dairy');
    if (filterMode === 'oil') return b.category.includes('Oil');
    return true;
  });

  return (
    <div className="min-h-screen bg-neutral-900 text-neutral-100 pb-16">
      {/* 1. High-Density Enterprise POS Top Bar */}
      <div className="bg-neutral-950 border-b border-neutral-800 px-4 py-2.5">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          {/* Left: Terminal ID & Outlet */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setCurrentScreen('storefront')}
              className="flex items-center gap-1 text-xs font-semibold text-neutral-300 hover:text-white bg-neutral-800 px-2.5 py-1 rounded-lg transition-colors cursor-pointer border border-neutral-700"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Exit POS</span>
            </button>
            <div className="h-4 w-px bg-neutral-800" />
            <div className="flex items-center gap-2">
              <span className="font-bold text-sm text-white">Terminal #04</span>
              <span className="text-xs text-neutral-400 font-mono">({selectedHub})</span>
            </div>
          </div>

          {/* Center: Live Cold Vault Telemetry */}
          <div className="hidden md:flex items-center gap-4 text-xs">
            <div className="flex items-center gap-1.5 bg-neutral-900 border border-neutral-800 px-3 py-1 rounded-full text-neutral-300">
              <Thermometer className="w-3.5 h-3.5 text-sky-400" />
              <span>Cold Vault Sensor: <strong className="text-emerald-400">4.2°C Normal</strong></span>
            </div>
            <div className="flex items-center gap-1.5 bg-neutral-900 border border-neutral-800 px-3 py-1 rounded-full text-neutral-300">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>FEFO Routing: <strong className="text-white">Automated First-Expiry</strong></span>
            </div>
          </div>

          {/* Right: Cashier & Quick Action */}
          <div className="flex items-center gap-3 text-xs">
            <div className="text-right hidden sm:block">
              <div className="font-semibold text-neutral-200">Tanvir Ahmed</div>
              <div className="text-[10px] text-neutral-500">Senior Cashier #891</div>
            </div>
            <button
              type="button"
              onClick={() => setShowReceiveGRNModal(true)}
              className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
            >
              <PackagePlus className="w-3.5 h-3.5" />
              <span>Receive New GRN</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Main Two-Column POS Layout */}
      <div className="max-w-7xl mx-auto px-4 py-5">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Left Column (7 cols): FEFO Inventory Matrix & Stock Audit */}
          <div className="lg:col-span-7 space-y-4">
            {/* Search & Filter Toolbar */}
            <div className="bg-neutral-950 p-4 rounded-xl border border-neutral-800 space-y-3">
              <div className="flex flex-col sm:flex-row gap-2.5">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-neutral-500 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    placeholder="Scan Barcode or Search SKU / Batch ID (e.g. BNG-2024-089)..."
                    value={searchFilter}
                    onChange={(e) => setSearchFilter(e.target.value)}
                    className="w-full text-xs pl-9 pr-3 py-2 bg-neutral-900 border border-neutral-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setSearchFilter('');
                    setFilterMode('all');
                    showToast('Inventory Refreshed', 'Live database sync completed.', 'info');
                  }}
                  className="px-3 py-2 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-xs rounded-lg flex items-center justify-center gap-1.5 cursor-pointer border border-neutral-700"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Sync</span>
                </button>
              </div>

              {/* Filter Tabs */}
              <div className="flex items-center gap-2 overflow-x-auto scrollbar-none text-xs">
                <button
                  type="button"
                  onClick={() => setFilterMode('all')}
                  className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer ${
                    filterMode === 'all'
                      ? 'bg-emerald-600 text-white font-semibold'
                      : 'bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-800'
                  }`}
                >
                  All Batches ({batches.length})
                </button>
                <button
                  type="button"
                  onClick={() => setFilterMode('critical')}
                  className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer flex items-center gap-1.5 ${
                    filterMode === 'critical'
                      ? 'bg-rose-600 text-white font-semibold'
                      : 'bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-800'
                  }`}
                >
                  <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
                  <span>Expiring Soon (FEFO Urgent)</span>
                </button>
                <button
                  type="button"
                  onClick={() => setFilterMode('dairy')}
                  className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer ${
                    filterMode === 'dairy'
                      ? 'bg-emerald-600 text-white font-semibold'
                      : 'bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-800'
                  }`}
                >
                  Dairy Vault A2
                </button>
                <button
                  type="button"
                  onClick={() => setFilterMode('oil')}
                  className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer ${
                    filterMode === 'oil'
                      ? 'bg-emerald-600 text-white font-semibold'
                      : 'bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-800'
                  }`}
                >
                  Edible Oils & Ghee
                </button>
              </div>
            </div>

            {/* Inventory Batch Table */}
            <div className="bg-neutral-950 rounded-xl border border-neutral-800 overflow-hidden">
              <div className="p-3 border-b border-neutral-800 flex items-center justify-between text-xs">
                <span className="font-bold text-neutral-300">Live Cold Vault Inventory Matrix</span>
                <span className="text-[11px] text-neutral-500 font-mono">Showing {filteredBatches.length} verified lots</span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-neutral-900/80 text-neutral-400 border-b border-neutral-800 text-[11px]">
                    <tr>
                      <th className="p-3 font-semibold">Batch & SKU</th>
                      <th className="p-3 font-semibold">Product Description</th>
                      <th className="p-3 font-semibold">Expiry & Horizon</th>
                      <th className="p-3 font-semibold">Stock</th>
                      <th className="p-3 font-semibold text-right">Price</th>
                      <th className="p-3 font-semibold text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-800">
                    {filteredBatches.map((batch) => {
                      const isCritical = batch.status === 'critical';
                      return (
                        <tr key={batch.batchId} className="hover:bg-neutral-900/60 transition-colors">
                          <td className="p-3 font-mono">
                            <div className="text-white font-bold">{batch.batchId}</div>
                            <div className="text-[10px] text-neutral-500">{batch.sku}</div>
                          </td>
                          <td className="p-3">
                            <div className="text-neutral-200 font-semibold">{batch.productName}</div>
                            <div className="text-[10px] text-neutral-500">{batch.location} · {batch.supplier}</div>
                          </td>
                          <td className="p-3">
                            <div className="text-neutral-300 font-medium">{batch.expiryDate}</div>
                            <div className={`text-[10px] font-bold ${isCritical ? 'text-rose-400' : 'text-emerald-400'}`}>
                              {batch.daysRemainingText}
                            </div>
                          </td>
                          <td className="p-3">
                            <div className="font-bold text-white">{batch.stockQty} pcs</div>
                            <div className="text-[10px] text-neutral-500">Res: {batch.reservedQty}</div>
                          </td>
                          <td className="p-3 text-right">
                            <div className="font-bold text-emerald-400">৳ {batch.sellPrice.toFixed(2)}</div>
                            <div className="text-[10px] text-neutral-500">Cost: ৳ {batch.costPrice.toFixed(0)}</div>
                          </td>
                          <td className="p-3 text-center">
                            <button
                              type="button"
                              onClick={() => handlePushToPOS(batch)}
                              className="px-2.5 py-1 bg-emerald-700 hover:bg-emerald-600 text-white font-semibold text-[11px] rounded-lg transition-colors cursor-pointer shadow-2xs whitespace-nowrap"
                            >
                              + To POS
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Right Column (5 cols): Live POS Register / Cashier Terminal */}
          <div className="lg:col-span-5 bg-neutral-950 rounded-xl border border-neutral-800 p-5 flex flex-col justify-between space-y-4">
            <div>
              {/* Register Header */}
              <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
                <div className="flex items-center gap-2">
                  <Store className="w-4 h-4 text-emerald-400" />
                  <h3 className="font-bold text-sm text-white">Active Order Ticket</h3>
                </div>
                <span className="text-[11px] font-mono text-neutral-400">
                  {posCart.length} line item(s)
                </span>
              </div>

              {/* Cart List */}
              <div className="space-y-2.5 pt-3 max-h-72 overflow-y-auto pr-1">
                {posCart.length === 0 ? (
                  <div className="text-center py-12 text-neutral-500 text-xs space-y-2">
                    <Barcode className="w-8 h-8 mx-auto text-neutral-700" />
                    <div>No items on register ticket.</div>
                    <div className="text-[11px] text-neutral-600">Scan barcodes or click &apos;+ To POS&apos; from inventory.</div>
                  </div>
                ) : (
                  posCart.map((item) => (
                    <div
                      key={item.id}
                      className="p-3 bg-neutral-900 rounded-lg border border-neutral-800 flex items-center justify-between gap-3 text-xs"
                    >
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold text-neutral-200 truncate">{item.name}</div>
                        <div className="text-[10px] text-neutral-500 font-mono">
                          Batch: {item.batchId || 'STD'} · ৳ {item.price.toFixed(2)} ea
                        </div>
                        {item.discount ? (
                          <span className="text-[10px] text-rose-400 font-semibold">
                            Discount - ৳ {(item.discount * item.qty).toFixed(0)}
                          </span>
                        ) : null}
                      </div>

                      {/* Stepper */}
                      <div className="flex items-center gap-1.5 bg-neutral-950 border border-neutral-700 rounded-lg px-2 py-0.5">
                        <button
                          type="button"
                          onClick={() => updatePOSQty(item.id, -1)}
                          className="text-neutral-400 hover:text-white p-0.5 cursor-pointer"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="font-bold text-white text-xs px-1">{item.qty}</span>
                        <button
                          type="button"
                          onClick={() => updatePOSQty(item.id, 1)}
                          className="text-neutral-400 hover:text-white p-0.5 cursor-pointer"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Line Total */}
                      <div className="text-right min-w-16">
                        <div className="font-bold text-emerald-400">
                          ৳ {((item.price - (item.discount || 0)) * item.qty).toFixed(2)}
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => removePOSItem(item.id)}
                        className="text-neutral-600 hover:text-rose-400 transition-colors p-1 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Financial Totals & Tender Controls */}
            <div className="space-y-4 pt-4 border-t border-neutral-800 text-xs">
              <div className="space-y-1.5 text-neutral-400">
                <div className="flex justify-between">
                  <span>Gross Subtotal:</span>
                  <span className="text-neutral-200">৳ {subtotal.toFixed(2)}</span>
                </div>
                {discountsTotal > 0 && (
                  <div className="flex justify-between text-rose-400 font-medium">
                    <span>FEFO Clearance Markdowns:</span>
                    <span>- ৳ {discountsTotal.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Bangladesh VAT (5%):</span>
                  <span className="text-neutral-200">৳ {vatAmount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm font-black text-white pt-1 border-t border-neutral-800">
                  <span>Net Total Payable:</span>
                  <span className="text-emerald-400 text-base">৳ {grandTotal.toFixed(2)}</span>
                </div>
              </div>

              {/* Payment Method Selector */}
              <div>
                <label className="text-[11px] font-bold text-neutral-400 block mb-1.5 uppercase tracking-wider">
                  Select Tender Method:
                </label>
                <div className="grid grid-cols-4 gap-1.5">
                  <button
                    type="button"
                    onClick={() => setPaymentMode('cash')}
                    className={`py-2 rounded-lg text-center font-bold text-xs transition-colors cursor-pointer border ${
                      paymentMode === 'cash'
                        ? 'bg-emerald-600 text-white border-emerald-500'
                        : 'bg-neutral-900 text-neutral-400 hover:text-white border-neutral-800'
                    }`}
                  >
                    Cash
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMode('bkash')}
                    className={`py-2 rounded-lg text-center font-bold text-xs transition-colors cursor-pointer border ${
                      paymentMode === 'bkash'
                        ? 'bg-pink-600 text-white border-pink-500'
                        : 'bg-neutral-900 text-neutral-400 hover:text-white border-neutral-800'
                    }`}
                  >
                    bKash
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMode('nagad')}
                    className={`py-2 rounded-lg text-center font-bold text-xs transition-colors cursor-pointer border ${
                      paymentMode === 'nagad'
                        ? 'bg-orange-600 text-white border-orange-500'
                        : 'bg-neutral-900 text-neutral-400 hover:text-white border-neutral-800'
                    }`}
                  >
                    Nagad
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMode('card')}
                    className={`py-2 rounded-lg text-center font-bold text-xs transition-colors cursor-pointer border ${
                      paymentMode === 'card'
                        ? 'bg-blue-600 text-white border-blue-500'
                        : 'bg-neutral-900 text-neutral-400 hover:text-white border-neutral-800'
                    }`}
                  >
                    POS Card
                  </button>
                </div>
              </div>

              {/* Quick Cash Presets */}
              {paymentMode === 'cash' && (
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      showToast('Tender Received', `৳ 500 cash tendered. Change: ৳ ${Math.max(0, 500 - grandTotal).toFixed(0)}`, 'info')
                    }
                    className="flex-1 py-1.5 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 rounded text-neutral-300 text-[11px] font-bold cursor-pointer"
                  >
                    ৳ 500
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      showToast('Tender Received', `৳ 1,000 cash tendered. Change: ৳ ${Math.max(0, 1000 - grandTotal).toFixed(0)}`, 'info')
                    }
                    className="flex-1 py-1.5 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 rounded text-neutral-300 text-[11px] font-bold cursor-pointer"
                  >
                    ৳ 1,000
                  </button>
                  <button
                    type="button"
                    onClick={() => showToast('Tender Received', 'Exact cash tendered. Zero change.', 'info')}
                    className="flex-1 py-1.5 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 rounded text-neutral-300 text-[11px] font-bold cursor-pointer"
                  >
                    Exact
                  </button>
                </div>
              )}

              {/* Final Action Buttons */}
              <div className="flex items-center gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setPosCart([])}
                  className="px-3 py-3 bg-neutral-900 hover:bg-neutral-800 text-neutral-400 hover:text-white font-semibold rounded-xl text-xs border border-neutral-800 cursor-pointer"
                  title="Void Transaction"
                >
                  Clear
                </button>
                <button
                  type="button"
                  onClick={handleCompleteSale}
                  className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer active:scale-98"
                >
                  <Printer className="w-4 h-4" />
                  <span>Settle & Print Tax Invoice (৳ {grandTotal.toFixed(0)})</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. NBR-Compliant Tax Invoice Receipt Modal */}
      {showInvoiceModal && lastSettledInvoice && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
          <div className="bg-white text-neutral-900 rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-neutral-200 text-xs">
            <div className="text-center space-y-1 border-b border-neutral-200 pb-3">
              <div className="font-black text-base text-neutral-950">BENGAL COMMERCE LTD.</div>
              <div className="text-[11px] text-neutral-500">Dhaka Vault Hub #04, Road 27, Dhanmondi, Dhaka</div>
              <div className="text-[11px] font-mono font-semibold text-neutral-700">BIN: 002910481-0101 (NBR VAT Registered)</div>
            </div>

            <div className="flex justify-between text-[11px] text-neutral-600">
              <div>Invoice: <strong className="font-mono text-neutral-900">{lastSettledInvoice.id}</strong></div>
              <div>Tender: <strong className="uppercase text-emerald-700">{lastSettledInvoice.method}</strong></div>
            </div>

            <div className="bg-neutral-50 p-3 rounded-xl border border-neutral-200 font-mono text-[11px] space-y-1.5">
              <div className="flex justify-between border-b border-neutral-200 pb-1 font-bold">
                <span>ITEM</span>
                <span>TOTAL</span>
              </div>
              <div className="flex justify-between">
                <span>Pran UHT Full Cream Milk 1L</span>
                <span>৳ 95.00</span>
              </div>
              <div className="flex justify-between">
                <span>Radhuni Mustard Oil 500ml</span>
                <span>৳ 195.00</span>
              </div>
              <div className="flex justify-between text-neutral-500">
                <span>5% Bangladesh VAT Included</span>
                <span>৳ 14.50</span>
              </div>
              <div className="flex justify-between border-t border-neutral-200 pt-1 font-bold text-sm text-neutral-950">
                <span>PAID TOTAL</span>
                <span>৳ {lastSettledInvoice.total.toFixed(2)}</span>
              </div>
            </div>

            <div className="text-center text-[10px] text-neutral-500">
              FEFO Verified Freshness · 24-Hour Swap Guarantee Active
            </div>

            <div className="flex items-center gap-2 pt-2">
              <button
                type="button"
                onClick={() => {
                  window.print?.();
                  showToast('Print Triggered', 'Thermal receipt sent to POS EPSON TM-T88VI.', 'success');
                }}
                className="flex-1 py-2.5 bg-neutral-900 text-white font-bold rounded-xl text-xs cursor-pointer flex items-center justify-center gap-1.5"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Thermal Slip</span>
              </button>
              <button
                type="button"
                onClick={() => setShowInvoiceModal(false)}
                className="px-4 py-2.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 font-semibold rounded-xl text-xs cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 4. Goods Received Note (GRN) Modal */}
      {showReceiveGRNModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
          <div className="bg-neutral-950 text-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-neutral-800 text-xs">
            <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
              <div className="flex items-center gap-2">
                <PackagePlus className="w-4 h-4 text-emerald-400" />
                <h3 className="font-bold text-sm text-white">Receive Goods (GRN Entry)</h3>
              </div>
              <button
                type="button"
                onClick={() => setShowReceiveGRNModal(false)}
                className="text-neutral-400 hover:text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateGRN} className="space-y-3">
              <div>
                <label className="text-[11px] text-neutral-400 block mb-1">Product Description:</label>
                <input
                  type="text"
                  value={newBatchName}
                  onChange={(e) => setNewBatchName(e.target.value)}
                  className="w-full p-2 bg-neutral-900 border border-neutral-700 rounded-lg text-white"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] text-neutral-400 block mb-1">Quantity Received:</label>
                  <input
                    type="number"
                    value={newBatchQty}
                    onChange={(e) => setNewBatchQty(Number(e.target.value))}
                    className="w-full p-2 bg-neutral-900 border border-neutral-700 rounded-lg text-white"
                    min="1"
                    required
                  />
                </div>
                <div>
                  <label className="text-[11px] text-neutral-400 block mb-1">Expiry Date:</label>
                  <input
                    type="date"
                    value={newBatchExp}
                    onChange={(e) => setNewBatchExp(e.target.value)}
                    className="w-full p-2 bg-neutral-900 border border-neutral-700 rounded-lg text-white"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] text-neutral-400 block mb-1">Supplier / Factory:</label>
                <input
                  type="text"
                  value={newBatchSupplier}
                  onChange={(e) => setNewBatchSupplier(e.target.value)}
                  className="w-full p-2 bg-neutral-900 border border-neutral-700 rounded-lg text-white"
                  required
                />
              </div>

              <div className="bg-neutral-900 p-3 rounded-lg border border-neutral-800 text-[11px] text-neutral-400">
                <span className="text-emerald-400 font-semibold">BSTI BDS-CAC-1 Compliance:</span> Cold vault temperature will be verified at 4.2°C before slotting into Dhanmondi Vault.
              </div>

              <div className="flex items-center gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowReceiveGRNModal(false)}
                  className="flex-1 py-2.5 bg-neutral-900 text-neutral-400 hover:text-white rounded-xl font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl shadow-xs cursor-pointer"
                >
                  Log into Vault
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
