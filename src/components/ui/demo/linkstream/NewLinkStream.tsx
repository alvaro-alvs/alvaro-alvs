import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/shadcn-ui/dialog"
import { IoIosAdd } from "react-icons/io";
import { LinkStream } from "./LinkStream";

export const NewLinkStream = () => {

    return (
        <Dialog modal>
            <DialogTrigger className="flex gap-1 text-white">
                <LinkStream Icon={<IoIosAdd className="w-7 h-7" />} Label="Adicionar Link" />
            </DialogTrigger>
            <DialogContent>
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