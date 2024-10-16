import { useState } from "react"



export const CustomerBasics = () => {
    const [customer, setCustomer] = useState({})

    const fetchData = async () => {
        const res = await fetch('https://oxx-three.vercel.app/customer/51575242850/', {
            headers: {
                'api-key': import.meta.env.OXX_KEY
            }
        })

        if (res.ok) {
            const data = await res.json()
            setCustomer(data)
        } else {
            console.log('Error')
        }
    }

    return (
        <div>
            <h1>CustomerBasics</h1>

            <div>
                <pre>{JSON.stringify(customer, null, 2)}</pre>
                <button className="text-white" onClick={() => fetchData()}>Fetch Data</button>
            </div>
        </div>
    )
}