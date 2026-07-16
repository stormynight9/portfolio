import Project from '@/components/project'
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { Separator } from '@/components/ui/separator'
import { CONFIG } from '@/config'
import Link from 'next/link'
import React from 'react'

export const metadata = {
    title: 'Projects',
}

const Projects = () => {
    return (
        <div className='flex flex-col gap-12'>
            <div className='animate-slide-from-down-and-fade-1 flex items-start justify-between'>
                <Breadcrumb className='px-4'>
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
            </div>
            <h1 className='animate-slide-from-down-and-fade-2 scroll-m-20 px-4 text-4xl font-semibold tracking-tight'>
                All Projects
            </h1>
            <div className='animate-slide-from-down-and-fade-3 flex flex-col gap-7'>
                {CONFIG.projects.map((project, idx, array) => (
                    <React.Fragment key={project.url}>
                        <Project
                            name={project.name}
                            icon={project.icon}
                            imageClasses={project.imageClasses}
                            description={project.description}
                            image={project.image}
                            url={project.url}
                            tags={project.tags}
                            testimonial={project.testimonial}
                            github={project.github}
                            nameBadges={project.nameBadges}
                        />
                        {idx < array.length - 1 && (
                            <Separator className='mx-auto max-w-96' />
                        )}
                    </React.Fragment>
                ))}
            </div>
        </div>
    )
}

export default Projects
