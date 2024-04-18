import express from 'express'

const app = express()

const port = process.env.PORT || 8080

app.use(express.json())

app.get('/', (request, reponse) => {
    reponse.json({
        message: "Server Running"
    })
})

app.listen(port, () => {
    console.log(`Server running at port http://localhost:${port}`)
})