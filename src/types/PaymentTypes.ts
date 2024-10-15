import type { ForYouContentType } from "./OxxTypes"

export type CustomerType = {
    name: string,
    taxID: string,
    email: string,
    phone: string,
    validation: {
        name: boolean,
        taxID: boolean,
        email: boolean,
        phone: boolean,
    }
    chamadoOpen?: boolean
}

export type AdditionalInfoType = {
    key: string,
    value: string
}

export type PaymentPayloadType = {
    correlationID: string,
    value: number,
    comment: string | undefined,
    customer: CustomerType,
    additionalInfo: AdditionalInfoType[]
}

export type PaymentContextType = {
    product: ForYouContentType | undefined,
    setProduct: React.Dispatch<React.SetStateAction<ForYouContentType | undefined>>,
    payload: PaymentPayloadType,
    setPayload: React.Dispatch<React.SetStateAction<PaymentPayloadType>>,
    customer: CustomerType,
    setCustomer: React.Dispatch<React.SetStateAction<CustomerType>>,
    open: boolean,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>,
    handleClose: () => void
}