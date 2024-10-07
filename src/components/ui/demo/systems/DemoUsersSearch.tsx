import { useState } from "react"




export const DemoUsersSearch = () => {
    const [serchTerm, setSearchTerm] = useState()

    return (
        <div>
            <h1 className="text-white">Pesquisar Usuarios</h1>
            <input type="text" />
        </div>
    )
}