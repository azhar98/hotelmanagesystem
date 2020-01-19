import { Component, OnInit } from '@angular/core';
import { PanelService } from '../panel.service';
import { Router } from '@angular/router';
import {EmployeeService} from '../employees/employees.service';
import * as toastr from 'toastr';


@Component({
    selector: 'editemployee-component',
    templateUrl:'./editemployee.component.html',
    styleUrls:['./editemployee.component.css']
})

export class EditEmployeeComponent{
    category=[]

    categoryid=null
    empfirstname=''
    emplastname=''
    empemail=''
    empcontact=0
    empusername=''
    //dateofjoining=Date
    //dateofbirth=Date
    password=''
    salary=0
    constructor(
        private router: Router,
       private employeeService: EmployeeService
    ){
        this.employeeService
        .getCategory()
        .subscribe(response=>{
            if(response['status']=='success'){
                this.category=response['data']
                this.categoryid=this.category[0].categoryid
            }else{
                console.log(response['error'])
            }
        })
    }

    onUpdate(empid:number){
        this.employeeService
        .deleteEmployee(empid)
        .subscribe(response => {
          if (response['status'] == 'success') {
            //this.loadEmployees()
            toastr.success('employee updated successfully')
          } else {
            console.log(response['error'])
            toastr.error('error')
          }
        })
    }

     
}