import crypto from 'node:crypto';

function pfEncode(value) {
    return encodeURIComponent(String(value).trim())
      .replace(/[!'()*]/g, (c) => '%' + c.charCodeAt(0).toString(16).toUpperCase())
    .replace(/%20/g, '+');
} 

function buildSignature(fields, passphrase) {
    let str = Object.entries(fields)
      .map(([k, v]) => `${k}=${pfEncode(v)}`)
      .join('&');
    if (passphrase) str += `&passphrase=${pfEncode(passphrase)}`;
    return crypto.createHash('md5').update(str).digest('hex');  
}

export async function onRequestGet({ request, env }) {
    const url = new URL(request.url);
    const publicToken = url.searchParams.get('publicToken');
    if (!publicToken) return new Response('Missing publicToken', { status: 400 });

    const res = await fetch(`https://payment.snipcart.com/api/public/custom-payment-gateway/payment-session?publicToken=${encodeURIComponent(publicToken)}`);
    
    if (!res.ok) return new Response('Invalid session', { status: 401 });
    const session = await res.json();

    const origin = url.origin;

    const raw = {
        merchant_id: env.PAYFAST_MERCHANT_ID,
        merchant_key: env.PAYFAST_MERCHANT_KEY,
        return_url: `${origin}/?payment=success`,
        cancel_url: session.paymentAuthorizationRedirectUrl || `${origin}/?payment=cancelled`,
        notify_url: `${origin}/api/confirm-payment`,
        email_address: session.invoice.email,
        m_payment_id: session.id,
        amount: Number(session.invoice.amount).toFixed(2),
        item_name: 'Jowas Coffee order',
        custom_str1: publicToken
    };
    const fields = Object.fromEntries(
        Object.entries(raw).filter(([, v]) => v !== undefined && v !== null && String(v).trim() !== '')
    );

    const signature = buildSignature(fields, env.PAYFAST_PASSPHRASE);

    return new Response(
        JSON.stringify({
            fields: { ...fields, signature },
            actionUrl:
              env.PAYFAST_MODE === 'live'
                ? 'https://www.payfast.co.za/eng/process'
                : 'https://sandbox.payfast.co.za/eng/process' 
        }),
        { headers: { 'Content-Type': 'application/json' } }
    );
}