import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { User } from './user.model';
import 'rxjs/Rx';
import { Observable } from 'rxjs';

@Injectable()
export class AuthService  {
    
    constructor(private http: Http) { }
    
    signup(user: User) {
        const headers = new Headers({'content-Type': 'application/json'})
        const body = JSON.stringify(user)

        return this.http.post('/users', body, {headers: headers})
            .map((response : Response) =>  response.json())
            .catch((error: Response) => Observable.throw(error));
    }    

    signin(user: User) {
        const headers = new Headers({'content-Type': 'application/json'})
        const body = JSON.stringify(user)

        return this.http.post('/users/signin', body, {headers: headers})
            .map((response : Response) =>  response.json())
            .catch((error: Response) => Observable.throw(error));
    }    
    
    logout(){
        localStorage.clear(); 
        
    }
    
    isLoggedIn(){
        return localStorage.getItem('token') !== null;
    }
}
