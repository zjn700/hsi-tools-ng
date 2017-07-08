export class RiskDetails {

    constructor(
        public riskValue?: number,
        public rationale?: string,
        public strategy?: string,
        public impact?: string,
        public stakeholdersInformed?: boolean,
        public strategyDocumented?: boolean,
        public mitigationPlan?: string,
        public planTracking?: string
        ) { }
}