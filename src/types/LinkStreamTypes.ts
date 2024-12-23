
export type LinkType = {
    link: string,
    label: string,
    desc?: string,
    picture?: string,
    stared?: boolean,
    theme?: string,
    bigIcon?: boolean
}

export type LinkStreamType = {
    user: number,
    status: string,
    name?: string,
    description?: string,
    links: LinkType[],
}