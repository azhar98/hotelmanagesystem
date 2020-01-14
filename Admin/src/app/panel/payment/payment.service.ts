import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class PaymentService {

  url = 'http://localhost:4000/billing'

  constructor(private http: HttpClient) { }

  getPayment() {
    return this.http.get(this.url+'/join')
  }


  
}