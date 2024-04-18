import express, { response } from 'express'
import { MongoConnectDatabase } from './database/connection.js'
import { OwnerController } from './controller/onwer-controller.js'

const app = express()

const port = process.env.PORT || 8080

app.use(express.json())

const connectionDatabase = new MongoConnectDatabase()
const ownerController = new OwnerController()

connectionDatabase.main()
    .then(() => {
        console.log('Connection sucessfully')
    })
    .catch((e) => {
        console.error('Database error', e)
    })


app.get('/owners', async (request, response) => {

    const owners = await ownerController.getAll(request, response)

    return owners
})

app.post('/owners', async (request, response) => {
    const owners = await ownerController.post(request, response)
    
    return owners
})

app.listen(port, () => {
    console.log(`Server running at port http://localhost:${port}`)
})