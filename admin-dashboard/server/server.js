import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/connectDB.js';

dotenv.config();

const app = express();
const port = 3000 || process.env.PORT;

connectDB()
.then(
    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    })
)
.catch((error) => {
    console.log(error);
})