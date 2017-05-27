import { User } from '../users/user.model'

export class State {

    constructor(
        public domainId: string, 
        public questionNumber: number,
        public user?: User,
        public dateModified?: Date,
        public id?: String
        ) { }
}