import { Injectable, EventEmitter, Output } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Router } from '@angular/router';
import { User } from './user.model';
import 'rxjs/Rx';
import { Observable } from 'rxjs';

@Injectable()
export class AuthService  {
    logoutNow = new EventEmitter<boolean>();
    //public active_user:User;
    @Output() showWarning = new EventEmitter<boolean>();
    //showWarning = new EventEmitter<boolean>();

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
        //console.log(JSON.parse(atob(payloadBytes)).exp)
        let t_date = new Date().valueOf()/1000 
        let exp_date = JSON.parse(atob(payloadBytes)).exp
        console.log('t_date')
        console.log(t_date)
        if ( exp_date < t_date) {
            this.showWarning.emit(false)
            this.forceLogout();
            return true
        }
        console.log(exp_date -10 < t_date)
        console.log(exp_date -1  > t_date)
        if (exp_date -10 < t_date  &&
             exp_date -1 > t_date ) {
                console.log('issue warningMessage')
                this.showWarning.emit(true)
                //setTimeout(this.showWarning.emit(false), 3000)
            } 

        return false
        
    }
    
    forceLogout(){
        console.log('forceLogout')
        this.logout();
        this.router.navigate(['/signin']);
    }
    
    logout(){
        console.log('logout')
        localStorage.clear();

        
    }
    
    isLoggedIn(){
        return localStorage.getItem('token') !== null;
    }
}
