import type { LinkType } from "@/types/LinkStreamTypes";
import ImFire from "@/assets/social-icons/ImFire.svg"

export const LinkButton = ({ label, link, desc, stared, picture, theme, bigIcon }: LinkType) => {

    return (
        <a href={link}
            target="_blank"
            className={`relative flex sm:w-[25rem] max-w-[25rem] text-white bg-${theme}-900/90 border border-${theme}-500 rounded-sm shadow-lg shadow-${theme}-500/30 ${stared ? 'group' : ''} p-2 cursor-pointer hover:brightness-110 transition`}>
            <span className="flex items-center space-x-5 max-w-full truncate">
                <img className={(bigIcon ? "scale-[3] top-1" : "") + " w-12 h-12" } src={picture} alt="" />
                <div className="w-full text-left">
                    <p className="truncate text-lg">{label || 'Instagram'}</p>
                    <p className={`text-${theme}-500 text-xs overflow-hidden`}>{link}</p>
                </div>
            </span>

            {stared &&
                <div className="absolute -top-3 -right-1">
                    <div className="w-px h-px shadow-[0_0_3rem_1rem_#ff3e00]"></div>
                    <img src={ImFire.src} className="w-6 h-6" alt="" />
                </div>
            }
        </a>

    )
}
