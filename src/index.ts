import * as dotenv from 'dotenv';
dotenv.config();
import express from 'express'
import { Router, Request, Response } from 'express'
import { QueueRequestLogHanbler } from './modules/QueueRequestLogHandler';
import { RequestLogHandler, ConfigRequestHandler } from './modules/RequestLogHandler';
import { AppDataSource } from "./data-source"

const config = {
    frequency: process.env.FREQUENCY_HANDLER || '100',
    asyncMode: ( process.env.ASYNC_MODE == 'true' ),
    folderLog: process.env.FOLDER_LOG || './data/'
}
AppDataSource.initialize().then(async () => {
    console.log('db connected')
}).catch(error => {
    console.log(error)
});

const requestLogHandler = new RequestLogHandler(config);
const queueHandler = new QueueRequestLogHanbler(requestLogHandler, parseInt(config.frequency, 10), config.asyncMode )
const app = express();
const route = Router();

app.use(express.json());

route.post('/save', async (req:Request, res: Response)=>{
    const subject: string = req.body?.subject || req.params?.subject;
    const data: string = ( req.body?.data ) ?  JSON.stringify( req.body.data ) : req.params?.data;
    let result = await queueHandler.save(subject, data ) ;
    res.send(result)
});

app.use(route);

const serverPort = process.env.ENDPOINT_PORT || 8181;
app.listen(serverPort, ()=> `server running ${serverPort} `)