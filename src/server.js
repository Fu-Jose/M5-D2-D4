import express from 'express'
import cors from 'cors'
import studentsRoutes from "./index.js"

const server = express()
const port = 3001

server.use(cors())
server.use(express.json())
server.use("/students", studentsRoutes)

server.listen(port, () => {
    console.log("Server online", port)
})