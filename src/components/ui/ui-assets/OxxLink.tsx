

type OxxLinkType = {
    Label?: string | null,
    Url?: string | null,
    Right?: boolean | false,
    FullW?: boolean | false,
    children?: any
}

export const OxxLink = ({ Label, Url, Right, FullW, children }: OxxLinkType) => {
    return (
        <a
            href={Url ? Url : '#Bem-Vindo, manda um salve!'}
            className={`flex h-full justify-center border border-transparent group rounded cursor-pointer transition hover:border-rose-900 hover:bg-rose-900/10 ${FullW ? 'w-full sticky top-0' : 'w-max'}`}
        >
            <span className={`flex items-center h-full p-2 px-5 space-x-3 rounded select-none ${FullW && 'w-full'}`}>
                {
                    Right ? (
                        <>
                            {Label && <div className="group-hover:text-rose-100">{Label}</div>}
                            <div className="group-hover:*:stroke-rose-200">
                                {/* icon */}
                                {children}
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="group-hover:*:stroke-rose-200">
                                {/* icon */}
                                {children}
                            </div>
                            {Label && <div className="group-hover:text-rose-100">{Label}</div>}
                        </>
                    )
                }
            </span>
        </a>
    )
}