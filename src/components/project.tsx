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

interface ProjectProps {
    name: string
    icon?: keyof typeof Icons
    description: string
    image?: string
    url: string
    tags: {
        name: string
        icon: keyof typeof Icons
    }[]
    testimonial?: string
    github?: string
}

const Project = ({
    name,
    icon,
    description,
    image,
    url,
    tags,
    testimonial,
    github,
}: ProjectProps) => {
    const Icon = Icons[icon!]
    return (
        <Card className='group rounded-none border-none bg-accent/60 from-neutral-800/10 p-4 dark:bg-neutral-900 dark:hover:bg-gradient-to-bl sm:rounded-lg'>
            <div className='flex flex-col gap-2'>
                <div className='flex items-start justify-between'>
                    <div className='flex items-start gap-2'>
                        {icon && (
                            <Icon className='h-12 w-12 shrink-0 transition-all group-hover:saturate-100 md:saturate-0' />
                        )}
                        {image && (
                            <Image
                                src={image}
                                width={64}
                                height={64}
                                alt='fds'
                                className='h-12 w-auto shrink-0 transition-all group-hover:saturate-100 md:saturate-0'
                            />
                        )}
                        <div>
                            <h3>{name}</h3>
                            <p className='text-sm text-muted-foreground'>
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
                                                size={'icon'}
                                                variant={'ghost'}
                                                className='shrink-0'
                                            >
                                                <Link
                                                    href={github}
                                                    target='_blank'
                                                    aria-label='Github'
                                                >
                                                    <Icons.github className='size-4' />
                                                </Link>
                                            </Button>
                                        </TooltipTrigger>
                                        <TooltipContent
                                            side='bottom'
                                            className='bg-transparent text-xs'
                                        >
                                            Source Code
                                        </TooltipContent>
                                    </Tooltip>
                                )}
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Button
                                            asChild
                                            size={'icon'}
                                            variant={'ghost'}
                                            className='shrink-0'
                                        >
                                            <Link
                                                href={url}
                                                target='_blank'
                                                aria-label='Visit Website'
                                            >
                                                <Icons.externalLink className='size-4' />
                                            </Link>
                                        </Button>
                                    </TooltipTrigger>
                                    <TooltipContent
                                        side='bottom'
                                        className='bg-transparent text-xs'
                                    >
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
                            {tags.map((tag, idx) => {
                                const Icon = Icons[tag.icon]
                                return (
                                    <li key={idx}>
                                        <Badge variant={'outline'}>
                                            <Icon className='mr-1.5 h-3 w-3 transition-all group-hover:saturate-100 md:saturate-0' />{' '}
                                            {tag.name}
                                        </Badge>
                                    </li>
                                )
                            })}
                        </ul>
                    )}
                </div>
                {testimonial && (
                    <blockquote className='border-l-2 pl-6 text-sm italic text-muted-foreground'>
                        <ReadMore text={testimonial} id='d' />
                    </blockquote>
                )}
            </div>
        </Card>
    )
}

export default Project
