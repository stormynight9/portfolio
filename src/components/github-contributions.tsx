import { GitHubContributionsClient } from '@/components/github-contributions-client'
import { CONFIG } from '@/config'
import { unstable_cache } from 'next/cache'
import type { Activity } from 'react-activity-calendar'

type ApiResponse = {
    total: Record<string, number>
    contributions: Array<{
        date: string
        count: number
        level: 0 | 1 | 2 | 3 | 4
    }>
}

type ApiErrorResponse = {
    error: string
}

const getCachedContributions = unstable_cache(
    async (username: string, year: string | number = 'last') => {
        const apiUrl = 'https://github-contributions-api.jogruber.de/v4/'
        const response = await fetch(`${apiUrl}${username}?y=${String(year)}`, {
            next: { revalidate: 60 * 60 }, // Cache for 1 hour
        })

        if (!response.ok) {
            const errorData = (await response.json()) as ApiErrorResponse
            throw new Error(
                `Fetching GitHub contribution data for "${username}" failed: ${errorData.error}`
            )
        }

        const data = (await response.json()) as ApiResponse
        return data
    },
    ['github-contributions'],
    { revalidate: 60 * 60 } // Revalidate every hour
)

const GitHubContributions = async () => {
    const year = 'last' // Show last year by default
    let data: ApiResponse | null = null
    let error: Error | null = null

    try {
        data = await getCachedContributions(CONFIG.githubUsername, year)
    } catch (err) {
        error = err instanceof Error ? err : new Error('Unknown error')
        console.error('Failed to fetch GitHub contributions:', error)
    }

    // Transform API response to react-activity-calendar format
    const activities: Activity[] = data
        ? data.contributions.map((contribution) => ({
              date: contribution.date,
              count: contribution.count,
              level: contribution.level,
          }))
        : []

    const currentYear = new Date().getFullYear()
    const total = data
        ? data.total[String(currentYear)] || data.total.lastYear || 0
        : 0

    return (
        <div className='animate-slide-from-down-and-fade-2 space-y-4 px-4'>
            <div className='space-y-2'>
                <h2 className='font-semibold'>GitHub Activity</h2>
                <p className='text-muted-foreground'>
                    My contribution graph from GitHub, showing daily coding
                    activity throughout the year.
                </p>
            </div>

            {error ? (
                <p className='text-muted-foreground text-sm'>
                    Unable to load contribution data at this time.
                </p>
            ) : (
                <div className='flex overflow-x-auto'>
                    <GitHubContributionsClient data={activities} year={year} />
                </div>
            )}
        </div>
    )
}

export default GitHubContributions
