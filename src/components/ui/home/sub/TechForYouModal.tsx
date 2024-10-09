import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/shadcn-ui/dialog"
import type { ForYouContentType } from "@/types/OxxTypes"
import { IoIosLink, IoMdArrowBack } from "react-icons/io"
import { MdOutlineWeb } from "react-icons/md"
import { Button } from '@/components/ui/shadcn-ui/button'
import { FaQrcode } from "react-icons/fa";
import { BackButton } from "../../ui-assets/BackButton"
import { useState } from "react"
import GetProductCTA from "../../modal/GetProductCTA"


export const TechForYouModal = ({ Product }: { Product: ForYouContentType }) => {
    const [open, setOpen] = useState(false)

    const handleAquire = async () => {

        const res = await fetch('api/payment', {
            body: JSON.stringify({
                correlationID: Product.pricing.correlationId,
                value: Product.pricing.value
            }),
            method: 'POST',
            headers: {
                'Authorization': import.meta.env.OPEN_PIX_KEY,
                'Content-Type': 'application/json'
            }
        })

        if (res.ok) {
            const data = await res.json()

            console.log(data)
        } else {
            console.log(res)
        }
    }

    const formatarEmReais = (valorEmCentavos: number) => {
        // Converte de centavos para reais
        const valorEmReais = valorEmCentavos / 100;
        // Formata com ponto de milhar e duas casas decimais
        return valorEmReais.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger>
                <div onClick={() => ('a')} className="text-left flex flex-col w-full h-full gap-2 p-7 sm:rounded-2xl backdrop-blur-2xl border border-transparent cursor-pointer bg-gradient-to-b from-rose-950/30 to-indigo-900/10 hover:border-rose-900 transition group">

                    <header className="pb-5">
                        <div className="absolute -top-3 transform -translate-x-10">
                            {/* {Product.icon ? Product.icon : <MdOutlineWeb className="text-4xl text-red-500" />} */}
                        </div>

                        <h3 className="lg:text-4xl text-2xl text-indigo-00 z-20">{Product.title}</h3>
                        <h4 className="text-xs text-rose-300"> {Product.subtitle} </h4>
                    </header>

                    <ul className="space-y-2 mb-5 overflow-hidden text-left">
                        {Product.items?.map((item) => (<li className="text">. {item}</li>))}
                    </ul>

                    <a href="#" className="flex text-xs items-center justify-center xl:justify-start space-x-1 group-hover:space-x-3 text-rose-300 mt-auto group-hover:underline">
                        <IoIosLink className="group-hover:scale-150 transition" />
                        <p className=" group-hover:scale-110 transition">Clique e Saiba mais</p>
                    </a>
                </div>
            </DialogTrigger>

            <DialogContent className="flex flex-col h-screen max-h-screen max-w-full border-none z-[99] backdrop-blur-xl">

                <DialogHeader className="text-rose-400 space-y-5 mb-5">
                    <DialogTitle className="sm:flex text-center justify-center items-center font-thin">

                        {/* Botao para fechar o Modal */}
                        <div onClick={() => setOpen(false)} className="flex self-start items-center space-x-3 border border-rose-900 p-2 px-5 rounded-xl cursor-pointer hover:bg-rose-800 transition hover:text-rose-100">
                            <IoMdArrowBack />
                            <p>Voltar</p>
                        </div>

                        {/* Titulo do Modal */}
                        <p className="w-full text-center mx-auto text-2xl pt-10 sm:pt-0 sm:text-5xl sm:pr-24">
                            {Product.title}
                        </p>
                    </DialogTitle>

                    <DialogDescription className="text-rose-100 text-center">
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
                        <div className="absolute right-3 sm:bottom-10 bottom-3 sm:right-10">
                            <GetProductCTA Product={Product} />
                        </div>
                    </figure>

                </div>
            </DialogContent>
        </Dialog>
    )
}