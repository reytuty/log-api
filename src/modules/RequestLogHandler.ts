import { QueueRequestLog, ISaverClass } from "./QueueRequestLog";

import { Result } from "./Result"

import { LogSave } from './saver/log'

type QueueItem = {
    pathSubject:string, jsonString:string
}
export class RequestLogHandler implements ISaverClass{
    queueHandler : QueueRequestLog;
    queueItems: QueueItem[];
    index:number;
    constructor(){
        this.index = 0;
        this.queueItems = [] ;
        const logSave = new LogSave();
        this.queueHandler = new QueueRequestLog([
            logSave.save
        ]);
    }
    addQueue(pathSubject:string, jsonString:string):number{
        this.queueItems.push({pathSubject, jsonString});
        return this.index++;
    }
    save(pathSubject:string, jsonString:string): Promise<Result>{
        return this.queueHandler.save( pathSubject, jsonString) ;
    }
}