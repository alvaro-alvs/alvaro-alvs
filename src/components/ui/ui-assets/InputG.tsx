import { usePayment } from "@/components/providers/PaymentProviders"
import type { CustomerType } from "@/types/PaymentTypes"
import { InputStyles } from "./OxxInput"
import { Label } from "@radix-ui/react-dropdown-menu"




export const InputG = ({ name, label }: { name: keyof CustomerType, label: string }) => {
    const { customer, setCustomer } = usePayment()

    const handleChange = (value: string) => {
        setCustomer({ ...customer, [name]: value } as CustomerType)
    }

    return (
        <div className="group">
            <Label className=""> {label} </Label>

            <input
                name={name}
                type='text'
                value={customer[name as keyof CustomerType]}
                className={`${InputStyles} w-full `}
                onChange={(e) => handleChange(e.target.value)}
            />
        </div>
    )
}