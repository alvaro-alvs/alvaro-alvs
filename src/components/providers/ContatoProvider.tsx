import type { ContactType } from "@/types/OxxTypes";
import React, { createContext, useContext, useState } from "react";



const OxxContactContext = createContext(null as any)


export default function OxxContatoProvider({ children, open, setOpen }: { children: React.ReactNode, open: boolean, setOpen: React.Dispatch<React.SetStateAction<boolean>> }) {
    const [contato, setContato] = useState<ContactType>({
        nome: '',
        email: '',
        message: '',
        telefone: '',
        product: 'contato_simples',
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