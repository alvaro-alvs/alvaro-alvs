import type { ContactType } from "@/types/OxxTypes";
import React, { createContext, useContext, useState } from "react";



const OxxContactContext = createContext(null as any)


interface ContatoProviderInterface {
    children: React.ReactNode;
    open?: boolean;
    setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
    product?: string;
}

export default function OxxContatoProvider({ children, open, setOpen, product }: ContatoProviderInterface) {
    const [contato, setContato] = useState<ContactType>({
        nome: '',
        email: '',
        message: 'Olá, gostaria de saber mais sobre os serviços oferecidos e obter um orçamento. Aguardo retorno',
        telefone: '',
        product: product || 'contato_simples',
    })

    const [validate, setValidate] = useState({
        nome: false,
        email: false,
        telefone: false,
        message: false
    })

    return (
        <OxxContactContext.Provider value={{ contato, setContato, validate, setValidate, open, setOpen }}>
            {children}
        </OxxContactContext.Provider>
    )
}

export const useContato = () => {
    if (!OxxContactContext) {
        throw new Error('useContato must be used within a ContatoProvider')
    }

    return useContext(OxxContactContext)
}