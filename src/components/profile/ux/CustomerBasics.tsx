import { Button } from "@/components/ui/shadcn-ui/button"
import type { CustomerType, PaymentPayloadType } from "@/types/PaymentTypes"
import Cookies from "js-cookie"
import { useEffect, useState } from "react"
import { toast } from "sonner"
import { formatBrl, formatCpf } from "@/services/formatStrings"
import { BackButton } from "@/components/ui/ui-assets/BackButton"
import { vistaProps, notVistaProps } from "@/components/ui/home/sub/TechForYou"
import { FaStar } from "react-icons/fa";
import { FaRegCopy } from "react-icons/fa";

const decoder = new TextDecoder('iso-8859-1');

type OrderType = {
    success: boolean,
    data: {
        customer: CustomerType,
        order: PaymentPayloadType
    }
}

export const CustomerBasics = ({ order, app_id }: { order: OrderType | undefined, app_id: string }) => {
    const [orderData, setOrderData] = useState<OrderType | undefined>(order)
    const [paymentData, setPaymentData] = useState<typeof paymentDataFake | undefined>(undefined)


    if (order) {
        console.log(order);

    }

    const decodedString = (value: string | undefined) => {
        return decoder.decode(new TextEncoder().encode(value))
    }


    if (!order) {
        return <div className="text-white">Carregando Pedido...</div>
    }

    async function gerarPagamento() {
        if (!order) return

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

        } else {

            toast.error('Algo deu Errado')
        }
    }

    const ORDER_ID = orderData?.data.order.correlationID
    const INSTALLMENTS = orderData?.data?.order?.additionalInfo?.find(({ key }) => key === 'installments')?.value
    const ORDER_METHOD = orderData?.data?.order?.additionalInfo?.find(({ key }) => key === 'metodo')?.value
    const ORDER_TOTAL_VALUE =
        (orderData?.data?.order?.value ?? 0) *
        ((orderData?.data?.order?.additionalInfo?.find(({ key }) => key === 'installments')?.value || 1) as number);


    useEffect(() => {
        setOrderData(order)

        if (orderData) {
            gerarPagamento()
        } else {
            toast.error('Dados do Pedido Foram Perdidos')
        }
    }, [order])

    return (
        <main className="flex flex-col items-center min-h-screen pb-24">
            <header className="p-5 text-center">
                <h1 className="text-2xl"> Olá, {orderData?.data.customer.name} </h1>
                <p> Confira os Dados da sua Requisição de {decodedString(orderData?.data.order.additionalInfo[0].value)} </p>
            </header>


            {/* Focus Data */}
            <section className="mt-10 sm:max-w-[50%]">
                <BackButton />
                <div className="flex flex-col justify-center  border-fuchsia-900 rounded-2xl p-10">
                    <div className="space-y-10 sm:space-y-0 sm:flex gap-10 justify-between">
                        <figure>
                            <div
                                onClick={() => paymentData?.charge?.brCode && navigator.clipboard.writeText(paymentData.charge.brCode)}
                                className="flex items-center space-x-2 text-center cursor-pointer"
                            >
                                <FaRegCopy />
                                <p>Copiar Codigo PIX</p>
                            </div>

                            {/* Imagem QRCode */}
                            <img className="rounded-2xl aspect-square h-72" src={paymentData?.charge.qrCodeImage} alt="pagamento qr_code" />

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

                        <FaStar className="absolute fill-rose-600 h-10 w-10 -top-5 -left-5 animate-spin !duration-[10000ms]" />

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

const paymentDataFake = {
    "charge": {
        "customer": {
            "name": "Alvaro",
            "email": "alvaro@",
            "taxID": {
                "taxID": "51575242850",
                "type": "BR:CPF"
            },
            "correlationID": "11737132-cc60-4004-876c-8eb41bfb8f8d",
            "phone": "+5511949164181"
        },
        "value": 190000,
        "comment": "Nome da Sua Empresa: \n\nPorte da Empresa: \n\nDescriï¿½ï¿½o do Projeto:",
        "identifier": "5073ad43b1684515b0f2e0133f1ad02a",
        "correlationID": "Personalizados-1729172151091-516189",
        "transactionID": "5073ad43b1684515b0f2e0133f1ad02a",
        "status": "ACTIVE",
        "additionalInfo": [
            {
                "key": "Produto-Digital",
                "value": "Sistemas de Gestï¿½o Personalizados"
            }
        ],
        "fee": 85,
        "discount": 0,
        "valueWithDiscount": 190000,
        "expiresDate": "2024-10-18T13:47:24.050Z",
        "type": "DYNAMIC",
        "paymentLinkID": "be63d53a-2cd9-49d1-8a96-a180d05b75bc",
        "createdAt": "2024-10-17T13:47:24.063Z",
        "updatedAt": "2024-10-17T13:47:24.063Z",
        "brCode": "00020101021226950014br.gov.bcb.pix2573api.openpix.com.br/api/testaccount/qr/v1/5073ad43b1684515b0f2e0133f1ad02a52040000530398654071900.005802BR5921OXX_SOLUCOES_DIGITAIS6009Sao_Paulo622905255073ad43b1684515b0f2e0133630404C7",
        "expiresIn": 86400,
        "pixKey": "37be82af-1f26-41bc-ac3d-1e60f1f581dc",
        "paymentLinkUrl": "https://openpix.com.br/pay/be63d53a-2cd9-49d1-8a96-a180d05b75bc",
        "qrCodeImage": "https://api.openpix.com.br/openpix/charge/brcode/image/be63d53a-2cd9-49d1-8a96-a180d05b75bc.png",
        "globalID": "Q2hhcmdlOjY3MTExNTZjNzBjNzUzMGNlZDU5NTQ5YQ==",
        "paymentMethods": {
            "pix": {
                "method": "PIX_COB",
                "txId": "5073ad43b1684515b0f2e0133f1ad02a",
                "value": 190000,
                "status": "ACTIVE",
                "fee": 85,
                "brCode": "00020101021226950014br.gov.bcb.pix2573api.openpix.com.br/api/testaccount/qr/v1/5073ad43b1684515b0f2e0133f1ad02a52040000530398654071900.005802BR5921OXX_SOLUCOES_DIGITAIS6009Sao_Paulo622905255073ad43b1684515b0f2e0133630404C7",
                "transactionID": "5073ad43b1684515b0f2e0133f1ad02a",
                "identifier": "5073ad43b1684515b0f2e0133f1ad02a",
                "qrCodeImage": "https://api.openpix.com.br/openpix/charge/brcode/image/be63d53a-2cd9-49d1-8a96-a180d05b75bc.png"
            }
        }
    },
    "correlationID": "Personalizados-1729172151091-516189",
    "brCode": "00020101021226950014br.gov.bcb.pix2573api.openpix.com.br/api/testaccount/qr/v1/5073ad43b1684515b0f2e0133f1ad02a52040000530398654071900.005802BR5921OXX_SOLUCOES_DIGITAIS6009Sao_Paulo622905255073ad43b1684515b0f2e0133630404C7"
}