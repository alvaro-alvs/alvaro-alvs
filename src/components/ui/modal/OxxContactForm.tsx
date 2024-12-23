import { useState, createContext } from "react"
import { OxxInput } from "../ui-assets/OxxInput"
import { SubmitContato } from "@/services/SubmitContato"
import type { ContactType } from "@/types/OxxTypes"
import { toast } from "sonner"
import { useContato } from "@/components/providers/ContatoProvider"


/*  Caro analista, Bem vindo.
     não repara na bagunça :>
*/


export default function OxxContactForm() {
    const { contato, setContato, setValidate, open, setOpen } = useContato()
    const [status, setStatus] = useState('idle')

    //* Notificação de Envio
    const MensagemEnviada = () => {

        return (
            <span className="w-full text-center text-xl"> 📬  Mensagem Enviada </span>
        )
    }

    const handleSubmit = async () => {
        setStatus('enviando')

        //* Validação de meio de contato -> Verifica se Email ou Telefone estão preenchidos, senão gera um erro
        if (contato.email === '' && contato.telefone === '') {
            setValidate((prevState: any) => ({
                ...prevState,
                email: true,
                telefone: true
            }));

            window.alert('Preencha pelo menos um meio de contato');

            setStatus('idle');

            return;
        }

        if (!contato.name || contato.name.length <= 2) {
            setValidate((prevState: any) => ({
                ...prevState,
                name: true
            }));

            toast.warning('Preencha seu Nome');

            setStatus('idle')

            return
        }

        else {
            toast.info('Enviando Mensagem...')

            const res = await SubmitContato(contato)

            if (res.status === 'ok') {
                toast.success(<MensagemEnviada />)

                setOpen(false)
            }

            setStatus('enviado')
        }
    }

    return (
        <div className="flex flex-col gap-y-5 sm:p-7 text-white border- border-indigo-900 rounded h-full ">
            <OxxInput field="nome" label="Seu Nome" type="text" placeholder="seu nome" required />

            <OxxInput field="email" label="Email" type="text" placeholder="Seu Email Principal 📧" required />

            <OxxInput field="telefone" label="Celular/Telefone" type="text" placeholder="Numero para Contato 📱" />

            <OxxInput field="message" label="Mensagem" type="text" placeholder="Mensagem 💬" />

            {status === 'erro' && <p className="text-red-500"> Tente Novamente Mais Tarde :( </p>}

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
    )
}