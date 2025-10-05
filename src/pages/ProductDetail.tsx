import { useParams, useNavigate } from 'react-router-dom';
import { products } from '@/data/products';
import { Navbar } from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { ShoppingCart, ArrowLeft, Check } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const product = products.find((p) => p.id === id);

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-4xl font-bold mb-4">Product Not Found</h1>
          <Button onClick={() => navigate('/products')}>Back to Products</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 py-12">
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="mb-8 gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>

        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-6">
            <Card className="overflow-hidden">
              <div className="aspect-video bg-muted">
                {product.videoUrl && (
                  <video
                    src={product.videoUrl}
                    className="w-full h-full object-cover"
                    controls
                    loop
                    muted
                    autoPlay
                  />
                )}
              </div>
            </Card>
          </div>

          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-4 mb-4">
                <h1 className="text-4xl font-bold">{product.name}</h1>
                {product.inStock && (
                  <Badge variant="default" className="bg-accent">In Stock</Badge>
                )}
              </div>
              <p className="text-xl text-muted-foreground">{product.description}</p>
            </div>

            <Card className="p-6 bg-gradient-to-br from-card to-muted/20">
              <div className="text-5xl font-bold text-primary mb-2">
                €{product.price.toFixed(2).replace('.', ',')}
              </div>
              <p className="text-muted-foreground">VAT included</p>
            </Card>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Key Features</h2>
              <ul className="space-y-3">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="h-4 w-4 text-primary" />
                    </div>
                    <span className="text-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex gap-4 pt-6">
              <Button
                variant="premium"
                size="xl"
                className="flex-1 gap-2"
                onClick={() => addToCart(product)}
              >
                <ShoppingCart className="h-5 w-5" />
                Add to Cart
              </Button>
              <Button
                variant="default"
                size="xl"
                onClick={() => {
                  addToCart(product);
                  navigate('/checkout');
                }}
              >
                Buy Now
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProductDetail;
