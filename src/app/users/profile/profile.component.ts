import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import "rxjs/add/operator/takeWhile";


import { AuthService } from '../auth.service'
import { User } from '../user.model'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {

  public alive:boolean =true;
  public profileForm: FormGroup
  public user: User;

  public showMessage=false;
  private message=''
  
  constructor(private authService: AuthService) { }

  ngOnDestroy() {
    this.alive = false;
  }

  ngOnInit() {
    
    this.user = this.authService.getActiveUser();
    // console.log('this.user')
    // console.log(this.user)
    
    this.profileForm = new FormGroup({
        firstName: new FormControl(null, Validators.required),
        lastName: new FormControl(null, Validators.required),
        email: new FormControl(null, 
            [
                Validators.required,
                Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?"),
            ]),
        // password: new FormControl(null, Validators.required),
        // passwordCheck: new FormControl(null, Validators.required),
        office: new FormControl(null),
        phone: new FormControl(null)
    })
    
  }
  
  onSubmit() {
    const user = new User(
        this.profileForm.value.email,
        null,
        this.profileForm.value.firstName,
        this.profileForm.value.lastName,
        this.profileForm.value.office,
        this.profileForm.value.phone,
        localStorage.getItem('userId')
        )
        
        // console.log('new user object')
        // console.log(user)
    // // if (!this.checkPasswords()) {
    // //     this.passwordMismatch = true;
    // // } else {
    // this.emailInUse=false;    
    // this.passwordMismatch = false;
    this.authService.updateUser(user)
        .takeWhile(() => this.alive)
        .subscribe(
            data => {
                if (!data.error) {
                  // console.log('data')
                  // console.log(data)
                  this.showThisMessage("Your profile has been updated")
                  // console.log(user)
                  // console.log(this.user)
                  this.authService.resetUser(user)

                    //this.profileForm.reset();
                    //this.router.navigate(['/projects'])
                } else {
                  // console.log('data')
                  // console.log(data)
                  // console.log(user)
                  this.showThisMessage("There was an error updating your profile. Please try again later")

                    // this.emailInUse=true;
                    // setTimeout(()=> {this.emailInUse = false}, 8000)
                    // this.profileForm.controls['firstName'].setValue(this.authService.formFirstName);
                }
            },
            error => console.log(error))
            
        // }   
    }
    
  showThisMessage(message) {
    this.message=message;
    this.showMessage=true;
    setTimeout(()=>{this.showMessage=false}, 2000)    
  }

}
