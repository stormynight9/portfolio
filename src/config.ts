import { Icons } from '@/components/icons'

type Config = {
    name: string
    avatar: string
    title: string
    socials: {
        name: string
        url: string
        icon: keyof typeof Icons
    }[]
}

export const CONFIG: Config = {
    name: 'Nader Ferjani',
    avatar: 'https://github.com/stormynight9.png',
    title: 'Software Engineer',
    socials: [
        {
            name: 'GitHub',
            url: 'https://github.com/stormynight9',
            icon: 'github',
        },
        {
            name: 'LinkedIn',
            url: 'https://www.linkedin.com/in/nader-ferjani/',
            icon: 'linkedin',
        },
        {
            name: 'X',
            url: 'https://x.com/Naderferjani',
            icon: 'x',
        },
        {
            name: 'ferjani.nader@hotmail.fr',
            url: 'mailto:ferjani.nader@hotmail.fr',
            icon: 'email',
        },
    ],
}
