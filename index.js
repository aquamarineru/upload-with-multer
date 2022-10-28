import dotenv from 'dotenv';
import express from 'express';
import multer from 'multer';
import path from 'path';

const app = express()
const port = process.env.PORT || 8080

const storage = multer.diskStorage({
    destination: "./uploads",
 // cb function stores the images 1 argument = null,  2 argument: acutal destination Images = folder
    filename: (req, file, cb) =>{ 
         //to create a unique filename
         cb(null, `${file.originalname}-${Date.now()}-${extension}`)
    }
})
const upload = multer({storage});  // or const upload = multer({dest: "uploads/"}); 
/* const upload = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./public/images")
    }, // cb function stores the images 1 argument = null,  2 argument: acutal destination Images = folder
    filename: (req, file, cb) =>{ 
         //to create a unique filename
    }
}) */
app.use(express.static('views'))


//Creating route
app.post("/upload-profile-pic", upload.single('profile_pic'), (req, res) =>{
    console.log(req.file)
    if(!req.file){ 
        return res.status(400).send("Image could not be uploaded")
    }
    return res.status(200).send(`<h2>Here is the picture:</h2><img src=”${req.file.filename}” alt=”something”/>`)
})
app.listen(port, () => console.log(`The magic happens on port ${port}`));