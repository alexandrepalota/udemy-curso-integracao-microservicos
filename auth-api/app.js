import express from "express"

import * as db from "./src/config/db/initialData.js"
import userRoutes from "./src/modules/user/routes/UserRoutes.js"
import checkToken from "./src/config/auth/checkToken.js"

const app = express();
const env = process.env
const PORT = env.PORT || 8080

db.createInitialData()

app.use(express.json()) // para que a aplicação possa fazer o parse dos json
app.use(userRoutes) // informa à aplicação que vamos usar o arquivo de rotas
app.use(checkToken) // para que a aplicação utilize o middleware que verifica o jwt. Como o userRoutes estão ANTES do middleware, não necessitam token. O que estiver abaixo dessa linha, precisa.

app.get('/api/status', (req, res) => {
    return res.status(200).json({
        service: 'Auth-API',
        status: "up",
        httpStatus: 200
    })
})

app.listen(PORT, () => {
    console.info(`Server started successfully at port ${PORT}`)
})