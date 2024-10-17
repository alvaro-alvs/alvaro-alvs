import { PayloadValidation } from "@/services/validation/PayloadValidation";
import type { APIRoute } from "astro";


//* https://oxx-three.vercel.app/oxx/orders/place/

//* Criar pedido de pagamento com pix via OpenPix
//* Criar novo usuario na OXX Valley -> se for o primeiro pedido
//* Criar novo pedido na conta do usuario -> se usuario estiver cadastrado


export const POST: APIRoute = async ({ request }) => {

    const data = await request.json();

    // Chama a função de validação
    const validationResponse = PayloadValidation({ data });

    // Se a validação falhar, retorna a resposta de erro
    if (validationResponse.message === 'ok') {
        const OxxValleyResponse = await fetch('https://oxx-three.vercel.app/oxx/orders/place/', {
            body: JSON.stringify({
                customer: {
                    name: data.customer.name,
                    taxID: data.customer.taxID,
                    email: data.customer.email,
                    phone: data.customer.phone,
                    pix_key: ''
                },
                order: {
                    correlationID: data.correlationID,
                    value: data.value,
                    comment: data.comment,
                    additionalInfo: data.additionalInfo,
                }
            }),
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'api-key': import.meta.env.OXX_KEY
            }
        })

        if (OxxValleyResponse.status === 400) {

            return new Response(JSON.stringify({ error: true }), {
                status: 400,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }

        if (OxxValleyResponse.status === 201) {
            const OxxValleyData = await OxxValleyResponse.json();

            console.log('valley res: ', OxxValleyData);
            
            return new Response(JSON.stringify(OxxValleyData), {
                status: 302,
                headers: {
                    'Content-Type': 'application/json',
                    'Location': '/perfil',
                    'Set-Cookie': `order=${encodeURIComponent(JSON.stringify(OxxValleyData))}; HttpOnly; SameSite=None; Path=/perfil; Max-Age=3600`
                    // 'Set-Cookie': `cpf=${OxxValleyData.data.customer.taxID}; HttpOnly; SameSite=Strict; Path=/perfil; Max-Age=3600`,
                }
            });
        }
    }

    return new Response(JSON.stringify(validationResponse), {
        status: 400,
        headers: {
            'Content-Type': 'application/json'
        }
    });
};