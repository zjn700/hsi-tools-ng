//import { User } from '../users/user.model';
import { Answer } from '../card/ansr/ansr.model';
import { State } from '../state/state.model';

export class Project {

    constructor(
        public title: String, 
        public description?: string,
        public id?: string,
        public dateCreated?: Date,
        public users?: string[],
        public state?: State,
        // public answers?: Answer[],
        public dateCompleted?: Date) { 
        }
}