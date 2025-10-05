import { Navbar } from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/ProductCard';
import { products } from '@/data/products';
import { ArrowRight, Zap, Shield, Truck } from 'lucide-react';
import { Link } from 'react-router-dom';

const Index = () => {
  const featuredProducts = products.slice(0, 3);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/10" />
        
        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <h1 className="text-6xl font-bold leading-tight">
                Premium Vaping
                <span className="block bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  Experience
                </span>
              </h1>
              
              <p className="text-xl text-muted-foreground max-w-lg">
                Discover the finest selection of vaping rigs. Quality craftsmanship meets cutting-edge technology.
              </p>

              <div className="flex gap-4">
                <Link to="/products">
                  <Button variant="premium" size="xl" className="gap-2">
                    Shop Now
                    <ArrowRight className="h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/about">
                  <Button variant="outline" size="xl">
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-video rounded-2xl overflow-hidden shadow-2xl">
                <video
                  src="/videos/showcase-1.mp4"
                  className="w-full h-full object-cover"
                  autoPlay
                  loop
                  muted
                  playsInline
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 py-20">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center space-y-4 p-6 rounded-xl bg-card hover:shadow-xl transition-shadow">
            <div className="h-16 w-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
              <Zap className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-bold">Premium Quality</h3>
            <p className="text-muted-foreground">
              Hand-selected products from trusted manufacturers
            </p>
          </div>

          <div className="text-center space-y-4 p-6 rounded-xl bg-card hover:shadow-xl transition-shadow">
            <div className="h-16 w-16 mx-auto rounded-full bg-accent/10 flex items-center justify-center">
              <Shield className="h-8 w-8 text-accent" />
            </div>
            <h3 className="text-xl font-bold">Secure Payment</h3>
            <p className="text-muted-foreground">
              Protected transactions via Wise API integration
            </p>
          </div>

          <div className="text-center space-y-4 p-6 rounded-xl bg-card hover:shadow-xl transition-shadow">
            <div className="h-16 w-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
              <Truck className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-bold">Free Shipping</h3>
            <p className="text-muted-foreground">
              Fast and free delivery on all orders
            </p>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Featured Products</h2>
          <p className="text-xl text-muted-foreground">
            Check out our most popular vaping rigs
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="text-center">
          <Link to="/products">
            <Button variant="default" size="lg" className="gap-2">
              View All Products
              <ArrowRight className="h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Showcase Videos */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">See It In Action</h2>
          <p className="text-xl text-muted-foreground">
            Watch our products perform
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="aspect-video rounded-2xl overflow-hidden shadow-xl">
            <video
              src="/videos/showcase-2.mp4"
              className="w-full h-full object-cover"
              controls
              loop
              muted
            />
          </div>
          <div className="aspect-video rounded-2xl overflow-hidden shadow-xl">
            <video
              src="/videos/showcase-3.mp4"
              className="w-full h-full object-cover"
              controls
              loop
              muted
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
