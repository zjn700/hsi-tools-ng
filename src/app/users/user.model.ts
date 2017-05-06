import { Phone } from './phone.model'
export class User {
    
    constructor(
        public email: String, 
        private password: String, 
        public firstName?: String, 
        public lastName?: String,
        public office?: String, 
        public phone?: Phone[],
        private id?: string) {
    }
}