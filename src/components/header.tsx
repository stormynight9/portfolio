import { Icons } from '@/components/icons'
import { ModeToggle } from '@/components/mode-toggle'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { buttonVariants } from '@/components/ui/button'
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/tooltip'
import { CONFIG } from '@/config'
import { cn, getInitials } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'

const Header = () => {
    return (
        <header className='flex w-full animate-slide-from-down-and-fade-1 flex-col gap-6 px-4'>
            <div className='flex items-center justify-between'>
                <div className='flex items-center gap-4'>
                    <Avatar className='size-14'>
                        <AvatarImage src={CONFIG.avatar} asChild>
                            <Image
                                src={CONFIG.avatar}
                                alt={CONFIG.name + ' avatar'}
                                width={56}
                                height={56}
                                priority={true}
                            />
                        </AvatarImage>
                        <AvatarFallback>
                            {getInitials(CONFIG.name)}
                        </AvatarFallback>
                    </Avatar>
                    <div>
                        <h1 className='font-semibold'>{CONFIG.name}</h1>
                        <p className='mt-0.5 text-sm text-muted-foreground'>
                            {CONFIG.title}
                        </p>
                    </div>
                </div>
                <ModeToggle />
            </div>
            <div className='flex items-center gap-2'>
                <TooltipProvider delayDuration={70}>
                    {CONFIG.socials.map((social, idx) => {
                        const Icon = Icons[social.icon]
                        return (
                            <Tooltip key={idx}>
                                <TooltipTrigger asChild>
                                    <Link
                                        href={social.url}
                                        target='_blank'
                                        aria-label={social.name}
                                        className={cn(
                                            buttonVariants({
                                                variant: 'outline',
                                            }),
                                            'size-8 bg-transparent p-0 text-muted-foreground transition-colors duration-200 hover:text-foreground md:size-10'
                                        )}
                                    >
                                        <Icon className='size-5 md:size-6' />
                                    </Link>
                                </TooltipTrigger>
                                <TooltipContent
                                    side='bottom'
                                    className='bg-transparent text-xs'
                                >
                                    {social.name}
                                </TooltipContent>
                            </Tooltip>
                        )
                    })}
                    {CONFIG.calendarLink && (
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Link
                                    href={'https://cal.com/naderferjani/15'}
                                    target='_blank'
                                    aria-label='Schedule a call'
                                    className={cn(
                                        buttonVariants({
                                            variant: 'outline',
                                            size: 'sm',
                                        }),
                                        'bg-transparent text-xs text-muted-foreground transition-colors duration-200 hover:text-foreground md:text-sm'
                                    )}
                                >
                                    Schedule call
                                </Link>
                            </TooltipTrigger>
                            <TooltipContent
                                side='bottom'
                                className='bg-transparent text-xs'
                            >
                                {'cal.com'}
                            </TooltipContent>
                        </Tooltip>
                    )}
                </TooltipProvider>
            </div>
        </header>
    )
}

export default Header
