import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const megabytesToGigabytes = (mb: number) => {
  return mb / 1024
}

export const bytesToMegabytes = (b: number) => b / 1024 / 1024
