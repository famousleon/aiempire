// ==========================================
// AI Empire - Stripe Payment Handler
// ==========================================
// For MVP: Use Stripe Payment Links or Stripe Checkout (client-side redirect)
//
// Setup:
// 1. Go to https://dashboard.stripe.com
// 2. Get your publishable key: https://dashboard.stripe.com/apikeys
// 3. Create Payment Links for each reward amount, OR use Stripe Checkout with a backend
//
// For a simple MVP without a backend server, use Stripe Payment Links:
// - Create a Payment Link in Stripe Dashboard for each common amount
// - Store the Payment Link URL in the task record
// - User clicks → pays → returns to site → task is activated

const STRIPE_PUBLISHABLE_KEY = 'YOUR_STRIPE_PUBLISHABLE_KEY';

const Payment = (() => {
  function isConfigured() {
    return STRIPE_PUBLISHABLE_KEY !== 'YOUR_STRIPE_PUBLISHABLE_KEY';
  }

  // --- Stripe Payment Link (no backend needed) ---
  // Creates a payment by redirecting to a Stripe Payment Link
  // The Payment Link should have a success URL that redirects back with the task ID
  function payWithPaymentLink(paymentLinkUrl) {
    if (!isConfigured()) {
      console.warn('[Payment] Stripe not configured. Set STRIPE_PUBLISHABLE_KEY in js/payment.js');
      return;
    }
    window.location.href = paymentLinkUrl;
  }

  // --- Generate Stripe Payment Link dynamically ---
  // This requires a backend function (Stripe supports this via Payment Link API)
  // For now, we use a placeholder that constructs a URL
  // In production, you'd call your own API endpoint that creates a Stripe Checkout session
  async function createPaymentSession(amount, currency, taskId, description) {
    if (!isConfigured()) {
      console.warn('[Payment] Stripe not configured');
      return null;
    }

    // Option 1: Use Stripe Payment Links with pre-set amounts
    // Map common amounts to Payment Link IDs
    const paymentLinks = {
      '5': 'https://buy.stripe.com/YOUR_LINK_5',
      '10': 'https://buy.stripe.com/YOUR_LINK_10',
      '20': 'https://buy.stripe.com/YOUR_LINK_20',
      '50': 'https://buy.stripe.com/YOUR_LINK_50',
      '100': 'https://buy.stripe.com/YOUR_LINK_100',
    };

    const amountStr = String(Math.round(amount));
    const link = paymentLinks[amountStr];

    if (link) {
      return { url: `${link}?client_reference_id=${taskId}`, mode: 'payment_link' };
    }

    // Option 2: For custom amounts, you need a backend to create a Stripe Checkout session
    console.warn('[Payment] No Payment Link configured for $' + amountStr + '. Use a backend for custom amounts.');
    return null;
  }

  // --- Check payment status (for Payment Link flow) ---
  // After user returns from Stripe, check if the task has been activated
  function checkPaymentSuccess() {
    const params = new URLSearchParams(window.location.search);
    const success = params.get('payment_success');
    const taskId = params.get('task_id');

    if (success === 'true' && taskId) {
      return { success: true, taskId };
    }
    return { success: false };
  }

  // --- Format currency ---
  function formatCurrency(amount, currency = 'USD') {
    return new Intl.NumberFormat(I18n?.getLangCode?.() || 'en-US', {
      style: 'currency',
      currency,
    }).format(amount);
  }

  return {
    isConfigured,
    payWithPaymentLink,
    createPaymentSession,
    checkPaymentSuccess,
    formatCurrency,
  };
})();
