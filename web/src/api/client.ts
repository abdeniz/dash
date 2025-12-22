import { treaty } from '@elysiajs/eden'
import type { App } from '@server/src/index'

export const app = treaty<App>('http://localhost:3003')
