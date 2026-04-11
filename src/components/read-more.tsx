'use client'

import { cn } from '@/lib/utils'
import { useId, useState, type KeyboardEvent } from 'react'

interface ReadMoreProps {
    text: string
    amountOfWords?: number
}

export const ReadMore = ({ text, amountOfWords = 36 }: ReadMoreProps) => {
    const contentId = useId()
    const [isExpanded, setIsExpanded] = useState(false)
    const splittedText = text.split(' ')
    const itCanOverflow = splittedText.length > amountOfWords
    const beginText = itCanOverflow
        ? splittedText.slice(0, amountOfWords - 1).join(' ')
        : text
    const endText = splittedText.slice(amountOfWords - 1).join(' ')

    const handleKeyboard = (e: KeyboardEvent<HTMLSpanElement>) => {
        if (e.code === 'Space' || e.code === 'Enter') {
            setIsExpanded(!isExpanded)
        }
    }

    return (
        <p id={contentId}>
            {beginText}
            {itCanOverflow && (
                <>
                    {!isExpanded && <span>...</span>}
                    <span
                        className={cn(!isExpanded && 'hidden')}
                        aria-hidden={!isExpanded}
                    >
                        {' '}
                        {endText}
                    </span>
                    <span
                        className='ml-2 cursor-pointer text-foreground hover:underline'
                        role='button'
                        tabIndex={0}
                        aria-expanded={isExpanded}
                        aria-controls={contentId}
                        onKeyDown={handleKeyboard}
                        onClick={() => setIsExpanded(!isExpanded)}
                    >
                        {isExpanded ? 'show less' : 'show more'}
                    </span>
                </>
            )}
        </p>
    )
}
