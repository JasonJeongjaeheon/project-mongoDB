import config from './configs/environment'
import mongoose from 'mongoose'

const db_url = config.db_url
const db_username = config.db_username
const db_password = config.db_password

const appDataSource = mongoose.connect(db_url!, {
    dbName: 'project-AIplatform',
    user: db_username,
    pass: db_password,
})

export default appDataSource