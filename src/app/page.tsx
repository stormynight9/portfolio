import GitHubContributions from '@/components/github-contributions'
import Header from '@/components/header'
import { Icons } from '@/components/icons'
import OpenSource from '@/components/open-source'
import Project from '@/components/project'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { CONFIG } from '@/config'
import { GraduationCap } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

/** Centered rule between major homepage blocks (same pattern as between featured projects). */
function SectionRule() {
    return <Separator className='mx-auto my-12' />
}

function yearsLabel(years: number) {
    return `${years} ${years === 1 ? 'year' : 'years'}`
}

export default function Home() {
    const educationYears = CONFIG.education?.programs.flatMap((p) =>
        p.period.split('–').map(Number)
    )
    const educationStart = educationYears?.length
        ? Math.min(...educationYears)
        : undefined
    const educationEnd = educationYears?.length
        ? Math.max(...educationYears)
        : undefined

    return (
        <div className='flex flex-col'>
            <Header />
            <section className='mt-12' aria-labelledby='home-about'>
                <div className='animate-slide-from-down-and-fade-2 space-y-2 px-4'>
                    <h2 id='home-about'>About me</h2>
                    <div className='text-muted-foreground max-w-[65ch] space-y-3 leading-relaxed'>
                        {CONFIG.description}
                    </div>
                </div>
            </section>
            <SectionRule />
            <section aria-labelledby='home-projects'>
                <div className='animate-slide-from-down-and-fade-3 flex flex-col gap-7'>
                    <div className='-mb-4 flex items-center justify-between gap-4 px-4'>
                        <h2 id='home-projects'>Projects I worked on</h2>
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
            </section>
            <SectionRule />

            {CONFIG.education && (
                <>
                    <section aria-labelledby='home-education'>
                        <div className='animate-slide-from-down-and-fade-2 space-y-6 px-4'>
                            <h2 id='home-education'>Education</h2>
                            <div className='flex items-start gap-3'>
                                <span className='bg-muted flex size-10 shrink-0 items-center justify-center rounded-lg'>
                                    <GraduationCap className='size-5' />
                                </span>
                                <div className='min-w-0'>
                                    <h3 className='text-foreground text-[15px] leading-snug font-semibold'>
                                        {CONFIG.education.institutionUrl ? (
                                            <a
                                                href={
                                                    CONFIG.education
                                                        .institutionUrl
                                                }
                                                target='_blank'
                                                rel='noopener noreferrer'
                                                className='decoration-muted-foreground underline-offset-2 hover:underline'
                                            >
                                                {CONFIG.education.institution}
                                                <Icons.arrowUpRight className='inline-block size-4' />
                                            </a>
                                        ) : (
                                            CONFIG.education.institution
                                        )}
                                    </h3>
                                    {educationStart != null &&
                                        educationEnd != null && (
                                            <div className='mt-0.5 flex flex-wrap items-center gap-1.5'>
                                                <p className='text-muted-foreground text-sm tabular-nums'>
                                                    {educationStart}–
                                                    {educationEnd}
                                                </p>
                                                <Badge
                                                    variant='secondary'
                                                    className='font-normal'
                                                >
                                                    {yearsLabel(
                                                        educationEnd -
                                                            educationStart
                                                    )}
                                                </Badge>
                                            </div>
                                        )}
                                </div>
                            </div>
                            <ol className='border-border relative ml-5 space-y-6 border-l pl-0'>
                                {CONFIG.education.programs.map((p) => (
                                    <li
                                        key={`${p.title}-${p.period}`}
                                        className='relative pl-6'
                                    >
                                        <span
                                            aria-hidden='true'
                                            className='bg-muted-foreground absolute top-1.5 -left-[4px] z-10 size-2 rounded-full'
                                        />
                                        <h4 className='text-foreground text-sm leading-snug font-semibold'>
                                            {p.title}
                                        </h4>
                                        <div className='mt-1.5 flex flex-wrap items-center gap-1.5'>
                                            <p className='text-muted-foreground text-sm tabular-nums'>
                                                {p.period}
                                            </p>
                                            <Badge
                                                variant='secondary'
                                                className='font-normal'
                                            >
                                                {yearsLabel(p.durationYears)}
                                            </Badge>
                                        </div>
                                        <p className='text-muted-foreground mt-1.5 max-w-[65ch] text-sm leading-relaxed'>
                                            {p.description}
                                        </p>
                                    </li>
                                ))}
                            </ol>
                        </div>
                    </section>
                    <SectionRule />
                </>
            )}

            <section aria-label='Open source'>
                <OpenSource />
            </section>
            <SectionRule />
            <section aria-label='GitHub activity'>
                <GitHubContributions />
            </section>
        </div>
    )
}
