window.addEventListener('DOMContentLoaded', async () => {
  const items = { cartItems: [{ id: 1 }, { id: 2 }] };
  const { publishableKey } = await fetch('/config').then((r) => r.json());
  const { clientSecret } = await fetch('/create-payment-intent', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(items),
  }).then((r) => r.json());

  const stripe = Stripe(publishableKey);

  const appearance = {
    theme: 'flat',
  };

  const elements = stripe.elements({ clientSecret, appearance });

  // const linkAuthenticationElement = elements.create('linkAuthentication');
  // linkAuthenticationElement.mount('#link-authentication-element');

  const paymentElement = elements.create('payment');
  paymentElement.mount('#payment-element');

  const form = document.getElementById('payment-form');
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: 'http://localhost:5001/complete.html',
      },
    });
  });
});
