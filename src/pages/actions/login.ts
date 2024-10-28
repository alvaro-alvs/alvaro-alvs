import type { OrderType } from '@/types/ProfileTypes';
import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request, cookies }) => {
    try {
        // Parsing the request body as JSON
        const cpf = await request.json();
        // console.log('Received Request Data:', data);

        if (!cpf) {
            return new Response("Missing tax_id", { status: 400 });
        }

        const authRes = await fetch(import.meta.env.OXX_CUSTOMER_AUTH_URL, {
            method: 'POST',
            body: JSON.stringify({ cpf: cpf }),
            headers: {
                'Content-Type': 'application/json',
                'api-key': import.meta.env.OXX_KEY,
            }
        })

        
        if (authRes.ok) {
            console.log(authRes.status)
            const auth_data: OrderType = await authRes.json();

            if (!auth_data) {
                return new Response("Invalid credentials", { status: 401 });
            }

            console.log(auth_data);

            return new Response(JSON.stringify(auth_data), {
                status: 200,
                headers: {
                    'Content-Type': 'application/json',
                }
            })
        } else {

            return new Response("Invalid credentials", { status: 401 });
        }

    } catch (error) {
        console.error(error);
        return new Response("Internal Server Error", { status: 500 });
    }
};
