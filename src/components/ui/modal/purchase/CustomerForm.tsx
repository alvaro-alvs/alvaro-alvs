import { InputG } from "../../ui-assets/InputG";
import { PurchaseComment } from "../../ui-assets/PurchaseComment";



export default function CustomerForm() {

    return (
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
    )
}