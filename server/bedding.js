const db = require('./db')
const utils = require('./utils')
const express = require('express')

const router = express.Router()

router.get('/type', (request, response) => {
    const connection = db.connect()
    const statement = `select distinct beddingtype from Bedding`
    connection.query(statement, (error, data) => {
        connection.end()
        response.send(utils.createResult(error, data))
    })
})

router.get('/', (request, response) => {
    const connection = db.connect()
    const statement = `select * from Bedding`
    connection.query(statement, (error, data) => {
        connection.end()
        response.send(utils.createResult(error, data))
    })
})

router.get('/join', (request, response) => {
    const connection = db.connect()
    const statement = `select b.bedid 'bedid', r.category 'category', b.beddingtype 'beddingtype' from RoomCategory r inner join Bedding b on r.categoryid=b.categoryid`
    connection.query(statement, (error, data) => {
        connection.end()
        response.send(utils.createResult(error, data))
    })
})


router.post('/', (request, response) => {
    const {beddingtype, categoryid} = request.body

    const connection = db.connect()
    const statement = `insert into Bedding (beddingtype, categoryid) values ('${beddingtype}', ${categoryid})`
    connection.query(statement, (error, data) => {
        connection.end()
        response.send(utils.createResult(error, data))
    })
})

router.put('/:bedid', (request, response) => {
    const {bedid} = request.params
    const {beddingtype,categoryid} = request.body
    const connection = db.connect()
    const statement = `update Bedding set beddingtype = '${beddingtype}' and categoryid = ${categoryid} where bedid=${bedid}`
    connection.query(statement, (error, data) => {
        connection.end()
        response.send(utils.createResult(error, data))
    })
})

router.delete('/:bedid', (request, response) => {
    const {bedid} = request.params
    const connection = db.connect()
    const statement = `delete from Bedding where bedid = ${bedid}`
    connection.query(statement, (error, data) => {

        connection.end()
        response.send(utils.createResult(error, data))
        // delete the products from this category
        // const statement2 = `delete from Product where categoryId = ${id}`
        // connection.query(statement2, (error, data) => {
        //     connection.end()
        //     response.send(utils.createResult(error, data))
        // })
    })
})
module.exports=router