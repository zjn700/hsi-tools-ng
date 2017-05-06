import { Question } from '../card/qstn/qstn.model';

export class Domain {

    constructor(
        public qnn: string,
        public title: String,
        public sequence: number,
        public id?: string,
        public questions?: Question[]) { 
        }
}
