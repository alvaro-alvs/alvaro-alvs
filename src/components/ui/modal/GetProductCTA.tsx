import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/shadcn-ui/dialog"
import { FaParachuteBox } from "react-icons/fa";

import { Textarea } from "@/components/ui/shadcn-ui/textarea"
import PaymentProvider from "@/components/providers/PaymentProviders";
import { InputG } from "../ui-assets/InputG";
import { Vortex } from "../aceternity-ui/vortex";
import { InputStyles } from "../ui-assets/OxxInput";
import { Label } from "../shadcn-ui/label";
import type { ForYouContentType } from "@/types/OxxTypes";

export default function GetProductCTA({ Product }: { Product: ForYouContentType }) {

    return (
        <PaymentProvider>
            <Dialog>
                <DialogTrigger className="relative w-[12rem] flex space-x-3 items-center p-3 text-white rounded bg-rose-950 border border-rose-900 hover:p-5 hover:bg-rose-900 hover:border-rose-600 transition-all backdrop-blur-lg">
                    <FaParachuteBox />
                    <p className="">
                        Adquirir WebApp
                    </p>
                </DialogTrigger>

                <DialogContent className="w-full max-w-full text-white p-0 pt-5 bg-black/80 h-screen border-none z-[100]">
                    <Vortex backgroundColor="#0000" particleCount={800} rangeY={100} className="h-full w-full">
                        <section className="w-full backdrop-blur-xl h-full">
                            <DialogHeader className="text-center w-full h-max py-10 px-5">
                                <DialogTitle className="text-3xl">Let’s talk about your project</DialogTitle>
                                <DialogDescription>
                                    We help companies and individuals build out their brand guidelines.
                                </DialogDescription>
                            </DialogHeader>

                            <form action="#" className="mx-auto max-w-[31rem] px-10 space-y-5 w-full">
                                <span className="flex space-x-5">
                                    <InputG name="name" label="Seu Nome" />
                                    <InputG name="taxID" label="Seu CPF" />
                                </span>

                                <InputG name="email" label="Email" />
                                <InputG name="phone" label="Celular (opcional)" />


                                <div>
                                    <Label>Descrição</Label>
                                    <Textarea value={`Desenvolvimento de ${Product?.title}`} className={InputStyles + ' h-[12rem] max-h-[20rem]'} placeholder="Message" />
                                </div>
                            </form>
                        </section>
                    </Vortex>
                </DialogContent>

            </Dialog>
        </PaymentProvider>
    )
}