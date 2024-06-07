import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function getInitials(name: string) {
    return name
        .split(' ')
        .map((word) => word[0])
        .join('')
        .slice(0, 2)
}
