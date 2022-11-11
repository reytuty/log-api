import { SaveFunction, ISaverClass } from '../QueueRequestLog'
import { Result } from '../Result'
import {mysql} from 'mysql';

class DbSave implements ISaverClass{
    // connection:
    constructor(){
        var connection = mysql.createConnection({
            host     : 'localhost',
            user     : 'me',
            password : 'secret',
            database : 'my_db'
          });
           
          connection.connect();
           
          connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
            if (error) throw error;
            console.log('The solution is: ', results[0].solution);
          });
    }

    save : SaveFunction = async (pathSubject:string, jsonString:string) : Promise<Result> => {
        let result = new Result()
        result.success = true;
        console.log('--------------------------------------------')
        console.log(pathSubject, jsonString) ;
        return result;
    }
}
export { DbSave } ;