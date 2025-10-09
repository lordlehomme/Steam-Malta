import { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CreditCard, Smartphone, ShoppingBag } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

const Checkout = () => {
  const { cart, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'apple' | 'google'>('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    postalCode: '',
    country: '',
    cardNumber: '',
    cardExpiry: '',
    cardCvc: '',
  });

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-20 text-center">
          <ShoppingBag className="h-24 w-24 mx-auto mb-6 text-muted-foreground" />
          <h1 className="text-4xl font-bold mb-4">Your Cart is Empty</h1>
          <Button variant="premium" size="xl" onClick={() => navigate('/products')}>
            Browse Products
          </Button>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.address) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (paymentMethod === 'card' && (!formData.cardNumber || !formData.cardExpiry || !formData.cardCvc)) {
      toast.error('Please complete payment card details');
      return;
    }

    setIsProcessing(true);
    toast.loading('Processing payment with Wise...');
    
    try {
      const { data, error } = await supabase.functions.invoke('wise-payment', {
        body: {
          amount: totalWithVAT,
          currency: 'EUR',
          customerName: `${formData.firstName} ${formData.lastName}`,
          customerEmail: formData.email,
          paymentMethod: paymentMethod,
        },
      });

      if (error) throw error;

      if (data?.success) {
        toast.dismiss();
        toast.success('Payment successful! Order placed.');
        console.log('Transaction ID:', data.transactionId);
        clearCart();
        navigate('/');
      } else {
        throw new Error(data?.error || 'Payment failed');
      }
    } catch (error) {
      console.error('Payment error:', error);
      toast.dismiss();
      toast.error(`Payment failed: ${error.message}`);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const totalWithVAT = totalPrice * 1.19;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          Checkout
        </h1>

        <form onSubmit={handleSubmit}>
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              {/* Billing Information */}
              <Card className="p-6">
                <h2 className="text-2xl font-bold mb-6">Billing Information</h2>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name *</Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name *</Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="md:col-span-2 space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="md:col-span-2 space-y-2">
                    <Label htmlFor="address">Address *</Label>
                    <Input
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="city">City *</Label>
                    <Input
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="postalCode">Postal Code *</Label>
                    <Input
                      id="postalCode"
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="md:col-span-2 space-y-2">
                    <Label htmlFor="country">Country *</Label>
                    <Input
                      id="country"
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
              </Card>

              {/* Payment Method */}
              <Card className="p-6">
                <h2 className="text-2xl font-bold mb-6">Payment Method</h2>

                <div className="grid grid-cols-3 gap-4 mb-6">
                  <Button
                    type="button"
                    variant={paymentMethod === 'card' ? 'default' : 'outline'}
                    className="h-20 flex flex-col gap-2"
                    onClick={() => setPaymentMethod('card')}
                  >
                    <CreditCard className="h-6 w-6" />
                    <span className="text-xs">Card</span>
                  </Button>

                  <Button
                    type="button"
                    variant={paymentMethod === 'apple' ? 'default' : 'outline'}
                    className="h-20 flex flex-col gap-2"
                    onClick={() => setPaymentMethod('apple')}
                  >
                    <Smartphone className="h-6 w-6" />
                    <span className="text-xs">Apple Pay</span>
                  </Button>

                  <Button
                    type="button"
                    variant={paymentMethod === 'google' ? 'default' : 'outline'}
                    className="h-20 flex flex-col gap-2"
                    onClick={() => setPaymentMethod('google')}
                  >
                    <Smartphone className="h-6 w-6" />
                    <span className="text-xs">Google Pay</span>
                  </Button>
                </div>

                {paymentMethod === 'card' && (
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="md:col-span-2 space-y-2">
                      <Label htmlFor="cardNumber">Card Number *</Label>
                      <Input
                        id="cardNumber"
                        name="cardNumber"
                        placeholder="1234 5678 9012 3456"
                        value={formData.cardNumber}
                        onChange={handleInputChange}
                        maxLength={19}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="cardExpiry">Expiry Date *</Label>
                      <Input
                        id="cardExpiry"
                        name="cardExpiry"
                        placeholder="MM/YY"
                        value={formData.cardExpiry}
                        onChange={handleInputChange}
                        maxLength={5}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="cardCvc">CVC *</Label>
                      <Input
                        id="cardCvc"
                        name="cardCvc"
                        placeholder="123"
                        value={formData.cardCvc}
                        onChange={handleInputChange}
                        maxLength={4}
                      />
                    </div>
                  </div>
                )}

                {paymentMethod !== 'card' && (
                  <div className="text-center py-8 text-muted-foreground">
                    <p className="mb-4">
                      You will be redirected to {paymentMethod === 'apple' ? 'Apple' : 'Google'} Pay to complete your purchase.
                    </p>
                    <p className="text-sm">
                      Note: Payment processing will be handled securely through Wise API.
                    </p>
                  </div>
                )}
              </Card>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="p-6 sticky top-24 space-y-6">
                <h2 className="text-2xl font-bold">Order Summary</h2>
                
                <div className="space-y-4">
                  {cart.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        {item.name} x{item.quantity}
                      </span>
                      <span className="font-semibold">
                        €{(item.price * item.quantity).toFixed(2).replace('.', ',')}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="space-y-3 pt-4 border-t border-border">
                  <div className="flex justify-between text-muted-foreground">
                    <span>Subtotal</span>
                    <span>€{totalPrice.toFixed(2).replace('.', ',')}</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Shipping</span>
                    <span className="text-accent font-semibold">FREE</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>VAT (19%)</span>
                    <span>€{(totalPrice * 0.19).toFixed(2).replace('.', ',')}</span>
                  </div>
                </div>

                <div className="flex justify-between text-2xl font-bold pt-4 border-t border-border">
                  <span>Total</span>
                  <span className="text-primary">
                    €{totalWithVAT.toFixed(2).replace('.', ',')}
                  </span>
                </div>

                <Button 
                  type="submit" 
                  variant="premium" 
                  size="xl" 
                  className="w-full"
                  disabled={isProcessing}
                >
                  {isProcessing ? 'Processing...' : 'Complete Purchase'}
                </Button>

                <p className="text-xs text-center text-muted-foreground">
                  Secure payment processing via Wise API
                </p>
              </Card>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
};

export default Checkout;
