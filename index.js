import express from 'express';
import multer from 'multer';

const app = express()
const port = process.env.PORT || 8080

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./public/images")
    }, // cb function stores the images 1 argument = null,  2 argument: acutal destination Images = folder
    filename: (req, file, cb) =>{ 
        cb(null, Date.now() + '--' + (file.originalname)) //to create a unique filename
    }
})

const upload = multer({storage: storage});

app.listen(port, () => console.log(`The magic happens on port ${port}`));