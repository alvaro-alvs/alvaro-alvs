import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar"
import { createContext, useContext, useState } from "react"

//* Icons
import LkIcon from "@/assets/social-icons/LkIcon.svg"
import InstaIcon from "@/assets/social-icons/instagram.png"
import WhatsappIcon from "@/assets/social-icons/whats.png"
import TikTok from "@/assets/social-icons/tiktok.svg"
import GithubIcon from "@/assets/social-icons/github.svg"
import DiscordIcon from "@/assets/social-icons/discord.svg"


import MarcyIcon from "@/assets/icons/marcy.jpeg"

//* Icons
import { LinkStream } from "./LinkStream"
import { ThemePicker } from "./ThemePicker"
import { LinkButton } from "@/components/linkstream/LinkButton"

type LinkStreamDemoType = {
    addedLinks: any[],
    setAddedLinks: any,
    theme: string,
    setTheme: any
}

const LinkStreamDemo = createContext<LinkStreamDemoType | null>(null)

export const useLinkStreamDemo = () => {
    const context = useContext(LinkStreamDemo)

    if (!context) {
        throw new Error('useLinkStream must be used within a LinkStreamProvider')
    }

    return context
}

export default function LinkStreamDemoProvider({ children }: { children: any }) {
    //* States
    const [addedLinks, setAddedLinks] = useState([

    ])
    const [theme, setTheme] = useState('slate')

    //* Config
    const Links = ['Instagram', 'Linkedin', 'Portfólio', 'Whatsapp']

    return (
        <LinkStreamDemo.Provider value={{ addedLinks, setAddedLinks, theme, setTheme }}>
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
                            <LinkButton label='Portfólio' picture={LkIcon.src} link="https://www.instagram.com/advtimemoments/" theme="neutral" desc="@marcy" stared bigIcon/>
                            <LinkButton label='Instagram' picture={InstaIcon.src} link="https://www.instagram.com/advtimemoments/" theme="rose" desc="@marcy" stared />
                            <span></span>
                            <span></span>
                            <LinkButton label='Whatsapp' picture={WhatsappIcon.src} link="https://www.wpp.com/" theme="teal" desc="+55 (11)94545-7878" />
                            <LinkButton label='TikTok' picture={TikTok.src} link="https://www.tiktok.com/@marcyyy" theme="zinc" desc="@marcyyy" />
                            <LinkButton label='Discord' picture={DiscordIcon.src} link="https://www.discord.com/" theme="purple" desc="marcyyy#0001" />
                            <LinkButton label='Github' picture={GithubIcon.src} link="https://www.github.com/" theme="zinc" desc="@marcyyy" />
                            {children}
                        </div>
                    </div>
                </section>
            </div>

        </LinkStreamDemo.Provider>
    )
}