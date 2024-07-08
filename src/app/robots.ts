import { CONFIG } from '@/config'
import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
        },
        sitemap: `${new URL(CONFIG.siteUrl).origin}/sitemap.xml`,
    }
}
