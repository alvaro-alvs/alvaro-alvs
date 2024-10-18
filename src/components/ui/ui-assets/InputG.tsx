import { usePayment } from "@/components/providers/PaymentProvider"
import type { CustomerType } from "@/types/PaymentTypes"
import { InputStyles } from "./OxxInput"
import { Label } from "@radix-ui/react-dropdown-menu"
import { useEffect } from "react"
import { ValidateCustomer } from "@/services/ValidateCustomer"

export const InputG = ({ name, label }: { name: keyof CustomerType['validation'], label: string }) => {
    const { customer, setCustomer } = usePayment()

    // Handle para mudança no input
    const handleChange = (value: string) => {
        const isValid = ValidateCustomer(name, value);

        setCustomer(prev => ({
            ...prev,
            [name]: value,
            validation: {
                ...prev.validation,
                [name]: isValid
            }
        }));
    }

    return (
        <div className="group w-full">
            <Label className="">{label}</Label>

            <input
                name={name}
                type='text'
                value={customer[name]?.toString()}
                className={`${InputStyles} w-full ${customer.validation[name] && 'ring-2 ring-red-600 border-red-500'}`}
                onChange={(e) => handleChange(e.target.value)}
                onBlur={(e) => handleChange(e.target.value)} // Valida ao sair do campo
            />
            {customer.validation[name] &&
                <p className="text-red-200 text-xs"> Preecha este campo</p>
            }
        </div >
    );
}
