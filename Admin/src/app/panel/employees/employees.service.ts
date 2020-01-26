import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class EmployeeService {

  url1 = 'http://localhost:4000/employee'
  url2 = 'http://localhost:4000/empcategory'

  constructor(private http: HttpClient) { }

  getEmployee() {
    return this.http.get(this.url1+'/join')
  }

  deleteEmployee(empid:number){
    return this.http.delete(this.url1 + '/' + empid)
  }

  getCategory() {
    return this.http.get(this.url2)
  }

  getProfile(empemail:String){
    return this.http.get(this.url1 + '/join/' + empemail)
  }

//   updateEmployee(//categoryid:number,
//     empid:string)
//     // empfirstname:string,
//     // emplastname:string,
//     // empemail:string,
//     // empcontact:number,
//     // empusername:string,
//     // //dateofjoining:Date,
//     // //dateofbirth:Date,
//     // //image:string,
//     // password:string,
//     // salary:number){
//     // const body = {
//     //   categoryid:categoryid,
//     //   empid:empid,
//     //   empfirstname:empfirstname,
//     //   emplastname:emplastname,
//     //   empemail:empemail,
//     //   empcontact:empcontact,
//     //   empusername:empusername,
//     //   //dateofjoining:dateofjoining,
//     //   //dateofbirth:dateofbirth,
//     //   //image:image,
//     //   password:password,
//     //   salary:salary

//   return this.http.put(this.url1 + '/register', body)
// }
// updateEmployee(empid:number){
//   return this.http.put(this.url1 + '/' +empid)
// }
  
}
