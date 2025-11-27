'use client'

import { Icons } from '@/components/icons'
import { Button } from '@/components/ui/button'
import { useTheme } from 'next-themes'

export function ModeToggle() {
    const { setTheme, theme } = useTheme()

    return (
        <Button
            variant='outline'
            size='icon-sm'
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        >
            <Icons.sun className='z scale-100 dark:scale-0' />
            <Icons.moon className='absolute scale-0 rotate-90 dark:scale-100 dark:rotate-0' />
            <span className='sr-only'>Toggle theme</span>
        </Button>
    )
}
