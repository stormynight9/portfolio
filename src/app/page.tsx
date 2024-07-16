import Header from '@/components/header'
import { Icons } from '@/components/icons'
import OpenSource from '@/components/open-source'
import Project from '@/components/project'
import { Button } from '@/components/ui/button'
import { CONFIG } from '@/config'
import Link from 'next/link'

export default function Home() {
    return (
        <div className='flex flex-col gap-12'>
            <Header />
            <div className='animate-slide-from-down-and-fade-2 space-y-2 px-4'>
                <h2 className='font-semibold'>About me</h2>
                <p className='leading-6 text-muted-foreground'>
                    {CONFIG.description}
                </p>
            </div>
            <div className='flex animate-slide-from-down-and-fade-3 flex-col gap-3'>
                <h2 className='px-4 font-semibold'>Featured Projects</h2>
                {CONFIG.projects
                    .filter((project) => project.featured)
                    .map((project, idx) => (
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
                <Button
                    asChild
                    className='ml-auto items-end text-muted-foreground underline hover:text-foreground'
                    variant={'link'}
                >
                    <Link href='/projects'>
                        All projects
                        <Icons.arrowUpRight className='inline-block size-4' />
                    </Link>
                </Button>
            </div>

            <OpenSource />
        </div>
    )
}
