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
                <h2>About me</h2>
                <div className='text-muted-foreground max-w-[65ch] space-y-3 leading-relaxed'>
                    {CONFIG.description}
                </div>
            </div>
            <div className='animate-slide-from-down-and-fade-3 flex flex-col gap-7'>
                <div className='-mb-4 flex items-center justify-between gap-4 px-4'>
                    <h2>Projects I worked on</h2>
                    <Button
                        asChild
                        className='text-muted-foreground hover:text-foreground shrink-0 underline'
                        variant={'link'}
                    >
                        <Link href='/projects'>
                            All projects
                            <Icons.arrowUpRight />
                        </Link>
                    </Button>
                </div>
                {CONFIG.projects
                    .filter((project) => project.featured)
                    .map((project, idx, array) => (
                        <React.Fragment key={project.url}>
                            <Project
                                name={project.name}
                                icon={project.icon}
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
                <div className='flex justify-center'>
                    <Button
                        asChild
                        className='text-muted-foreground hover:text-foreground underline'
                        variant={'link'}
                    >
                        <Link href='/projects'>
                            More projects
                            <Icons.arrowUpRight />
                        </Link>
                    </Button>
                </div>
            </div>

            {CONFIG.education && (
                <div className='animate-slide-from-down-and-fade-2 space-y-4 px-4'>
                    <h2>Education</h2>
                    <p className='text-muted-foreground max-w-[65ch] leading-relaxed'>
                        I studied at{' '}
                        {CONFIG.education.institutionUrl ? (
                            <a
                                href={CONFIG.education.institutionUrl}
                                target='_blank'
                                rel='noopener noreferrer'
                                className='text-foreground decoration-muted-foreground font-medium underline underline-offset-2'
                            >
                                {CONFIG.education.institution}
                                <Icons.arrowUpRight className='inline-block size-4' />
                            </a>
                        ) : (
                            CONFIG.education.institution
                        )}
                        .
                    </p>
                    <ul className='divide-border border-border max-w-[65ch] divide-y border-y'>
                        {CONFIG.education.programs.map((p) => (
                            <li
                                key={`${p.title}-${p.period}`}
                                className='flex flex-col gap-2 py-4'
                            >
                                <div className='flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4'>
                                    <span className='text-foreground font-medium'>
                                        {p.title}
                                    </span>
                                    <span className='text-muted-foreground shrink-0 tabular-nums sm:text-right'>
                                        {p.period}
                                    </span>
                                </div>
                                <p className='text-muted-foreground leading-relaxed'>
                                    {p.description}
                                </p>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            <OpenSource />

            <GitHubContributions />
        </div>
    )
}
