import { QueueRequestLog, ISaverClass } from "./QueueRequestLog";

import { Result } from "./Result";

type QueueItem = {
    pathSubject:string, jsonString:string
}
export class QueueRequestLogHanbler implements ISaverClass{
    handler : ISaverClass;
    queueItems: QueueItem[];
    index:number;
    intervalIndex: NodeJS.Timer;
    working: boolean;
    asyncMode : boolean;
    constructor(handler: ISaverClass, frequencyToHandler:number = 100, asyncMode:boolean = true){
        this.index = 0;
        this.working = false;
        this.queueItems = [] ;
        this.handler = handler;
        this.intervalIndex = setInterval(()=>{this.handlerItem()}, frequencyToHandler) ;
        this.asyncMode = asyncMode;
    }
    async save(pathSubject:string, jsonString:string): Promise<Result>{
        const result = new Result();
        if(!pathSubject || !jsonString){
            result.messages.push('empty message');
            return result;
        }
        result.result = this.index++;
        result.success = true;
        result.messages.push('inserted into queue');
        this.queueItems.push({pathSubject, jsonString});
        return result;
    }
    handlerItem():void{
        if(this.working || !this.queueItems || this.queueItems.length == 0){
            return;
        }
        //save it is working
        this.working = true
        //get next item of queue
        let item = this.queueItems.shift() as QueueItem;
        let saveResult: Promise<Result> = this.handler.save(item.pathSubject, item.jsonString) ;
        if(!this.asyncMode){
            this.working = false
            return;
        }
        const refThis = this;
        saveResult.then(r=>{
            refThis.working = false
        }).catch(e=>{
            console.log(e);
            refThis.working = false
        })
    }
}