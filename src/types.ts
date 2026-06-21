export interface CollectibleItem {
  id: string;
  name: string;
  category: string; // 'model' | 'album' | 'card' | 'perfume' | 'figure' | 'watch'
  price: number;
  purchaseDate: string;
  source: string;
  notes: string;
  isRare: boolean;
  imageUrl: string;
  countLabel?: string; // e.g. "1/100" or "限量"
}

export interface WishlistItem {
  id: string;
  name: string;
  category: string;
  estimatedPrice: number;
  priority: 'high' | 'medium' | 'low';
  imageUrl: string;
  notes: string;
}

export interface SpendingTrend {
  month: string;
  amount: number;
}

export type ActiveTab = 'overview' | 'collection' | 'wishlist' | 'analytics';
