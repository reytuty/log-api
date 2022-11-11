import { SaveFunction, ISaverClass } from '../QueueRequestLog'
import { Result } from '../Result'
import axios from 'axios'
class MangaSave implements ISaverClass{
    endpoint:string;
    prefix: string;
    constructor(endpoint:string, prefixPath: string = 'log.'){
        this.endpoint = endpoint;
        this.prefix = prefixPath;
    }
    save : SaveFunction = async (pathSubject:string, jsonString:string) : Promise<Result> => {
        let result = new Result()
        if(!pathSubject){
            result.messages.push('manga needs path to save')
            return result
        }
        if(!jsonString){
            result.messages.push('manga needs value to save')
            return result
        }
        let path = this.prefix+pathSubject.split("/").join(".") ;
        // axios.post(this.endpoint, {

        // })
        result.success = true;
        
        return result;
    }
}
export { MangaSave } ;