import { useState, createContext, type SetStateAction } from "react"
import { OxxInput } from "../ui-assets/OxxInput"
import type { ContactType } from "@/types/OxxTypes"


/*  Caro analista, Bem vindo.
     não repara na bagunça :>
*/


export const OxxContactContext = createContext(null as any)

export default function OxxContactForm(setIsOpen: { setIsOpen: React.Dispatch<React.SetStateAction<boolean>> }) {
    const [status, setStatus] = useState('idle')

    const [formData, setFormData] = useState({
        nome: '',
        email: '',
        message: '',
        telefone: '',
        product: 'contato_simples',
    })

    const [validate, setValidate] = useState<{ name: boolean, email: boolean, telefone: boolean, message: boolean }>({
        name: false,
        email: false,
        telefone: false,
        message: false,
    })

    const handleSubmit = async () => {
        setStatus('enviando')

        const SubmitContato = async (formData: ContactType) => {
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

        //* Validação de meio de contato -> Verifica se Email ou Telefone estão preenchidos, senão gera um erro
        if (formData.email === '' && formData.telefone === '') {
            setValidate((prevState) => ({
                ...prevState,
                email: true,
                telefone: true
            }));
            window.alert('Preencha pelo menos um meio de contato');
            setStatus('idle');
            return;
        } else {
            window.alert('Sua Mensagem foi Enviada')
            setStatus('enviado')
            console.log(formData);
        }
    }

    return (
        <OxxContactContext.Provider value={{ formData, setFormData, validate, setValidate }}>
            <div className="flex flex-col gap-y-5 p-7 text-white border- border-indigo-900 rounded h-full ">
                <OxxInput field="nome" label="Seu Nome" type="text" placeholder="seu nome" required />

                <OxxInput field="email" label="Email" type="text" placeholder="Seu Email Principal 📧" required />

                <OxxInput field="telefone" label="Celular/Telefone" type="text" placeholder="Celular para Contato 📱" />

                <OxxInput field="message" label="Mensagem" type="text" placeholder="Mensagem 💬" />

                {/* Botao de envio */}
                <div onClick={() => {
                    if (status === 'idle') {
                        handleSubmit();
                    } else {
                        console.log(status);

                        window.alert('Tente novamente mais tarde');
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