import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const WISE_API_KEY = Deno.env.get('WISE_API_KEY');
const WISE_API_URL = 'https://api.sandbox.transferwise.tech'; // Use sandbox for testing

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { 
      amount, 
      currency, 
      customerName, 
      customerEmail,
      paymentMethod 
    } = await req.json();

    console.log('Processing Wise payment:', { amount, currency, customerEmail, paymentMethod });

    if (!WISE_API_KEY) {
      throw new Error('WISE_API_KEY not configured');
    }

    // Create a quote for the transfer
    const quoteResponse = await fetch(`${WISE_API_URL}/v3/quotes`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${WISE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        sourceCurrency: currency,
        targetCurrency: currency,
        sourceAmount: amount,
        targetAmount: null,
        payOut: 'BALANCE',
      }),
    });

    if (!quoteResponse.ok) {
      const error = await quoteResponse.text();
      console.error('Wise quote error:', error);
      throw new Error(`Failed to create quote: ${error}`);
    }

    const quote = await quoteResponse.json();
    console.log('Wise quote created:', quote.id);

    // In a real implementation, you would:
    // 1. Create a recipient account
    // 2. Create a transfer
    // 3. Fund the transfer
    // For demo purposes, we'll simulate success

    const paymentResult = {
      success: true,
      transactionId: `WISE-${Date.now()}`,
      quoteId: quote.id,
      amount: amount,
      currency: currency,
      customerEmail: customerEmail,
      paymentMethod: paymentMethod,
      status: 'completed',
      timestamp: new Date().toISOString(),
    };

    console.log('Payment successful:', paymentResult.transactionId);

    return new Response(JSON.stringify(paymentResult), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    });

  } catch (error) {
    console.error('Error in wise-payment function:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return new Response(
      JSON.stringify({ 
        error: errorMessage,
        success: false 
      }), 
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});