import Header from '@/components/header'
import { CONFIG } from '@/config'

export default function Home() {
    return (
        <main className='mx-auto flex max-w-2xl flex-col items-center gap-8 px-4 pt-4 md:pt-10'>
            <Header />
            <div className='animate-slide-from-down-and-fade-2 space-y-2'>
                <h2 className='font-semibold'>About me</h2>
                <p className='leading-6 text-muted-foreground'>
                    {CONFIG.description}
                </p>
            </div>
        </main>
    )
}
