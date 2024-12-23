import { useCustomer } from "@/components/providers/CustomerProfileProvider"
import { Input } from "@/components/ui/shadcn-ui/input"
import { Label } from "@/components/ui/shadcn-ui/label"
import { formatCpf } from "@/services/formatStrings"
import { useState } from "react"



export const CPFStep = () => {
    const { customerState, setCustomerState } = useCustomer()

    function handleChange(e: string) {
        setCustomerState({ ...customerState, cpf: e })
    }

    return (
        <>
            {/* <p onClick={() => setCustomerState({...customerState, cpf: '51575242850'})}>fill</p> */}
            <Label>CPF</Label>
            <Input
                onKeyDown={(e) => e.key === 'Enter' && setCustomerState({...customerState, step: 1})}
                onChange={(e) => handleChange(e.target.value)}
                value={formatCpf(customerState.cpf)}
                className=' border-rose-500'
                placeholder="cpf"
                maxLength={15}
            />
        </>
    )
}