//* @/components/ui/shadcn-ui/

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/shadcn-ui/dialog"
import { OxxLink } from "../../ui-assets/OxxLink"
import { LiaShippingFastSolid } from "react-icons/lia";
import OxxContactForm from "../OxxContactForm";
import OxxContatoProvider from "@/components/providers/ContatoProvider";
import { useState } from "react";


export default function CTAContact() {
    const [open, setOpen] = useState(false)

    return (
        <>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger className="p-2 flex flex-col items-center gap-1 text-white w-[15rem] border-none bg-gradient-to-r from-fuchsia-600 via-rose-500 to-red-600
                rounded
                hover:brightness-150 hover:shadow-[0_0_10rem_#f43fcf]
                transition duration-500
                font-thin text-xl text-center cursor-pointer
            ">
                    <LiaShippingFastSolid />
                    <p className="text-center">Aquirir Site</p>
                </DialogTrigger>
                <DialogContent className="z-[999] border-none backdrop-blur-2xl bg-gradient-to-b from-black/50 to-rose-900/15">
                    <DialogHeader>
                        <DialogTitle>🏗️ Vamos Conversar Sobre seu Projeto </DialogTitle>
                        <DialogDescription>
                            Preencha os Campos a Seguir
                        </DialogDescription>
                    </DialogHeader>

                    <OxxContactForm />
                </DialogContent>
            </Dialog>
        </>
    )
}