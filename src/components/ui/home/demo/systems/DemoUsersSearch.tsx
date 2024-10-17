import { useState } from "react"
import { CiFilter } from "react-icons/ci";
import { IoIosMale } from "react-icons/io";
import { GiFemale } from "react-icons/gi";

export const DemoUsersSearch = () => {
    const [serchTerm, setSearchTerm] = useState()
    const [activeGender, setActiveGender] = useState<'male' | 'female'>('male')

    return (
        <header className="flex items-center justify-">
            <div className="p-5">
                <h1 className="text-white mb-1"> Pesquisar Por Nome: </h1>
                <input className="bg-indigo-900/30 border border-indigo-900 p-2 text-indigo-100 rounded" type="text" />
            </div>

            <div className="flex text-indigo-100 space-x-10">
                <figure className="flex items-center space-x-3 border-b border-indigo-900 p-2">
                    <CiFilter />
                    <p>Filtros</p>
                </figure>

                <div className="">
                    <h1 className="text-white mr-5"> Genero </h1>

                    <div className="hidden sm:flex">
                        <button className={`text-indigo-300 text-2xl p-2 pr  rounded-l ${activeGender === 'male' ? 'bg-indigo-900' : 'bg-indigo-900/10'}`} onClick={() => setActiveGender('male')}>
                            <IoIosMale />
                        </button>

                        <button className={`text-rose-300 text-2xl p-2 rounded-r ${activeGender === 'female' ? 'bg-rose-900' : 'bg-rose-900/10'}`} onClick={() => setActiveGender('female')}>
                            <GiFemale />
                        </button>
                    </div>
                </div>
            </div>
        </header>
    )
}