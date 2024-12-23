import { useCustomer } from "@/components/providers/CustomerProfileProvider"
import { Input } from "@/components/ui/shadcn-ui/input"
import { formatCpf } from "@/services/formatStrings"
import { Label } from "@/components/ui/shadcn-ui/label"
import { useState } from "react"
import { FaArrowLeft, FaEye } from "react-icons/fa";
import { FaEyeLowVision } from "react-icons/fa6";

export default function PasswordStep() {

    const { customerState, setCustomerState } = useCustomer()
    const [show, setShow] = useState(false)

    function handleChange(e: string) {
        setCustomerState({ ...customerState, password: e })
    }

    return (
        <>
            <Label>Senha</Label>

            <span className="flex items-center border border-rose-500 rounded-sm divide-x divide-rose-500">
                <Input
                    onChange={(e) => handleChange(e.target.value)}
                    value={customerState.password}
                    className='border-none ring-rose-900'
                    placeholder="☻☻☻☻☻☻☻☻"
                    type={show ? 'password' : 'text'}
                />

                <div onClick={() => setShow(!show)} className="p-2 cursor-pointer hover:scale-110 transition">
                    {show ? <FaEyeLowVision /> : <FaEye />}
                </div>
            </span>

            <button className="text-xs w-full flex justify-center space-x-2 items-center p-2 bg-slate-900/20 hover:bg-slate-900/50 mt-5" onClick={() => setCustomerState({...customerState, step: 0})}>
                <FaArrowLeft />
                <p>Mudar CPF</p>
            </button>
        </>
    )
}