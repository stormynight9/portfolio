'use client'

import { Icons } from '@/components/icons'
import { Button } from '@/components/ui/button'
import { useTheme } from 'next-themes'

export function ModeToggle() {
    const { setTheme, theme } = useTheme()

    return (
        <Button
            variant='outline'
            className='size-10 bg-transparent p-0 text-muted-foreground transition-colors duration-200 hover:text-foreground'
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        >
            <Icons.sun className='size-[1.5rem] rotate-0 scale-100 dark:-rotate-90 dark:scale-0' />
            <Icons.moon className='absolute size-[1.5rem] rotate-90 scale-0 dark:rotate-0 dark:scale-100' />
            <span className='sr-only'>Toggle theme</span>
        </Button>
    )
}
