import { CONFIG } from '@/config'
import { cn } from '@/lib/utils'
import { HighlightInit } from '@highlight-run/next/client'
import { Analytics } from '@vercel/analytics/react'
import type { Metadata } from 'next'
import { Inter as FontSans } from 'next/font/google'
import './globals.css'
import Contact from '@/components/contact'
import { GoogleAnalytics } from '@next/third-parties/google'

const fontSans = FontSans({
    subsets: ['latin'],
    variable: '--font-sans',
})

export const metadata: Metadata = {
    metadataBase: new URL(CONFIG.siteUrl),
    title: {
        default: CONFIG.name,
        template: `${CONFIG.name} | %s`,
    },
    description: CONFIG.descriptionRaw,
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <>
            {process.env.NODE_ENV === 'production' && (
                <HighlightInit
                    projectId={'ng2wmv0g'}
                    serviceName='my-nextjs-frontend'
                    tracingOrigins
                    networkRecording={{
                        enabled: true,
                        recordHeadersAndBody: true,
                        urlBlocklist: [],
                    }}
                />
            )}
            <html lang='en'>
                <head>
                    <meta
                        name='google-site-verification'
                        content='kMkiYVJqqIhu8LsCDe8BTV0Juty1tXWM9ur8S3_eENg'
                    />
                </head>
                <body
                    className={cn(
                        'bg-background dark min-h-screen font-sans antialiased',
                        fontSans.variable
                    )}
                >
                    {process.env.NODE_ENV === 'production' && (
                        <GoogleAnalytics gaId='G-32FLEBL3F6' />
                    )}
                    <Analytics />
                    <main className='mx-auto max-w-3xl py-4 md:pt-10'>
                        {children}
                        <Contact />
                    </main>
                </body>
            </html>
        </>
    )
}
