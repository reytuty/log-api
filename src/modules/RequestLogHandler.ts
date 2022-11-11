import { QueueRequestLog, ISaverClass } from "./QueueRequestLog";

import { Result } from "./Result"

import { LogSave } from './saver/log'
import { DbSave } from './saver/db'
import { DbAuditSave } from './saver/dbAudits'
import { FileSave } from "./saver/file";

type QueueItem = {
    pathSubject:string, jsonString:string
}
export type ConfigRequestHandler = {
    folderLog:string,
};
export class RequestLogHandler implements ISaverClass{
    queueHandler : QueueRequestLog;
    index:number;
    constructor(config:ConfigRequestHandler){
        this.index = 0;
        const logSave = new LogSave();
        const dbSave = new DbSave();
        const dbAudit = new DbAuditSave();
        const fileSave = new FileSave(config.folderLog);
        this.queueHandler = new QueueRequestLog([
            fileSave.save,
            dbSave.save,
            dbAudit.save,
        ]);
    }
    save(pathSubject:string, jsonString:string): Promise<Result>{
        return this.queueHandler.save( pathSubject, jsonString) ;
    }
}