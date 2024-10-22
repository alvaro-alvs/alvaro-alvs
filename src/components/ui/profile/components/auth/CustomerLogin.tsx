import { GoogleLogin } from '@react-oauth/google';
import { Label } from '../../../shadcn-ui/label';
import { Input } from '../../../shadcn-ui/input';
import { Button } from '../../../shadcn-ui/button';
import { useEffect, useState } from 'react';
import { formatCpf } from '@/services/formatStrings';
import { toast } from 'sonner';
import type { CustomerType } from '@/types/PaymentTypes';
import { useCustomer } from '@/components/providers/CustomerProfileProvider';
import { CPFStep } from './CPFStep';
import OTPStep from './OTPStep';
import CustomerMailConfirm from './CustomerMailConfirm';
import PasswordStep from './PasswordStep';


export default function CustomerLogin() {
    const { customerState, setCustomerState } = useCustomer()

    const [userData, setUserData] = useState<CustomerType | undefined>(undefined)

    const handleGetuserByCpf = async () => {
        const loginRes = await fetch('api/login', {
            method: 'post',
            body: JSON.stringify(customerState.cpf),
        })

        if (loginRes.ok) {
            const data = await loginRes.json()

            console.log('Customer from server: ', data.customer);

            //* Adiciona os dados do usuario no contexto do perfil
            setCustomerState({...customerState, customer: data.customer, step: 1})
            
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
                setCustomerState({...customerState, step: 2})
            } else {
                toast.info('Email diferente do cadastro')
            }
        }
    }

    useEffect(() => {
        console.log('Customer context: ', customerState);
        
    }, [customerState])

    return (
        <section className="text-rose-100 w-full flex flex-col items-center">
            <div>
                <h1 className='text-2xl'> Login com CPF e Email </h1>
                <div className='my-5'>
                    {customerState.step === 0 &&
                        <CPFStep />
                    }
                    {customerState.step === 1 &&
                        <CustomerMailConfirm />
                    }

                    <Button onClick={() => handleConfirm()} className='w-full bg-fuchsia-900/20 hover:bg-fuchsia-900/50 mt-5'>
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