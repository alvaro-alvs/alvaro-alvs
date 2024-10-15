import { formatBrl } from "@/services/formatStrings";
import { Button } from "../../shadcn-ui/button";
import { usePayment } from "@/components/providers/PaymentProvider";
import { toast } from "sonner";

export const PurchaseButton = ({ vista }: { vista: boolean }) => {
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
        
        // Construir o payload atualizado fora do setPayload
        const updatedPayload = {
            correlationID: generateCorrelationId(product!.title),
            value: vista ? product!.pricing.value : Math.round(product!.pay.value),
            customer: customer,
            comment: payload.comment,
            additionalInfo: [
                { key: 'Produto-Digital ', value: product!.title }
            ]
        };

        // Atualiza o estado com o payload atualizado
        setPayload(updatedPayload);

        // Use o `updatedPayload` diretamente na requisição
        const res = await fetch('api/place-order/', {
            body: JSON.stringify(updatedPayload),
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (res.ok) {
            const data = await res.json();
            console.log(data);
        }
    };

    return (
        <Button
            onClick={() => handleBuy()}
            className={
                `${vista ? 'bg-fuchsia-900/20 border-fuchsia-900 hover:bg-fuchsia-900' : 'bg-violet-900/20 border-violet-900 hover:bg-violet-900'} border flex-col space-y-5 w-full h-max`
            }
        >
            <span className="flex items-center space-x-1 text-xl">
                <p>{`${vista ? 'Comprar À Vista' : product && product.pay.installments >= 2 ? 'Parcelar' : 'Total'}`}</p>
            </span>

            {/* Exibição de Valor da Entrada */}
            {product && !vista && product.pay.installments >= 2 &&
                <p className="text-base">{`Entrada: R$ ${formatBrl(product?.pricing.value)}`}</p>
            }

            {/* Valor de cada parcela */}
            <p className="text-xs">{`Total: R$ ${formatBrl(product?.pricing.value)}`}</p>
        </Button>
    );
};
