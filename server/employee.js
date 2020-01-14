const db = require('./db')
const utils = require('./utils')
const express = require('express')
const multer = require('multer')
const upload = multer({dest:'images/'})

const router = express.Router()

router.get('/', (request, response) => {
    const connection = db.connect()
    const statement = `select * from Employee`
    connection.query(statement, (error, data) => {
        connection.end()
        
        response.send(utils.createResult(error, data))
    })

})

router.get('/join', (request, response) => {
    const connection = db.connect()
    const statement = `select c.categories, e.empid, e.empfirstname, e.emplastname, e.empemail, e.empcontact, e.dateofjoining, e.dateofbirth, e.salary, e.image from EmpCategory c inner join Employee e on(c.categoryid=e.categoryid)`
    connection.query(statement, (error, data) => {
        connection.end()
        response.send(utils.createResult(error, data))
    })
})

router.post('/login',(request,response)=>{
    const {empemail,password}=request.body
    const connection=db.connect()
    const statement=`select * from Employee where empemail='${empemail}' and password='${password}'`
    connection.query(statement,(error,admins)=>{
        connection.end()

        if(admins.length==0){
            response.send(utils.createResult('user does not exists'))
        }
        else{
            const admin=admins[0]
            const info={
                empemail:admin['empeamil']
            }
            response.send(utils.createResult(error,admins))
        }
    })
})


router.post('/register', upload.single('image'), (request, response) => {
    const {categoryid,empfirstname,emplastname,empemail,empcontact,empusername,dateofjoining,dateofbirth,password,salary} = request.body
    const image = request.file.filename

    const connection = db.connect()

    const statement1=`select * from Employee where empemail='${empemail}'`
    connection.query(statement1,(error, admins)=>{
        console.log(admins)
        if(admins.length==0){
            const statement = `insert into Employee (categoryid,empfirstname,emplastname,empemail,empcontact,empusername,dateofjoining,dateofbirth,password,salary,image) values (${categoryid},'${empfirstname}', '${emplastname}', '${empemail}', ${empcontact}, '${empusername}', '${dateofjoining}', '${dateofbirth}', '${password}', ${salary}, '${image}')`
            connection.query(statement, (error, data) => {
            connection.end()
            response.send(utils.createResult(error, data))
        
    })
}
// router.post('/register', (request, response) => {
//     const {categoryid,empfirstname,emplastname,empemail,empcontact,empusername,password,salary} = request.body

//     const connection = db.connect()

//     const statement1=`select * from Employee where empemail='${empemail}'`
//     connection.query(statement1,(error, admins)=>{
//         console.log(admins)
//         if(admins.length==0){
//             const statement = `insert into Employee (categoryid,empfirstname,emplastname,empemail,empcontact,empusername,password,salary) values (${categoryid},'${empfirstname}', '${emplastname}', '${empemail}', ${empcontact}, '${empusername}', '${password}', ${salary})`
//             connection.query(statement, (error, data) => {
//             connection.end()
//             response.send(utils.createResult(error, data))
        
//     })
// }
else{
    connection.end()
    response.send(utils.createResult('email exists. please use another email'))
}
    })
})

router.post('/signup', (request, response) => {
    const {empfirstname,emplastname,empemail,empcontact,empusername,password,salary} = request.body

    const connection = db.connect()

    const statement1=`select * from Employee where empemail='${empemail}'`
    connection.query(statement1,(error, admins)=>{
        console.log(admins)
        if(admins.length==0){
            const statement = `insert into Employee (empfirstname,emplastname,empemail,empcontact,empusername,password,salary) values ('${empfirstname}', '${emplastname}', '${empemail}', ${empcontact}, '${empusername}', '${password}', ${salary})`
            connection.query(statement, (error, data) => {
            connection.end()
            response.send(utils.createResult(error, data))
        
    })
}
else{
    connection.end()
    response.send(utils.createResult('email exists. please use another email'))
}
    })
})

router.put('/:empid', (request, response) => {
    const {empid} = request.params
    const {categoryid ,empfirstname,emplastname,empemail,empcontact,empusername,dateofjoining,dateofbirth,password,image,salary} = request.body
    const connection = db.connect()
    const statement = `update Employee set categoryid = '${categoryid}', empfirstname='${empfirstname}', emplastname='${emplastname}', empemail='${empemail}', empcontact='${empcontact}', empusername='${empusername}', dateofjoining='${dateofjoining}', dateofbirth='${dateofbirth}', password='${password}', image='${image}', salary='${salary}' where empid = ${empid}`
    connection.query(statement, (error, data) => {
        connection.end()
        response.send(utils.createResult(error, data))
    })
})

router.delete('/:empid', (request, response) => {
    const {empid} = request.params
    const connection = db.connect()
    const statement = `delete from Employee where empid = ${empid}`
    connection.query(statement, (error, data) => {

        connection.end()
        response.send(utils.createResult(error, data))
    })
})

module.exports=router


