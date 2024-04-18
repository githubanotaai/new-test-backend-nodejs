import express from 'express'
import { MongoConnectDatabase } from './database/connection.js'

const app = express()

const port = process.env.PORT || 8080

app.use(express.json())

const connectionDatabase = new MongoConnectDatabase()

connectionDatabase.main()
    .then(() => {
        console.log('Connection sucessfully')
    })
    .catch((e) => {
        console.error('Database error', e)
    })


app.get('/', (request, reponse) => {
    reponse.json({
        message: "Server Running"
    })
})

app.listen(port, () => {
    console.log(`Server running at port http://localhost:${port}`)
})