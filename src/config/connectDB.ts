import mongoose, { Connection } from 'mongoose'

let cachedConnection: Connection | null = null
export const connectDB = async () => {
    if (cachedConnection) {
        console.log('Using existing connection')
        return cachedConnection
    }

    try {
        const conn = await mongoose.connect(process.env.MONGO_DB_URI as string)
        cachedConnection = conn.connection
        console.log('Connected to DB')
        return cachedConnection
    } catch (error: any) {
        console.log('Error in connecting to DB', error.message)
        throw error
    }
}
