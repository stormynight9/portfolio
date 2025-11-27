'use client'

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
import { useEffect, useState } from 'react'

const Header = () => {
    const [copiedEmail, setCopiedEmail] = useState(false)
    const [emailTooltipOpen, setEmailTooltipOpen] = useState(false)

    // Extract email from socials
    const emailSocial = CONFIG.socials.find((social) => social.icon === 'email')
    const emailAddress = emailSocial?.url.replace('mailto:', '') || ''

    useEffect(() => {
        if (copiedEmail) {
            setEmailTooltipOpen(true)
            const timer = setTimeout(() => {
                setEmailTooltipOpen(false)
            }, 2500)
            const timer2 = setTimeout(() => {
                setCopiedEmail(false)
            }, 2800)
            return () => {
                clearTimeout(timer)
                clearTimeout(timer2)
            }
        }
    }, [copiedEmail])

    const handleEmailClick = async (e: React.MouseEvent) => {
        e.preventDefault()
        try {
            await navigator.clipboard.writeText(emailAddress)
            setCopiedEmail(true)
            setEmailTooltipOpen(true)
        } catch (err) {
            console.error('Failed to copy email:', err)
        }
    }

    return (
        <header className='animate-slide-from-down-and-fade-1 flex w-full flex-col gap-6 px-4'>
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
                        <p className='text-muted-foreground mt-0.5 text-sm'>
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
                        const isEmail = social.icon === 'email'
                        const showCheck = isEmail && copiedEmail
                        const CheckIcon = Icons.check

                        return (
                            <Tooltip
                                key={idx}
                                open={
                                    isEmail && copiedEmail
                                        ? emailTooltipOpen
                                        : undefined
                                }
                                onOpenChange={(open) => {
                                    if (isEmail) {
                                        // Keep tooltip open if email is copied
                                        if (copiedEmail && !open) {
                                            return
                                        }
                                        // Only control state when copied, otherwise let it behave normally
                                        if (copiedEmail) {
                                            setEmailTooltipOpen(open)
                                        }
                                    }
                                }}
                            >
                                <TooltipTrigger asChild>
                                    {isEmail ? (
                                        <button
                                            onClick={handleEmailClick}
                                            aria-label={social.name}
                                            className={cn(
                                                buttonVariants({
                                                    variant: 'outline',
                                                    size: 'icon-sm',
                                                })
                                            )}
                                        >
                                            {showCheck ? (
                                                <CheckIcon />
                                            ) : (
                                                <Icon />
                                            )}
                                        </button>
                                    ) : (
                                        <Link
                                            href={social.url}
                                            target='_blank'
                                            aria-label={social.name}
                                            className={cn(
                                                buttonVariants({
                                                    variant: 'outline',
                                                    size: 'icon-sm',
                                                })
                                            )}
                                        >
                                            <Icon />
                                        </Link>
                                    )}
                                </TooltipTrigger>
                                <TooltipContent>
                                    {isEmail && copiedEmail
                                        ? 'Copied'
                                        : social.name}
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
                                    aria-label='Book a call'
                                    className={cn(
                                        buttonVariants({
                                            variant: 'outline',
                                            size: 'sm',
                                        })
                                    )}
                                >
                                    Book a call
                                </Link>
                            </TooltipTrigger>
                            <TooltipContent>cal.com</TooltipContent>
                        </Tooltip>
                    )}
                </TooltipProvider>
            </div>
        </header>
    )
}

export default Header
