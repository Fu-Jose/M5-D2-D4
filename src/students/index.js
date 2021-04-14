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
    console.log("GET ID OK")
    const fileAsABuffer = fs.readFileSync(studentsJSONPath)
    const fileAsAString = fileAsABuffer.toString()
    const students = JSON.parse(fileAsAString)
    const student = students.find(s => s.ID === req.params.id)
    res.send(student)
})

router.post("/", (req, res) => {
    const fileAsABuffer = fs.readFileSync(studentsJSONPath)
    const fileAsAString = fileAsABuffer.toString()
    const students = JSON.parse(fileAsAString)
    const newStudent = req.body
    newStudent.ID = uniqid()
    students.push(newStudent)
    fs.writeFileSync(studentsJSONPath, JSON.stringify(students))
    res.status(201).send({ id: newStudent.ID })
})

router.put("/:id", (req, res) => {
    const fileAsABuffer = fs.readFileSync(studentsJSONPath)
    const fileAsAString = fileAsABuffer.toString()
    const students = JSON.parse(fileAsAString)
    const newStudent = students.filter(s => s.ID !== req.params.id)
    const modifiedStudent = req.body
    modifiedStudent.ID = req.params.id
    newStudent.push(modifiedStudent)
    fs.writeFileSync(studentsJSONPath, JSON.stringify(newStudent))
    res.send("IS THIS WORKING?")
})

router.delete("/:id", (req, res) => {
    const fileAsABuffer = fs.readFileSync(studentsJSONPath)
    const fileAsAString = fileAsABuffer.toString()
    const students = JSON.parse(fileAsAString)
    const newStudent = students.filter(s=>s.ID !== req.params.id)
    fs.writeFileSync(studentsJSONPath, JSON.stringify(newStudent))
    res.send("DELETE?")
})

export default router