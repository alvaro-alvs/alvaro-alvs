import type { CustomerType, PaymentPayloadType } from "./PaymentTypes"


export type SessionType = {
    success: boolean,
    message: string,
    customer: {
        id: number,
        name: string,
        taxID: string,
        email: string,
        phone: string,
        pix_key: string,
        status: string | null,
        access: string | null,
        created_at: string,
        last_order_ad: string
    }
}

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