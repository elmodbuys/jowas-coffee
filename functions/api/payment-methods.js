export async function onRequestPost({ request }) {
    const body = await request.json().catch(() => ({}));
    const publicToken = body.publicToken ?? body.PublicToken;


    if (!publicToken) {
        return new Response('Missing publicToken', { status: 400 });
    }

    const valid = await fetch(`https://payment.snipcart.com/api/public/custom-payment-gateway/validate?publicToken=${encodeURIComponent(publicToken)}`);
    if (!valid.ok) {
        return new Response('', { status: 404 });
    }

    const origin = new URL(request.url).origin;

    return new Response(
        JSON.stringify([
            {
                id: 'payfast',
                name: 'PayFast',
                checkoutUrl: `${origin}/checkout?publicToken=${encodeURIComponent(publicToken)}`
            }
        ]),
        { headers: { 'Content-Type': 'application/json' } }
    );
}