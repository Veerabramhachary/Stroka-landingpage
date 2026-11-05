export type LedgerType = 'personal' | 'business';

export interface BillingHistoryItem {
  id: string;
  date: string;
  amountINR: number;
  invoiceNumber: string;
  status: 'paid' | 'pending';
  paymentMode: string;
}

export interface SubscriptionItem {
  id: string;
  name: string;
  provider: string;
  ledger: LedgerType;
  category: string;
  monthlyINR: number;
  cycle: 'monthly' | 'yearly';
  nextRenewalDays: number;
  nextRenewalDate: string;
  status: 'active' | 'review' | 'trial';
  cardLastFour: string;
  // Tax & GST Management properties
  gstRate: number; // e.g., 18 or 0
  taxAmountINR: number; // GST / Tax paid
  isTaxDeductible: boolean;
  gstinVerified: boolean;
  hsnSacCode?: string;
  history: BillingHistoryItem[];
}

export const formatINR = (amt: number): string => {
  return `₹${Math.round(amt).toLocaleString('en-IN')}`;
};

export const MOCK_SUBSCRIPTIONS: SubscriptionItem[] = [
  // Business Ledger Items (Tax deductible, GST 18%, HSN/SAC tagged)
  {
    id: 'sub-biz-1',
    name: 'AWS Cloud Infrastructure',
    provider: 'Amazon Web Services India Pvt Ltd',
    ledger: 'business',
    category: 'Cloud & Infrastructure',
    monthlyINR: 4200,
    cycle: 'monthly',
    nextRenewalDays: 3,
    nextRenewalDate: 'Nov 8, 2026',
    status: 'active',
    cardLastFour: '4242',
    gstRate: 18,
    taxAmountINR: 756,
    isTaxDeductible: true,
    gstinVerified: true,
    hsnSacCode: '998315',
    history: [
      { id: 'h-1', date: 'Oct 8, 2026', amountINR: 4200, invoiceNumber: 'INV-AWS-8821', status: 'paid', paymentMode: 'Corporate Card' },
      { id: 'h-2', date: 'Sep 8, 2026', amountINR: 4200, invoiceNumber: 'INV-AWS-7419', status: 'paid', paymentMode: 'Corporate Card' },
      { id: 'h-3', date: 'Aug 8, 2026', amountINR: 4200, invoiceNumber: 'INV-AWS-6102', status: 'paid', paymentMode: 'Corporate Card' },
    ],
  },
  {
    id: 'sub-biz-2',
    name: 'Figma Organization',
    provider: 'Figma, Inc.',
    ledger: 'business',
    category: 'Design & Product',
    monthlyINR: 1350,
    cycle: 'monthly',
    nextRenewalDays: 6,
    nextRenewalDate: 'Nov 11, 2026',
    status: 'active',
    cardLastFour: '8910',
    gstRate: 18,
    taxAmountINR: 243,
    isTaxDeductible: true,
    gstinVerified: true,
    hsnSacCode: '998314',
    history: [
      { id: 'h-4', date: 'Oct 11, 2026', amountINR: 1350, invoiceNumber: 'INV-FIG-9912', status: 'paid', paymentMode: 'Direct NetBanking' },
      { id: 'h-5', date: 'Sep 11, 2026', amountINR: 1350, invoiceNumber: 'INV-FIG-8531', status: 'paid', paymentMode: 'Direct NetBanking' },
    ],
  },
  {
    id: 'sub-biz-3',
    name: 'Google Workspace Enterprise',
    provider: 'Google Cloud India',
    ledger: 'business',
    category: 'Productivity & Email',
    monthlyINR: 2850,
    cycle: 'monthly',
    nextRenewalDays: 14,
    nextRenewalDate: 'Nov 19, 2026',
    status: 'active',
    cardLastFour: '4242',
    gstRate: 18,
    taxAmountINR: 513,
    isTaxDeductible: true,
    gstinVerified: true,
    hsnSacCode: '998313',
    history: [
      { id: 'h-6', date: 'Oct 19, 2026', amountINR: 2850, invoiceNumber: 'GGL-IN-49210', status: 'paid', paymentMode: 'Corporate Card' },
      { id: 'h-7', date: 'Sep 19, 2026', amountINR: 2850, invoiceNumber: 'GGL-IN-38104', status: 'paid', paymentMode: 'Corporate Card' },
    ],
  },
  {
    id: 'sub-biz-4',
    name: 'GitHub Enterprise Copilot',
    provider: 'Microsoft Corporation India',
    ledger: 'business',
    category: 'Engineering & Dev',
    monthlyINR: 1650,
    cycle: 'monthly',
    nextRenewalDays: 20,
    nextRenewalDate: 'Nov 25, 2026',
    status: 'active',
    cardLastFour: '1120',
    gstRate: 18,
    taxAmountINR: 297,
    isTaxDeductible: true,
    gstinVerified: true,
    hsnSacCode: '998319',
    history: [
      { id: 'h-8', date: 'Oct 25, 2026', amountINR: 1650, invoiceNumber: 'MS-GH-77312', status: 'paid', paymentMode: 'Corporate Card' },
    ],
  },

  // Personal Ledger Items (Everyday lifestyle, non-deductible personal tax)
  {
    id: 'sub-per-1',
    name: 'Netflix 4K Ultra HD',
    provider: 'Netflix Entertainment Services India',
    ledger: 'personal',
    category: 'Entertainment & Streaming',
    monthlyINR: 649,
    cycle: 'monthly',
    nextRenewalDays: 2,
    nextRenewalDate: 'Nov 7, 2026',
    status: 'review',
    cardLastFour: '7731',
    gstRate: 18,
    taxAmountINR: 117,
    isTaxDeductible: false,
    gstinVerified: false,
    history: [
      { id: 'h-9', date: 'Oct 7, 2026', amountINR: 649, invoiceNumber: 'NFLX-IND-0129', status: 'paid', paymentMode: 'UPI AutoPay' },
      { id: 'h-10', date: 'Sep 7, 2026', amountINR: 649, invoiceNumber: 'NFLX-IND-8812', status: 'paid', paymentMode: 'UPI AutoPay' },
    ],
  },
  {
    id: 'sub-per-2',
    name: 'Spotify Premium Family',
    provider: 'Spotify India Pvt Ltd',
    ledger: 'personal',
    category: 'Music & Audio',
    monthlyINR: 179,
    cycle: 'monthly',
    nextRenewalDays: 9,
    nextRenewalDate: 'Nov 14, 2026',
    status: 'active',
    cardLastFour: '7731',
    gstRate: 18,
    taxAmountINR: 32,
    isTaxDeductible: false,
    gstinVerified: false,
    history: [
      { id: 'h-11', date: 'Oct 14, 2026', amountINR: 179, invoiceNumber: 'SPOT-2026-901', status: 'paid', paymentMode: 'UPI AutoPay' },
    ],
  },
  {
    id: 'sub-per-3',
    name: 'Apple iCloud+ (2TB)',
    provider: 'Apple Distribution International',
    ledger: 'personal',
    category: 'Personal Cloud Storage',
    monthlyINR: 299,
    cycle: 'monthly',
    nextRenewalDays: 16,
    nextRenewalDate: 'Nov 21, 2026',
    status: 'active',
    cardLastFour: '3049',
    gstRate: 18,
    taxAmountINR: 54,
    isTaxDeductible: false,
    gstinVerified: false,
    history: [
      { id: 'h-12', date: 'Oct 21, 2026', amountINR: 299, invoiceNumber: 'APL-IN-88902', status: 'paid', paymentMode: 'Debit Card' },
    ],
  },
  {
    id: 'sub-per-4',
    name: 'Cult.fit Elite Pass',
    provider: 'Curefit Healthcare Pvt Ltd',
    ledger: 'personal',
    category: 'Health & Wellness',
    monthlyINR: 1499,
    cycle: 'monthly',
    nextRenewalDays: 24,
    nextRenewalDate: 'Nov 29, 2026',
    status: 'active',
    cardLastFour: '7731',
    gstRate: 18,
    taxAmountINR: 270,
    isTaxDeductible: false,
    gstinVerified: false,
    history: [
      { id: 'h-13', date: 'Oct 29, 2026', amountINR: 1499, invoiceNumber: 'CF-BLR-4421', status: 'paid', paymentMode: 'UPI AutoPay' },
    ],
  },
];
