import React, { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import {
  MOCK_SUBSCRIPTIONS,
  SubscriptionItem,
  formatINR,
  LedgerType,
} from '../data/subscriptions';
import {
  Briefcase,
  User,
  Plus,
  Calendar,
  Receipt,
  FileText,
  CheckCircle2,
  Trash2,
  Clock,
  Building2,
  Check,
  Tag,
  Sparkles,
  Zap,
} from 'lucide-react';

interface InteractiveCockpitProps {
  onOpenAuth: (mode?: 'signup' | 'signin') => void;
}

export const InteractiveCockpit: React.FC<InteractiveCockpitProps> = ({ onOpenAuth }) => {
  const shouldReduceMotion = useReducedMotion();
  const [activeLedger, setActiveLedger] = useState<'all' | 'personal' | 'business'>('all');
  const [activeView, setActiveView] = useState<'items' | 'history' | 'tax'>('items');
  const [subscriptions, setSubscriptions] = useState<SubscriptionItem[]>(MOCK_SUBSCRIPTIONS);
  const [showAddForm, setShowAddForm] = useState(false);
  const [latestAddedId, setLatestAddedId] = useState<string | null>(null);

  // Form states
  const [newSubName, setNewSubName] = useState('');
  const [newSubAmount, setNewSubAmount] = useState('1200');
  const [newSubLedger, setNewSubLedger] = useState<LedgerType>('business');
  const [newSubCategory, setNewSubCategory] = useState('Software & Tools');
  const [newSubGST, setNewSubGST] = useState(18);
  const [newSubTaxDeductible, setNewSubTaxDeductible] = useState(true);

  // Review states
  const [reviewedIds, setReviewedIds] = useState<Set<string>>(new Set());

  // Calculations
  const personalItems = subscriptions.filter((s) => s.ledger === 'personal');
  const businessItems = subscriptions.filter((s) => s.ledger === 'business');

  const personalMonthlyTotal = personalItems.reduce((acc, s) => acc + s.monthlyINR, 0);
  const businessMonthlyTotal = businessItems.reduce((acc, s) => acc + s.monthlyINR, 0);
  const aggregateMonthlyTotal = subscriptions.reduce((acc, s) => acc + s.monthlyINR, 0);

  // Tax summary metrics
  const taxDeductibleItems = businessItems.filter((s) => s.isTaxDeductible);
  const totalMonthlyTaxDocumented = subscriptions.reduce(
    (acc, s) => acc + (s.taxAmountINR || Math.round((s.monthlyINR * s.gstRate) / 100)),
    0
  );
  const annualTaxDocumented = totalMonthlyTaxDocumented * 12;

  // Filter for display
  const displayedItems = subscriptions.filter((s) => {
    if (activeLedger === 'all') return true;
    return s.ledger === activeLedger;
  });

  const triggerAddAnimation = (newItem: SubscriptionItem) => {
    setSubscriptions((prev) => [newItem, ...prev]);
    setLatestAddedId(newItem.id);
    setTimeout(() => {
      setLatestAddedId((curr) => (curr === newItem.id ? null : curr));
    }, 2800);
  };

  const handleAddSubscription = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSubName.trim()) return;

    const amt = parseFloat(newSubAmount) || 999;
    const calculatedTax = Math.round((amt * newSubGST) / 100);
    const newItem: SubscriptionItem = {
      id: `custom-${Date.now()}`,
      name: newSubName.trim(),
      provider: newSubName.trim(),
      ledger: newSubLedger,
      category: newSubCategory,
      monthlyINR: amt,
      cycle: 'monthly',
      nextRenewalDays: 14,
      nextRenewalDate: 'Nov 19, 2026',
      status: 'active',
      cardLastFour: '4242',
      gstRate: newSubGST,
      taxAmountINR: calculatedTax,
      isTaxDeductible: newSubTaxDeductible,
      gstinVerified: true,
      hsnSacCode: newSubGST > 0 ? '998319' : undefined,
      history: [
        {
          id: `h-${Date.now()}`,
          date: 'Oct 19, 2026',
          amountINR: amt,
          invoiceNumber: `INV-${Math.floor(1000 + Math.random() * 9000)}`,
          status: 'paid',
          paymentMode: newSubLedger === 'business' ? 'Corporate Card' : 'UPI AutoPay',
        },
      ],
    };

    triggerAddAnimation(newItem);
    setNewSubName('');
    setShowAddForm(false);
  };

  const handleQuickAddPreset = (preset: {
    name: string;
    amount: number;
    ledger: LedgerType;
    category: string;
    gstRate: number;
    isTaxDeductible: boolean;
  }) => {
    const calculatedTax = Math.round((preset.amount * preset.gstRate) / 100);
    const newItem: SubscriptionItem = {
      id: `preset-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      name: preset.name,
      provider: preset.name,
      ledger: preset.ledger,
      category: preset.category,
      monthlyINR: preset.amount,
      cycle: 'monthly',
      nextRenewalDays: Math.floor(Math.random() * 20) + 3,
      nextRenewalDate: 'Nov 24, 2026',
      status: 'active',
      cardLastFour: '8831',
      gstRate: preset.gstRate,
      taxAmountINR: calculatedTax,
      isTaxDeductible: preset.isTaxDeductible,
      gstinVerified: true,
      hsnSacCode: preset.gstRate > 0 ? '998319' : undefined,
      history: [
        {
          id: `h-${Date.now()}`,
          date: 'Oct 24, 2026',
          amountINR: preset.amount,
          invoiceNumber: `INV-${Math.floor(1000 + Math.random() * 9000)}`,
          status: 'paid',
          paymentMode: preset.ledger === 'business' ? 'Corporate Card' : 'UPI AutoPay',
        },
      ],
    };

    triggerAddAnimation(newItem);
  };

  const handleResetDefaults = () => {
    setSubscriptions(MOCK_SUBSCRIPTIONS);
  };

  const handleDeleteItem = (id: string) => {
    setSubscriptions((prev) => prev.filter((s) => s.id !== id));
  };

  const toggleReviewed = (id: string) => {
    const next = new Set(reviewedIds);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setReviewedIds(next);
  };

  return (
    <section id="cockpit" className="py-24 bg-[#EDEAE1] border-y border-[#E2DED4] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <div className="text-xs font-bold uppercase tracking-widest text-[#B18B58] mb-2">
              Unified Financial Cockpit
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#252922] mb-3">
              Dual Ledgers & Tax Management in Action.
            </h2>
            <p className="text-sm sm:text-base text-[#65685F] leading-relaxed">
              Organize personal lifestyle subscriptions alongside corporate software expenses. Inspect GST tax deductibility, review past billing histories, and add custom entries in INR.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="px-4 py-2.5 text-xs font-semibold rounded-xl bg-[#FFFFFF] text-[#252922] border border-[#E2DED4] hover:bg-[#FAF9F5] transition-colors flex items-center gap-1.5 shadow-2xs"
            >
              <Plus className="w-4 h-4 text-[#667267]" />
              <span>{showAddForm ? 'Close Entry Form' : 'Add Expense / Subscription'}</span>
            </button>
            <button
              onClick={() => onOpenAuth('signup')}
              className="px-4 py-2.5 text-xs font-semibold rounded-xl bg-[#667267] hover:bg-[#505D52] text-white transition-colors shadow-2xs"
            >
              Sync Your Real Ledger
            </button>
          </div>
        </div>

        {/* Add subscription inline drawer */}
        {showAddForm && (
          <form
            onSubmit={handleAddSubscription}
            className="mb-8 p-6 bg-[#FFFFFF] rounded-2xl border border-[#CBC6BA] shadow-md animate-fade-in"
          >
            <div className="text-xs font-bold text-[#252922] uppercase tracking-wider mb-4 flex items-center gap-2">
              <Plus className="w-4 h-4 text-[#B18B58]" />
              <span>Add to Sandbox Ledger</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
              <div>
                <label className="block text-xs font-medium text-[#65685F] mb-1">
                  Service / Expense Name
                </label>
                <input
                  type="text"
                  value={newSubName}
                  onChange={(e) => setNewSubName(e.target.value)}
                  placeholder="e.g. Slack Pro or Hotstar"
                  className="w-full px-3 py-2 text-xs bg-[#FAF9F5] border border-[#E2DED4] rounded-lg text-[#252922] focus:outline-none focus:ring-2 focus:ring-[#9AA697]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#65685F] mb-1">
                  Monthly Cost (INR ₹)
                </label>
                <input
                  type="number"
                  value={newSubAmount}
                  onChange={(e) => setNewSubAmount(e.target.value)}
                  placeholder="1200"
                  className="w-full px-3 py-2 text-xs bg-[#FAF9F5] border border-[#E2DED4] rounded-lg text-[#252922] focus:outline-none focus:ring-2 focus:ring-[#9AA697]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#65685F] mb-1">
                  Target Ledger
                </label>
                <select
                  value={newSubLedger}
                  onChange={(e) => setNewSubLedger(e.target.value as LedgerType)}
                  className="w-full px-3 py-2 text-xs bg-[#FAF9F5] border border-[#E2DED4] rounded-lg text-[#252922] focus:outline-none focus:ring-2 focus:ring-[#9AA697]"
                >
                  <option value="business">Business Ledger (Tax / GST)</option>
                  <option value="personal">Personal Ledger (Lifestyle)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#65685F] mb-1">
                  GST Rate
                </label>
                <select
                  value={newSubGST}
                  onChange={(e) => setNewSubGST(parseInt(e.target.value))}
                  className="w-full px-3 py-2 text-xs bg-[#FAF9F5] border border-[#E2DED4] rounded-lg text-[#252922] focus:outline-none focus:ring-2 focus:ring-[#9AA697]"
                >
                  <option value="18">18% Standard GST (Software / Cloud)</option>
                  <option value="12">12% Reduced GST</option>
                  <option value="5">5% Essential GST</option>
                  <option value="0">0% Exempt</option>
                </select>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-[#E2DED4]">
              <label className="flex items-center gap-2 text-xs text-[#252922] cursor-pointer">
                <input
                  type="checkbox"
                  checked={newSubTaxDeductible}
                  onChange={(e) => setNewSubTaxDeductible(e.target.checked)}
                  className="rounded text-[#667267] focus:ring-[#9AA697]"
                />
                <span>Classify as Tax Deductible Business Expense (included in Tax Summary report)</span>
              </label>

              <button
                type="submit"
                className="px-5 py-2 bg-[#667267] hover:bg-[#505D52] text-white text-xs font-semibold rounded-lg transition-colors shadow-xs"
              >
                Insert into Ledger
              </button>
            </div>
          </form>
        )}

        {/* Cockpit Card Container */}
        <div className="bg-[#FFFFFF] rounded-2xl sm:rounded-3xl border border-[#CBC6BA] shadow-lg overflow-hidden">
          {/* Top Control Bar */}
          <div className="p-4 sm:p-6 border-b border-[#E2DED4] bg-[#FAF9F5] flex flex-wrap items-center justify-between gap-4">
            {/* Ledger selector tabs */}
            <div className="flex items-center gap-1.5 p-1 bg-[#EDEAE1] rounded-xl border border-[#E2DED4]">
              <button
                onClick={() => setActiveLedger('all')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                  activeLedger === 'all'
                    ? 'bg-[#FFFFFF] text-[#252922] shadow-xs'
                    : 'text-[#65685F] hover:text-[#252922]'
                }`}
              >
                Combined Ledger ({subscriptions.length})
              </button>
              <button
                onClick={() => setActiveLedger('personal')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 ${
                  activeLedger === 'personal'
                    ? 'bg-[#FFFFFF] text-[#252922] shadow-xs'
                    : 'text-[#65685F] hover:text-[#252922]'
                }`}
              >
                <User className="w-3.5 h-3.5 text-[#667267]" />
                <span>Personal ({personalItems.length})</span>
              </button>
              <button
                onClick={() => setActiveLedger('business')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 ${
                  activeLedger === 'business'
                    ? 'bg-[#FFFFFF] text-[#252922] shadow-xs'
                    : 'text-[#65685F] hover:text-[#252922]'
                }`}
              >
                <Briefcase className="w-3.5 h-3.5 text-[#B18B58]" />
                <span>Business ({businessItems.length})</span>
              </button>
            </div>

            {/* View Mode: Items vs Billing History vs Tax Management */}
            <div className="flex items-center gap-1">
              <button
                onClick={() => setActiveView('items')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                  activeView === 'items'
                    ? 'bg-[#667267] text-white'
                    : 'text-[#65685F] hover:bg-[#EDEAE1]'
                }`}
              >
                Active Subscriptions
              </button>
              <button
                onClick={() => setActiveView('history')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                  activeView === 'history'
                    ? 'bg-[#667267] text-white'
                    : 'text-[#65685F] hover:bg-[#EDEAE1]'
                }`}
              >
                Billing History
              </button>
              <button
                onClick={() => setActiveView('tax')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-1 ${
                  activeView === 'tax'
                    ? 'bg-[#B18B58] text-white'
                    : 'text-[#65685F] hover:bg-[#EDEAE1]'
                }`}
              >
                <Receipt className="w-3 h-3" />
                <span>Tax & GST Hub</span>
              </button>
            </div>
          </div>

          {/* Quick Stats Strip */}
          <div className="px-6 py-3.5 bg-[#FAF9F5] border-b border-[#E2DED4] grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono">
            <div>
              <span className="text-[11px] text-[#898A80] block font-sans">
                Personal Monthly
              </span>
              <span className="font-bold text-[#252922] text-sm">
                {formatINR(personalMonthlyTotal)}
              </span>
            </div>
            <div>
              <span className="text-[11px] text-[#898A80] block font-sans">
                Business Monthly
              </span>
              <span className="font-bold text-[#B18B58] text-sm">
                {formatINR(businessMonthlyTotal)}
              </span>
            </div>
            <div>
              <span className="text-[11px] text-[#898A80] block font-sans">
                Monthly Tax Documented
              </span>
              <span className="font-bold text-[#42634A] text-sm">
                {formatINR(totalMonthlyTaxDocumented)}
              </span>
            </div>
            <div>
              <span className="text-[11px] text-[#898A80] block font-sans">
                Total Monthly Outflow
              </span>
              <span className="font-bold text-[#252922] text-sm">
                {formatINR(aggregateMonthlyTotal)}
              </span>
            </div>
          </div>

          {/* Quick Transaction Simulator Bar */}
          <div className="px-4 sm:px-6 py-3 bg-[#FAF9F5] border-b border-[#E2DED4] flex flex-col lg:flex-row lg:items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-xs font-medium text-[#65685F]">
              <Zap className="w-3.5 h-3.5 text-[#B18B58] shrink-0" />
              <span className="font-semibold text-[#252922]">Test Transaction Animation:</span>
              <span className="hidden sm:inline text-[11px] text-[#898A80]">
                One-tap simulate incoming charges with 60fps GPU spring entry
              </span>
            </div>
            <div className="flex items-center gap-2 overflow-x-auto pb-1 lg:pb-0">
              <button
                type="button"
                onClick={() =>
                  handleQuickAddPreset({
                    name: 'AWS Cloud Hosting',
                    amount: 3400,
                    ledger: 'business',
                    category: 'Cloud & Infrastructure',
                    gstRate: 18,
                    isTaxDeductible: true,
                  })
                }
                className="px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-[#FFFFFF] border border-[#E2DED4] hover:border-[#667267] text-[#252922] transition-colors whitespace-nowrap shrink-0 flex items-center gap-1 shadow-2xs hover:bg-[#FAF9F5]"
              >
                <Plus className="w-3 h-3 text-[#667267]" />
                <span>+ AWS (₹3,400)</span>
              </button>
              <button
                type="button"
                onClick={() =>
                  handleQuickAddPreset({
                    name: 'Claude Pro Workspace',
                    amount: 1999,
                    ledger: 'business',
                    category: 'Developer Tools',
                    gstRate: 18,
                    isTaxDeductible: true,
                  })
                }
                className="px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-[#FFFFFF] border border-[#E2DED4] hover:border-[#667267] text-[#252922] transition-colors whitespace-nowrap shrink-0 flex items-center gap-1 shadow-2xs hover:bg-[#FAF9F5]"
              >
                <Plus className="w-3 h-3 text-[#B18B58]" />
                <span>+ Claude (₹1,999)</span>
              </button>
              <button
                type="button"
                onClick={() =>
                  handleQuickAddPreset({
                    name: 'Hotstar Premium',
                    amount: 299,
                    ledger: 'personal',
                    category: 'Entertainment',
                    gstRate: 18,
                    isTaxDeductible: false,
                  })
                }
                className="px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-[#FFFFFF] border border-[#E2DED4] hover:border-[#667267] text-[#252922] transition-colors whitespace-nowrap shrink-0 flex items-center gap-1 shadow-2xs hover:bg-[#FAF9F5]"
              >
                <Plus className="w-3 h-3 text-[#667267]" />
                <span>+ Hotstar (₹299)</span>
              </button>
              <button
                type="button"
                onClick={() =>
                  handleQuickAddPreset({
                    name: 'Notion Team Plan',
                    amount: 850,
                    ledger: 'business',
                    category: 'Productivity',
                    gstRate: 18,
                    isTaxDeductible: true,
                  })
                }
                className="px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-[#FFFFFF] border border-[#E2DED4] hover:border-[#667267] text-[#252922] transition-colors whitespace-nowrap shrink-0 flex items-center gap-1 shadow-2xs hover:bg-[#FAF9F5]"
              >
                <Plus className="w-3 h-3 text-[#667267]" />
                <span>+ Notion (₹850)</span>
              </button>
              {subscriptions.length !== MOCK_SUBSCRIPTIONS.length && (
                <button
                  type="button"
                  onClick={handleResetDefaults}
                  className="px-2.5 py-1.5 rounded-lg text-xs font-medium text-[#898A80] hover:text-[#252922] hover:bg-[#EDEAE1] transition-colors whitespace-nowrap shrink-0"
                >
                  Reset List
                </button>
              )}
            </div>
          </div>

          {/* Content Area */}
          <div className="p-4 sm:p-6">
            <AnimatePresence mode="wait">
              {activeView === 'tax' ? (
                /* Tax & GST Hub View */
                <motion.div
                  key="tax"
                  initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -6 }}
                  transition={{ duration: 0.18 }}
                  className="space-y-6"
                >
                  <div className="p-5 rounded-2xl bg-[#E7EEE7] border border-[#CBC6BA] flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#42634A] text-white flex items-center justify-center shrink-0">
                        <Receipt className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-0.5">
                          <h4 className="text-sm font-bold text-[#42634A]">
                            Tax Summary Engine
                          </h4>
                          <span className="text-[10px] font-mono font-semibold bg-[#42634A]/10 text-[#42634A] px-2 py-0.5 rounded-md">
                            Up to 400 days & 20,000 rows
                          </span>
                        </div>
                        <p className="text-xs text-[#65685F]">
                          We provide clean Tax Summaries of all documented taxes and deductible business expenses—supporting up to 400 days per request and 20,000 tagged rows per summary for effortless CA reconciliation.
                        </p>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="text-xs text-[#65685F] block">Annual Tax Documented:</span>
                      <span className="text-xl font-bold font-mono text-[#42634A]">
                        {formatINR(annualTaxDocumented)} /year
                      </span>
                    </div>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-xs text-left">
                      <thead className="bg-[#FAF9F5] border-y border-[#E2DED4] text-[#65685F] uppercase font-semibold">
                        <tr>
                          <th className="py-3 px-4">Service</th>
                          <th className="py-3 px-4">Ledger</th>
                          <th className="py-3 px-4">HSN/SAC</th>
                          <th className="py-3 px-4">GST Rate</th>
                          <th className="py-3 px-4">Monthly Cost</th>
                          <th className="py-3 px-4">Tax Paid (GST)</th>
                          <th className="py-3 px-4">Classification</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#E2DED4]">
                        {subscriptions.map((sub) => {
                          const taxAmt = sub.taxAmountINR || Math.round((sub.monthlyINR * sub.gstRate) / 100);
                          return (
                            <tr key={sub.id} className="hover:bg-[#FAF9F5] transition-colors">
                              <td className="py-3 px-4 font-semibold text-[#252922]">
                                {sub.name}
                              </td>
                              <td className="py-3 px-4">
                                <span
                                  className={`px-2 py-0.5 rounded-md text-[11px] font-semibold ${
                                    sub.ledger === 'business'
                                      ? 'bg-[#F4EBDD] text-[#89632F]'
                                      : 'bg-[#EDEAE1] text-[#65685F]'
                                  }`}
                                >
                                  {sub.ledger}
                                </span>
                              </td>
                              <td className="py-3 px-4 font-mono text-[#65685F]">
                                {sub.hsnSacCode || 'N/A'}
                              </td>
                              <td className="py-3 px-4 font-mono text-[#65685F]">
                                {sub.gstRate}%
                              </td>
                              <td className="py-3 px-4 font-mono font-bold text-[#252922]">
                                {formatINR(sub.monthlyINR)}
                              </td>
                              <td className="py-3 px-4 font-mono font-semibold text-[#42634A]">
                                {taxAmt > 0 ? formatINR(taxAmt) : '₹0'}
                              </td>
                              <td className="py-3 px-4">
                                {sub.isTaxDeductible ? (
                                  <span className="inline-flex items-center gap-1 text-[#42634A] font-semibold">
                                    <Check className="w-3.5 h-3.5" /> 100% Tax Deductible
                                  </span>
                                ) : (
                                  <span className="text-[#898A80]">Personal / Non-deductible</span>
                                )}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </motion.div>
              ) : activeView === 'history' ? (
                /* Billing History & Past Invoices View */
                <motion.div
                  key="history"
                  initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -6 }}
                  transition={{ duration: 0.18 }}
                  className="space-y-4"
                >
                  <div className="flex items-center justify-between pb-3 border-b border-[#E2DED4]">
                    <div>
                      <h4 className="text-sm font-bold text-[#252922]">
                        Historical Billing & Invoice Registry
                      </h4>
                      <p className="text-xs text-[#65685F]">
                        Recorded transactions and invoice archives across personal and business accounts.
                      </p>
                    </div>
                    <span className="text-xs font-mono text-[#898A80]">
                      Encrypted Statement Ledger
                    </span>
                  </div>

                  <div className="divide-y divide-[#E2DED4]">
                    {displayedItems.flatMap((s) =>
                      s.history.map((h) => (
                        <div
                          key={h.id}
                          className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-[#FAF9F5] px-3 rounded-xl transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-[#EDEAE1] text-[#667267] flex items-center justify-center font-mono text-xs font-bold shrink-0">
                              <FileText className="w-4 h-4" />
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-semibold text-xs text-[#252922]">
                                  {s.name}
                                </span>
                                <span className="font-mono text-[11px] text-[#898A80]">
                                  {h.invoiceNumber}
                                </span>
                              </div>
                              <div className="flex items-center gap-2 text-[11px] text-[#65685F]">
                                <span>{h.date}</span>
                                <span aria-hidden="true">·</span>
                                <span>{h.paymentMode}</span>
                                <span aria-hidden="true">·</span>
                                <span className="capitalize">{s.ledger} ledger</span>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-4 justify-between sm:justify-end">
                            <span className="font-mono font-bold text-xs text-[#252922]">
                              {formatINR(h.amountINR)}
                            </span>
                            <span className="text-[11px] font-semibold text-[#42634A] bg-[#E7EEE7] px-2 py-0.5 rounded-md">
                              Paid
                            </span>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </motion.div>
              ) : (
                /* Active Subscriptions View with Motion animations */
                <motion.div
                  key="items"
                  initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -6 }}
                  transition={{ duration: 0.18 }}
                  className="space-y-3"
                >
                  <div className="flex items-center justify-between pb-1 text-xs text-[#65685F]">
                    <span className="font-medium">
                      Showing {displayedItems.length} active subscription{displayedItems.length === 1 ? '' : 's'}
                    </span>
                    <span className="text-[11px] font-mono text-[#898A80]">
                      {shouldReduceMotion ? 'Hardware Accelerated' : '60 FPS Motion · GPU Compositor'}
                    </span>
                  </div>

                  <div className="divide-y divide-[#E2DED4]">
                    <AnimatePresence initial={false}>
                      {displayedItems.length === 0 ? (
                        <motion.div
                          key="empty"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="py-12 text-center"
                        >
                          <p className="text-xs text-[#65685F] mb-3">No subscriptions found in this view.</p>
                          <button
                            type="button"
                            onClick={handleResetDefaults}
                            className="px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-[#667267] text-white hover:bg-[#505D52] transition-colors shadow-2xs"
                          >
                            Reset Sample Data
                          </button>
                        </motion.div>
                      ) : (
                        displayedItems.map((sub) => {
                          const isReviewed = reviewedIds.has(sub.id);
                          const isSoon = sub.nextRenewalDays <= 3;
                          const isJustAdded = sub.id === latestAddedId;
                          return (
                            <motion.div
                              key={sub.id}
                              layout={!shouldReduceMotion}
                              initial={
                                shouldReduceMotion
                                  ? { opacity: 0 }
                                  : { opacity: 0, y: -16, scale: 0.98 }
                              }
                              animate={{ opacity: 1, y: 0, scale: 1 }}
                              exit={
                                shouldReduceMotion
                                  ? { opacity: 0 }
                                  : { opacity: 0, height: 0, scale: 0.95, overflow: 'hidden' }
                              }
                              transition={{
                                duration: 0.22,
                                ease: [0.16, 1, 0.3, 1],
                              }}
                              className={`py-3.5 sm:py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-3 rounded-xl transition-colors ${
                                isJustAdded
                                  ? 'bg-[#E7EEE7] ring-1 ring-[#42634A]/40'
                                  : 'hover:bg-[#FAF9F5]'
                              }`}
                            >
                              {/* Left: Name, Category, Ledger Tag */}
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-[#EDEAE1] text-[#667267] flex items-center justify-center font-bold text-xs uppercase shrink-0 border border-[#CBC6BA]">
                                  {sub.name.slice(0, 2)}
                                </div>
                                <div>
                                  <div className="flex items-center gap-2 flex-wrap">
                                    <span className="font-semibold text-sm text-[#252922]">
                                      {sub.name}
                                    </span>
                                    <span
                                      className={`text-[10px] font-semibold px-2 py-0.5 rounded-md ${
                                        sub.ledger === 'business'
                                          ? 'bg-[#F4EBDD] text-[#89632F]'
                                          : 'bg-[#EDEAE1] text-[#65685F]'
                                      }`}
                                    >
                                      {sub.ledger.toUpperCase()}
                                    </span>
                                    {sub.isTaxDeductible && (
                                      <span className="text-[10px] font-semibold text-[#42634A] bg-[#E7EEE7] px-1.5 py-0.5 rounded-md">
                                        Tax Deductible ({sub.gstRate}% GST)
                                      </span>
                                    )}
                                    {isJustAdded && (
                                      <span className="text-[10px] font-bold text-[#42634A] bg-[#FFFFFF] border border-[#42634A]/30 px-1.5 py-0.5 rounded-md animate-pulse">
                                        Just Added
                                      </span>
                                    )}
                                  </div>
                                  {/* Unboxed metadata */}
                                  <div className="flex items-center gap-2 text-xs text-[#65685F] mt-0.5">
                                    <span>{sub.category}</span>
                                    <span aria-hidden="true">·</span>
                                    <span>Renews {sub.nextRenewalDate}</span>
                                    <span aria-hidden="true">·</span>
                                    <span>Account ···· {sub.cardLastFour}</span>
                                  </div>
                                </div>
                              </div>

                              {/* Right: Cost and Actions */}
                              <div className="flex items-center justify-between sm:justify-end gap-4">
                                <div className="text-left sm:text-right">
                                  <div className="font-mono font-bold text-sm text-[#252922]">
                                    {formatINR(sub.monthlyINR)}
                                    <span className="text-[10px] text-[#898A80] font-normal"> /mo</span>
                                  </div>
                                  <div
                                    className={`text-[11px] font-medium ${
                                      isSoon ? 'text-[#89632F]' : 'text-[#898A80]'
                                    }`}
                                  >
                                    {sub.nextRenewalDays === 0
                                      ? 'Renews today'
                                      : `${sub.nextRenewalDays} days remaining`}
                                  </div>
                                </div>

                                <div className="flex items-center gap-2">
                                  <button
                                    type="button"
                                    onClick={() => toggleReviewed(sub.id)}
                                    className={`p-1.5 rounded-lg border text-xs transition-colors flex items-center gap-1 ${
                                      isReviewed
                                        ? 'bg-[#E7EEE7] text-[#42634A] border-[#CBC6BA]'
                                        : 'border-[#E2DED4] text-[#65685F] hover:text-[#252922] bg-[#FAF9F5]'
                                    }`}
                                    title={isReviewed ? 'Marked as reviewed' : 'Mark as reviewed'}
                                  >
                                    <CheckCircle2 className="w-4 h-4" />
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => handleDeleteItem(sub.id)}
                                    className="p-1.5 rounded-lg border border-[#E2DED4] text-[#898A80] hover:text-[#A34F43] hover:border-[#F4E7E3] bg-[#FAF9F5] transition-colors"
                                    title="Remove from simulator"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                </div>
                              </div>
                            </motion.div>
                          );
                        })
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Bottom status strip */}
          <div className="px-6 py-4 bg-[#FAF9F5] border-t border-[#E2DED4] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#65685F]">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#42634A]" />
              <span>Encrypted in transit and at rest · Local Sandbox Preview</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="font-mono">Display Currency: INR (₹)</span>
              <button
                onClick={() => onOpenAuth('signup')}
                className="font-semibold text-[#667267] hover:text-[#505D52] hover:underline"
              >
                Sync with Production Ledger →
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
