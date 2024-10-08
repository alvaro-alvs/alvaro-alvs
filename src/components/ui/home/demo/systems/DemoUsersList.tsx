import { toast } from "sonner"
import { useManageDemo } from "./ManagemendDemoProvider"
import { useEffect } from "react"
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuIndicator,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    NavigationMenuViewport,
} from "@/components/ui/shadcn-ui/navigation-menu"

export const DemoUsersList = () => {
    const { users, setUsers } = useManageDemo()

    const fetchDemoUsers = async () => {
        const res = await fetch('api/demo-users')

        if (res.ok) {
            const data = await res.json()
            toast.info('Usuarios cargados')

            setUsers(data)
        } else {
            toast.error('Error al cargar usuarios')
        }
    }

    useEffect(() => {
        fetchDemoUsers()
    }, [])

    return (
        <section className="w-full flex flex-col">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 p-10 h-full">
                {users.map((user, t) => (
                    <div className="w-full max-w-sm  border border-rose-900 bg-rose-900/20 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                        <div className="flex justify-end px-4 pt-4">
                            {/* <!-- Dropdown menu --> */}
                            <NavigationMenu>
                                <NavigationMenuList>
                                    <NavigationMenuItem>
                                        <NavigationMenuTrigger className="bg-rose-900/30 border border-rose-900 text-rose-100 hover:bg-rose-700/30">
                                            Editar
                                        </NavigationMenuTrigger>
                                        <NavigationMenuContent className="w-[12rem]">
                                            <ul className="py-2 w-full">
                                                <li>
                                                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Edit</a>
                                                </li>
                                                <li>
                                                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Export Data</a>
                                                </li>
                                                <li>
                                                    <a href="#" className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Delete</a>
                                                </li>
                                            </ul>
                                        </NavigationMenuContent>
                                    </NavigationMenuItem>
                                </NavigationMenuList>
                            </NavigationMenu>
                        </div>
                        <div className="flex flex-col items-center pb-10">
                            <img className="w-24 h-24 mb-3 rounded-full shadow-lg" src={user.picture.medium} alt={`foto de ${user.name.first}`} />
                            <h5 className="mb-1 text-xl font-medium text-rose-100 dark:text-white"> {user.name.first} {user.name.last} </h5>
                            <span className="text-sm text-gray-500 dark:text-gray-400"> {user.location.country} </span>
                            <div className="flex flex-col space-y-5 mt-4 md:mt-6">
                                <a href="#" className="inline-flex items-center px-4 py-2 text-sm font-medium text-center bg-indigo-900/70 border border-indigo-900 text-indigo-100 hover:bg-indigo-900 rounded-lg focus:ring-4 focus:outline-none focus:ring-blue-300">Atualizar Contrato</a>
                                <a href="#" className="py-2 px-4 ms-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100">Enviar Mensagem</a>
                            </div>
                        </div>
                    </div>

                ))}
            </div>
        </section>
    )
}