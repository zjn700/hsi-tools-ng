import { Injectable, EventEmitter } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs'

import { Questionnaire } from '../card/qnn/qnn.model';

@Injectable()
export class SelectorService {
    private qnns: Questionnaire[] = [];
    qnnIsInEditMode = new EventEmitter<Questionnaire>();

    constructor(private http: Http) { }
    
    getQuestionnaires(category){
        return this.http.get('/questionnaires/' + category)
            .map((response: Response) => {
                if (response.json().obj.length == 0) {
                    return this.qnns = response.json().obj;
                } 
                const qnns = response.json().obj;
                let transformedQnns: Questionnaire[] = [];
                for (let qnn of qnns) {
                    transformedQnns.push(new Questionnaire(
                        qnn.title,
                        qnn.abbreviation,
                        qnn.description,
                        qnn._id,
                        qnn.category))
                }
                this.qnns = transformedQnns;
                return transformedQnns;
            })
            .catch((error: Response) => Observable.throw(error));
    }
    
    editQuestionnaire(qnn: Questionnaire){
        this.qnnIsInEditMode.emit(qnn)
    }
    
    qnnIsSelected(){
        return localStorage.getItem('qnnId') !== null;
    }

}