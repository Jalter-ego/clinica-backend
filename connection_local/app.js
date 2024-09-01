import express, { json } from 'express' // require -> commonJS
import { usuarioRouter } from './routes/usuarios.js'

const app = express()
app.use(json())
app.disable('x-powered-by')


app.use('/usuarios', usuarioRouter)

const PORT = process.env.PORT ?? 1234

app.listen(PORT, () => {
    console.log(`server listening on port http://localhost:${PORT}`)
})