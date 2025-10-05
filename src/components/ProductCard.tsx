import { Product } from '@/types/product';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, PlayCircle } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { Link } from 'react-router-dom';

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useCart();

  return (
    <Card className="group overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
      <Link to={`/product/${product.id}`}>
        <div className="relative aspect-video bg-muted overflow-hidden">
          {product.videoUrl ? (
            <video
              src={product.videoUrl}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              muted
              loop
              playsInline
              onMouseEnter={(e) => e.currentTarget.play()}
              onMouseLeave={(e) => {
                e.currentTarget.pause();
                e.currentTarget.currentTime = 0;
              }}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <PlayCircle className="h-16 w-16 text-muted-foreground" />
            </div>
          )}
          {product.inStock && (
            <Badge className="absolute top-3 right-3 bg-accent">In Stock</Badge>
          )}
        </div>
      </Link>

      <div className="p-6 space-y-4">
        <div>
          <Link to={`/product/${product.id}`}>
            <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
              {product.name}
            </h3>
          </Link>
          <p className="text-muted-foreground text-sm line-clamp-2">
            {product.description}
          </p>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-border">
          <div className="text-3xl font-bold text-primary">
            €{product.price.toFixed(2).replace('.', ',')}
          </div>
          <Button
            variant="cart"
            size="lg"
            onClick={() => addToCart(product)}
            className="gap-2"
          >
            <ShoppingCart className="h-4 w-4" />
            Add to Cart
          </Button>
        </div>
      </div>
    </Card>
  );
};
