import { PayloadValidation } from "@/services/validation/PayloadValidation";
import type { OrderType } from "@/types/ProfileTypes";
import type { APIRoute } from "astro";

export const POST: APIRoute = async({ request, cookies, redirect }) => {

    const data = await request.json();

    // Chama a função de validação
    const validationResponse = PayloadValidation({ data });

    // Se a validação falhar, retorna a resposta de erro
    if (validationResponse.message === 'ok') {
        const OxxValleyResponse = await fetch('https://oxx-three.vercel.app/oxx/orders/place', {
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
            const OxxValleyData: OrderType = await OxxValleyResponse.json();

            const encodedData = encodeURIComponent(JSON.stringify(OxxValleyData))

            console.log('Data do valley: ', OxxValleyData)

            cookies.set("order", OxxValleyData || "(Message not set)", {
                httpOnly: true,
                sameSite: "none",
                secure: true,
                path: '/painel'
            })
            
            return new Response(JSON.stringify(OxxValleyData), {
                headers: {
                    'Content-Type': 'application/json',
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
}