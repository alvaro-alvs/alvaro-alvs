import type { ForYouContentType } from "@/types/OxxTypes"
import { Label } from "../shadcn-ui/label"
import { Textarea } from "../shadcn-ui/textarea"
import { InputStyles } from "./OxxInput"
import { usePayment } from "@/components/providers/PaymentProvider"
import { useEffect } from "react"




export const PurchaseComment = () => {
    const { product, payload, setPayload } = usePayment()

    const handleChange = (e: string) => {
        setPayload({ ...payload, comment: e })
    }

    useEffect(() => {
        setPayload({ ...payload, comment: product?.clientMessage })
    }, [])

    return (
        <div className="py-5">
            <Label className=" text-xl">Descrição</Label>
            <p className=" capitalize text-xs pb03">detalhes sobre seu projeto</p>

            <div className="relative h-max">
                <Textarea onChange={(e) => handleChange(e.target.value)} value={payload?.comment} className={`h-[12rem] max-h-[20rem] bg-gradient-to-b from-slate-950 to-slate-900 border-slate-900 hover:scale-105 transition`} placeholder={product?.title} />
            </div>
        </div>
    )
}