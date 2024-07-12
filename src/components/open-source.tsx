import { StarsChart } from '@/components/stars-chart'
import { CONFIG } from '@/config'

interface RepoDetails {
    stargazers_count: number
}

interface Stargazer {
    starred_at: string
}

async function getStargazersCount(repo: string): Promise<number> {
    const url = `https://api.github.com/repos/${repo}`
    const response = await fetch(url, {
        headers: {
            Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        },
    })
    const data: RepoDetails = await response.json()
    return data.stargazers_count
}

async function fetchStargazersPage(
    repo: string,
    page: number
): Promise<Stargazer[]> {
    const url = `https://api.github.com/repos/${repo}/stargazers?per_page=100&page=${page}`
    const response = await fetch(url, {
        headers: {
            Accept: 'application/vnd.github.v3.star+json',
            Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        },
    })
    const data: Stargazer[] = await response.json()
    return data
}

async function getAllStargazers(repo: string): Promise<string[]> {
    const stargazersCount = await getStargazersCount(repo)
    const totalPages = Math.ceil(stargazersCount / 100)
    let allStarredAtDates: string[] = []

    for (let page = 1; page <= totalPages; page++) {
        const stargazers = await fetchStargazersPage(repo, page)
        const starredAtDates = stargazers.map(
            (stargazer) => stargazer.starred_at
        )
        allStarredAtDates = allStarredAtDates.concat(starredAtDates)
    }

    return allStarredAtDates
}
type TransformedEntry = {
    month: string
    count: number
}
export const transformData = (timestamps: string[]): TransformedEntry[] => {
    const monthNames = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
    ]
    const lastEntries: { [key: string]: number } = {}
    let lastIndexForMonth: { [key: string]: number } = {}

    timestamps.forEach((timestamp, index) => {
        const date = new Date(timestamp)
        const month = date.getUTCMonth()
        const year = date.getUTCFullYear()
        const monthYear = `${monthNames[month]}/${year.toString().slice(2, 4)}`

        lastIndexForMonth[monthYear] = index + 1
    })

    Object.keys(lastIndexForMonth).forEach((monthYear) => {
        lastEntries[monthYear] = lastIndexForMonth[monthYear]
    })

    return Object.keys(lastEntries).map((monthYear) => ({
        month: monthYear,
        count: lastEntries[monthYear],
    }))
}

const OpenSource = async () => {
    return (
        <div className='animate-slide-from-down-and-fade-2 space-y-2 px-4'>
            <h2 className='font-semibold'>Open source journey</h2>
            <p className='text-muted-foreground'>
                {CONFIG.openSource?.description}
            </p>

            <div className='divide-y divide-solid'>
                {CONFIG.openSource?.projects?.map(async (project, idx) => (
                    <div key={idx} className='py-4'>
                        <StarsChart
                            data={transformData(
                                await getAllStargazers(project.repository)
                            )}
                            title={project.title}
                            description={project.description}
                            link={project.link}
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default OpenSource
