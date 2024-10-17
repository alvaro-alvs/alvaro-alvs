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

export type PaymentDataType = {
    charge: {
        customer: {
            name: string;
            email: string;
            taxID: {
                taxID: string;
                type: string;
            };
            correlationID: string;
            phone: string;
        };
        value: number;
        comment: string;
        identifier: string;
        correlationID: string;
        transactionID: string;
        status: string;
        additionalInfo: {
            key: string;
            value: string;
        }[];
        fee: number;
        discount: number;
        valueWithDiscount: number;
        expiresDate: string;
        type: string;
        paymentLinkID: string;
        createdAt: string;
        updatedAt: string;
        brCode: string;
        expiresIn: number;
        pixKey: string;
        paymentLinkUrl: string;
        qrCodeImage: string;
        globalID: string;
        paymentMethods: {
            pix: {
                method: string;
                txId: string;
                value: number;
                status: string;
                fee: number;
                brCode: string;
                transactionID: string;
                identifier: string;
                qrCodeImage: string;
            };
        };
    };
    correlationID: string;
    brCode: string;
}