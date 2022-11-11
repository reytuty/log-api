import { Result } from "./Result"

export type SaveFunction = (pathSubject:string, jsonString:string) => Promise<Result>;
export interface ISaverClass{
    save:SaveFunction;
}
export class QueueRequestLog{
    //Dependency injection
    queueActions: SaveFunction[]
    constructor(queueActions: SaveFunction[]){
        this.queueActions = queueActions;
    }
    async save(pathSubject:string, jsonString:string):Promise<Result>{
        const result = new Result();
        result.success = true;
        result.result = { pathSubject, totalProcesses:this.queueActions.length, errorProcesses: 0 }
        for(var i in this.queueActions){
            let itemResult = await this.queueActions[i](pathSubject, jsonString);
            if(!itemResult.success){
                result.success = false;
                result.result.errorProcesses ++;
            }
            result.messages = [...itemResult.messages]
        }
        return result;
    }
}