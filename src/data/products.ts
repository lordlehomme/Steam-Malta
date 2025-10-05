import { Product } from '@/types/product';

export const products: Product[] = [
  {
    id: '1',
    name: 'Elite Vapor Pro X',
    price: 129.99,
    description: 'Premium vaping experience with advanced temperature control and long-lasting battery life.',
    videoUrl: '/videos/product-1.mp4',
    features: [
      'Advanced Temperature Control',
      '5000mAh Battery',
      'OLED Display',
      'Premium Build Quality',
      'USB-C Fast Charging'
    ],
    inStock: true,
  },
  {
    id: '2',
    name: 'Cloud Master 3000',
    price: 134.00,
    description: 'Ultimate cloud production with precision airflow control and ergonomic design.',
    videoUrl: '/videos/product-2.mp4',
    features: [
      'Precision Airflow Control',
      'Ergonomic Design',
      'Triple Coil System',
      '6000mAh Extended Battery',
      'LED Status Indicators'
    ],
    inStock: true,
  },
  {
    id: '3',
    name: 'Stealth Vape Ultra',
    price: 119.99,
    description: 'Compact and discreet with powerful performance. Perfect for on-the-go vaping.',
    videoUrl: '/videos/product-3.mp4',
    features: [
      'Ultra Compact Design',
      'Stealth Mode Operation',
      'Quick Heat Technology',
      'Magnetic Pod System',
      'Leak-Proof Design'
    ],
    inStock: true,
  },
  {
    id: '4',
    name: 'Titan Vapor Station',
    price: 149.99,
    description: 'Desktop powerhouse with customizable settings and massive vapor production.',
    videoUrl: '/videos/product-4.mp4',
    features: [
      'Desktop Power Station',
      'Customizable Settings',
      'Dual Battery System',
      'Premium Glass Tank',
      'Smart Safety Features'
    ],
    inStock: true,
  },
  {
    id: '5',
    name: 'Zen Pod Starter Kit',
    price: 89.99,
    description: 'Perfect starter kit with everything you need. Easy to use and maintain.',
    features: [
      'Beginner Friendly',
      'Complete Starter Kit',
      'Pre-filled Pods Included',
      'One-Button Operation',
      'Portable Design'
    ],
    inStock: true,
  },
  {
    id: '6',
    name: 'Fusion Mod Elite',
    price: 159.99,
    description: 'Professional-grade mod with advanced features and premium materials.',
    features: [
      'Professional Grade',
      'Advanced Chipset',
      'Zinc Alloy Body',
      'Customizable LED',
      'Multiple Safety Protections'
    ],
    inStock: true,
  },
];
