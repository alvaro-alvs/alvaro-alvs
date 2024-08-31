import { useState, useEffect } from "react";
import { OxxPing } from "@/services/oxxping";

export const OXXAPICONSOLE = () => {
    const [response, setRes] = useState({});
    const [time, setTime] = useState<string | number>();
    const [pingCount, setPingCount] = useState(0);
    const [pingDisabled, setPingDisabled] = useState(false);

    const ping_api = async () => {
        const startTime = Date.now(); // Obtém o tempo inicial em milissegundos
        const res = await OxxPing();
        const endTime = Date.now(); // Obtém o tempo final em milissegundos
        const elapsed_time = endTime - startTime; // Calcula o tempo decorrido

        if (res && res.status === 200) {
            // Formata o tempo para ter no máximo uma casa decimal e não ultrapassar 999
            const formatted_time = elapsed_time > 999
                ? '999+'
                : elapsed_time.toFixed(1); // Formata para 1 casa decimal

            // Converte o corpo da resposta para JSON
            const data = await res.json(); // Aguarda a conversão do corpo da resposta para JSON

            setTime(formatted_time);
            setRes(data); // Atualiza o estado com a resposta JSON
        } else {
            setTime('Erro');
        }
    };

    useEffect(() => {
        if (pingCount < 5) {
            const intervalId = setInterval(() => {
                ping_api();
                setPingCount(prevCount => prevCount + 1); // Incrementa o contador
            }, 5000); // Intervalo de 5 segundos

            return () => clearInterval(intervalId); // Limpa o intervalo ao desmontar o componente
        } else {
            setPingDisabled(true); // Desativa futuras chamadas de ping após 5 execuções
        }
    }, [pingCount]);

    return (
        <footer className="grid space-y-3 mt-10">
            <pre className="text-white"> Testar a API: </pre>

            <div className="h-max p-3 bg-rose-950/30 rounded-xl border border-rose-900">
                <pre>
                    <h1 className="text-rose-300">Resposta do Servidor</h1>
                    <p className="text-xs text-rose-100">
                        {response && JSON.stringify(response, null, 2)} {/* Converte o objeto para string formatada */}
                    </p>
                </pre>
            </div>

            {time &&
                <p className={`${Number(time) > 350 ? 'text-orange-500' : 'text-green-500'}`}>
                    Tempo de resposta: {time} {time && 'ms'}
                </p>
            }

            <button onClick={ping_api} disabled={pingDisabled} className="bg-animate bg-gradient-to-r from-indigo-800 via-pink-800 to-rose-800 rounded p-2 text-center w-full">
                {pingDisabled ? 'Teste Completo' : 'Testar'}
            </button>
        </footer>
    );
};
