import { useEffect, type ReactNode } from "react"
import { useLinkStream } from "./LinkStreamProvider"
import { FaStar } from "react-icons/fa";


export type LinkStreamProps = {
    Label: string,
    Icon?: ReactNode,
    Content?: string,
    href?: string,
    stared?: boolean;
}

export const LinkStream = ({ Label, Icon, Content, href, stared }: LinkStreamProps) => {
    const { theme } = useLinkStream()

    return (
        <a href={href} target="_blank" className={`relative  text-white bg-${theme}-900/20 border border-${theme}-500 rounded-xl p-3 w-full sm:min-w-[20rem] cursor-pointer hover:scale-110 hover:-rotate-2 transition`}>
            {stared &&
                <FaStar className="h-6 w-6 absolute -top-3 -left-3 inset-0 fill-yellow-400 animate-pulse" />
            }
            <span className="flex items-center space-x-5">
                {Icon}
                <div className="">
                    <p>{Label}</p>
                    <p className={theme === 'slate' ? 'text-slate-100 text-xs font-bold' : `text-${theme}-600 text-xs font-bold`}>{Content}</p>
                </div>
            </span>
        </a>
    )
}
