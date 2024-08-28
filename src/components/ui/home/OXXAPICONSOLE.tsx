import { useState } from "react";

export const OXXAPICONSOLE = () => {
    const [response, setRes] = useState({});
    const [time, setTime] = useState();

    const ping_api = async () => {
        const startTime = Date.now(); // Obtém o tempo inicial em milissegundos

        const res = await fetch('https://oxx-three.vercel.app/oxx/ping/', {
            method: "GET",
            headers: {
                'api-key': 'xUp2jAz5hQZM#wCsKb'
            }
        });

        const endTime = Date.now(); // Obtém o tempo final em milissegundos
        const elapsed_time = endTime - startTime; // Calcula o tempo decorrido

        if (res && res.status === 200) {
            // Converte o corpo da resposta para JSON
            const data = await res.json(); // Aguarda a conversão do corpo da resposta para JSON

            // Formata o tempo para ter no máximo uma casa decimal e não ultrapassar 999
            const formatted_time = elapsed_time > 999
                ? '999+'
                : elapsed_time.toFixed(1); // Formata para 1 casa decimal

            //@ts-ignore
            setTime(formatted_time);
            setRes(data); // Atualiza o estado com a resposta JSON
        } else {
            //@ts-ignore
            setTime('Erro');
        }
    };

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
                <p className={`${time > 200 ? 'text-orange-500' : 'text-green-500'}`}>Tempo de resposta: {time} {time && 'ms'}</p>
            }

            <button onClick={() => ping_api()} className="bg-animate bg-gradient-to-r from-indigo-800 via-pink-800 to-rose-800 rounded p-2 text-center w-full">
                Testar
            </button>
        </footer>
    );
};
