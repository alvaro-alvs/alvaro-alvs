import { TechStackBadge } from "../TechStackBadge"
import { FaExternalLinkAlt } from "react-icons/fa";

// type OxxProject = {
//     id: number,
//     title: string,
//     description: string,
//     link: string,
//     logo: string,
//     tech_stack: string[],
//     order: null,
//     bg_public_url: string
// }

// type OxxProjectProps = {
//     raw_projects: OxxProject[]
// }

export default function OxxProjects({ raw_projects }: any) {
    const projects = raw_projects.reverse()

    return (
        <>
            {
                projects.map((project: any) => (
                    <a href={project.link} target="_blank">

                        <div key={project.id} className="p-7 bg-rose-900/10 flex lg:even:flex-row-reverse grid-cols-2 rounded-lg border border-rose-900 min-sm:h-[20rem] overflow-hidden group cursor-pointer shadow-lg max-lg:flex-col">
                            <header className="lg:w-1/2 max-sm:h-56 max-sm:aspect-auto overflow-hidden flex items-center">
                                <img
                                    // inferSize={true}
                                    className="w-full h-full object-cover object-left rounded-lg transition-all duration-500 group-hover:scale- group-hover:object-right"
                                    src={project.bg_public_url}
                                    alt=""
                                />
                            </header>

                            <article className="lg:w-1/2 flex flex-col justify-between p-8 space-y-5">
                                <h1 className="text-2xl "> {project.title} </h1>

                                <p className="project-desc text-sm max-h-20 overflow-y-scroll no-scrollbar">{project.description}</p>

                                <footer className="flex flex-wrap gap-3">
                                    {project.tech_stack.map((tech: any) => (
                                        <TechStackBadge> {tech} </TechStackBadge>
                                    ))}
                                </footer>

                            </article>

                            <footer className="self-end drop-shadow decoration-rose-400 group-hover:*:scale-110">
                                <FaExternalLinkAlt className="" />
                            </footer>
                        </div>
                    </a>
                ))
            }
        </>
    )
}