import { SaveFunction, ISaverClass } from '../QueueRequestLog'
import { Result } from '../Result';
import fs from 'fs';

function formatFolder(base:string, path:string):string{
    let fullPath = base+'/'+path+'/';
    return fullPath.split('//').join('/');
}
class FileSave implements ISaverClass{
    basePath:string = './.data/'
    constructor(basePath:string = './.data/'){
        this.basePath = basePath;
        fs.mkdirSync(this.basePath, {recursive:true});
    }
    save : SaveFunction = async (pathSubject:string, jsonString:string) : Promise<Result> => {
        let result = new Result();
        try{
            const folder = formatFolder(this.basePath, pathSubject) ;
            if(!fs.existsSync(folder)){
                fs.mkdirSync(folder, {recursive:true});
            }
            const d:string = new Date().toISOString()
            const fileName = `data_${d}.txt`;
            fs.writeFileSync(folder+fileName, jsonString);
            result.success = true;
            result.messages.push('file saved in folder log')
        }catch(e){
            result.success = false;
            result.messages.push(e?.message);
        }
        return result;
    }
}
export { FileSave } ;