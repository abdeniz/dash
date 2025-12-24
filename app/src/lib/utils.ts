import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import type { ClassValue } from "clsx"

export function cn(...inputs: Array<ClassValue>) {
  return twMerge(clsx(inputs))
}

export const megabytesToGigabytes = (mb: number) => {
  return mb / 1024
}

export const bytesToMegabytes = (b: number) => b / 1024 / 1024
