import type { CustomerType } from "@/types/PaymentTypes";

// Função de validação baseada no nome do campo
//! TRUE = NÃO VÁLIDO
export function ValidateCustomer(name: keyof CustomerType['validation'], value: string) {
    switch (name) {
        case 'name':
            return !(value.length > 2);
        case 'email':
            return !(value.includes('@') && value.length > 5); // validação mais robusta para e-mail
        case 'taxID':
            return value.length != 11; // exemplo: validação de CPF com 11 dígitos
            case 'phone':
                return value.length > 0 && !(value.length >= 10 && value.length <= 11);
        default:
            return true;
    }
}