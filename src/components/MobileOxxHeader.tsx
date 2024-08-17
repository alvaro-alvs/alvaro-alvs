import { IoMdPaper } from "react-icons/io";
import { AiOutlineSend } from "react-icons/ai";
import { PiBookOpenText } from "react-icons/pi";
import { TbDeviceDesktopCode } from "react-icons/tb";
import { GoHome } from "react-icons/go";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "../components/ui/shadcn-ui/popover"
import { OxxLink } from "./ui/OxxLink"


export default function MobileOxxHeader() {
    return (
        <Popover>
            <PopoverTrigger>
                <div
                    className={`lg:hidden flex justify-center border border-transparent group rounded cursor-pointer transition hover:border-rose-900 hover:bg-rose-900/10`}
                >
                    <span className={` items-center h-full p-2 px-5 space-x-3 rounded select-none`}>
                        <figure className="aspect-square header-content rounded-xl transition h-full">
                            <img className="w-12 transition duration-500 group-hover:animate-spin" src="/oxx_logo.png" alt="" />
                        </figure>
                        {/* <p className="text-center">Menu</p> */}
                    </span>
                </div>
            </PopoverTrigger>

            <PopoverContent className="text-white w-96 space-y-5 divide-y divide-rose-900 grid bg-[#13151a10] backdrop-blur border-dotted border-rose-500/50 min-h-72 shadow-lg">
                <OxxLink FullW Label="Home" Url="/">
                    <GoHome
                        className="w-6 h-6 group-hover:fill-rose-100 transition duration-300"
                    />
                </OxxLink>

                <OxxLink FullW Label="Sobre" Url="/sobre">
                    <PiBookOpenText
                        className="w-6 h-6 group-hover:fill-rose-100 transition duration-300"
                    />
                </OxxLink>

                <OxxLink FullW Label="Termos" Url="/termos">
                    <IoMdPaper
                        className="w-6 h-6 group-hover:fill-rose-100 transition duration-300"
                    />
                </OxxLink>

                <OxxLink FullW Label="Projetos" Url="/oxxprojects">
                    <TbDeviceDesktopCode
                        className="w-6 h-6 group-hover:stroke-rose-300 transition duration-300"
                    />
                </OxxLink>

                <OxxLink FullW Label="Contato">
                    <AiOutlineSend
                        className="w-6 h-6 group-hover:fill-rose-100 transition duration-300"
                    />
                </OxxLink>
            </PopoverContent>
        </Popover>
    )
}