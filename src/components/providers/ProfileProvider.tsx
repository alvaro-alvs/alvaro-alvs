import { createContext, useState } from "react"

type ProfileContextType = {
    orders: any[],
    setOrders: React.Dispatch<React.SetStateAction<never[]>>
}

//* Context com dados pessoais do usuario logado e pedidos realizados
const ProfileContext = createContext<ProfileContextType>({
    orders: [],
    setOrders: () => { }
})

export default function ProfileProvider({ children }: any) {
    const [orders, setOrders] = useState([])

    return (
        <ProfileContext.Provider value={{ orders, setOrders }}>
            {children}
        </ProfileContext.Provider>
    )
}