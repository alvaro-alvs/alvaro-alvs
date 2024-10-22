import { useCustomer } from "@/components/providers/CustomerProfileProvider"
import CustomerLogin from "./components/auth/CustomerLogin"
import CustomerLastOrder from "./components/CustomerLastOrder"



export default function CustomerIndex() {
    const { customerState } = useCustomer()

    return (
        <>
            {customerState.step === 2 ? <CustomerLastOrder /> : <CustomerLogin /> }
        </>
    )
}