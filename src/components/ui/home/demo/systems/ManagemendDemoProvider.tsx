import { type DemoUserType, type ManageContextType } from "@/types/DemoTypes";
import { createContext, useContext, useState } from "react";



const ManageDemoContext = createContext<ManageContextType | null>(null)

export const useManageDemo = () => {
    const context = useContext(ManageDemoContext)

    if (!context) {
        throw new Error('useManageDemo must be used within a ManageDemoProvider')
    }

    return context
}

export default function UserManagementProvider({ children }: { children: any }) {

    const [users, setUsers] = useState<DemoUserType[]>([])
    const [FUsers, setFUsers] = useState<DemoUserType[]>([])

    return (
        <ManageDemoContext.Provider value={{ users, setUsers }}>
            {children}
        </ManageDemoContext.Provider>

    )
}