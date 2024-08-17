import { createContext, useState } from "react"
import DashboardLogin from "./Login"

type LoginDataType = {
    username: string,
    password: string
}

type DashboardConfigType = {
    status: string,
    user: LoginDataType
}

export const DashboardContext = createContext(null as any)

export default function DasboardProvider({children}: any) {
    const [dashboard, setDashboard] = useState<DashboardConfigType>({
        status: "idle",
        user: {username: "", password: ""}
    })
    const [loginData, setLoginData] = useState<LoginDataType>({
        username: "",
        password: ""
    })


    return (
        <DashboardContext.Provider value={{loginData, setLoginData}}>
            {status === 'idle' ? (
                <DashboardLogin DashboardContext={{loginData, setLoginData}} />
            ) : (
                <p> Logado </p>
            )}
        </DashboardContext.Provider>
    )
}