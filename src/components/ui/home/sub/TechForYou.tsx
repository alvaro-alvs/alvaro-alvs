
import { WavyBackground } from "../../aceternity-ui/wavy-background";
import type { ForYouContentType } from "@/types/OxxTypes";
import www from "@/assets/icons/www.png"
import system from "@/assets/icons/system.png"
import links from "@/assets/icons/data-link.png"

const Content: ForYouContentType[] = [{
    title: "Desenvolvimento de Website",
    subtitle: 'Exclusividade Garantida',
    items: ['Site Global com otimização internacional',
        'CI/CD – Updates em tempo real com integração contínua',
        'Design único e personalizado, voltado para identidade visual da marca'
    ],
    icon: <img src={www.src} className="group-hover:scale-125 transition w-16 z-10" />,
    link: "./assets/"
}, {
    title: "LinkStream",
    subtitle: 'Exclusividade Garantida',
    items: ['Até 100 links para organizar',
        'Links destacados por estrelas, mostrados no topo',
        'Cores e temas personalizáveis para links e fundo',
        'Plano VITALÌCIO',
        'Prioridade de desenvolvimento com pagamento adiantado para funcionalidades exclusivas'
    ],
    icon: <img src={links.src} className="group-hover:scale-125 transition w-16 z-10" />,
    image: <></>,
    link: ""
}, {
    title: "Sistemas de Gestão Personalizados",
    subtitle: 'Exclusividade Garantida',
    items: [
        'Soluções adaptáveis para qualquer tipo de unidade (escolas, empresas, lojas, igrejas, etc.',
        'Acesso controlado a dados e relatórios personalizados',
        'Integração com sistemas externos (APIs, ERPs, CRMs)',
        'Segurança avançada com diferentes níveis de permissões',
        'Integração com sistemas de terceiros (APIs, ERPs, CRMs)',
        'Painel de controle intuitivo com gráficos de desempenho',
        'Relatórios em tempo real e exportação de dados'
    ],
    icon: <img src={system.src} className="group-hover:scale-125 transition w-16 z-10" />,
    image: <></>,
    link: ""
}]

import { TechForYouModal } from "./TechForYouModal";

export const TechForYou = () => {


    return (
        <WavyBackground backgroundFill="#0c0812" blur={20} colors={['#9F1111', '#570C0C', '#e11d48', '#C21A9D', '#0e0e1b']} className="w-full h-full sm:p-0">

            <div className="grid xl:grid-cols-3 sxlgrid-flow-col w-full sm:h-max gap-10 sm:px-0">
                {Content.map((product) => (
                    <TechForYouModal key={product.title} Product={product} />
                ))}
            </div>

        </WavyBackground>
    )
}