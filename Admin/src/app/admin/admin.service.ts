import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AdminService {

  url = 'http://localhost:4000/employee'

  constructor(private http: HttpClient) { }

  login(empemail: string, password: string) {
    const body = {
      empemail: empemail,
      password: password
    }

    return this.http.post(this.url + '/login', body)
  }

  registerAdmin( categoryid:number, empfirstname:string, emplastname:string,
  empemail:string, empcontact:number, empusername:string, dateofjoining:string,
  dateofbirth:string, image:any, password:string, salary:number) {
    // const body = {
    //     categoryid:categoryid,
    //     //empid:empid,
    //     empfirstname:empfirstname,
    //     emplastname:emplastname,
    //     empemail:empemail,
    //     empcontact:empcontact,
    //     empusername:empusername,
    //     dateofjoining:dateofjoining,
    //     dateofbirth:dateofbirth,
    //     image:image,
    //     password:password,
    //     salary:salary
    // }

    const body = new FormData()
    body.append('categoryid', '' + categoryid)
    body.append('empfirstname', empfirstname)
    body.append('emplastname', emplastname)
    body.append('empemail', '' + empemail)
    body.append('empcontact', '' + empcontact)
    body.append('empusername', empusername)
    body.append('dateofjoining', dateofjoining)
    body.append('dateofbirth', dateofbirth)
    body.append('password', password)
    body.append('salary', '' + salary)
    body.append('image', image)


    return this.http.post(this.url + '/register', body)
  }

}
