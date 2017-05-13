import { Question } from '../card/qstn/qstn.model';
import { Answer } from '../card/ansr/ansr.model';

export class Domain {

    constructor(
        public qnn: string,
        public title: String,
        public sequence: number,
        public id?: string,
        public questions?: Question[],
        public answers?: Answer[]) { 
        }
}
