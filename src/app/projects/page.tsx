import { ModeToggle } from '@/components/mode-toggle'
import Project from '@/components/project'
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { CONFIG } from '@/config'
import Link from 'next/link'

export const metadata = {
    title: 'Projects',
}

const Projects = () => {
    return (
        <div>
            <div className='flex animate-slide-from-down-and-fade-1 items-start justify-between'>
                <Breadcrumb className='mb-4 px-4'>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink asChild>
                                <Link href='/'>Home</Link>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage>Projects</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
                <ModeToggle />
            </div>
            <h1 className='animate-slide-from-down-and-fade-2 scroll-m-20 px-4 text-4xl font-bold tracking-tight'>
                All Projects
            </h1>
            <div className='animate-slide-from-down-and-fade-3 space-y-3 pt-12'>
                {CONFIG.projects.map((project, idx) => (
                    <Project
                        key={idx}
                        name={project.name}
                        icon={project.icon}
                        description={project.description}
                        image={project.image}
                        url={project.url}
                        tags={project.tags}
                        testimonial={project.testimonial}
                        github={project.github}
                    />
                ))}
            </div>
        </div>
    )
}

export default Projects
