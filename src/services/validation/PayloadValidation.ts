import type { CustomerType } from "@/types/PaymentTypes";
import { ValidateCustomer } from "../ValidateCustomer";


/**
 * PayloadValidation
 * Valida se o payload da requisi o tem todos os campos necessarios,
 * incluindo o valor do produto e os campos do `customer`.
 * Retorna uma resposta com o status da validacao.
 * @param {object} data - Payload da requisi o
 * @returns {object} - Resposta com o status da validacao
 * @prop {string} message - Mensagem de status da validacao
 * @prop {string[]} errors - Lista de erros de validacao
 */
export function PayloadValidation({ data }: { data: any }) {
    if (!data) {
        return { message: "No data provided" }
    }

    if (!data.value) {
        return { message: "Sem dados do Produto" }
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
        return { message: "Erro de validação", errors: validationErrors }
    }

    return { message: 'ok' }
}