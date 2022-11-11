import { SaveFunction, ISaverClass } from '../QueueRequestLog'
import { Result } from '../Result';
import fs from 'fs';

class FileSave implements ISaverClass{
    basePath:string = './.data/'
    constructor(basePath:string = './.data/'){
        this.basePath = basePath;
        //
    }
    save : SaveFunction = async (pathSubject:string, jsonString:string) : Promise<Result> => {
        let result = new Result()
        result.success = true;
        console.log('--------------------------------------------')
        console.log(pathSubject, jsonString) ;
        return result;
    }
}
export { FileSave } ;