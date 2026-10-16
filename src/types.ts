export interface ProductVariant {
  id: string;
  name: string;
  subtext: string;
  price: number;
  unit: string;
  badge?: string;
  savings?: string;
}

export interface Product {
  id: string;
  name: string;
  nameBn?: string;
  sku: string;
  barcode: string;
  brand: string;
  category: string;
  categorySlug: string;
  subcategory: string;
  description: string;
  rating: number;
  reviewsCount: number;
  monthlyOrders: string;
  price: number;
  oldPrice: number;
  discountPercentage: number;
  unitRate: string;
  stockCount: number;
  hubLocation: string;
  weight: string;
  fefoStatus: {
    batchId: string;
    bstiStandard: string;
    dispatchHub: string;
    temperature: string;
    daysRemaining: number;
    safetyPercent: number;
    packedDate: string;
    expiryDate: string;
    shelfLifeStatus: string;
    storageAdvice: string;
  };
  images: {
    main: string;
    gallery: { id: string; label: string; url: string; alt: string }[];
  };
  variants: ProductVariant[];
  nutritionFacts: {
    nutrient: string;
    amount: string;
    dailyValue: string;
  }[];
  standards: {
    title: string;
    code: string;
    description: string;
    icon: string;
  }[];
}

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  quantity: number;
  variant: string;
  imageUrl: string;
  batchId?: string;
  fefoDiscount?: number;
}

export interface BatchItem {
  batchId: string;
  sku: string;
  productName: string;
  category: string;
  location: string;
  supplier: string;
  expiryDate: string;
  daysRemainingText: string;
  status: 'critical' | 'warning' | 'safe';
  discountBadge?: string;
  costPrice: number;
  sellPrice: number;
  stockQty: number;
  reservedQty: number;
}

export interface ReviewItem {
  id: string;
  author: string;
  initials: string;
  location: string;
  timeAgo: string;
  badge?: string;
  rating: number;
  comment: string;
  verified: boolean;
}

export interface OrderTracking {
  orderId: string;
  courier: string;
  estimatedDelivery: string;
  total: number;
  pointsEarned: number;
  riderName: string;
  riderPhone: string;
  currentStep: number; // 1 to 5
  steps: {
    id: number;
    label: string;
    time: string;
    subtext: string;
    status: 'completed' | 'current' | 'pending';
  }[];
}
