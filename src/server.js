import express from 'express'
import { MongoConnectDatabase } from './database/connection.js'
import { Owner } from './model/owner.js'

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


app.get('/', async (request, reponse) => {
    const allOwners = await Owner.find()
    console.log(allOwners)

    reponse.json(allOwners)
})

app.listen(port, () => {
    console.log(`Server running at port http://localhost:${port}`)
})