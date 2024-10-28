import { useCustomer } from "@/components/providers/CustomerProfileProvider"
import CustomerLogin from "./components/auth/CustomerLogin"
import CustomerLastOrder from "./components/CustomerLastOrder"
import type { OrderType, SessionType } from "@/types/ProfileTypes"


import { useEffect } from "react";

export default function CustomerIndex({ session, order }: { order?: OrderType | undefined, session?: string | undefined }) {
    const { customerState, setCustomerState } = useCustomer();

    useEffect(() => {
        if (order && order.data.customer) {
            const orderJson: OrderType = order

            setCustomerState({
                ...customerState,
                customer: { ...customerState.customer, ...order.data.customer },
                orders: [
                    order.data.order
                ],
                step: 2
            })

            console.log('Dados do pedido obtidos via cookie: ', customerState);

        }
    }, [order]); // Apenas executa o efeito quando `session` muda

    return customerState.step === 2 ? (<CustomerLastOrder />) : (<CustomerLogin />);
}
