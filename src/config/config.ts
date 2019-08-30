import dotenv from 'dotenv'

dotenv.config({ path: '.env' })

export interface IConfig {
    port: number
    debugLogging: boolean
    databaseUrl: string
}

export const config: IConfig = {
    port: +process.env.PORT || 3000,
    debugLogging: process.env.NODE_ENV == 'development',
    databaseUrl: process.env.DATABASE_URL
}