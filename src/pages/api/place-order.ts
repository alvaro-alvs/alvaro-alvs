import { ValidateCustomer } from "@/services/ValidateCustomer";
import type { CustomerType } from "@/types/PaymentTypes";
import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ request }) => {
    //* https://oxx-three.vercel.app/oxx/orders/place/

    //* Criar pedido de pagamento com pix via OpenPix
    //* Criar novo usuario na OXX Valley -> se for o primeiro pedido
    //* Criar novo pedido na conta do usuario -> se usuario estiver cadastrado

    const data = await request.json();

    // Função de validação
    function PayloadValidation() {
        if (!data) {
            return new Response(JSON.stringify({
                message: "No data provided"
            }), {
                status: 400,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }

        if (!data.value) {
            return new Response(JSON.stringify({
                message: "Sem dados do Produto"
            }), {
                status: 400,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }

        // Valida os campos do `customer`
        const validationErrors: string[] = [];

        Object.keys(data.customer.validation).forEach((field) => {
            if (ValidateCustomer(field as keyof CustomerType['validation'], data.customer[field])) {
                validationErrors.push(`Campo ${field} é inválido.`);
            }
        });

        // Se houver erros de validação, retorna uma resposta com erro
        if (validationErrors.length > 0) {
            return new Response(JSON.stringify({
                message: "Erros de validação",
                errors: validationErrors
            }), {
                status: 400,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }


        return null; // Retorna null se não houver erro
    }

    // Chama a função de validação
    const validationResponse = PayloadValidation();

    // Se a validação falhar, retorna a resposta de erro
    if (validationResponse) {
        return validationResponse;
    }

    //* 10% -> cache openPix response
    const openPixResponse = await fetch('https://api.openpix.com.br/api/v1/charge', {
        body: JSON.stringify(data),
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${import.meta.env.OPEN_PIX_ADDID}`
        }
    })

    if (openPixResponse.ok) {
        const openPixData = await openPixResponse.json()

        //* 
        return new Response(JSON.stringify(openPixData), {
            status: 200,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    } else {
        const errorData = await openPixResponse.json()
        return new Response(JSON.stringify(errorData), {
            status: openPixResponse.status,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
};