import type { CustomerType, PaymentPayloadType } from "./PaymentTypes"



export type OrderType = {
    success: boolean,
    data: {
        customer: CustomerType,
        order: PaymentPayloadType
    }
}

export interface CustomerContextType {
    customerState: {
        email: string;
        password: string;
        step: 0 | 1 | 2 | 3;
        cpf: string;
        customer: CustomerType | undefined;
        orders: any[]; // ou possivelmente OrderType[] se houver um tipo definido para ordens
        keepSession: boolean;
    },
    setCustomerState: React.Dispatch<React.SetStateAction<any>>;
}