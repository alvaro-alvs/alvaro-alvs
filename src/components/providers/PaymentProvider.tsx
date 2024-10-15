import { createContext, useState, useContext, useEffect } from 'react'
import type { CustomerType, PaymentContextType, PaymentPayloadType } from '@/types/PaymentTypes';
import type { ForYouContentType } from '@/types/OxxTypes';

const t = createContext<PaymentContextType | undefined>(undefined);

export default function PaymentProvider({ children }: { children: any }) {
    //* Status do Modal de Compra
    const [open, setOpen] = useState(false)

    //* Produto de Interesse Selecionado
    const [product, setProduct] = useState<ForYouContentType | undefined>(undefined)

    //* Dados Gerados para a criação do pagamento
    const [payload, setPayload] = useState<PaymentPayloadType>({
        correlationID: '',
        value: 0,
        customer: {} as CustomerType,
        additionalInfo: [],
        comment: ''
    });

    //* Dados do Customer Form
    const [customer, setCustomer] = useState<CustomerType>({
        name: '',
        taxID: '',
        phone: '',
        email: '',
        validation: {
            name: false,
            taxID: false,
            phone: false,
            email: false
        }
    });

    const handleClose = () => {
        setProduct(undefined)
        setOpen(false)
    }

    return (
        <t.Provider value={{ payload, setPayload, customer, setCustomer, open, setOpen, product, setProduct, handleClose }}>
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