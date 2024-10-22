import { Input } from "@/components/ui/shadcn-ui/input";
import { formatCpf } from "@/services/formatStrings";
import { Label } from "@/components/ui/shadcn-ui/label"
import { useCustomer } from "@/components/providers/CustomerProfileProvider";
import { FaArrowLeft } from "react-icons/fa";




export default function CustomerMailConfirm() {
    const { customerState, setCustomerState } = useCustomer()

    return (
        <>
            <Label>Email</Label>
            <Input onChange={(e) => setCustomerState({...customerState, email: e.target.value})} value={customerState.email} className=' border-rose-500' placeholder="Seu Email de Cadastro" />

            <p className="mt-5 text-rose-100 text-xs text-center">Entre com o Email</p>

            <button className="w-full flex justify-center space-x-2 items-center p-2 bg-slate-900/20 hover:bg-slate-900/50 mt-5" onClick={() => setCustomerState({...customerState, step: 0})}>
                <FaArrowLeft />
                <p>Mudar CPF</p>
            </button>
        </>
    )
}