import * as paymentMethods from './functions/api/payment-methods.js';
import * as createSession from './functions/api/create-payfast-session.js';
import * as confirmPayment from './functions/api/confirm-payment.js';
 
export default {
  async fetch(request, env) {
    const { pathname } = new URL(request.url);
    const ctx = { request, env };
 
    if (pathname === '/api/payment-methods' && request.method === 'POST') {
      return paymentMethods.onRequestPost(ctx);
    }
    if (pathname === '/api/create-payfast-session' && request.method === 'GET') {
      return createSession.onRequestGet(ctx);
    }
    if (pathname === '/api/confirm-payment' && request.method === 'POST') {
      return confirmPayment.onRequestPost(ctx);
    }
    if (pathname.startsWith('/api/')) {
      return new Response('Not found', { status: 404 });
    }
 
    // Anything else: serve the static site
    return env.ASSETS.fetch(request);
  }
};
 