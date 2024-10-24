import { useCustomer } from "@/components/providers/CustomerProfileProvider"
import { Input } from "@/components/ui/shadcn-ui/input"
import { Label } from "@/components/ui/shadcn-ui/label"
import { formatCpf } from "@/services/formatStrings"
import { useState } from "react"



export const CPFStep = () => {
    const { customerState, setCustomerState } = useCustomer()

    return (
        <>
            {/* <p onClick={() => setCustomerState({...customerState, cpf: '51575242850'})}>fill</p> */}
            <Label>CPF</Label>
            <Input onChange={(e) => setCustomerState({...customerState, cpf: e.target.value})} value={formatCpf(customerState.cpf)} className=' border-rose-500' placeholder="cpf" maxLength={15} />
        </>
    )
}