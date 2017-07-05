import { RiskDetails } from './ansr-risk.model';

export class Answer {

    constructor(
        public projectId: string,
        public domainId: string, 
        public sequence: number, 
        public value: boolean,
        public riskValue?: number,
        public riskDetails?: RiskDetails[],
        public rationale?: string,
        public dateCreated?: Date,
        public dateModified?: Date,
        public id?: String
        ) { 
    }
}