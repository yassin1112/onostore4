// Vercel serverless function for /api/create-oxapay-link
import fetch from 'node-fetch';

const PRODUCTS_DB = {
  "1": { name: "Raccoon", price: 8 },
  "2": { name: "T-Rex", price: 5 },
  "3": { name: "Spinosorus", price: 5 },
  "4": { name: "Butterfly", price: 10 },
  "5": { name: "Mimic Octopus", price: 5 },
  "6": { name: "Dragonfly", price: 5 },
  "7": { name: "Kitsune", price: 35 },
  "8": { name: "Corrupted Kitsune", price: 5 },
  "9": { name: "Queen Bee", price: 5 },
  "10": { name: "disco Bee", price: 1 }
};

const apiKey = process.env.OXAPAY_API_KEY;

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(404).json({ error: 'Not found' });
    return;
  }

  const { cart, customerInfo } = req.body;
  if (!cart || !Array.isArray(cart) || cart.length === 0) {
    return res.status(400).json({ error: 'Cart is empty or invalid.' });
  }
  let total = 0;
  for (const item of cart) {
    const product = PRODUCTS_DB[item.id];
    if (!product) {
      return res.status(400).json({ error: `Invalid product in cart: ${item.id}` });
    }
    total += product.price * item.quantity;
  }
  const amount = total.toFixed(2);
  const orderId = 'ONO-' + Date.now();

  const robloxUsername = customerInfo?.robloxUsername || '';
  const whatsappNumber = customerInfo?.whatsappNumber || '';
  const note = customerInfo?.note || '';
  const productsList = cart.map(item => `- ${item.name} x${item.quantity}`).join('\n');
  let description = `Products:\n${productsList}\n\nWhatsApp: ${whatsappNumber}\n\nRoblox Username: ${robloxUsername}`;
  if (note) {
    description += `\nNote: ${note}`;
  }

  const payload = {
    amount: Number(amount),
    currency: "USD",
    lifetime: 30,
    fee_paid_by_payer: 1,
    under_paid_coverage: 2.5,
    to_currency: "USDT",
    auto_withdrawal: false,
    mixed_payment: true,
    callback_url: "https://example.com/callback", // <-- replace with your real callback
    return_url: "https://example.com/success",    // <-- replace with your real return url
    email: customerInfo?.email || "",
    order_id: orderId,
    thanks_message: "Thank you for your order!",
    description: description,
    sandbox: false
  };

  try {
    const response = await fetch('https://api.oxapay.com/v1/payment/invoice', {
      method: 'POST',
      headers: {
        'merchant_api_key': apiKey,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });
    const data = await response.json();
    if (data && data.data && data.data.payment_url) {
      res.status(200).json({ oxapayUrl: data.data.payment_url });
    } else {
      res.status(500).json({ error: 'Failed to create invoice', details: data });
    }
  } catch (err) {
    res.status(500).json({ error: 'OxaPay API error', details: err.message });
  }
}