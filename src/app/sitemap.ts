import { CONFIG } from '@/config'

export default async function sitemap() {
    const url = new URL(CONFIG.siteUrl).origin

    const routes = ['', '/projects'].map((route) => ({
        url: `${url}${route}`,
        lastModified: new Date().toISOString(),
    }))

    return [...routes]
}
