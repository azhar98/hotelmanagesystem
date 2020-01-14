import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as toastr from 'toastr';
import {PaymentService} from '../payment/payment.service'

@Component({
    selector: 'payment-component',
    templateUrl:'./payment.component.html',
    styleUrls:['./payment.component.css']
})

export class PaymentComponent{

    bookid=0
    billingmode=''
    amount=0
    billingdate=''
    status=''

    email=''

    constructor(private router: Router,
        private paymentService:PaymentService){}

        onPay(){
            this.paymentService
             .pay( this.bookid,this.billingmode, this.amount,this.billingdate, this.status)
                 .subscribe(response=>{
                     console.log(response)
                     if (response['status'] == 'success') {
                         this.userbook()
                         toastr.success("Payment Successful")
                         this.router.navigate(['/website-component'])
                       } else {
    
                       }
                 })
    
        }

        userbook(){
            this.paymentService
            .user(this.bookid, this.email)
            .subscribe(response=>{
                console.log(response)
                if(response['status']=='success'){
                    console.log('bookid inserted')
                }
            })
        }

        onGetid(){
            this.paymentService
            .getBookingId(this.email)
            .subscribe(response=>{
                console.log(response)
                if(response['status']=='success'){
                    console.log(this.bookid)
                }
            })
        }

}

   