import { useContext } from "react"
import { OxxContactContext } from "../OxxContactForm"


type OxxInputType = {
    field: string,
    type: "text" | "password" | "message",
    label: string,
    placeholder?: string
}


export const OxxInput = ({ field, type, label, placeholder }: OxxInputType) => {
    const { formData, setFormData } = useContext(OxxContactContext)

    const InputStyles = "p-2 text-indigo-100 border border-indigo-900 bg-slate-950 rounded hover:scale-105 focus-visible:scale-110 hover:shadow-xl hover:shadow-indigo-700/10 focus-visible:border-[1px_solid_#3e1d63] focus-visible:ring-indigo-900 focus-visible:outline-0 focus-visible:border-indigo-700 transition-all duration-200"

    const handleChange = ({ e, field }: { e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>, field: string }) => {
        setFormData({ ...formData, [field]: e.target.value })
    }

    return (
        <fieldset className="flex flex-col space-y-1">
            <label htmlFor="">{label}</label>

            {field === "message" ? (
                <textarea
                    value={formData[field]}
                    onChange={(e) => handleChange({ e, field })}
                    className={InputStyles + 'max-h-[5rem]'}
                    name="message"
                    placeholder={placeholder}
                >

                </textarea>
            ) :
                <input
                    name={field} type={type} placeholder={placeholder}
                    value={formData[field]}
                    className={InputStyles}
                    onChange={
                        (e) => {
                            handleChange({ e, field })
                        }
                    }
                />
            }
        </fieldset>
    )
}