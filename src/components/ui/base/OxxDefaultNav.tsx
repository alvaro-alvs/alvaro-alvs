import { IoMdPaper } from "react-icons/io";
import { PiBookOpenText } from "react-icons/pi";
import { TbDeviceDesktopCode } from "react-icons/tb";
import { FaLink } from "react-icons/fa6";
import { OxxLink } from "../ui-assets/OxxLink"
import { OxxContatoDialog } from "../modal/OxxContatoDialog";

//* Icons
import HomeIcon from "@/assets/icons/OxxHomeIcon.svg"
import { GoHomeFill } from "react-icons/go";

export default function OxxDefaultNav({ mobile }: { mobile?: boolean | false }) {
    return (
        <nav
            className={`${mobile ? 'grid' : 'flex max-lg:hidden'} space-x-20 justify-center w-full h-full max-xl:w-full `}
        >
            <OxxLink Label="Sobre" Url="/sobre">
                <PiBookOpenText
                    className="w-6 h-6 group-hover:fill-rose-100 transition duration-300"
                />
            </OxxLink>

            <OxxLink Label="Termos" Url="/termos">
                <IoMdPaper
                    className="w-6 h-6 group-hover:fill-rose-100 transition duration-300"
                />
            </OxxLink>

            {/* <OxxLink Label="Links" Url="/links">
                <FaLink 
                    className="w-6 h-6 group-hover:fill-rose-100 transition duration-300"
                />
            </OxxLink> */}

            <OxxLink Url="/">
                <figure
                    className="relative aspect-square header-content rounded-xl transition h-full"
                >
                    <span className="absolute rotate-6 bg- rounded-xl p-1 transition duration-500 -right-3 text-xs h-max text-rose-100 group-hover:scale-150 z-50">Inicio</span>
                    <img
                        className="w-12 transition duration-500 group-hover:scale-150"
                        src={HomeIcon.src}
                        alt=""
                    />
                    {/* <GoHomeFill className="bg gradient-to-b from-rose-600 to-rose-900 bg-clip-text text-transparent" /> */}
                </figure>
            </OxxLink>

            <OxxLink Label="Projetos" Url="/projetos" Right={true}>
                <TbDeviceDesktopCode
                    className="w-6 h-6 group-hover:stroke-rose-300 transition duration-300"
                />
            </OxxLink>

            <OxxContatoDialog />
        </nav>
    )
}