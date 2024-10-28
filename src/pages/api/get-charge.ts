import type { CustomerType, PaymentPayloadType } from "@/types/PaymentTypes";
import type { APIRoute } from "astro";


const OPENPIXAPPID = import.meta.env.OPEN_PIX_APPID;

export const POST: APIRoute = async ({ request }) => {
    try {
        const order_data: { order: PaymentPayloadType, customer: CustomerType } = await request.json();
        

        if (!order_data) {
            return new Response(JSON.stringify('no id given'), { status: 400 });
        }

        const retrieveCharge = await fetch(`https://api.openpix.com.br/api/v1/charge/${order_data.order.correlationID}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': OPENPIXAPPID,
            }
        });

        if (retrieveCharge.ok) {
            const paymentRes = await retrieveCharge.json();

            return new Response(JSON.stringify(paymentRes), { status: 200 });

        } else if (retrieveCharge.status === 400) {
            // Create new charge if it does not exist
            const newOrderData = {
                ...order_data,
                order: {
                    ...order_data.order,
                    customer: order_data.customer
                }
            };

            const newChargeResponse = await fetch('https://api.openpix.com.br/api/v1/charge', {
                method: 'POST',
                body: JSON.stringify(newOrderData.order),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': OPENPIXAPPID,
                }
            });

            if (newChargeResponse.ok) {
                const paymentRes = await newChargeResponse.json();
                return new Response(JSON.stringify(paymentRes), { status: 201 });
            } else if (newChargeResponse.status === 400) {
                return new Response(JSON.stringify('Nao foi possivel criar cobrança'), { status: 400 });
            } else {
                return new Response(JSON.stringify({ message: 'cobrança inexistente' }), { status: 400 });
            }
        }

        return new Response(JSON.stringify('erro desconhecido'), { status: 418 });
    } catch (error) {
        return new Response(JSON.stringify({ message: 'Erro ao processar requisição', error: 'erro desconhecido' }), { status: 500 });
    }
}
