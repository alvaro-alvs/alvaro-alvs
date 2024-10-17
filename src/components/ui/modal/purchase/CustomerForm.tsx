import { usePayment } from "@/components/providers/PaymentProvider";
import { InputG } from "../../ui-assets/InputG";
import { PurchaseComment } from "../../ui-assets/PurchaseComment";



export default function CustomerForm() {
    const { setCustomer } = usePayment()

    const handlePreencher = () => {
        setCustomer({
            name: 'Alvaro',
            taxID: '51575242850',
            email: 'alvaro.nrx88@gmail.com',
            phone: '11949164181',
            validation: {
                email: false,
                name: false,
                phone: false,
                taxID: false
            }
        })
    }

    return (
        <>
            <button onClick={() => handlePreencher()}> Preencher </button>
            <form action="#" className="w-full max-w-[32rem] sm:w-2/3 space-y-3">

                <h1 className="text-xl pb-3">Seus Dados</h1>
                <span className="sm:flex w- justify-stretch sm:space-x-5">
                    <InputG name="name" label="Nome Completo" />
                    <InputG name="taxID" label="Seu CPF" />
                </span>

                <span className="sm:flex w- justify-stretch sm:space-x-5">
                    <InputG name="email" label="Email" />
                    <InputG name="phone" label="Celular (com DDD)" />
                </span>
                <PurchaseComment />
            </form>
        </>
    )
}