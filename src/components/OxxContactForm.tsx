import { useState, createContext } from "react"
import { OxxInput } from "./ui/OxxInput"


//* Caro analista, Bem vindo. não repara na bagunça :>


export const OxxContactContext = createContext(null as any)

export default function OxxContactForm() {
    const [status, setStatus] = useState('idle')
    const [formData, setFormData] = useState({
        nome: '',
        message: '',
        telefone: '',
        product: 'contato_simples',
    })

    const handleSubmit = async () => {
        setStatus('enviando')

        const submit_response = await fetch('/api/contato', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })

        const data = await submit_response.json()

        if (data.status && data.status === 'ok') {
            console.log('Enviado');
            setStatus('enviado')
        } else if (data.status && data.status === 'ok_falso') {
            setStatus('simulado_envio')
        } else {
            setStatus('erro')
        }
    }

    return (
        <OxxContactContext.Provider value={{ formData, setFormData }}>
            <div className="flex flex-col gap-y-5 p-7 text-white border- border-indigo-900 rounded h-full max-h-96">
                <OxxInput field="nome" label="Seu Nome" type="text" placeholder="seu nome" />

                <OxxInput field="message" label="Mensagem" type="text" placeholder="Mensagem 💬" />

                <div onClick={() => {
                    if (status === 'idle') {
                        handleSubmit();
                    } else {
                        console.log('a');
                    }
                }}
                    className="bg-animate bg-gradient-to-r from-indigo-800 via-pink-800 to-rose-800 mt-7 w-full p-3 text-center border-none rounded cursor-pointer hover:scale-110 active:scale-100 active:shadow-inner hover:rounded-tl-2xl hover:rounded-br-2xl"
                >
                    {status === 'enviado' ? '✔️' : 'Enviar 💌'}
                </div>
            </div>
        </OxxContactContext.Provider>
    )
}