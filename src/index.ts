import express from 'express'
import { Router, Request, Response } from 'express'
import { QueueRequestLogHanbler } from './modules/QueueRequestLogHandler';
import { RequestLogHandler } from './modules/RequestLogHandler';

const config = {
    frequency: process.env.FREQUENCY_HANDLER || '100',
    asyncMode: ( process.env.ASYNC_MODE == 'true' )
}
const requestLogHandler = new RequestLogHandler();
const queueHandler = new QueueRequestLogHanbler(requestLogHandler, parseInt(config.frequency, 10), config.asyncMode )
const app = express();
const route = Router();

app.use(express.json());

route.get('/save', async (req:Request, res: Response)=>{
    const subject: string = req.body?.subject || req.params?.subject;
    const data: string = ( req.body?.data ) ?  JSON.stringify( req.body.data ) : req.params?.data;
    let result = await queueHandler.save(subject, data ) ;
    res.send(result)
});

app.use(route);

app.listen(8181, ()=> 'server running')