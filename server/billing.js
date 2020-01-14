const db = require('./db')
const utils = require('./utils')
const express = require('express')

const router = express.Router()

router.get('/', (request, response) => {
    const connection = db.connect()
    const statement = `select * from Billing`
    connection.query(statement, (error, data) => {
        connection.end()
        response.send(utils.createResult(error, data))
    })
})

router.get('/join', (request, response) => {
    const connection = db.connect()
    const statement = `select bo.bookid, bo.bedid, bi.billingno, bi.amount, bi.billingdate, bi.status from BookingDetails bo inner join Billing bi on(bo.bookid=bi.bookid)`
    connection.query(statement, (error, data) => {
        connection.end()
        response.send(utils.createResult(error, data))
    })
})

router.post('/', (request, response) => {
    const { bookid, billingmode, amount, billingdate, status} = request.body

    const connection = db.connect()
    const statement = `insert into Billing ( bookid, billingmode, amount, billingdate, status) values ('${bookid}', '${billingmode}', '${amount}', '${billingdate}', '${status}')`
    connection.query(statement, (error, data) => {
        connection.end()
        response.send(utils.createResult(error, data))
    })
})

// router.put('/:billno', (request, response) => {
//     const {billno} = request.params
//     const {bookid, billingmode, amount, billingdate, status} = request.body
//     const connection = db.connect()
//     const statement = `update Billing set title = '${title}' where id = ${id}`
//     connection.query(statement, (error, data) => {
//         connection.end()
//         response.send(utils.createResult(error, data))
//     })
// })

module.exports=router