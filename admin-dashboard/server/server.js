import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { connectDB } from './config/connectDB.js';
import adminRouter from './routes/admin.routes.js';
import viewRouter from './routes/view.routes.js';

dotenv.config();

const app = express();
const port = 3000 || process.env.PORT;

//server configuration
app.use(cors());
app.use(cookieParser());

//router
app.use('/view', viewRouter);
app.use('/admin', adminRouter);

app.get('/', (req, res) => {
    res.status(200).json({message: "Welcome to Admin Dashboard of your portfolio."});
})

connectDB()
.then(
    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    })
)
.catch((error) => {
    console.log(error);
})