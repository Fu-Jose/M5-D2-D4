import express from 'express'
import cors from 'cors'
import studentsRoutes from "./students/index.js"
import projectsRoutes from "./projects/index.js"
import filesRoutes from "../files/index.js"
import listEndpoints from 'express-list-endpoints'
import { badRequestErrorHandler, notFoundErrorHandler, forbiddenErrorHandler, catchAllErrorHandler } from "./errorHandling.js"
const server = express()
const port = 3001

server.use(cors())
server.use(express.json())
server.use("/students", studentsRoutes)
server.use("/projects", projectsRoutes)
server.use("files", filesRoutes)

server.use(badRequestErrorHandler)
server.use(notFoundErrorHandler)
server.use(forbiddenErrorHandler)
server.use(catchAllErrorHandler)

console.log(listEndpoints(server))
server.listen(port, () => {
    console.log("Server online", port)
})