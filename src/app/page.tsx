import GitHubContributions from '@/components/github-contributions'
import Header from '@/components/header'
import { Icons } from '@/components/icons'
import OpenSource from '@/components/open-source'
import Project from '@/components/project'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { CONFIG } from '@/config'
import Link from 'next/link'
import React from 'react'

export default function Home() {
    return (
        <div className='flex flex-col gap-12'>
            <Header />
            <div className='animate-slide-from-down-and-fade-2 space-y-2 px-4'>
                <h2 className='font-semibold'>About me</h2>
                <p className='text-muted-foreground leading-6'>
                    {CONFIG.description}
                </p>
            </div>
            <div className='animate-slide-from-down-and-fade-3 flex flex-col gap-7'>
                <h2 className='-mb-4 px-4 font-semibold'>Featured Projects</h2>
                {CONFIG.projects
                    .filter((project) => project.featured)
                    .map((project, idx, array) => (
                        <React.Fragment key={idx}>
                            <Project
                                name={project.name}
                                icon={project.icon}
                                description={project.description}
                                image={project.image}
                                url={project.url}
                                tags={project.tags}
                                testimonial={project.testimonial}
                                github={project.github}
                            />
                            {idx < array.length - 1 && (
                                <Separator className='mx-auto max-w-96' />
                            )}
                        </React.Fragment>
                    ))}
                <Button
                    asChild
                    className='text-muted-foreground hover:text-foreground ml-auto items-end underline'
                    variant={'link'}
                >
                    <Link href='/projects'>
                        All projects
                        <Icons.arrowUpRight className='inline-block size-4' />
                    </Link>
                </Button>
            </div>

            <OpenSource />

            <GitHubContributions />
        </div>
    )
}
