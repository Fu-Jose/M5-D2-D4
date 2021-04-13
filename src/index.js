import express from "express"
import fs from "fs"
import { fileURLToPath } from "url" 
import { dirname, join } from "path"
import uniqid from "uniqid"

const router = express.Router()
const filename = fileURLToPath(import.meta.url)
const studentsJSONPath = join(dirname(filename), "students.json")

router.get("/", (req, res) => {
    console.log("GET Ok")
    const fileAsABuffer = fs.readFileSync(studentsJSONPath)
    const fileAsAString = fileAsABuffer.toString()
    const fileAsAJSON = JSON.parse(fileAsAString)
    res.send(fileAsAJSON)
})

router.get("/:id", (req, res) => {

})

router.post("/", (req, res) => {

})

router.put("/:id", (req, res) => {
    
})

router.delete("/:id", (req, res) => {
    
})

export default router