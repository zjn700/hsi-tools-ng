import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import "rxjs/add/operator/takeWhile";

import { AuthService } from './auth.service';
import { User } from './user.model';

@Component({
    selector: 'hsi-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./user.css']
    
})
export class SignupComponent implements OnInit, OnDestroy {
    myForm: FormGroup
    private alive:boolean = true;
    public emailInUse:boolean = false;
    public emailInUseMessage = 'That email address is already registered'
    public passwordMismatch:boolean = false;
    public passwordMismatchMessage = "Your passwords don't match";
    public formFirstName='';
    public formLastName = '';
    public formOffice = '';
    
    constructor(private authService: AuthService, private router: Router) { }
    
    ngOnInit(){
        this.myForm = new FormGroup({
            firstName: new FormControl(null, Validators.required),
            lastName: new FormControl(null, Validators.required),
            email: new FormControl(null, 
                [
                    Validators.required,
                    Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?"),
                ]),
            password: new FormControl(null, Validators.required),
            passwordCheck: new FormControl(null, Validators.required),
            office: new FormControl(null)
        })
    }
    
    ngOnDestroy(){
        this.alive = false;
    }
    
    checkPasswords(){
        return this.myForm.value.password == this.myForm.value.passwordCheck
    }
    
    onSubmit() {
        const user = new User(
            this.myForm.value.email,
            this.myForm.value.password,
            this.myForm.value.firstName,
            this.myForm.value.lastName,
            this.myForm.value.office
            )
        if (!this.checkPasswords()) {
            this.passwordMismatch = true;
        } else {
        this.emailInUse=false;    
        this.passwordMismatch = false;
        this.authService.signup(user)
            .takeWhile(() => this.alive)
            .subscribe(
                data => {
                    if (!data.error) {
                        this.myForm.reset();
                        this.router.navigate(['/signin'])
                    } else {
                        this.emailInUse=true;
                        setTimeout(()=> {this.emailInUse = false}, 8000)
                        // this.myForm.controls['firstName'].setValue(this.authService.formFirstName);
                    }
                },
                error => console.log(error))
            
        }   
    }
}