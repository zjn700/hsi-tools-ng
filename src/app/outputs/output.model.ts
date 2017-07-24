export class Output {

    constructor(
        public domainSequence?: number,
        public domainTitle?: string,
        public questionSequence?: number,
        public questionContent?: string,
        public answerValue?: boolean,
        public riskValue?: number,
        public convertedRiskValue?: number,
        public rationale?: string[],
        public strategy?: string,
        public impact?: string,
        public mitigationPlan?: string[],
        public planTracking?: string[],        
        public stakeholdersInformed?: boolean,
        public strategyDocumented?: boolean
        ) { }
}

