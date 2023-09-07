window.addEventListener('DOMContentLoaded', async () => {
  const { publishableKey } = await fetch('/config').then((r) => r.json());

  const params = new URLSearchParams(window.location.href);
  const clientSecret = params.get('payment_intent_client_secret');

  const stripe = Stripe(publishableKey);
  const data = await stripe.retrievePaymentIntent(clientSecret);

  console.log(data);
});
