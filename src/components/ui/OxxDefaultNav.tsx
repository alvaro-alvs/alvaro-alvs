import { IoMdPaper } from "react-icons/io";
import { PiBookOpenText } from "react-icons/pi";
import { TbDeviceDesktopCode } from "react-icons/tb";

import { OxxLink } from "./OxxLink"
import { OxxContatoDialog } from "./OxxContatoDialog";


export default function OxxDefaultNav({mobile} : {mobile?: boolean | false}) {
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

            <OxxLink Url="/">
                <figure
                    className="aspect-square header-content rounded-xl transition h-full"
                >
                    <img
                        className="w-12 transition duration-500 group-hover:rotate-[360deg]"
                        src="/oxx_logo.png"
                        alt=""
                    />
                </figure>
            </OxxLink>

            <OxxLink Label="Projetos" Url="/oxxprojects" Right={true}>
                <TbDeviceDesktopCode
                    className="w-6 h-6 group-hover:stroke-rose-300 transition duration-300"
                />
            </OxxLink>

            <OxxContatoDialog />
        </nav>
    )
}