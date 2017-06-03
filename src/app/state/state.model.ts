import { User } from '../users/user.model'

export class SessionState {

    constructor(
        public url:string,
        public qnnId:string,
        public qnnTitle:string,
        public qnnAbbreviation: string,
        public domainId: string, 
        public domainNumber: number,
        public questionNumber: number,
        public user?: User,
        public dateModified?: Date,
        public id?: String
        ) { }
}