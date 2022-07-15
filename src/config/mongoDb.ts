import mongoose from 'mongoose'

mongoose.connect(process.env.DB_URL)

const db = mongoose.connection

db.on('error', error => console.error(error))

export default db