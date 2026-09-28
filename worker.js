import * as paymentMethods from './functions/api/payment-methods.js';
import * as createSession from './functions/api/create-payfast-session.js';
import * as confirmPayment from './functions/api/confirm-payment.js';

export default {
  async fetch(request, env) {
    const { pathname } = new URL(request.url);
    const ctx = { request, env };

    if (pathname === '/api/debug') {
      const expected = [
        'PAYFAST_MODE',
        'PAYFAST_MERCHANT_ID',
        'PAYFAST_MERCHANT_KEY',
        'PAYFAST_PASSPHRASE',
        'SNIPCART_SECRET_API_KEY'
      ];
      return Response.json({
        expected: Object.fromEntries(
          expected.map((k) => [k, env[k] ? `set (${String(env[k]).length} chars)` : 'MISSING'])
        ),
        namesTheWorkerActuallySees: Object.keys(env)
      });
    }

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

    return env.ASSETS.fetch(request);
  }
};