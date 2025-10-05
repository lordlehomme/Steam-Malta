import { Navbar } from '@/components/Navbar';
import { Card } from '@/components/ui/card';
import { Award, Heart, Users } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              About VapeStore
            </h1>
            <p className="text-xl text-muted-foreground">
              Your trusted destination for premium vaping products
            </p>
          </div>

          <Card className="p-8 space-y-6">
            <p className="text-lg text-foreground leading-relaxed">
              Welcome to VapeStore, where quality meets innovation. We're dedicated to providing the finest 
              selection of vaping rigs and accessories for enthusiasts who demand excellence.
            </p>
            
            <p className="text-lg text-foreground leading-relaxed">
              Our carefully curated collection features only the best products from trusted manufacturers, 
              ensuring you get the premium experience you deserve. With secure payment processing through 
              Wise API and fast, free shipping, your satisfaction is our priority.
            </p>
          </Card>

          <div className="grid md:grid-cols-3 gap-6">
            <Card className="p-6 text-center space-y-4">
              <div className="h-16 w-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
                <Award className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Premium Quality</h3>
              <p className="text-muted-foreground">
                Only the best products make it to our store
              </p>
            </Card>

            <Card className="p-6 text-center space-y-4">
              <div className="h-16 w-16 mx-auto rounded-full bg-accent/10 flex items-center justify-center">
                <Heart className="h-8 w-8 text-accent" />
              </div>
              <h3 className="text-xl font-bold">Customer First</h3>
              <p className="text-muted-foreground">
                Your satisfaction drives everything we do
              </p>
            </Card>

            <Card className="p-6 text-center space-y-4">
              <div className="h-16 w-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Community</h3>
              <p className="text-muted-foreground">
                Join thousands of satisfied customers
              </p>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default About;
