import { Component, OnInit } from '@angular/core';
import {AdminService} from '../admin.service';
import * as toastr from 'toastr';
import { Router } from '@angular/router';

@Component({
    selector: 'login-component',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent{
  empemail = ''
  password = ''

  constructor(private router: Router,private adminService: AdminService) { }

  onLogin(){
    if(this.empemail.length == 0){
        toastr.error('enter valid email')
    }else if(this.password.length == 0 ){
        toastr.error('enter valid password')
    }else{
        this.adminService
        .login(this.empemail,this.password)
        .subscribe(response=>{
          console.log(response)
            if(response['status'] == 'success'){
                toastr.success('authenticated')
                localStorage['login_status']='1'
                localStorage['username']=response['data']['username']
                localStorage['userid']=response['data']['id']
                this.router.navigate(['/panel-component'])
            }else{
                toastr.success(response['error'])
            }
        })
    }
}
}