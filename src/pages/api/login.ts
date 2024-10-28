import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request }) => {
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
            'api-key': import.meta.env.OXX_KEY,
        }
    })


    if (authRes.ok) {
        const auth_data = await authRes.json();

        //* Encoded data for set-cookie
        const encodedData = encodeURIComponent(JSON.stringify(auth_data))

        return new Response(JSON.stringify(auth_data), {
            headers: {
                'Set-Cookie': `session=${encodedData}; HttpOnly; SameSite=None; Secure; Path=/painel; Max-Age=3600`,

            },
            status: 200,
        })
    } else {

        return new Response("Invalid credentials", { status: 401 });
    }

};
