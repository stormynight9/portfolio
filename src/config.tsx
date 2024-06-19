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
    projects: {
        name: string
        icon?: keyof typeof Icons
        image?: string
        description: string
        url: string
        tags: {
            name: string
            icon: keyof typeof Icons
        }[]
        github?: string
        featured: boolean
        testimonial?: string
    }[]
}

export const CONFIG: Config = {
    name: 'Nader Ferjani',
    avatar: '/images/author.jpg',
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
                className='deco whitespace-nowrap font-medium text-foreground underline decoration-muted-foreground underline-offset-2'
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
    projects: [
        {
            name: 'Hi Interns',
            icon: 'hiInterns',
            description:
                'A platform that connects companies with students who are looking for internships.',
            url: 'https://hi-interns.com/',
            tags: [
                { name: 'Astro', icon: 'astro' },
                { name: 'React', icon: 'react' },
                { name: 'TypeScript', icon: 'typescript' },
                { name: 'Tailwind CSS', icon: 'tailwindcss' },
                { name: 'Algolia', icon: 'algolia' },
                { name: 'Remix', icon: 'remix' },
                { name: 'Clerk', icon: 'clerk' },
                { name: 'Drizzle', icon: 'drizzle' },
            ],
            featured: true,
        },
        {
            name: 'Cosmic Coop',
            image: '/images/cosmic-coop.webp',
            description:
                'A website that provides information about the Cosmic Coop game.',
            url: 'https://cosmiccoop.net/',
            tags: [
                { name: 'Astro', icon: 'astro' },
                { name: 'Preact', icon: 'preact' },
                { name: 'Tailwind CSS', icon: 'tailwindcss' },
            ],
            featured: true,
            testimonial:
                'Nader was absolutely amazing with the work he did for me. He truly went above and beyond and was super clear, efficient, and very knowledgeable. He thought about pretty much everything related to the project and even thought outside the box to create solutions to any issues. Truly a 10/10 hire. One of my best hired on Upwork. Will definitely be rehiring on future projects.',
        },
        {
            name: 'SaaSStellar',
            icon: 'saasStellar',
            description:
                'A modern SaaS landing page template with 12 themes, designed to collect emails for a waitlist.',
            url: 'https://cosmiccoop.net/',
            tags: [
                { name: 'Remix', icon: 'remix' },
                { name: 'Tailwind CSS', icon: 'tailwindcss' },
                { name: 'shadcn/ui', icon: 'shadcn' },
            ],
            featured: true,
            github: 'https://github.com/stormynight9/saasstellar',
        },
    ],
}
