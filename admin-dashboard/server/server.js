import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { connectDB } from './config/connectDB.js';
import { typeDefs } from './graphql/typeDefs.js';
import { resolvers } from './graphql/resolvers.js';

dotenv.config();

const port = process.env.PORT || 3000;
const app = express();

//server configuration
app.use(cors({
    origin: [process.env.ADMIN_FRONTEND, process.env.PORTFOLIO_FRONTEND],
    credentials: true
}));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

const apolloServer = new ApolloServer({
    typeDefs: typeDefs,
    resolvers: resolvers
});

// entry point
app.get('/', (req, res) => {
    res.status(200).json({message: "Welcome to the Admin Dashboard of your portfolio."});
})

connectDB()
.then( async () => {
    await apolloServer.start();
    app.use('/graphql', expressMiddleware(apolloServer, {
        context: async ({req, res}) => ({req, res})
    }));
})
.then(
    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    })
)
.catch((error) => {
    console.log(error);
})