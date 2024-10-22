import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request }) => {
    try {
        const id = await request.json()

        const ordersRes = await fetch(import.meta.env.OXX_CUSTOMER_ORDERS_LIST_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'api-key': import.meta.env.OXX_KEY
            },
            body: JSON.stringify({ id: id.id })
        });

        if (!ordersRes.ok) {
            return new Response(JSON.stringify({ erro: 'Cliente nao encontrado' }));
        }

        const orders = await ordersRes.json();
        return new Response(JSON.stringify(orders));

    } catch (error) {
        console.error(error);
        return new Response('erro', { status: 418 });
    }
};
