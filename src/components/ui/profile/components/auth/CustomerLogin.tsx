import { GoogleLogin } from '@react-oauth/google';
import { Button } from '../../../shadcn-ui/button';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import type { CustomerType } from '@/types/PaymentTypes';
import { useCustomer } from '@/components/providers/CustomerProfileProvider';
import { CPFStep } from './CPFStep';
import CustomerMailConfirm from './CustomerMailConfirm';
import PasswordStep from './PasswordStep';
import { unformatCpf } from '@/services/formatStrings';


export default function CustomerLogin() {
    const { customerState, setCustomerState } = useCustomer()

    const [userData, setUserData] = useState<CustomerType | undefined>(undefined)

    const handleGetuserByCpf = async () => {
        const loginRes = await fetch('/actions/login', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(unformatCpf(customerState.cpf)),
        })

        if (loginRes.ok) {
            const data = await loginRes.json()

            console.log('Customer from server: ', data.customer);

            //* Adiciona os dados do usuario no contexto do perfil
            setCustomerState({ ...customerState, customer: data.customer, step: 1 })

            toast.success('Confirme Seu Email')
        } else {
            console.log(loginRes);

            toast.error('Cpf nao encontrado')
        }
    }

    //* Autenticação de Dados
    const handleConfirm = () => {

        if (customerState.step === 0) {
            handleGetuserByCpf()
        } else if (customerState.step === 1) {
            if (customerState.customer?.email === customerState.email) {
                setCustomerState({ ...customerState, step: 2 })
            } else {
                toast.info('Email diferente do cadastro')
            }
        }
    }

    return (
        <section className="text-rose-100 w-full flex flex-col items-center">
            <div>
                <h1 className='text-2xl'> Login com CPF </h1>
                <div className='my-5'>
                    {customerState.step === 0 &&
                        <CPFStep />
                    }

                    {customerState.step === 1 &&
                        <PasswordStep />
                    }

                    <Button onClick={() => handleConfirm()} className='bg-gradient-to-r from-fuchsia-500 to-rose-500 text-2xl font-thin p-3 py-5 w-full hover:brightness-125 transition mt-5'>
                        login
                    </Button>
                </div>
            </div>

            <div className='my-10 border-b border-rose-900 w-96'></div>

            <GoogleLogin
                theme='filled_black'
                onSuccess={credentialResponse => {
                    console.log(credentialResponse);
                }}
                onError={() => {
                    console.log('Login Failed');
                }}
                useOneTap
            />
        </section>
    )
}