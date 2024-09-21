import type { ContactType } from "@/types/OxxTypes"

export const SubmitContato = async (formData: ContactType) => {
    const submit_response = await fetch('/api/contato', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })

    const data = await submit_response.json()

    if (data.status && data.status === 'ok') {

        return { status: data.status, data: data }

    } else {
        return { status: 'erro' }
    }
}