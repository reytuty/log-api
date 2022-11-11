import { AppDataSource } from "../../data-source"
import { LogAudits } from "../../entity/LogAudits";
import { SaveFunction, ISaverClass } from '../QueueRequestLog'
import { Result } from '../Result'

class DbLogAudit implements ISaverClass{
    // connection:
    connectionError:boolean = false;
    constructor(){}

    save : SaveFunction = async (pathSubject:string, jsonString:string) : Promise<Result> => {
        let result = new Result()
        if(this.connectionError){
            result.messages.push('Db: Imposible to save. Check connection.')
            return result
        }
        let data: any = JSON.parse(jsonString);
        const negatives = [];

        let auditsList = [];
        if(Array.isArray(data?.reports?.desktopReport?.audits)){
            auditsList = [...auditsList, ...data?.reports?.desktopReport?.audits]
        }
        if(Array.isArray(data?.reports?.mobileReport?.audits)){
            auditsList = [...auditsList, ...data?.reports?.mobileReport?.audits]
        }
        if(auditsList.length == 0){
            result.success = true;
            return result
        }
        for(var i in auditsList){
            let item = auditsList[i];
            if(item?.score == '-1'){
                negatives.push(item?.name);
            }
        }
        const audits = new LogAudits();
        audits.created_at = new Date();
        audits.domain = data?.domain;
        audits.url = data?.url;
        audits.subject = pathSubject;
        audits.startDate = new Date(data?.startDate);
        audits.full_data = jsonString;
        audits.executionId = data?.executionId;

        audits.negative_audits = negatives.join(',')
        if(!AppDataSource.isInitialized){
            await AppDataSource.initialize();
        }
        try{
            await AppDataSource.manager.save(audits)
            result.success = true;
            result.result = audits
        } catch(e:any){
            result.success = false;
            result.messages.push(e?.message)
        }
        return result;
    }
}
export { DbLogAudit } ;

