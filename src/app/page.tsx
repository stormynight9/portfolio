import Header from '@/components/header'
import Project from '@/components/project'
import { CONFIG } from '@/config'

export default function Home() {
    return (
        <main className='mx-auto flex max-w-2xl flex-col gap-8 pt-4 md:pt-10'>
            <Header />
            <div className='animate-slide-from-down-and-fade-2 space-y-2 px-4'>
                <h2 className='font-semibold'>About me</h2>
                <p className='leading-6 text-muted-foreground'>
                    {CONFIG.description}
                </p>
            </div>
            <div className='animate-slide-from-down-and-fade-3 space-y-3'>
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
            </div>
        </main>
    )
}
