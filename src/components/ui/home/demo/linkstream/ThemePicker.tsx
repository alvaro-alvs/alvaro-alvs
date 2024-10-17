import { useEffect } from "react"
import { useLinkStream } from "./LinkStreamProvider"



export const ThemePicker = () => {
    const ThemeColors = ['slate', 'blue', 'cyan', 'teal', 'indigo', 'fuchsia', 'yellow', 'rose',]

    const { theme, setTheme } = useLinkStream()


    useEffect(() => {

    }, [theme])

    return (
        <header className="flex-flex-col justify-center items-enter w-full p-3 border-b border-rose-900 rounded sticky">
            <h3 className="text-white m-0 text-center">Temas</h3>
            <span className="flex justify-center gap-2">
                {ThemeColors.map((color) => (
                    <div key={color} onClick={() => setTheme(color)} className={`bg-${color}-500 border-${color}-800 w-7 sm:w-6 aspect-square border rounded-full cursor-pointer hover:scale-110 transition`}>

                    </div>
                ))}
            </span>
        </header>
    )
}