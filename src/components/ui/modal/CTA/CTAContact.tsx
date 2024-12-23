//* @/components/ui/shadcn-ui/

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/shadcn-ui/dialog"
import { OxxLink } from "../../ui-assets/OxxLink"
import { LiaShippingFastSolid } from "react-icons/lia";


export default function CTAContact() {

    return (
        <Dialog >
            <DialogTrigger className="p-2 flex flex-col items-center gap-1 text-white w-[15rem] border-none bg-gradient-to-r from-fuchsia-600 via-rose-500 to-red-600
                rounded
                hover:brightness-150 hover:shadow-[0_0_10rem_#f43fcf]
                transition duration-500
                font-thin text-xl text-center cursor-pointer
            ">
                <LiaShippingFastSolid />
                <p className="text-center">Aquirir Site</p>
            </DialogTrigger>
            <DialogContent className="z-[9999]">
                <DialogHeader>
                    <DialogTitle>Are you absolutely sure?</DialogTitle>
                    <DialogDescription>
                        This action cannot be undone. This will permanently delete your account
                        and remove your data from our servers.
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}