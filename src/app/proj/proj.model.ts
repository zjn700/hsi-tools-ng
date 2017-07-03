import { SessionState } from '../state/state.model';

export class Project {

    constructor(
        public title: String, 
        public description?: string,
        public id?: string,
        public dateCreated?: Date,
        public users?: string[],
        public state?: SessionState,
        public states?: SessionState[],
        public dateCompleted?: Date) { 
        }
}