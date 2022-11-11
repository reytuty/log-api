
export class Result{
    success:boolean | undefined;
    result: any;
    messages: string[];
    constructor(){
        this.messages = []
    }
}
