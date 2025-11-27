import { ContributionGraphClient } from '@/components/contribution-graph-client'
import type { Activity } from '@/components/kibo-ui/contribution-graph'
import { CONFIG } from '@/config'
import { unstable_cache } from 'next/cache'

type ContributionResponse = {
    total: Record<string, number>
    contributions: Array<{
        date: string
        count: number
        level: number
    }>
}

const getCachedContributions = unstable_cache(
    async () => {
        const url = new URL(
            `/v4/${CONFIG.githubUsername}`,
            'https://github-contributions-api.jogruber.de'
        )
        const response = await fetch(url)
        const data = (await response.json()) as ContributionResponse
        const total = data.total[new Date().getFullYear()]

        return { contributions: data.contributions, total }
    },
    ['github-contributions'],
    { revalidate: 60 * 60 * 24 }
)

const GitHubContributions = async () => {
    const { contributions, total } = await getCachedContributions()

    // Filter contributions to show only the current year
    const currentYear = new Date().getFullYear()
    const yearContributions: Activity[] = contributions.filter(
        (c) => new Date(c.date).getFullYear() === currentYear
    )

    if (yearContributions.length === 0) {
        return null
    }

    return (
        <div className='animate-slide-from-down-and-fade-2 space-y-4 px-4'>
            <div className='space-y-2'>
                <h2 className='font-semibold'>GitHub Activity</h2>
                <p className='text-muted-foreground'>
                    My contribution graph from GitHub, showing daily coding
                    activity throughout the year.
                </p>
            </div>

            <ContributionGraphClient
                data={yearContributions}
                totalCount={total}
            />
        </div>
    )
}

export default GitHubContributions
