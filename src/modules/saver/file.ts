import { SaveFunction, ISaverClass } from '../QueueRequestLog'
import { Result } from '../Result'
class FileSave implements ISaverClass{
    save : SaveFunction = async (pathSubject:string, jsonString:string) : Promise<Result> => {
        let result = new Result()
        result.success = true;
        console.log('--------------------------------------------')
        console.log(pathSubject, jsonString) ;
        return result;
    }
}
export { FileSave } ;