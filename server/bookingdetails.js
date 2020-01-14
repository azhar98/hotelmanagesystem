const db = require('./db')
const utils = require('./utils')
const express = require('express')

const router = express.Router()

router.get('/', (request, response) => {
    const connection = db.connect()
    const statement = `select * from BookingDetails`
    connection.query(statement, (error, data) => {
        connection.end()
        response.send(utils.createResult(error, data))
    })
})

router.get('/id', (request, response) => {
    const connection = db.connect()
    const statement = ` select bookid from BookingDetails order by bookid desc limit 1`
    connection.query(statement, (error, data) => {
        connection.end()
        response.send(utils.createResult(error, data))
    })
})

router.get('/join', (request, response) => {
    const connection = db.connect()
    const statement = `select bd.bookid, u.firstname, u.lastname, u.email, u.contact, b.amount, r.category, be.beddingtype from BookingDetails bd inner join User u on(bd.bookid=u.bookid) inner join Billing b on(bd.bookid=b.bookid) inner join Bedding be on(bd.bedid=be.bedid) inner join RoomCategory r on(be.categoryid=r.categoryid)`
    connection.query(statement, (error, data) => {
        connection.end()
        response.send(utils.createResult(error, data))
    })
})

router.post('/', (request, response) => {
    const {bookid,bedid,check_in_date,check_out_date} = request.body

    const connection = db.connect()
    const statement = `insert into BookingDetails (bookid,bedid,check_in_date,check_out_date) values ('${bookid}', '${bedid}', '${check_in_date}', '${check_out_date}')`
    connection.query(statement, (error, data) => {
        connection.end()
        response.send(utils.createResult(error, data))
    })
})

// router.post('/book', (request, response) => {
//     const {bedid,check_in_date,check_out_date} = request.body

//     const connection = db.connect()
//     const statement = `insert into BookingDetails (bedid,check_in_date,check_out_date) values ( '${bedid}', '${check_in_date}', '${check_out_date}')`
//     connection.query(statement, (error, data) => {
//         connection.end()
//         response.send(utils.createResult(error, data))
//     })
// })

router.post('/book11', (request, response) => {
    const {check_in_date,check_out_date, categoryid, beddingtype,
     bedid= `select bedid from Bedding where categoryid = '${categoryid}' and beddingtype = '${beddingtype}'`,
     } = request.body

    const connection = db.connect()
    const statement = `insert into BookingDetails (check_in_date,check_out_date, bedid) values ( '${check_in_date}', '${check_out_date}','${bedid}')`
    connection.query(statement, (error, data) => {
        connection.end()
        response.send(utils.createResult(error, data))
    })    
})

router.post('/book', (request, response) => {
    var {check_in_date,check_out_date, categoryid, beddingtype,bedid} = request.body

    const connection = db.connect()

    const statement1 = `select bedid from Bedding where categoryid = '${categoryid}' and beddingtype = '${beddingtype}'`
    bedid = (statement1)
    connection.query(statement1,(error, value)=>{
        //console.log(value)
        console.log(value[0].bedid);
        bedid= value[0].bedid
        if(value.length!=0){
            const statement = `insert into BookingDetails (check_in_date,check_out_date, bedid) values ( '${check_in_date}', '${check_out_date}',${bedid})`
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

router.put('/:bookid', (request, response) => {
    const {bookid} = request.params
    const {roomno,check_in_date,check_out_date,check_in_time,check_out_time} = request.body
    const connection = db.connect()
    const statement = `update BookingDetails set roomno = '${roomno}', check_in_date='${check_in_date}', check_out_date='${check_out_date}', check_in_time='${check_in_time}', check_out_time='${check_out_time}' where bookid = ${bookid}`
    connection.query(statement, (error, data) => {
        connection.end()
        response.send(utils.createResult(error, data))
    })
})

router.delete('/:bookid', (request, response) => {
    const {bookid} = request.params
    const connection = db.connect()
    const statement = `delete from BookingDetails where bookid = ${bookid}`
    connection.query(statement, (error, data) => {

        connection.end()
        response.send(utils.createResult(error, data))
    })
})

module.exports=router