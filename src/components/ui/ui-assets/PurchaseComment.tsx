import type { ForYouContentType } from "@/types/OxxTypes"
import { Label } from "../shadcn-ui/label"
import { Textarea } from "../shadcn-ui/textarea"
import { InputStyles } from "./OxxInput"




export const PurchaseComment = ({Product}: {Product: ForYouContentType}) => {

    return (
        <div className="">
            <Label className=" text-xl">Descrição</Label>
            <p className=" capitalize text-xs pb03">detalhes sobre seu projeto</p>
            <Textarea value={`-${Product?.title}-\n \n Cor Favorita: `} className={InputStyles + ' h-[12rem] max-h-[20rem]'} placeholder="Message" />
        </div>
    )
}