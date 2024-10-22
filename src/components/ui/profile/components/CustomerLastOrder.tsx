import { useCustomer } from "@/components/providers/CustomerProfileProvider"
import { useEffect } from "react"
import { toast } from "sonner"
import { Button } from "../../shadcn-ui/button"
import { PixPayment } from "./payment/PixPayment"





export default function CustomerLastOrder() {
    const { customerState, setCustomerState } = useCustomer()

    const fetchOrders = async () => {

        const res = await fetch('api/fetch-orders', {
            method: 'post',
            body: JSON.stringify({ id: customerState.customer?.id }),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        if (res.ok) {
            const data = await res.json()
            console.log(data);

            setCustomerState({...customerState, orders: data})

            toast.info('sucesso')
        } else {
            toast.error('erro')
        }
    }

    useEffect(() => {

        fetchOrders()
    }, [])

    return (
        <section className="min-h-screen">
            <div className="text-rose-100">
                <aside className="flex flex-col p-10">
                    <span className="text-xl"> Ola, {customerState.customer?.name} </span>
                    <span className="text-xs"> Email: {customerState.customer?.email} </span>

                </aside>

                <PixPayment orderData={customerState.orders[0]} app_id="" />
            </div>
        </section>
    )
}