import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from './auth.service';
import { User } from './user.model';

@Component({
    selector: 'hsi-signup',
    templateUrl: './signup.component.html'
})
export class SignupComponent implements OnInit {
    myForm: FormGroup
    
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
            office: new FormControl(null)
        })
    }
    
    onSubmit() {
        console.log(this.myForm)
        const user = new User(
            this.myForm.value.email,
            this.myForm.value.password,
            this.myForm.value.firstName,
            this.myForm.value.lastName,
            this.myForm.value.office
            )
        this.authService.signup(user)
            .subscribe(
                data => {
                    console.log(data);
                    this.router.navigate(['/signin'])   //(['/auth', 'signin'])
                },
                error => console.log(error))
            
            
        this.myForm.reset();
    }
}