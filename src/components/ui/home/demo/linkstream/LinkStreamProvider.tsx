import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar"
import { createContext, useContext, useState } from "react"

import MarcyIcon from "@/assets/icons/marcy.jpeg"

//* Icons
import InstaIcon from "@/assets/icons/instagram.png"
import WhatsIcon from "@/assets/icons/whats.png"
import { LinkStream } from "./LinkStream"
import { ThemePicker } from "./ThemePicker"

type LinkStreamContextType = {
    addedLinks: any[],
    setAddedLinks: any,
    theme: string,
    setTheme: any
}

const LinkStreamContext = createContext<LinkStreamContextType | null>(null)

export const useLinkStream = () => {
    const context = useContext(LinkStreamContext)

    if (!context) {
        throw new Error('useLinkStream must be used within a LinkStreamProvider')
    }

    return context
}

export default function LinkStreamProvider({ children }: { children: any }) {
    //* States
    const [addedLinks, setAddedLinks] = useState([

    ])
    const [theme, setTheme] = useState('slate')

    //* Config
    const Links = ['Instagram', 'Linkedin', 'Portfólio', 'Whatsapp']

    return (
        <LinkStreamContext.Provider value={{ addedLinks, setAddedLinks, theme, setTheme }}>
            <div className="relative flex flex-col h-full space-y-10 overflow-hidden">

                <section className="relative flex flex-col items-center rounded overflow-y-scroll">

                    <figure className="relative min-h-[15rem] w-11/12 rounded-b-2xl overflow-hidden">
                        {/* fallback */}
                        <div className={`absolute h-full w-full inset-0 z-10 bg-${theme}-500/30 shadow-xl shadow-${theme}-100 rounded-b-2xl backdrop-blur-2xl transition duration-1000`}></div>

                        {/* image */}
                        <img
                            className="absolute inset-0 w-full h-full object-cover"
                            src={MarcyIcon.src}
                            alt="Imagem de Exemplo"
                        />
                    </figure>

                    <div className="relative flex flex-col items-center justify-center pb-24">

                        <Avatar className={`absolute flex flex-col justify-center items-center space-y-3 z-30 -top-14`}>
                            <AvatarImage className="rounded-full w-32 h-32" src={MarcyIcon.src} />
                            <AvatarFallback>MA</AvatarFallback>
                        </Avatar>

                        {/* identificação */}
                        <div className="mt-32 mb-10">
                            <h1 className="text-white text-center text-3xl"> Marceline Abadeer </h1>
                            <h2 className={`text-${theme}-100 text-center text-lg`}> Cantora/Produtora </h2>
                        </div>

                        {/* Theme Picker */}
                        <ThemePicker />

                        {/* Links */}
                        <div className="flex flex-col space-y-5 pt-3">
                            <LinkStream Icon={<img src={InstaIcon.src} className="h-full max-h-10" />} Label='Instagram' Content='@marcy_' href="https://www.instagram.com/advtimemoments/" stared />
                            <LinkStream Icon={<img src={WhatsIcon.src} className="h-full max-h-10" />} Label='Whatsapp' Content='+281-541-568-180' />
                            {children}
                        </div>
                    </div>
                </section>
            </div>

        </LinkStreamContext.Provider>
    )
}