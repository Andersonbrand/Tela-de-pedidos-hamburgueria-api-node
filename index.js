const { res, req, json } = require('express')
const express = require('express')
const uuid = require('uuid')
const cors = require('cors')

const app = express()
const port = 3002
app.use(express.json())
app.use(cors())

const orders = []

const checkUserId = (req, res, next) => {
    const { id } = req.params
    const index = orders.findIndex(clientId => clientId.id === id)

    if (index < 0) {
        return res.status(404).json({ error: "Order Not Found" })
    }

    req.userIndex = index
    req.userId = id

    next()
}

const requests = (req, res, next) => {
    const method = req.route.methods
    const url = req.route.path
    console.log(method, url)

    next()
}

app.get('/orders', requests, (req, res) => {
    return res.json(orders)
})

app.post('/orders', requests, (req, res) => {
    const { order, clientName, price } = req.body
    const status = "Em preparação"

    const clientId = { id: uuid.v4(), order, clientName, price, status }

    orders.push(clientId)
    return res.status(201).json(clientId)
})

app.put('/orders/:id', checkUserId, requests, (req, res) => {
    const { order, clientName, price } = req.body
    const status = "Em preparação"
    const id = req.userId
    const index = req.userIndex

    const updatedUser = { id, order, clientName, price, status }

    orders[index] = updatedUser
    return res.json(updatedUser)

})

app.delete('/orders/:id', checkUserId, requests, (req, res) => {
    const index = req.userIndex

    orders.splice(index, 1)
    return res.status(204).json(orders)
})

app.get('/orders/:id', checkUserId, requests, (req, res) => {
    const index = req.userIndex
    const order = orders[index]

    return res.json(order)
})

app.patch('/orders/:id', checkUserId, requests, (req, res) => {
    const index = req.userIndex
    const { id, clientName, order, price } = orders[index]
    let status = orders[index].status
    status = "Pedido Pronto"
    const finishedOrder = { id, order, clientName, price, status }
    orders[index] = finishedOrder

    return res.json(finishedOrder)
})

app.listen(port, () => {
    console.log(`🚀Server started on port ${port}`)
})