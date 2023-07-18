const express = require('express')
const uuid = require('uuid')
const cors = require('cors')

const app = express()
const port = 3002
app.use(express.json())
app.use(cors())

const orders = []

function ordersById(id) {
    return orders.filter(orders => orders.id == id)
}

const checkId = (request, response, next) => {
    const { id } = request.params
    const index = orders.findIndex(element => element.id === id)
    if (index < 0) {
        return response.status(404).json({ error: "Not Found" })
    }
    request.ordersIndex = index
    request.ordersId = id
    next()
}

const checkRequest = (request, response, next) => {
    const method = request.method

    const url = request.url

    console.log(`[${method}] - ${url} `)

    next()
}

app.get('/orders', (request, response) => {
    return response.json(orders)
})

app.post('/orders', (request, response) => {
    const { order, clientName, price, status } = request.body

    const user = { id: uuid.v4(), order, clientName, price, status }

    orders.push(user)

    return response.status(201).json(user)
})

app.put('/orders/:id', (request, response) => {
    const { id } = request.params
    const { order, clientName, price, status } = request.body

    const updateUsers = { id, order, clientName, price, status }

    const index = orders.findIndex(user => user.id === id)

    if (index < 0) {
        return response.status(404).json({ message: "User not found" })
    }

    orders[index] = updateUsers

    return response.json(updateUsers)
})

app.delete('/orders/:id', (request, response) => {
    const { id } = request.params

    const index = orders.findIndex(user => user.id === id)

    if (index < 0) {
        return response.status(404).json({ message: "User not found" })
    }

    orders.splice(index, 1)

    return response.status(204).json()
})

app.get('/orders/:id', (request, response) => {
    return response.json(ordersById(request.params.id))
})

app.patch("/order/:id", checkId, checkRequest, (request, response) => {
    const index = request.ordersIndex

    orders[index].ordersStatus = "Pronto"
    
    return response.json(orders[index])
})

app.listen(port, () => {
    console.log(`🚀Server started on port ${port}`)
})