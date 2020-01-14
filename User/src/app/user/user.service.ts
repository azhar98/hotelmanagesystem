import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class UserService {

  url = 'http://localhost:4000/user'

  constructor(private http: HttpClient) { }

  login(email: string, password: string) {
    const body = {
      email: email,
      password: password
    }

    return this.http.post(this.url + '/login', body)
  }

  registerUser(
  firstname: string,
  lastname:string,
  email:string,
  contact:number,
  username:string,
  password:string) {
    const body = {
        firstname:firstname,
        lastname:lastname,
        email:email,
        contact:contact,
        username:username,
        password:password
    }

    return this.http.post(this.url + '/register', body)
  }

}