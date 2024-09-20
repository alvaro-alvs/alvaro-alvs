import { WavyBackground } from "../../aceternity-ui/wavy-background";
import { MdOutlineWeb } from "react-icons/md";
import type { ForYouContentType } from "@/types/OxxTypes";
import { GrSystem } from "react-icons/gr";
import { MdSettingsSystemDaydream } from "react-icons/md";
import { IoIosLink } from "react-icons/io";

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

export const TechForYou = () => {

    const FeatureCard = (Product: ForYouContentType) => {
        return (
            <div className="flex flex-col w-full h-full gap-2 p-7 rounded-xl backdrop-blur-2xl border border-transparent cursor-pointer bg-gradient-to-b from-[#0e0e1bc0] to-rose-700/10 hover:border-rose-900 transition group">
                <header className="pb-5">
                    <div className="absolute -top-8 transform -translate-x-14">
                        {Product.icon ? Product.icon : <MdOutlineWeb className="text-4xl text-red-500" />}
                    </div>

                    <h3 className="lg:text-3xl text-2xl text-rose-500 z-20">{Product.title}</h3>
                    <h4 className="text-xs text-rose-300"> {Product.subtitle} </h4>
                </header>

                <ul className="space-y-2 mb-5 overflow-hidden">
                    {Product.items?.map((item) => (<li className="text-sm">. {item}</li>))}

                </ul>

                <a href="#" className="flex items-center justify-center xl:justify-start space-x-1 group-hover:space-x-3 text-rose-300 mt-auto group-hover:underline">
                    <IoIosLink className="group-hover:scale-150 transition" />
                    <p className=" group-hover:scale-110 transition">Saiba mais</p>
                </a>
            </div>
        )
    }

    return (
        <WavyBackground backgroundFill="#0c0812" blur={20} colors={['#9F1111', '#570C0C', '#e11d48', '#C21A9D', '#0e0e1b']} className="w-full h-full sm:p-0">

            <div className="grid xl:grid-cols-3 sxlgrid-flow-col w-full sm:h-max gap-10 sm:px-0">
                {Content.map((product) => (
                    <FeatureCard key={product.title} {...product} />
                ))}
            </div>

        </WavyBackground>
    )
}