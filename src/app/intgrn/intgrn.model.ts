export class Integration {

    constructor(
        public projectId: string,
        public qnnId: string,
        public domainList: string[],
        public title: string,
        public dateCreated?: Date,
        public dateModified?: Date,
        public id?: string,
        public risksIssuesConcerns?: string,
        public mitigationStrategy?: string) { }
}
