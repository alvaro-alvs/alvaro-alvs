import { createContext, useState, useContext } from 'react'
import type { CustomerType, PaymentPayloadType } from '@/types/PaymentTypes';

type PaymentContextType = {
    payload: PaymentPayloadType | null,
    setPayload: React.Dispatch<React.SetStateAction<PaymentPayloadType | null>>,
    customer: CustomerType,
    setCustomer: React.Dispatch<React.SetStateAction<CustomerType>>,
}

const t = createContext<PaymentContextType | undefined>(undefined);

export default function PaymentProvider({ children }: { children: any }) {
    //* Dados Gerados para a criação do pagamento
    const [payload, setPayload] = useState<PaymentPayloadType | null>(null);
    //* Dados do Formulario de Compra
    const [customer, setCustomer] = useState<CustomerType>({
        name: '',
        taxID: '',
        phone: '',
        email: '',
    });


    return (
        <t.Provider value={{ payload, setPayload, customer, setCustomer }}>
            {children}
        </t.Provider>
    )
}

export function usePayment() {
    const context = useContext(t);
    if (!context) {
        throw new Error('usePayment must be used within a PaymentProvider');
    }
    return context;
}