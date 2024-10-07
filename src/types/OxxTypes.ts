

export type ForYouContentType = {
    title?: string,
    subtitle?: string,
    header: string | React.ReactNode,
    items?: string[],
    pricing: {
        correlationId: string,
        value: number
    }
    description?: string,
    icon?: React.ReactNode,
    image?: React.ReactNode,
    link?: string
}

export type ContactType = {
    nome: string, 
    email: string,
    telefone: string,
    message: string,
    product: string
}