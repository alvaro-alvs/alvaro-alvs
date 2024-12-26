//* @/components/ui/shadcn-ui/

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/shadcn-ui/dialog"
import OxxContactForm from "../OxxContactForm";
import { useContato } from "@/components/providers/ContatoProvider";


export default function CTAContact({ children }: { children: React.ReactNode }) {
    const { open, setOpen } = useContato()

    return (
        <>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger>
                    {children}
                </DialogTrigger>
                <DialogContent className="z-[999] border-none backdrop-blur-2xl bg-gradient-to-b from-black/50 to-rose-900/15">
                    <DialogHeader>
                        <DialogTitle>🏗️ Vamos Conversar Sobre seu Projeto </DialogTitle>
                        <DialogDescription>
                            Preencha os Campos a Seguir
                        </DialogDescription>
                    </DialogHeader>

                    <OxxContactForm />
                </DialogContent>
            </Dialog>
        </>
    )
}