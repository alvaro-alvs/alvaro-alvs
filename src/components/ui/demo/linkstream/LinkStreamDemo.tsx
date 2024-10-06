import { useState, type ReactNode } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/shadcn-ui/avatar"
import LinkStreamProvider, { useLinkStream } from "./LinkStreamProvider"
import { NewLinkStream } from "./NewLinkStream"


export const LinkStreamDemo = () => {

    
    return (
        <LinkStreamProvider>
            <NewLinkStream />
        </LinkStreamProvider >
    )
}