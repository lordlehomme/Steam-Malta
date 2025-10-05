export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  videoUrl?: string;
  imageUrl?: string;
  features: string[];
  inStock: boolean;
}

export interface CartItem extends Product {
  quantity: number;
}
