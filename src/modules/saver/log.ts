import { SaveFunction, ISaverClass } from '../QueueRequestLog'
import { Result } from '../Result'
class LogSave implements ISaverClass{
    save : SaveFunction = async (pathSubject:string, jsonString:string) : Promise<Result> => {
        let result = new Result()
        result.success = true;
        console.log('--------------------------------------------')
        console.log(pathSubject, jsonString) ;
        return result;
    }
}
export { LogSave } ;