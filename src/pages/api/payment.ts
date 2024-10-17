import type { APIRoute } from 'astro';


export const POST: APIRoute = async ({ request }) => {

    const pay_data = await request.json();

    console.log('Dados recebidos: ', JSON.stringify(pay_data));


    const res = await fetch('https://api.openpix.com.br/api/v1/charge', {
        body: JSON.stringify(pay_data),
        method: 'POST',
        headers: {
            'Authorization': import.meta.env.OPEN_PIX_KEY,
            'Content-Type': 'application/json'
        }
    })

    if (res.ok) {
        const data = await res.json()


        return new Response(JSON.stringify({ pix: data }), {
            status: 200,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    } else {
        return new Response(JSON.stringify({ message: 'Erro ao processar pagamento' }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
}