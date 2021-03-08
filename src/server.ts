import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import depthLimit from 'graphql-depth-limit';
import {createServer} from 'http';
import compression from 'compression';
import cors from 'cors';
import schema from './schema';
import {sequelize} from './models';

const app = express();
const server = new ApolloServer({
    schema,
    validationRules: [depthLimit(7)],
    context:({req}:Express.Request & any) => ({
        auth:(req.headers.authorization?.substr(7))
    })
});

app.use('*',cors());
app.use(compression());

server.applyMiddleware({app, path: '/graphql'});



const httpServer = createServer(app);

app.get('/',function(req:express.Request,res:express.Response){
    res.send('hello express')
})
httpServer.listen(
    {port:8000},
     async () =>{
        //  Server connect console log
        console.log(`server Start`)

        // DB connect console log
        await sequelize.authenticate()
        .then( () => {
            console.log("DB connection success")
        })
        .catch((e) => {
            console.log('TT :',e)
        })
    })