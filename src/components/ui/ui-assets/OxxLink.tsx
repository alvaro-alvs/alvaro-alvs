

type OxxLinkType = {
    Label?: string | null,
    Url?: string | null,
    Right?: boolean | false,
    FullW?: boolean | false,
    children?: any,
    disabled?: boolean
}

export const OxxLink = ({ Label, Url, Right, FullW, disabled, children }: OxxLinkType) => {
    return (
        <a
            href={disabled ? '#' : Url || '#'}
            className={`${disabled ? 'bg-slate-500/10 text-slate-400 cursor-default' : 'cursor-pointer hover:border-rose-900 hover:bg-rose-900/10 transition group' } flex h-full justify-center border border-transparent rounded ${FullW ? 'w-full sticky top-0' : 'w-max'}`}
        >
            <span className={`flex items-center h-full p-2 px-5 space-x-3 rounded select-none ${FullW && 'w-full'}`}>
                {
                    Right ? (
                        <>
                            {Label && <div className="group-hover:text-rose-100">{Label}</div>}
                            <div className="group-hover:text-rose-200">
                                {/* icon */}
                                {children}
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="group-hover:text-rose-200">
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