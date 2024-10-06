import { useEffect } from "react"
import { useLinkStream } from "./LinkStreamProvider"



export const ThemePicker = () => {
    const ThemeColors = ['slate', 'rose', 'teal', 'indigo']

    const { theme, setTheme } = useLinkStream()


    useEffect(() => {

    }, [theme])

    return (
        <header className="py-3 border-b border-rose-900 w-max rounded sticky">
            <h3 className="text-white m-0">Temas</h3>
            <span className="flex gap-2">
                {ThemeColors.map((color) => (
                    <div key={color} onClick={() => setTheme(color)} className={`bg-${color}-500 border-${color}-800 w-10 sm:w-6 aspect-square border rounded-full cursor-pointer hover:scale-110 transition`}>

                    </div>
                ))}
            </span>
        </header>
    )
}