import type { PaymentDataType } from "@/types/PaymentTypes"
import type { OrderType } from "@/types/ProfileTypes"




const OPENPIXAPPID = import.meta.env.OPEN_PIX_ADDID


export async function GetCreatePayment({ orderData }: { orderData: OrderType }) {

    //* Seta os dados do payload
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

    const getCharge = await fetch(`https://api.openpix.com.br/api/v1/charge/${payload.correlationID}`)

    if (getCharge.ok) {
        const chargeData = await getCharge.json()

        return chargeData
    }

    const openPixResponse = await fetch('https://api.openpix.com.br/api/v1/charge', {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': OPENPIXAPPID,
        }
    })

    if (openPixResponse.ok) {
        const paymentRes: PaymentDataType = await openPixResponse.json()

        return paymentRes

    } else if (openPixResponse.status === 400) {
        ('Nao foi possivel criar cobrança')
    }
}