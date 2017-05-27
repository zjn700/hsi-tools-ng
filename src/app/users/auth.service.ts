import { Injectable, EventEmitter } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Router } from '@angular/router';
import { User } from './user.model';
import 'rxjs/Rx';
import { Observable } from 'rxjs';

@Injectable()
export class AuthService  {
    logoutNow = new EventEmitter<boolean>();
    //checkToken = new EventEmitter<boolean>();

    constructor(private http: Http, private router: Router) { }
    
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
    
    checkToken(){
        var payloadBytes = localStorage.getItem('token').split('.')[1];
        return JSON.parse(atob(payloadBytes)).exp > new Date().valueOf()/1000
        // { // + 30000) {
        //   //console.log('yep');
        //   //this.authService.forceLogout();
        // }
        
    }
    
    forceLogout(){
        console.log('forceLogout')
        //this.logoutNow.emit(true);
        localStorage.clear();
        this.router.navigate(['/signin'])
    }
    
    logout(){
        localStorage.clear(); 
        
    }
    
    isLoggedIn(){
        return localStorage.getItem('token') !== null;
    }
}
