import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class StatusService {

  url = 'http://localhost:4000/bookingdetails'

  constructor(private http: HttpClient) { }

  getCategory() {
    return this.http.get(this.url+'/join')
  }
}
