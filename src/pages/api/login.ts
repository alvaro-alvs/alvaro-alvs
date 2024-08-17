import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request }) => {
    try {
        // Parsing the request body as JSON
        const data = await request.json();
        // console.log('Received Request Data:', data);

        // Checking if the necessary fields are present
        const { username, password } = data;
        if (!username || !password) {
            return new Response("Missing username or password", { status: 400 });
        }

        const validation_res = await fetch('https://oxx-three.vercel.app/oxx_auth/auth_dashboard_login/', {
            method: 'POST',
            body: JSON.stringify({
                username: username,
                password: password
            }),
            headers: {
                'api-key': import.meta.env.PUBLIC_OXX_KEY
            }
        })

        const validation_data = await validation_res.json();

        if (validation_data.status === 'success') {
            console.log(validation_data);
            
            return new Response(
                JSON.stringify({
                    state: 'received',
                    username: username,
                    password: password
                }),
                { status: 200, headers: { 'Content-Type': 'application/json' } }
            );
        } else {
            return new Response("Invalid credentials", { status: 401 });
        }

        // Return a response with the received data
    } catch (error) {
        // console.error('Error parsing request body:', error);
        return new Response("Invalid JSON body", { status: 400 });
    }
};
