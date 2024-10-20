
import { WavyBackground } from "../../aceternity-ui/wavy-background";
import { TechForYouModal } from "./TechForYouModal";

import type { ForYouContentType } from "@/types/OxxTypes";
import UserManagementDemo from "@/components/ui/home/demo/systems/UserManagemensDemo";

//* Demos
import { WebsiteDemo } from "@/components/ui/home/demo/website/WebsiteDemo";
import { LinkStreamDemo } from "@/components/ui/home/demo/linkstream/LinkStreamDemo";


//* Icons
import www from "@/assets/icons/www.png"
import system from "@/assets/icons/system.png"
import links from "@/assets/icons/data-link.png"
import PaymentProvider from "@/components/providers/PaymentProvider";

const Content: ForYouContentType[] = [
    {
        title: "LinkStream",
        subtitle: 'Uma solução personalizada de páginas de links, ideal para concentrar e organizar os principais conteúdos e redes sociais em um só lugar',
        header: 'Modelo LinkStream',
        items: [
            'Até 100 links para organizar',
            'Links destacados por estrelas, mostrados no topo',
            'Cores e temas personalizáveis para links e fundo',
            'Plano VITALÌCIO',
            'Prioridade de desenvolvimento com pagamento adiantado para funcionalidades exclusivas'
        ],
        description: 'Criado para ser intuitivo e flexível, o LinkStream permite que empresas e influenciadores compartilhem suas principais conexões de forma rápida e elegante, oferecendo uma experiência simples e funcional para os visitantes',
        pay: {
            sightOnly: true,
            installments: 1,
            value: 0
        },
        pricing: {
            correlationId: 'Compra-de-LinkStream-OXX',
            value: 9900
        },
        icon: <img src={links.src} className="group-hover:scale-125 transition w-10 z-10" />,
        image: <LinkStreamDemo />,
        clientMessage: 'Seus Links: \nNome da Sua Empresa: \n\nPorte da Empresa: \n\nDescrição do Projeto: ',
        isNew: true
    }, {
        title: "Desenvolvimento de Website",
        subtitle: 'Sites modernos, otimizados e totalmente personalizados para atender às necessidades específicas de cada cliente',
        header: 'Sites Responsivos',
        items: [
            'Site Global com otimização internacional',
            'CI/CD – Updates em tempo real com integração contínua',
            'Design único e personalizado, voltado para identidade visual da marca'
        ],
        description: 'Nosso foco é desenvolver sites que vão além da estética, com performance elevada e resultados mensuráveis. Trabalhe conosco para construir sua presença online de forma profissional e eficiente.',
        pay: {
            sightOnly: false,
            installments: 1,
            value: 0
        },
        pricing: {
            correlationId: 'Compra de Website OXX',
            value: 31900
        },
        icon: <img src={www.src} className="group-hover:scale-125 transition w-10 z-10" />,
        image: <WebsiteDemo />,
        clientMessage: 'Nome da Sua Empresa: \n\nPorte da Empresa: \n\nDescrição do Projeto: ',
    }, {
        title: "Sistemas de Gestão Personalizados",
        subtitle: 'Sistemas sob medida para otimizar os processos empresariais',
        header: 'Usuarios Cadastrados',
        items: [
            'Soluções adaptáveis para qualquer tipo de unidade (escolas, empresas, lojas, igrejas, etc.',
            'Acesso controlado a dados e relatórios personalizados',
            'Integração com sistemas externos (APIs, ERPs, CRMs)',
            'Segurança avançada com diferentes níveis de permissões',
        ],
        description: 'Otimize todas as operações do seu negócio, conectando áreas como controle financeiro, gestão de estoque e relacionamento com o cliente em um único sistema. Assim, você torna o gerenciamento mais simples e eficaz.',
        pay: {
            sightOnly: false,
            installments: 1,
            value: 0
        },
        pricing: {
            correlationId: 'Sistema Personalizado OXX',
            value: 190000
        },
        icon: <img src={system.src} className="group-hover:scale-125 transition w-10 z-10" />,
        image: <UserManagementDemo />,
        clientMessage: 'Nome da Sua Empresa: \n\nPorte da Empresa: \n\nDescrição do Projeto: ',
    }]

export const vistaProps = [
    'Desenvolvimento com Prioridade',
    'Bônus ou upgrades gratuitos',
    'Entrega antecipada'
]

export const notVistaProps = [
    'Parcelamento sem juros',
    'Acesso a funcionalidades essenciais',
    'Suporte durante o pagamento'
]

export const TechForYou = () => {

    return (
        <PaymentProvider>
            {/* <WavyBackground backgroundFill="#0c0812" blur={20} colors={['#9F1111', '#570C0C', '#e11d48', '#C21A9D', '#0e0e1b']} className="w-full h-max sm:h-max sm:p-0"> */}
            <section className="w-full">
                <div className="grid h-full gap-10 sm:gap-5 md:gap-7 2xl:gap-12 grid-cols-1 md:grid-cols-2 xl:grid-cols-3 xl:grid-flow-col w-full sm:h-max py-10 sm:py-0 sm:px-0 ">
                    {Content.map((product, index) => (
                        <TechForYouModal key={product.title} Product={product} />
                    ))}
                </div>
            </section>

            {/* </WavyBackground> */}
        </PaymentProvider>
    )
}