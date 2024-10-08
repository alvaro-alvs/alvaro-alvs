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
                <div onClick={() => ('a')} className=" text-left flex flex-col w-full h-full gap-2 p-7 rounded-xl backdrop-blur-2xl border border-transparent cursor-pointer bg-gradient-to-b from-[#0e0e1bc0] to-rose-700/10 hover:border-rose-900 transition group">

                    <header className="pb-5">
                        <div className="absolute -top-3 transform -translate-x-10">
                            {Product.icon ? Product.icon : <MdOutlineWeb className="text-4xl text-red-500" />}
                        </div>

                        <h3 className="lg:text-3xl text-2xl text-rose-500 z-20">{Product.title}</h3>
                        <h4 className="text-xs text-rose-300"> {Product.subtitle} </h4>
                    </header>

                    <ul className="space-y-2 mb-5 overflow-hidden text-left">
                        {Product.items?.map((item) => (<li className="text">. {item}</li>))}
                    </ul>

                    <a href="#" className="flex items-center justify-center xl:justify-start space-x-1 group-hover:space-x-3 text-rose-300 mt-auto group-hover:underline">
                        <IoIosLink className="group-hover:scale-150 transition" />
                        <p className=" group-hover:scale-110 transition">Saiba mais</p>
                    </a>
                </div>
            </DialogTrigger>

            <DialogContent className="flex flex-col h-screen max-h-screen max-w-full border-none backdrop-blur-xl">

                <DialogHeader className="text-rose-400 space-y-5 h-max m-0">
                    <DialogTitle className="text-5xl font-thin"> {Product.title} </DialogTitle>
                    <DialogDescription className="text-rose-100 sm:pt-5">
                        {Product.description}
                    </DialogDescription>

                    <div onClick={() => setOpen(false)} className="flex items-center space-x-3 border mt-10 border-rose-900 p-2 px-5 rounded-xl w-max cursor-pointer hover:bg-rose-800 transition hover:text-rose-100">
                        <IoMdArrowBack />
                        <p>Voltar</p>
                    </div>
                </DialogHeader>

                <div className="flex flex-col flex-1 overflow-hidden">

                    <h1 className="text-rose-100 text-2xl text-center pb-5 border-b border-rose-900">{Product.header}</h1>

                    <figure className="relative flex-1 w-full overflow-hidden border-rose-900 rounded-xl">
                        {Product.image}
                    </figure>

                    <footer className="flex justify-stretch h-max sm:h-[5rem] space-x-5 w-full py-3">

                        <Button className="flex flex-1 bg-rose-900/20 space-x-5 items-center border border-rose-600 h-full max-w-[20rem] hover:border-rose-600 hover:bg-rose-900/30 hover:text-rose-200 rounded-xl group" onClick={() => handleAquire()}>
                            <FaQrcode className="sm:w-5 sm:h-5" />
                            <p className="grid text-lg py-2">
                                {'Comprar Template'}
                            </p>
                        </Button>

                        <div className="border flex-1 border-rose-600 rounded-xl bg-rose-900/20 hidden">
                            <p>Pagar Entrada</p>
                        </div>
                    </footer>
                </div>
            </DialogContent>
        </Dialog>
    )
}