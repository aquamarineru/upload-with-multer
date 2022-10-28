import express from 'express';

const app = express()
const port = process.env.PORT || 8080

app.listen(port, () => console.log(`The magic happens on port ${port}`));