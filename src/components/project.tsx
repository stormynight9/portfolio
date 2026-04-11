import { Icons } from '@/components/icons'
import { ReadMore } from '@/components/read-more'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/tooltip'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

/** Host (+ optional path) for use as the visible project title. */
function formatUrlForTitle(url: string): string {
    try {
        const u = new URL(url)
        const host = u.hostname.replace(/^www\./i, '')
        const path =
            u.pathname && u.pathname !== '/'
                ? u.pathname.replace(/\/$/, '')
                : ''
        return path ? `${host}${path}` : host
    } catch {
        return url
    }
}

interface ProjectProps {
    name: string
    icon?: keyof typeof Icons
    imageClasses?: string
    description: string
    image?: string
    url: string
    tags: {
        name: string
        icon?: keyof typeof Icons
    }[]
    testimonial?: string
    github?: string
    nameBadges?: string[]
}

const Project = ({
    name,
    icon,
    imageClasses,
    description,
    image,
    url,
    tags,
    testimonial,
    github,
    nameBadges,
}: ProjectProps) => {
    const Icon = Icons[icon!]
    return (
        <div className='rounded-none border-none p-4 sm:rounded-lg'>
            <div className='flex flex-col gap-2'>
                <div className='flex items-start justify-between'>
                    <div className='flex items-start gap-4'>
                        {icon && (
                            <Icon
                                className={`h-12 w-12 shrink-0 ${imageClasses}`}
                            />
                        )}
                        {image && (
                            <Image
                                src={image}
                                width={64}
                                height={64}
                                alt={name}
                                className={`h-12 w-auto shrink-0 ${imageClasses}`}
                            />
                        )}
                        <div className='flex min-w-0 flex-col gap-1'>
                            <div className='flex flex-wrap items-center gap-2'>
                                <h3 className='shrink-0'>
                                    {url ? (
                                        <Link
                                            href={url}
                                            target='_blank'
                                            rel='noopener noreferrer'
                                            title={name}
                                            className='text-foreground decoration-muted-foreground font-semibold no-underline underline-offset-2 hover:underline'
                                        >
                                            {formatUrlForTitle(url)}
                                        </Link>
                                    ) : (
                                        name
                                    )}
                                </h3>
                                {nameBadges?.map((label) => (
                                    <Badge
                                        key={label}
                                        variant='secondary'
                                        className='font-normal'
                                    >
                                        {label}
                                    </Badge>
                                ))}
                            </div>
                            <p className='text-muted-foreground text-sm'>
                                {description}
                            </p>
                        </div>
                    </div>
                    {url && (
                        <div className='flex'>
                            <TooltipProvider delayDuration={70}>
                                {github && (
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Button
                                                asChild
                                                size='icon-sm'
                                                variant={'ghost'}
                                                className='shrink-0'
                                            >
                                                <Link
                                                    href={github}
                                                    target='_blank'
                                                    rel='noopener noreferrer'
                                                    aria-label='Github'
                                                >
                                                    <Icons.github className='size-4' />
                                                </Link>
                                            </Button>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            Source Code
                                        </TooltipContent>
                                    </Tooltip>
                                )}
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Button
                                            asChild
                                            size='icon-sm'
                                            variant={'ghost'}
                                            className='shrink-0'
                                        >
                                            <Link
                                                href={url}
                                                target='_blank'
                                                rel='noopener noreferrer'
                                                aria-label='Visit Website'
                                            >
                                                <Icons.externalLink className='size-4' />
                                            </Link>
                                        </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        Visit Website
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </div>
                    )}
                </div>

                <div>
                    {tags && (
                        <ul className='mt-2 flex flex-wrap gap-1'>
                            {tags.map((tag) => {
                                return (
                                    <li key={tag.name}>
                                        <Badge variant={'outline'}>
                                            {tag.name}
                                        </Badge>
                                    </li>
                                )
                            })}
                        </ul>
                    )}
                </div>
                {testimonial && (
                    <blockquote className='text-muted-foreground max-w-[65ch] border-l border-border pl-5 text-sm leading-relaxed italic'>
                        <ReadMore text={testimonial} />
                    </blockquote>
                )}
            </div>
        </div>
    )
}

export default Project
