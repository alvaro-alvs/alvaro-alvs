import { useCustomer } from "@/components/providers/CustomerProfileProvider"
import { Input } from "@/components/ui/shadcn-ui/input"
import { formatCpf } from "@/services/formatStrings"
import { Label } from "@/components/ui/shadcn-ui/label"
import { useState } from "react"
import { FaEye } from "react-icons/fa";
import { FaEyeLowVision } from "react-icons/fa6";

export default function PasswordStep() {

    const { customerState, setCustomerState } = useCustomer()
    const [show, setShow] = useState(false)


    return (
        <>
            <Label>Senha</Label>
            <span>
                <Input onChange={(e) => setCustomerState({...customerState, password: e.target.value})} value={customerState.password} className=' border-rose-500' placeholder="cpf" type={show ? 'password' : 'text'} />

                <div className="">
                    {show ? <FaEyeLowVision /> : <FaEye />}
                </div>
            </span>
        </>
    )
}