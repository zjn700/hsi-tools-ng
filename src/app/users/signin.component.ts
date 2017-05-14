import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from './user.model';
import { AuthService } from './auth.service';
import { TopMenuService } from '../shared/top-menu.service';
import "rxjs/add/operator/takeWhile";

@Component({
    selector: 'hsi-signin',
    templateUrl: './signin.component.html'
})
export class SigninComponent implements OnInit, OnDestroy {
    myForm: FormGroup
    private alive:boolean = true;
    
    constructor(private authService: AuthService, private topMenuService: TopMenuService, private router: Router) { }
    
    ngOnInit(){
        this.myForm = new FormGroup({
            email: new FormControl(null, 
                [
                    Validators.required,
                    Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?"),
                ]),
            password: new FormControl(null, Validators.required),
        }) 
    }
    
    ngOnDestroy(){
        this.alive = false
    }
    
    onSubmit(button) {
        console.log(this.myForm)
        const user = new User(
                this.myForm.value.email,
                this.myForm.value.password
            )
        this.authService.signin(user)
            .takeWhile(() => this.alive)
            .subscribe(
                data => {
                    localStorage.setItem('token', data.token);
                    localStorage.setItem('userId', data.userId);
                    this.router.navigateByUrl('/project');
                    this.topMenuService.activateThisItem('/project');
                    //this.topMenuService.updateTopMenu(button)
                },
                error => console.log(error))
        this.myForm.reset();
    }    
}