import express from 'express'
import { MongoConnectDatabase } from './database/connection.js'
import { ownersRoute } from './routes/owner-route.js'
import { categoriesRoute } from './routes/categories-route.js'
import { productRoute } from './routes/product-route.js'
import { catalogRoute } from './routes/catalog-route.js'

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

app.use('/api/owners', ownersRoute)
app.use('/api/categories', categoriesRoute)
app.use('/api/products', productRoute)
app.use('/api/catalog', catalogRoute)

app.listen(port, () => {
    console.log(`Server running at port http://localhost:${port}`)
})