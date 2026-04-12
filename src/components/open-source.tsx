import { StarsChart } from '@/components/stars-chart'
import { Separator } from '@/components/ui/separator'
import { CONFIG } from '@/config'
import React from 'react'

interface RepoDetails {
    stargazers_count: number
}

interface Stargazer {
    starred_at: string
}

const fetchOptions = {
    headers: {
        Accept: 'application/vnd.github.v3.star+json',
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
    },
    next: { revalidate: 3600 },
} as const

async function getStargazersCount(repo: string): Promise<number> {
    const response = await fetch(
        `https://api.github.com/repos/${repo}`,
        fetchOptions
    )
    const data: RepoDetails = await response.json()
    return data.stargazers_count
}

async function fetchStargazersPage(
    repo: string,
    page: number
): Promise<Stargazer[]> {
    const url = `https://api.github.com/repos/${repo}/stargazers?per_page=100&page=${page}`
    const response = await fetch(url, fetchOptions)
    return response.json()
}

async function getAllStargazers(repo: string): Promise<string[]> {
    const stargazersCount = await getStargazersCount(repo)
    const totalPages = Math.ceil(stargazersCount / 100)

    // Fetch all pages in parallel
    const pages = await Promise.all(
        Array.from({ length: totalPages }, (_, i) =>
            fetchStargazersPage(repo, i + 1)
        )
    )

    return pages.flat().map((s) => s.starred_at)
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
    const lastIndexForMonth: { [key: string]: number } = {}

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
    // Resolve all project data before rendering
    const projectsData = await Promise.all(
        CONFIG.openSource?.projects?.map(async (project) => ({
            ...project,
            chartData: transformData(
                await getAllStargazers(project.repository)
            ),
        })) ?? []
    )

    return (
        <div className='animate-slide-from-down-and-fade-2 space-y-2 px-4'>
            <h2>Open source journey</h2>
            <p className='text-muted-foreground max-w-[65ch] leading-relaxed'>
                {CONFIG.openSource?.description}
            </p>

            <div className='flex flex-col gap-7'>
                {projectsData.map((project, idx, array) => (
                    <React.Fragment key={project.repository}>
                        <StarsChart
                            data={project.chartData}
                            title={project.title}
                            description={project.description}
                            link={project.link}
                        />
                        {idx < array.length - 1 && (
                            <Separator className='mx-auto max-w-96' />
                        )}
                    </React.Fragment>
                ))}
            </div>
        </div>
    )
}

export default OpenSource
