import { Integration } from '../intgrn/intgrn.model';

export class OutputTradeOff {

    constructor(
        public integration: Integration,
        public risksIssuesConcerns: string[],
        public mitigationStrategy: string[]
        ) { }
}

