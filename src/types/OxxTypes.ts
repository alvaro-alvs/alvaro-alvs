

export type ForYouContentType = {
    title: string,
    subtitle?: string,
    header: string | React.ReactNode,
    items?: string[],
    pricing: {
        correlationId: string,
        value: number
    }
    pay: {
        sightOnly: boolean,
        installments: number,
        value: number
    }
    description?: string,
    icon?: React.ReactNode,
    image?: React.ReactNode,
    clientMessage?: string,
    link?: string,
    isNew?: boolean 
}

export type ContactType = {
    nome: string, 
    email: string,
    telefone: string,
    message: string,
    product: string
}