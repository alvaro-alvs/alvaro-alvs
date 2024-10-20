import { ImFire } from "react-icons/im";


export const PromoTag = () => {


    return (
        <figure className="absolute p-2 flex items-center space-x-2 group-hover:scale-110 -top-7 -right-5 rotate-12 transition
            
        ">
            <ImFire className="fill-rose-500 text-5xl bg-transparent drop-shadow-2xl" />
            {/* <p className="hidden bg-gradient-to-r from-rose-600 to-fuchsia-500 bg-clip-text text-transparent">Promoção</p> */}
        </figure>
    )
}