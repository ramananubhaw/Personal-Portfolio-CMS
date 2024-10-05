import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { connectDB } from './config/connectDB.js';

import adminRouter from './routes/admin.routes.js'; // to be deleted
import viewRouter from './routes/view.routes.js'; // to be deleted

import { typeDefsDemo } from './graphql/typeDefsDemo.js';
import { resolversDemo } from './graphql/resolversDemo.js';

dotenv.config();

const port = process.env.PORT || 3000;
const app = express();

const apolloServer = new ApolloServer({typeDefs: typeDefsDemo, resolvers: resolversDemo});

//server configuration
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//router (to be deleted)
app.use('/view', viewRouter);
app.use('/admin', adminRouter);

// entry point
app.get('/', (req, res) => {
    res.status(200).json({message: "Welcome to the Admin Dashboard of your portfolio."});
})

connectDB()
.then( async () => {
    await apolloServer.start();
    app.use('/graphql', expressMiddleware(apolloServer));
})
.then(
    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    })
)
.catch((error) => {
    console.log(error);
})