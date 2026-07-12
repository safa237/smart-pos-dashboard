export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  rating: number;
  description: string;
  badge: string;
  stock: number;
  icon: string;
  pending?: boolean;
  syncStatus?: 'pending' | 'syncing' | 'synced';
}