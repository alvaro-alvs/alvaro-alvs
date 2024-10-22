import type { CustomerType, PaymentDataType, PaymentPayloadType } from "@/types/PaymentTypes"

import gerarPagamento from "@/services/pagamentos"

import { useEffect, useState } from "react"
import { toast } from "sonner"
import { decodedString, formatBrl, formatCpf } from "@/services/formatStrings"
import { BackButton } from "@/components/ui/ui-assets/BackButton"
import { vistaProps, notVistaProps } from "@/components/ui/home/sub/TechForYou"
import { FaStar } from "react-icons/fa";
import { FaRegCopy } from "react-icons/fa";
import type { OrderType } from "@/types/ProfileTypes"


const CustomerBasics = ({ order, app_id }: { order: OrderType | undefined, app_id: string }) => {
    const [orderData, setOrderData] = useState<OrderType | undefined>(order)
    const [paymentData, setPaymentData] = useState<PaymentDataType | undefined>(undefined)

    if (!orderData) {
        return <div className="text-white">Carregando Pedido...</div>
    }

    const ORDER_ID = orderData.data.order.correlationID
    const INSTALLMENTS = orderData?.data?.order?.additionalInfo?.find(({ key }) => key === 'installments')?.value
    const ORDER_METHOD = orderData?.data?.order?.additionalInfo?.find(({ key }) => key === 'metodo')?.value
    const ORDER_TOTAL_VALUE =
        (orderData?.data?.order?.value ?? 0) *
        ((orderData?.data?.order?.additionalInfo?.find(({ key }) => key === 'installments')?.value || 1) as number);


    async function gerarPagamento({ orderData }: { orderData: OrderType, }) {

        const payload = {
            correlationID: orderData?.data.order.correlationID,
            value: orderData?.data.order.value,
            comment: orderData?.data.order.comment,
            customer: {
                name: orderData?.data.customer.name,
                taxID: orderData?.data.customer.taxID,
                email: orderData?.data.customer.email,
                phone: orderData?.data.customer.phone,
            },
            additionalInfo: orderData?.data.order.additionalInfo
        }

        const openPixResponse = await fetch('https://api.openpix.com.br/api/v1/charge', {
            method: 'POST',
            body: JSON.stringify(payload),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': app_id,
            }
        })

        if (openPixResponse.ok) {
            const paymentRes = await openPixResponse.json()

            setPaymentData(paymentRes)

        } else if (openPixResponse.status === 400) {
            toast.info('Nao foi possivel criar cobrança')
        }
    }

    return (
        <main className="flex flex-col items-center min-h-screen pb-24">
            <header className="p-5 text-center">
                <h1 className="text-2xl"> Olá, {orderData?.data.customer.name} </h1>
                <p> Confira os Dados da sua Requisição de {decodedString(orderData?.data.order.additionalInfo.find(items => items.key === 'Produto-Digital')?.value)} </p>
            </header>


            {/* Focus Data */}
            <section className="mt-10 sm:max-w-[50%]">
                <BackButton />
                <div className="flex flex-col justify-center  border-fuchsia-900 rounded-2xl p-10">
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
                                <img className="rounded-2xl aspect-square h-72" src={paymentData.charge.qrCodeImage} alt="pagamento qr_code" />
                            }

                            <footer className="w-full text-center mt-1">
                                <p className="text-lg">{orderData?.data.order.additionalInfo.find(item => item.key === 'metodo')?.value === 'parcelado' ? 'Entrada: ' : 'Valor: '} {formatBrl(paymentData?.charge.value)}</p>
                                {orderData?.data.order.additionalInfo.find(item => item.key === 'metodo')?.value === 'parcelado' && (
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
                                    <p>CPF: {formatCpf(orderData?.data.customer.taxID)}</p>
                                </div>
                                <div className="w-full justify-center">
                                    <span>Email: {orderData?.data.customer.email}</span>
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
            </section>
        </main>
    )
}