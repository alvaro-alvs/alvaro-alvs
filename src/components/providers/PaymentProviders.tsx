import { createContext, useState, useContext, useEffect } from 'react'
import type { CustomerType, PaymentPayloadType } from '@/types/PaymentTypes';

type PaymentContextType = {
    payload: PaymentPayloadType | null,
    setPayload: React.Dispatch<React.SetStateAction<PaymentPayloadType>>,
    customer: CustomerType,
    setCustomer: React.Dispatch<React.SetStateAction<CustomerType>>,
}

const t = createContext<PaymentContextType | undefined>(undefined);

export default function PaymentProvider({ children }: { children: any }) {
    //* Dados Gerados para a criação do pagamento
    const [payload, setPayload] = useState<PaymentPayloadType>({
        correlationID: '',
        value: 0,
        customer: {} as CustomerType,
        additionalInfo: [],
        comment: ''
    });

    //* Dados do Formulario de Compra
    const [customer, setCustomer] = useState<CustomerType>({
        name: '',
        taxID: '',
        phone: '',
        email: '',
    });

    useEffect(() => {
        console.log('Dados do comprador: ', customer);
    }, [customer])
    

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