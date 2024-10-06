import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar"
import { createContext, useContext, useState } from "react"


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
            <div className="relative p- h-full space-y-10 overflow-y-scroll">
                {/* Colors Palletes */}
                <ThemePicker />

                <section className="flex flex-col items-center h-full rounded ">
                    <Avatar className={`w-32 h-32 rounded-full`}>
                        <AvatarImage className="rounded-full" src="https://github.com/shadcn.png" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>

                    {/* Links */}
                    <div className="flex flex-col space-y-5 mt-20">
                        <LinkStream Icon={<img src={InstaIcon.src} className="h-full max-h-10" />} Label='Instagram' />
                        <LinkStream Icon={<img src={WhatsIcon.src} className="h-full max-h-10" />} Label='Whatsapp' />
                        {children}
                    </div>
                </section>
            </div>

        </LinkStreamContext.Provider>
    )
}