import express from 'express'
import { MongoConnectDatabase } from './database/connection.js'
import { CategoryController } from './controller/category-controller.js'
import { ownersRoute } from './routes/owner-route.js'
import { categoriesRoute } from './routes/categories-route.js'

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

app.use('/owners', ownersRoute)
app.use('/categories', categoriesRoute)

app.listen(port, () => {
    console.log(`Server running at port http://localhost:${port}`)
})