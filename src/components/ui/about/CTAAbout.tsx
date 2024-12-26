
import { useState } from "react";
import CTAContact from "../modal/CTA/CTAContact";
import OxxContatoProvider from "@/components/providers/ContatoProvider";


export default function CTAAbout({ children }: { children: React.ReactNode }) {
    const [open, setOpen] = useState(false)

    return (
        <OxxContatoProvider open={open} setOpen={setOpen}>
            <CTAContact>
                {children}
            </CTAContact>
        </OxxContatoProvider>
    )
}