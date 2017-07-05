export class RiskDetails {

    constructor(
        public sequence: number, 
        public riskValue?: number,
        public rationale?: string,
        public strategy?: number,
        public impact?: number,
        public stakeholdersInformed?: boolean,
        public strategyDocumented?: boolean,
        public mitigationPlan?: string,
        public planTracking?: string,
        public dateCreated?: Date,
        public dateModified?: Date
        ) { }
}