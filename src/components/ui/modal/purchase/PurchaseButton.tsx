import { formatBrl } from "@/services/formatStrings";
import { Button } from "../../shadcn-ui/button";
import { usePayment } from "@/components/providers/PaymentProvider";
import { toast } from "sonner";
import { useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export const PurchaseButton = ({ vista }: { vista: boolean }) => {
    const [buttonStatus, setButtonStatus] = useState<'idle' | 'sending' | 'error' | 'ok'>('idle')
    const { payload, product, setPayload, customer, handleClose } = usePayment();

    function generateCorrelationId(pName: string) {
        //* Definição na Identificação do Produto
        const palavras = pName.split(' ');
        const pId = palavras[palavras.length - 1]
        const timestamp = Date.now();

        const random = Math.floor(Math.random() * 1000000);
        return `${pId}-${timestamp}-${random}`;
    }


    //* Bom dia e Boa sorte :D
    const handleBuy = async () => {
        setButtonStatus('sending')

        // Construir o payload atualizado fora do setPayload
        const updatedPayload = {
            correlationID: generateCorrelationId(product!.title),
            value: vista ? product!.pricing.value : Math.round(product!.pay.value),
            customer: customer,
            comment: payload.comment,
            additionalInfo: [
                { key: 'Produto-Digital', value: product!.title },
                { key: 'metodo', value: vista ? 'vista' : 'parcelado' },
                { key: 'installments', value: product!.pay.installments.toString()},
            ]
        };

        // Atualiza o estado com o payload atualizado
        setPayload(updatedPayload);

        // Use o `updatedPayload` diretamente na requisição
        const res = await fetch('api/place-order/', {
            body: JSON.stringify(updatedPayload),
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (res.ok) {
            window.location.href = '/painel'
        } else {
            setButtonStatus('error')
        }
    };

    return (
        <>
            <Button
                onClick={() => handleBuy()}
                className={
                    `${vista ? 'bg-fuchsia-900/20 border-fuchsia-900 hover:bg-fuchsia-900' : 'bg-violet-900/20 border-violet-900 hover:bg-violet-900'} border flex-col w-full h-max min-h-[5rem]`
                }
            >
                <div className={`${buttonStatus === 'sending' && 'opacity-0'} space-y-5 transition duration-500`}>
                    <span className="flex items-center space-x-1 text-xl">
                        <p>{`${vista ? 'Comprar À Vista' : product && product.pay.installments >= 2 ? 'Parcelar' : 'Total'}`}</p>
                    </span>

                    {/* Exibição de Valor da Entrada */}
                    {product && !vista && product.pay.installments >= 2 &&
                        <p className="text-base">{`Entrada: R$ ${formatBrl(product?.pricing.value / product.pay.installments)}`}</p>
                    }

                    {/* Valor de cada parcela */}
                    <p className="text-">Total:{` ${formatBrl(product?.pricing.value)}`}</p>
                </div>

                {buttonStatus === 'sending' &&
                    <div className="absolute w-full h-full flex items-center justify-center">
                        <AiOutlineLoading3Quarters className="animate-spin w-7 h-7 fill-fuchsia-200" />
                    </div>
                }
            </Button>
        </>
    );
};
