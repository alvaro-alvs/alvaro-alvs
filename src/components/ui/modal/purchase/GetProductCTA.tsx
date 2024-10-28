import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/shadcn-ui/dialog"
import { FaParachuteBox } from "react-icons/fa";
import { usePayment } from "@/components/providers/PaymentProvider";
import { Vortex } from "../../aceternity-ui/vortex";
import type { ForYouContentType } from "@/types/OxxTypes";
import CustomerForm from "./CustomerForm";
import PurchaseControls from "./PurchaseControls";
import { useEffect } from "react";


export default function GetProductCTA({ Product }: { Product: ForYouContentType }) {
    const { open, setOpen, setProduct } = usePayment()

    useEffect(() => {
        setProduct(Product)
    }, [open])

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger className="relative w-max flex space-x-3 items-center p-3 text-white rounded bg-rose-950 border border-rose-900 hover:bg-rose-900 hover:border-rose-600 transition-all backdrop-blur-lg z-[200]
                shadow-[0_0_3rem] shadow-rose-500/50
            ">
                <FaParachuteBox />
                <p className="whitespace-nowrap">
                    Adquirir WebApp
                </p>
            </DialogTrigger>

            <DialogContent className="w-screen max-w-full text-white p-0 pt-5 bg-black/90 h-full border-none z-[100]">

                    <section className="flex flex-col w-screen h-screen items-center backdrop-blur-xl">
                        <DialogHeader className="text-center w-full h-max p-5 sm:p-10">
                            <DialogTitle className="text-3xl text-center">Vamos Conversar Sobre Seu Projeto</DialogTitle>
                            <DialogDescription className="text-center text-indigo-100">
                                Preencha os Campos a Seguir e Escolha o Meio de Pagamento
                            </DialogDescription>
                        </DialogHeader>

                        <div className="w-full xl:w-2/3 flex flex-col sm:flex-row overflow-y-auto p-5 sm:p-10 h-max sm:space-x-20 mx-auto rounded-xl backdrop-brightness-75 z-[102]">
                            {/* Customer Form */}
                            <CustomerForm />

                            {/* Purchase Controls */}
                            <PurchaseControls />
                        </div>

                    </section>

            </DialogContent>
        </Dialog>
    )
}