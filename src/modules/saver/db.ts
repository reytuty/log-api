import { AppDataSource } from "../../data-source"
import { Log } from "../../entity/Log"
import { SaveFunction, ISaverClass } from '../QueueRequestLog'
import { Result } from '../Result'

class DbSave implements ISaverClass{
    // connection:
    connectionError:boolean = false;
    constructor(){}

    save : SaveFunction = async (pathSubject:string, jsonString:string) : Promise<Result> => {
        let result = new Result()
        if(this.connectionError){
            result.messages.push('Db: Imposible to save. Check connection.')
            return result
        }
        const user = new Log()
        user.created_at = new Date()
        user.data = jsonString
        user.subject = pathSubject
        if(!AppDataSource.isInitialized){
            await AppDataSource.initialize();
        }
        try{
            await AppDataSource.manager.save(user)
            result.success = true;
            result.result = user
        } catch(e:any){
            result.success = false;
            result.messages.push(e?.message)
        }
        return result;
    }
}
export { DbSave } ;

