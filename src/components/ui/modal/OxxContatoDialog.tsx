import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/shadcn-ui/dialog"
import { OxxLink } from "../ui-assets/OxxLink"
import { AiOutlineSend } from "react-icons/ai";
import OxxContactForm from "./OxxContactForm";


export const OxxContatoDialog = ({ mobile }: { mobile?: boolean }) => {

    return (
        <Dialog modal>
            <DialogTrigger className="flex justify-center h-full p-0 m-0">
                <OxxLink Label="Contato" Right={!mobile} >
                    <AiOutlineSend
                        className="w-6 h-6 group-hover:fill-rose-100 transition duration-300"
                    />
                </OxxLink>
            </DialogTrigger>
            <DialogContent className="border-transparent sm:border-rose-900 text-white bg-slate-950/20 backdrop-blur min-h-32 h-max">
                <DialogHeader className="grid space-y- pb-5 border- border-rose-900 select-none">
                    <DialogTitle className="text-4xl font-normal mt-5 mb-2">
                        📬 Envie uma Mensagem
                    </DialogTitle>
                    <DialogDescription className="text-white text-center text-xs">
                        <p>Adoraríamos ouvir você! Seja para tirar dúvidas, compartilhar ideias ou simplesmente dizer "Oi" 👋, estamos aqui para ajudar. 😊</p>
                    </DialogDescription>

                </DialogHeader>

                <article className="h-max min-h-[18rem]">
                    <OxxContactForm />
                </article>
            </DialogContent>
        </Dialog>
    )
}