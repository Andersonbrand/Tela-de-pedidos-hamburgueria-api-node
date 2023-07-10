const express = require('express')
const uuid = require('uuid')

const app = express()
const port = 3002
app.use(express.json())

const orders = []


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
    const { id } = request.params
    const { order, clientName, price, status } = request.body
    
    const specificUser = { id, order, clientName, price, status }

    return response.json(specificUser)
})

app.patch('/orders/:id :status',  (request, response) => {
    const { id } = request.params
    const { order, clientName, price, status } = request.body
    
    const specificUser = { id, order, clientName, price, newStatus }

    const newStatus = {status: "Pedido finalizado"}

    return response.json(specificUser)
})

app.listen(3002, () => {
    console.log(`🚀Server started on port ${port}`)
})