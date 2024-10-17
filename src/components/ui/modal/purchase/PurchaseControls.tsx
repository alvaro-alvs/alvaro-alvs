import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/shadcn-ui/select"
import { IoMdExit } from "react-icons/io";
import { MdOutlineLocalFireDepartment } from "react-icons/md";
import { RiMailDownloadFill } from "react-icons/ri";
import { Button } from "../../shadcn-ui/button";
import type { ForYouContentType } from "@/types/OxxTypes";
import { usePayment } from "@/components/providers/PaymentProvider";
import { useEffect, useState } from "react";
import { BiSolidPurchaseTag } from "react-icons/bi";
import { formatBrl } from "@/services/formatStrings";
import { InputStyles } from "../../ui-assets/OxxInput";
import { PurchaseButton } from "./PurchaseButton";

import { vistaProps, notVistaProps } from "../../home/sub/TechForYou";

export default function PurchaseControls() {
    const { product, setProduct, customer, payload, setPayload, handleClose } = usePayment()

    const [vista, setVista] = useState<boolean>(product?.pay.sightOnly || true)

    function handleChangePay(method: boolean) {
        setVista(method)
    }

    //* Alterar Numero de Parcelas
    const handleChangeInstallment = (val: number) => {
        if (product) {
            setProduct({
                ...product,
                pay: {
                    ...product.pay,
                    installments: val,
                    value: product.pricing.value / val
                }
            });
        }
    }

    // useEffect(() => {
    //     console.log('Payload: ', payload)
    // }, [payload])

    return (
        <footer className="flex flex-col justify-between sm:p-5 lg:w-1/2 h-full border-t border-slate-900 sm:border-none pt-10 sm:pt-0">
            <h1 className="">Formas de Pagamento</h1>
            <fieldset className="flex flex-col space-y-5 sm:pb-0 sm:flex items-center w-full pb-10">
                {!product?.pay.sightOnly &&
                    <div className="flex flex-col w-full justify-center space-y-2 h-full">
                        <Button onClick={() => handleChangePay(false)} className={`flex items-center space-x-1 w-full bg-violet-900/20 border border-violet-900 hover:bg-violet-900 ${!vista && 'bg-violet-900'}`}>
                            <RiMailDownloadFill />
                            <p>Parcelado</p>
                        </Button>

                        {/* //* Select De parcelamento */}
                        <Select disabled={vista} onValueChange={(val) => handleChangeInstallment(Number(val))}>
                            <SelectTrigger onClick={() => setVista(false)} className={InputStyles}>
                                <SelectValue placeholder="parcelas" />
                            </SelectTrigger>
                            <SelectContent className="z-[500] bg-slate-950 border-slate-900 text-slate-100">
                                {Array.from({ length: 12 }, (_, index) => index + 1).map((installment) => (
                                    <SelectItem className="*:w-full" key={installment} value={installment.toString()}>
                                        <div className="w-full">
                                            <span className="w-max">
                                                {installment}x Sem Juros
                                            </span>
                                        </div>
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        {product &&
                            <p className={`text-xs ${vista && 'hidden'}`}>*Valor da parcela: R$ {Math.round(product!.pricing.value / 100 / product.pay.installments) || '0'}</p>
                        }
                    </div>
                }

                {/* Botao de Compra a Vista */}
                <Button onClick={() => handleChangePay(true)} className={`w-full h-full items-center space-x-1 bg-fuchsia-900/20 border border-fuchsia-900 hover:bg-fuchsia-900 ${vista && 'bg-fuchsia-900'}`}>
                    <MdOutlineLocalFireDepartment className="text-2xl text-" />
                    <p>À Vista</p>
                </Button>
            </fieldset>

            {/* Botao de Comprar e Cancelar */}
            <fieldset className="space-y-3 p-5 border border-slate-950 rounded">
                {/* Label */}
                <h1 className="text- flex items-center space-x-2">
                    <p>Confirmar Compra</p>
                </h1>

                {/* Botao de Confirmaçao de Compra */}
                <PurchaseButton vista={vista} />

                <ul className="mb-5 text-xs">
                    {
                        vista ? (
                            vistaProps.map((item, index) => (
                                <li key={index}>
                                    {item}
                                </li>
                            ))
                        ) : (
                            notVistaProps.map((item, index) => (
                                <li key={index}>
                                    {item}
                                </li>
                            ))
                        )
                    }
                </ul>

                {/* Botao para fechar o modal de compra */}
                {/* Remove produto do PaymentProvider ao Fechar */}
                <Button onClick={() => handleClose()} className="w-full h-10 flex items-center space-x-1 text-red-200 bg-red-900/20 border border-red-900 hover:bg-red-900 hover:text-red-100">
                    <IoMdExit className="" />
                    <p className="text-xs"> Cancelar </p>
                </Button>

            </fieldset>
        </footer>
    )
}