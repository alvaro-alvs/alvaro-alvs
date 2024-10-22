import type { CustomerType } from "@/types/PaymentTypes";
import type { CustomerContextType } from "@/types/ProfileTypes";
import { createContext, useContext, useState } from "react"



const CustomerContext = createContext<CustomerContextType | null>(null);


export default function CustomerProfileProvider({ children }: { children: any }) {
    const [customerState, setCustomerState] = useState({
        email: '',
        password: '',
        step: 0 as 0 | 1 | 2 | 3,
        cpf: '',
        customer: undefined as CustomerType | undefined,
        orders: [],
        keepSession: false,
    });

    return (
        <CustomerContext.Provider value={{ customerState, setCustomerState }}>
            {children}
        </CustomerContext.Provider>
    )
}


export function useCustomer() {
    const context = useContext(CustomerContext);
    if (!context) {
        throw new Error('useCustomer must be used within a CustomerProfileProvider');
    }
    return context;

}
