
import { IoMdArrowBack } from "react-icons/io";
import { OxxLink } from "./OxxLink"


export const BackButton = () => {
    return (
        <OxxLink Url="/" Label="Voltar" FullW>
            <IoMdArrowBack />
        </OxxLink>

    )
}