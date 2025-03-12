import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import Stripe from 'stripe';

// Load environment variables from .env file
dotenv.config();

// Initialize Stripe with your secret key from environment variables
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: '2020-08-27' });

const app = express();
app.use(cors());
app.use(express.json());

// Test route to confirm server is running
app.get('/', (req, res) => {
  res.send('Hello from the Clean Granite Project server!');
});

// Stripe Checkout Session endpoint
app.post('/api/create-checkout-session', async (req, res) => {
  try {
    const { amount, currency } = req.body; // amount in cents
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      line_items: [{
        price_data: {
          currency,
          product_data: {
            name: 'Countertop Payment',
          },
          unit_amount: Math.round(amount), // amount in cents
        },
        quantity: 1,
      }],
      success_url: `${req.headers.origin}/success.html?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.origin}/cancel.html`,
    });
    res.json({ url: session.url });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    res.status(500).json({ error: 'Unable to create checkout session' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

