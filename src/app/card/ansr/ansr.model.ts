export class Answer {

    constructor(
        public projectId: string,
        public domainId: string, 
        public sequence: number, 
        public value: boolean,
        public riskValue?: Number,
        public rationale?: String,
        public dateCreated?: Date,
        public dateModified?: Date,
        public id?: String
        ) { 
    }
}