import crypto from 'node:crypto';

function pfEncode(value) {
  return encodeURIComponent(String(value).trim())
    .replace(/[!'()*]/g, (c) => '%' + c.charCodeAt(0).toString(16).toUpperCase())
    .replace(/%20/g, '+');
}

function verifySignature(pairs, passphrase) {
  let str = pairs
    .filter(([k]) => k !== 'signature')
    .map(([k, v]) => `${k}=${pfEncode(v)}`)
    .join('&');
  if (passphrase) str += `&passphrase=${pfEncode(passphrase)}`;
  const expected = crypto.createHash('md5').update(str).digest('hex');
  const received = pairs.find(([k]) => k === 'signature')?.[1];
  return expected === received;
}

export async function onRequestPost({ request, env }) {
  const pairs = [...new URLSearchParams(await request.text()).entries()];
  const data = Object.fromEntries(pairs);

  if (!verifySignature(pairs, env.PAYFAST_PASSPHRASE)) {
    console.log('ITN rejected: bad signature');
    return new Response('Invalid signature', { status: 400 });
  }

  console.log('ITN status:', data.payment_status);
  if (data.payment_status !== 'COMPLETE') {
    return new Response('Ignored', { status: 200 });
  }

  const publicToken = data.custom_str1;
  const sessionRes = await fetch(
    `https://payment.snipcart.com/api/public/custom-payment-gateway/payment-session?publicToken=${encodeURIComponent(publicToken)}`
  );
  if (!sessionRes.ok) {
    console.log('ITN: session lookup failed', sessionRes.status);
    return new Response('Session not found', { status: 500 });
  }
  const session = await sessionRes.json();

  if (Number(data.amount_gross).toFixed(2) !== Number(session.invoice.amount).toFixed(2)) {
    console.log('ITN rejected: amount mismatch');
    return new Response('Amount mismatch', { status: 400 });
  }

  const confirm = await fetch(
    'https://payment.snipcart.com/api/private/custom-payment-gateway/payment',
    {
      method: 'POST',
      headers: {
        Authorization: `Basic ${btoa(env.SNIPCART_SECRET_API_KEY + ':')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        paymentSessionId: session.id,
        state: 'processed',
        transactionId: data.pf_payment_id
      })
    }
  );

  if (!confirm.ok) {
    console.log('ITN: Snipcart confirm failed', confirm.status, await confirm.text());
    return new Response('Snipcart confirm failed', { status: 500 });
  }

  return new Response('OK', { status: 200 });
}