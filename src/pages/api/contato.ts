import type { APIRoute } from "astro";


export const POST: APIRoute = async ({ request }) => {
    try {
        const data = await request.json()
        
        //* Envia os dados de contato para a OXX API
        const send_data = await fetch(import.meta.env.URL_OXX_API_OXX_CONTACT, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'api-key': import.meta.env.OXX_KEY,
                'Content-Type': 'application/json'
            }
        })

        

        //* Recebe a resposta do servidor de transforma em Json
        const send_data_response = await send_data.json()        

        //* se a resposta do servidor for correta retorna
        if (send_data_response.nome) {
            
            return new Response(
                JSON.stringify({ 'status': 'ok' }),
                { status: 201, headers: { 'Content-Type': 'application/json' } }
            );
        } else {
            return new Response(JSON.stringify({ "status": "erro ao enviar" }), { status: 401 });
        }

    } catch (e) {
        console.log(e);
        
        return new Response("Invalid JSON body", { status: 400 });
    }
}
