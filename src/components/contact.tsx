import { CONFIG } from '@/config'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { Icons } from './icons'
import { buttonVariants } from './ui/button'
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from './ui/tooltip'

const Contact = () => {
    return (
        <footer className='mt-12 px-4 pb-20'>
            <h2 className='font-semibold'>Get in touch</h2>
            <p className='text-muted-foreground leading-6'>
                Feel free to reach out if you want to collaborate on a project,
                have a question, or just want to connect.
            </p>
            <div className='mt-6 flex flex-col items-center justify-center gap-6'>
                <TooltipProvider delayDuration={70}>
                    <div className='flex items-center justify-center gap-6'>
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
                                                    variant: 'ghost',
                                                    size: 'icon-sm',
                                                })
                                            )}
                                        >
                                            <Icon className='size-4 md:size-5' />
                                        </Link>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        {social.name}
                                    </TooltipContent>
                                </Tooltip>
                            )
                        })}
                    </div>
                    {CONFIG.calendarLink && (
                        <>
                            <p className='text-muted-foreground text-sm'>
                                Or we can book a call directly
                            </p>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Link
                                        href={'https://cal.com/naderferjani/15'}
                                        target='_blank'
                                        className={cn(
                                            buttonVariants({
                                                variant: 'ghost',
                                                size: 'icon-sm',
                                            })
                                        )}
                                    >
                                        Book a call
                                    </Link>
                                </TooltipTrigger>
                                <TooltipContent>cal.com</TooltipContent>
                            </Tooltip>
                        </>
                    )}
                </TooltipProvider>
            </div>
        </footer>
    )
}

export default Contact
