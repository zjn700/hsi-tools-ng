export class Phone {
    
    constructor(
        public countryCode: String, 
        public number: String, 
        public type?: String, 
        public note?: String,
        private id?: string) {
    }
}