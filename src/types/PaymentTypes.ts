
export type CustomerType = {
    name: string,
    taxID: string,
    email: string,
    phone: string
}

export type AdditionalInfoType = {
    key: string,
    value: string
}

export type PaymentPayloadType = {
    correlationID: string,
    value: number,
    comment: string,
    customer: CustomerType,
    additionalInfo: AdditionalInfoType[]
}