import { useContext } from "react"
import { OxxContactContext } from "../modal/OxxContactForm"

type OxxInputType = {
    field: string,
    type: "text" | "password" | "message",
    label: string,
    placeholder?: string,
    required?: boolean
}

// todo refatorar usando ZOD
export const InputStyles = "p-2 text-indigo-100 border border-slate-800 bg-slate-950 rounded hover:scale-105 focus-visible:scale-110 hover:shadow-xl hover:shadow-indigo-700/10 focus-visible:border-[1px_solid_#3e1d63] focus-visible:ring-indigo-900 focus-visible:outline-0 focus-visible:border-indigo-700 transition-all duration-200"

export const OxxInput = ({ field, type, label, placeholder, required = false }: OxxInputType) => {
    const { formData, setFormData, validate, setValidate } = useContext(OxxContactContext)


    const validateField = (field: string): boolean => {
        if (formData[field] && formData[field].length > 2) {
            setValidate({ ...validate, [field]: false })
            return true;
        } else {
            setValidate({ ...validate, [field]: true })
            return false;
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>, field: string) => {
        const value = e.target.value

        setFormData({ ...formData, [field]: value })

        function validateEmail(email: string): boolean {
            if (validateField(email) && value.includes('@')) {
                return true;
            } else {
                return false
            }
        }

        switch (field) {
            case 'nome':
                if (value.length > 1) {
                    setValidate({ ...validate, [field]: false })
                } else {
                    setValidate({ ...validate, [field]: true })
                }
                break;
            case 'email':
                if (validateEmail(value)) {
                    setValidate({ ...validate, [field]: false })
                } else {
                    setValidate({ ...validate, [field]: true })
                }
                break;
            case 'telefone':
                if (validateField(value)) {
                    setValidate({...validate, email: false, telefone: false})
                } else {
                    setValidate({...validate, email: true, telefone: true})
                }
            default:
                validateField(field)
        }
    }

    return (
        <fieldset className="flex flex-col space-y-1">
            <label htmlFor={field}>{label}</label>

            {type === "message" ? (
                <textarea
                    value={formData[field] || ""}
                    onChange={(e) => handleChange(e, field)}
                    className={`${InputStyles} max-h-[5rem]`}
                    name={field}
                    placeholder={placeholder}
                />
            ) : (
                <>
                    <input
                        name={field}
                        type={type}
                        placeholder={placeholder}
                        value={formData[field] || ""}
                        className={`${InputStyles} ${validate[field] && 'border-red-500'}`}
                        onChange={(e) => handleChange(e, field)}
                    />
                    {required && validate[field] && (
                        <small className="text-red-500"> {field === 'email' ? '* Certifique-se de que o Email esta correto' : '* Preencha este campo'} </small>
                    )}
                </>
            )}
        </fieldset>
    )
}
