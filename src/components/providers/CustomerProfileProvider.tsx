import type { CustomerContextType } from "@/types/ProfileTypes";
import { createContext, useState } from "react"



const CustomerContext = createContext<CustomerContextType | null>(null);


export default function CustomerProfileProvider({ children }: { children: any }) {
    const [customer, setCustomer] = useState()
    const [order, setOrder] = useState()

    return (
        <CustomerContext.Provider value={{ customer, setCustomer, order, setOrder }}>
            {children}
        </CustomerContext.Provider>
    )
}