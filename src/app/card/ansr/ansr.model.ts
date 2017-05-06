export class Answer {

    constructor(
        public domainId: string, 
        public sequence: Number, 
        public value: boolean,
        public riskQuadrant?: Number,
        public rationale?: String,
        public dateCreated?: Date,
        public dateModified?: Date,
        public id?: String
        ) { 
    }
}