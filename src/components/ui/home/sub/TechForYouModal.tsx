import { FaCheck } from "react-icons/fa";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/shadcn-ui/dialog"
import type { ForYouContentType } from "@/types/OxxTypes"
import { IoIosLink, IoMdArrowBack, IoMdExit } from "react-icons/io"
import { useState } from "react"
import GetProductCTA from "../../modal/purchase/GetProductCTA"
import PaymentProvider, { usePayment } from "@/components/providers/PaymentProvider"
import { Button } from "../../shadcn-ui/button"


export const TechForYouModal = ({ Product }: { Product: ForYouContentType }) => {
    const [open, setOpen] = useState(false)
    const { setProduct, handleClose } = usePayment()

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger onClick={() => setProduct(Product)} className="md:last:col-span-2">
                <div className="text-left flex flex-col w-full h-full gap-2 p-7 sm:rounded-2xl backdrop-blur-2xl border border-transparent cursor-pointer bg-gradient-to-b from-rose-950/30 to-indigo-900/10 hover:border-rose-900 transition group">

                    <header className="pb-5">
                        <div className="absolute -top-3 transform -translate-x-10">
                            {/* {Product.icon ? Product.icon : <MdOutlineWeb className="text-4xl text-red-500" />} */}
                        </div>

                        <h3 className="lg:text-4xl text-2xl text-indigo-00 z-20">{Product.title}</h3>
                        <h4 className="text-xs text-rose-300"> {Product.subtitle} </h4>
                    </header>

                    <ul className="space-y-2 mb-5 overflow-hidden text-left">
                        {
                            Product.items?.map((item, t) => (
                                <li key={t} className="text grid grid-flow-col justify-start items-center space-x-3">
                                    <FaCheck className="w-4 h-4 fill-rose-500" />
                                    <span>{item}</span>
                                </li>
                            ))
                        }
                    </ul>

                    <a href="#" className="flex text-xs items-center justify-center xl:justify-start space-x-1 group-hover:space-x-3 text-rose-300 mt-auto group-hover:underline">
                        <IoIosLink className="group-hover:scale-150 transition" />
                        <p className=" group-hover:scale-110 transition">Clique e Saiba mais</p>
                    </a>
                </div>
            </DialogTrigger>

            <DialogContent className="flex flex-col h-screen max-h-screen max-w-full border-none z-[99] backdrop-blur-xl">

                <DialogHeader className="text-rose-400 mb-5 text-center">
                    <DialogTitle className="sm:flex text-center justify-center items-center font-thin">
                        {/* Titulo do Modal */}
                        <p className="w-full text-center mx-auto text-2xl pt-10 sm:pt-0 sm:text-5xl sm:pr-24">
                            {Product.title}
                        </p>
                    </DialogTitle>

                    <DialogDescription className="text-rose-100 text-center md:max-w-5xl mx-auto">
                        {Product.description}
                    </DialogDescription>


                </DialogHeader>

                <div className="flex flex-col flex-1 overflow-hidden text-center sm:text-left">

                    <header>
                        {/* Header Label */}
                        <h1 className="text-rose-100 text-2xl text-cente border-b border-rose-900">{Product.header}</h1>
                    </header>

                    <figure className="relative flex-1 w-full overflow-hidden border-rose-900 rounded-xl">
                        {Product.image}

                        {/* Modal */}
                        <div className="absolute space-y-3 right-3 sm:bottom-10 bottom-3 sm:right-10">
                            {/* Get Website CTA */}
                            <GetProductCTA Product={Product} />

                            {/* Botao para fechar o Modal */}
                            <Button onClick={() => setOpen(false)} className="w-full h-10 flex items-center space-x-1 text-red-200 bg-red-900/80 border border-red-900 hover:bg-red-900 hover:text-red-100 backdrop-blur-xl">
                                <IoMdExit className="" />
                                <p className="text-xs"> Fechar </p>
                            </Button>
                        </div>
                    </figure>

                </div>
            </DialogContent>
        </Dialog>
    )
}