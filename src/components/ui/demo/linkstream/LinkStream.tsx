import { useEffect, type ReactNode } from "react"
import { useLinkStream } from "./LinkStreamProvider"

export const LinkStream = ({ Label, Icon, Content }: { Label: string, Icon?: ReactNode, Content?: string }) => {
    const { theme } = useLinkStream()

    return (
        <div className={`flex items-center space-x-5 text-white bg-${theme}-900/20 border border-${theme}-500 rounded-xl p-3 w-full sm:min-w-[20rem] cursor-pointer hover:scale-110 hover:-rotate-2 transition`}>
            {Icon}
            <div>
                <p>{Label}</p>
                <p className={theme === 'slate' ? 'text-slate-100 text-xs font-bold' : `text-${theme}-900 text-xs font-bold`}>{Content}</p>
            </div>
        </div>
    )
}