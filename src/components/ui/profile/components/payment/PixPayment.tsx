import { useCustomer } from "@/components/providers/CustomerProfileProvider";
import { vistaProps, notVistaProps } from "@/components/ui/home/sub/TechForYou";
import { formatBrl, formatCpf } from "@/services/formatStrings";
import type { PaymentDataType, PaymentPayloadType } from "@/types/PaymentTypes";
import { useEffect, useState } from "react";
import { FaRegCopy, FaStar } from "react-icons/fa";
import { toast } from "sonner";



export const PixPayment = () => {
    const { customerState, setCustomerState } = useCustomer()
    const [paymentData, setPaymentData] = useState<PaymentDataType | undefined>(undefined)

    const ORDER_ID = customerState.orders[0]?.correlationID
    const INSTALLMENTS = customerState.orders[0]?.additionalInfo?.find(({ key }: { key: string }) => key === 'installments')?.value
    const ORDER_METHOD = customerState.orders[0]?.additionalInfo?.find(({ key }: { key: string }) => key === 'metodo')?.value
    const ORDER_TOTAL_VALUE =
        (customerState.orders[0]?.value ?? 0) *
        ((customerState.orders[0]?.additionalInfo?.find(({ key }: { key: string }) => key === 'installments')?.value || 1) as number);


    const getCharge = async () => {
        const retrieveCharge = await fetch(`/api/get-charge`, {
            method: 'POST',
            body: JSON.stringify({ order: customerState.orders[0], customer: customerState.customer }),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        if (retrieveCharge.ok) {
            const chargeData = await retrieveCharge.json()
            toast.info('Pagamento Encontrado')

            setPaymentData(chargeData)

        } else if (retrieveCharge.status === 201) {
            toast.success('Gerando seu QR-Code')
        } else {
            toast.error('Não foi possivel realizar o Pagamento')
        }
    }

    //* very Important
    useEffect(() => {
        getCharge()
    }, [])

    if (paymentData) {
        return (
            <div className="mx-auto flex flex-col justify-center max-w-[35rem] border-fuchsia-900 rounded-2xl p-10">
                <div className="space-y-10 sm:space-y-0 sm:flex gap-10 justify-between">
                    <figure>
                        <div
                            onClick={() => {
                                paymentData?.charge?.brCode && navigator.clipboard.writeText(paymentData.charge.brCode);
                                toast.success('copiado!')
                            }}
                            className="flex items-center space-x-2 text-center cursor-pointer"
                        >
                            <FaRegCopy />
                            <p>Copiar Codigo PIX</p>
                        </div>

                        {/* Imagem QRCode */}
                        {paymentData &&
                            <img className="rounded-2xl aspect-square w-full max-w-96" src={paymentData.charge.qrCodeImage} alt="pagamento qr_code" />
                        }

                        <footer className="w-full text-center mt-1">
                            <p className="text-lg">{customerState.orders[0]?.additionalInfo.find((item: { key: string; }) => item.key === 'metodo')?.value === 'parcelado' ? 'Entrada: ' : 'Valor: '} {formatBrl(paymentData?.charge.value)}</p>
                            {customerState.orders[0]?.additionalInfo.find((item: { key: string; }) => item.key === 'metodo')?.value === 'parcelado' && (
                                <p className="text-xs">Valor Total: {formatBrl(ORDER_TOTAL_VALUE)}</p>
                            )}
                        </footer>
                    </figure>

                    <article>
                        {/* Informações da Requisição */}
                        <div>
                            <h1 className="text-xl"> Seus Dados </h1>

                            <p className="">Método Selecionado:
                                <span className="capitalize text-xl ml-2 bg-gradient-to-br font-bold from-rose-500 to-indigo-500 bg-clip-text text-transparent select-none">
                                    {ORDER_METHOD} {INSTALLMENTS && `${INSTALLMENTS}x`}
                                </span>
                            </p>

                            <div className="text-white">
                                <p>CPF: {formatCpf(customerState.customer?.taxID)}</p>
                            </div>
                            <div className="w-full justify-center">
                                <span>Email: {customerState.customer?.email}</span>
                            </div>
                        </div>
                    </article>
                </div>

                <footer className="relative text-center border border-rose-600 bg-rose-900/20 rounded-xl min-h-24 mt-10 capitalize p-5">

                    <p className="text-lg">Ao Realizar o Pagamento, voce tem direito à</p>

                    <FaStar className="absolute fill-rose-600 h-10 w-10 -top-5 -left-5 animate-spin" />

                    <ul className="my-5  text-">
                        {
                            ORDER_METHOD === 'vista' ? (
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
                </footer>
            </div>
        )
    } else {
        return (
            <>
                <h1 className="text-center">Gerando Pagamento....</h1>
            </>
        )
    }

}