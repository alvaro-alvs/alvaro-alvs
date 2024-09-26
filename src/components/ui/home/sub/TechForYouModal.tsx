import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/shadcn-ui/dialog"
import type { ForYouContentType } from "@/types/OxxTypes"
import { IoIosLink } from "react-icons/io"
import { MdOutlineWeb } from "react-icons/md"


export const TechForYouModal = ({ Product }: { Product: ForYouContentType }) => {

    return (
        <Dialog>
            <DialogTrigger>
                <div onClick={() => ('a')} className=" text-lef flex flex-col w-full h-full gap-2 p-7 rounded-xl backdrop-blur-2xl border border-transparent cursor-pointer bg-gradient-to-b from-[#0e0e1bc0] to-rose-700/10 hover:border-rose-900 transition group">


                    <header className="pb-5">
                        <div className="absolute -top-8 transform -translate-x-14">
                            {Product.icon ? Product.icon : <MdOutlineWeb className="text-4xl text-red-500" />}
                        </div>

                        <h3 className="lg:text-3xl text-2xl text-rose-500 z-20">{Product.title}</h3>
                        <h4 className="text-xs text-rose-300"> {Product.subtitle} </h4>
                    </header>

                    <ul className="space-y-2 mb-5 overflow-hidden">
                        {Product.items?.map((item) => (<li className="text-sm">. {item}</li>))}

                    </ul>

                    <a href="#" className="flex items-center justify-center xl:justify-start space-x-1 group-hover:space-x-3 text-rose-300 mt-auto group-hover:underline">
                        <IoIosLink className="group-hover:scale-150 transition" />
                        <p className=" group-hover:scale-110 transition">Saiba mais</p>
                    </a>
                </div>
            </DialogTrigger>
            <DialogContent className="min-w-full h-full border-none backdrop-blur-xl">
                <DialogHeader className="text-rose-400">
                    <DialogTitle className="text-5xl font-thin"> {Product.title} </DialogTitle>
                    <DialogDescription className="text-rose-100 max-w-">
                        LinkStream OXX é a solução definitiva para organizar e personalizar seus links favoritos. Com capacidade para armazenar até 100 links, você pode destacar os mais importantes com estrelas, garantindo que fiquem sempre no topo.
                    </DialogDescription>

                    <main className="p-10">
                        <figure className="w-full border !aspect-video h-[30rem] border-rose-900">

                        </figure>

                    </main>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}