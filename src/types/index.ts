export interface Shoe {
  id: string;
  name: string;
  brand: 'Nike' | 'Adidas' | 'Puma' | 'New Balance' | 'Converse' | 'Vans';
  category: 'Running' | 'Lifestyle' | 'Basketball' | 'Training' | 'Sneakers' | 'Slides' | 'Boots';
  gender: "Men's Shoes" | "Women's Shoes" | "Unisex Shoes" | "Kids' Shoes";
  price: number;
  originalPrice?: number;
  rating: number;
  reviewsCount: string;
  image: string;
  additionalImages?: string[];
  description: string;
  tag?: string;
  isBestSeller?: boolean;
  isNewArrival?: boolean;
  isSale?: boolean;
  colors?: string[];
  sizes: (number | string)[];
  features?: string[];
}

export interface CartItem {
  id: string;
  shoe: Shoe;
  size: number | string;
  color: string;
  quantity: number;
}

export interface Category {
  id: string;
  name: string;
  slug: Shoe['category'];
  image: string;
  itemCount: number;
}

export interface Brand {
  id: string;
  name: Shoe['brand'];
  tagline: string;
}
