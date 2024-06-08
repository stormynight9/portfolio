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
    description: string | JSX.Element
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
            name: 'Upwork',
            url: 'https://www.upwork.com/freelancers/~0108a6d64ff5b64440',
            icon: 'upwork',
        },
        {
            name: 'ferjani.nader@hotmail.fr',
            url: 'mailto:ferjani.nader@hotmail.fr',
            icon: 'email',
        },
    ],
    description: (
        <>
            Hi, I&apos;m Nader from Tunisia. I&apos;m currently a Full-stack
            developer at{' '}
            <a
                href='https://hi-interns.com/'
                target='_blank'
                className='whitespace-nowrap font-medium text-foreground'
            >
                Hi Interns
            </a>
            . I love building websites with good UI/UX, and I&apos;m also
            passionate about new technologies, open-source software, and
            contributing to the community.
            {/* TODO: Add this to contact form? */}
            {/* <br />
            <br />
            Feel free to reach out if you want to collaborate on a project, have
            a question, or just want to connect. */}
        </>
    ),
}
