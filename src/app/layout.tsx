import { ThemeProvider } from '@/components/theme-provider'
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
            <html lang='en' suppressHydrationWarning>
                <head>
                    <meta
                        name='google-site-verification'
                        content='kMkiYVJqqIhu8LsCDe8BTV0Juty1tXWM9ur8S3_eENg'
                    />
                </head>
                <body
                    className={cn(
                        'min-h-screen bg-background from-[#43434330] via-[#32323230] via-25% font-sans antialiased dark:bg-gradient-to-b',
                        fontSans.variable
                    )}
                >
                    {process.env.NODE_ENV === 'production' && (
                        <GoogleAnalytics gaId='G-32FLEBL3F6' />
                    )}
                    <Analytics />
                    <ThemeProvider
                        attribute='class'
                        defaultTheme='dark'
                        enableSystem
                        disableTransitionOnChange
                    >
                        <main className='mx-auto max-w-2xl py-4 md:pt-10'>
                            {children}
                            <Contact />
                        </main>
                    </ThemeProvider>
                </body>
            </html>
        </>
    )
}
