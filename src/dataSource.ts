import mongoose from 'mongoose'

const appDataSource = mongoose.connect(process.env.MONGODB_URI!, {
    dbName: 'project-AIplatform',
    user: process.env.MONGODB_USERNAME,
    pass: process.env.MONGODB_PASSWORD,
})

export default appDataSource