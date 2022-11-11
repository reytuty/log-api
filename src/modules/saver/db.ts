import { AppDataSource } from "../../data-source"
import { Log } from "../../entity/Log"
import { SaveFunction, ISaverClass } from '../QueueRequestLog'
import { Result } from '../Result'

class DbSave implements ISaverClass{
    // connection:
    constructor(){
        AppDataSource.initialize().then(async () => {}).catch(error => console.log(error));
    }

    save : SaveFunction = async (pathSubject:string, jsonString:string) : Promise<Result> => {
        const user = new Log()
        user.created_at = new Date()
        user.data = jsonString
        user.subject = pathSubject
        if(!AppDataSource.isInitialized){
            await AppDataSource.initialize();
        }
        let result = new Result()
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

