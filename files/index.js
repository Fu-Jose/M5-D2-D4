import express from 'express';
import { writeStudentsPictures, writeProjectsPictures, readStudentsPictures ,readProjectsPictures } from '../src/lib/fs-tools.js'
import multer from 'multer'
// import { pipeline } from 'stream'
// import { zlib } from 'zlib'

const router = express.Router()

router.post("/upload", multer().single("profilePic"), async (req, res, next) => {
    try {
      await writeStudentsPictures(req.file.originalname, req.file.buffer)
      res.send("ok")
    } catch (error) {
      console.log(error)
    }
  })


export default router