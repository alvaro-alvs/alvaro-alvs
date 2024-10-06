import { useEffect, type ReactNode } from "react"
import { useLinkStream } from "./LinkStreamProvider"

export const LinkStream = ({ Label, Icon }: { Label: string, Icon: ReactNode }) => {
    const { theme } = useLinkStream()

    return (
        <div className={`flex items-center space-x-5 text-white bg-${theme}-900 border border-${theme}-500 rounded-xl p-3 min-w-[20rem]`}>
            {Icon}
            <p>{Label}</p>
        </div>
    )
}