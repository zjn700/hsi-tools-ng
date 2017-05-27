export class Integration {

    constructor(
        public projectId: string,
        public qnnId: string,
        public domainIds: string[],
        public dateCreated?: Date,
        public dateModified?: Date,
        public risksIssuesConcerns?: string,
        public mitigationStrategy?: string,
        public id?: string) { }
}
