import { TechStackBadge } from "../TechStackBadge"

type OxxProject = {

}

type OxxProjectProps = {
    projects: OxxProject[]
}

export default function OxxProjects({ projects }: OxxProjectProps) {
    return (
        <>
            {
                projects &&
                projects.map((project: any) => (
                    <div className="p-0 flex even:flex-row-reverse grid-cols-2 rounded-lg borde border-gray-800 min-h-52 overflow-hidden group cursor-pointer shadow-lg">
                        <header className="w-1/2 overflow-hidden flex items-center">
                            <img
                                // inferSize={true}
                                className="w-full rounded-lg transition duration- group-hover:scale- group-hover:object-center group-hover:blur-sm"
                                src={project.bg_public_url}
                                alt=""
                            />
                        </header>

                        <article className="w-1/2 flex flex-col justify-between p-8 space-y-5">
                            <h1 className="text-2xl "> {project.title} </h1>

                            <p className="project-desc text-sm max-h-20 overflow-y-scroll">{project.description}</p>

                            <footer className="flex flex-wrap gap-3">
                                {project.tech_stack.map((tech: string) => (
                                    <TechStackBadge> {tech} </TechStackBadge>
                                ))}
                            </footer>
                        </article>
                    </div>
                ))
            }
        </>
    )
}