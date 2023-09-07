import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import Stripe from 'stripe';

const app = express();
const stripe = new Stripe(process.env.SECRET_KEY);

app.use(express.json());
app.use(express.static('public'));
app.use(cors());

app.get('/config', (req, res) => {
  res.send({ publishableKey: process.env.PUBLISHABLE_KEY });
});

app.post('/create-payment-intent', async (req, res) => {
  const { cartItems } = req.body;
  const paymentIntent = await stripe.paymentIntents.create({
    amount: 1099,
    currency: 'usd',
  });

  res.send({ clientSecret: paymentIntent.client_secret });
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`server is listening on port ${port}`);
});
