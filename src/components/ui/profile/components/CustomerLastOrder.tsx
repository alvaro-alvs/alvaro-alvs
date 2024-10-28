import { useCustomer } from "@/components/providers/CustomerProfileProvider"
import { useEffect } from "react"
import { toast } from "sonner"
import { PixPayment } from "./payment/PixPayment"
import type { OrderType } from "@/types/ProfileTypes"




export default function CustomerLastOrder() {
    const { customerState, setCustomerState } = useCustomer();


    const fetchOrders = async () => {
        try {
            const res = await fetch('api/fetch-orders', {
                method: 'post',
                body: JSON.stringify({ id: customerState.customer?.id }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (res.ok) {
                const data = await res.json();

                setCustomerState({ ...customerState, orders: data });

                toast.info('sucesso');
            } else {
                toast.error('erro');
            }
        } catch (error) {
            toast.error('Erro ao buscar pedidos');
        }
    };


    useEffect(() => {
        if (customerState.orders.length === 0) {
            fetchOrders()

        }

    }, [])

    return (
        <section className="min-h-screen">
            <div className="text-rose-100">
                <aside className="flex flex-col p-10">
                    <span className="text-xl"> Ola, {customerState.customer?.name || 'Cliente'} </span>
                    <span className="text-xs"> Email: {customerState.customer?.email || 'Não disponível'} </span>
                </aside>

                {customerState?.orders[0] && customerState?.orders.length > 0 ? (
                    <PixPayment />
                ) : (
                    <div className="text-center">Sem pedidos para mostrar</div>
                )}
            </div>
        </section>
    );
}
