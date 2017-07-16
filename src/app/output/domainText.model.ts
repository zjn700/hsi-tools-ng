export class DomainText {

    constructor(
        public sequence: number,
        public rationale: string[],
        public riskValue?: number[],
        public mitigationPlan?: string[],
        public planTracking?: string[]
        ) { }
}

