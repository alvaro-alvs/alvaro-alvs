import type { CustomerType, PaymentPayloadType } from "./PaymentTypes"



export type OrderType = {
    success: boolean,
    data: {
        customer: CustomerType,
        order: PaymentPayloadType
    }
}

export interface CustomerContextType {
    customer: any;
    setCustomer: React.Dispatch<React.SetStateAction<any>>;
    order: any;
    setOrder: React.Dispatch<React.SetStateAction<any>>;
}