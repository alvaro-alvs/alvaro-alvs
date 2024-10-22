import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request }) => {
    try {
        // Parsing the request body as JSON
        const cpf = await request.json();
        // console.log('Received Request Data:', data);

        if (!cpf) {
            return new Response("Missing tax_id", { status: 400 });
        }

        const authRes = await fetch(`${import.meta.env.OXX_CUSTOMER_AUTH_URL}`, {
            method: 'POST',
            body: JSON.stringify({ cpf: cpf }),
            headers: {
                'Content-Type': 'application/json',
                'api-key': import.meta.env.OXX_KEY
            }
        })


        if (authRes.status === 302) {
            const auth_data = await authRes.json();

            return new Response(JSON.stringify(auth_data), { status: 200 })
        } else {

            return new Response("Invalid credentials", { status: 401 });
        }

        // Return a response with the received data
    } catch (error) {
        // console.error('Error parsing request body:', error);
        return new Response(JSON.stringify(error), { status: 400 });
    }
};
