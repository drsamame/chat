import express from 'express'
import logger from 'morgan'

import { Server } from 'socket.io'
import { createServer } from 'node:http'

const port = process.env.PORT ?? 3000
const app = express()
const server = createServer(app)
const io = new Server(server, {
    connectionStateRecoveryTimeout:{}
})

io.on('connection', (socket) => {
    console.log('a user connected')
    socket.on('disconnect', () => {
        console.log('user disconnected')
    })
    socket.on('chat message', (chatMessage) => {
        console.log('message:' + chatMessage)
        io.emit('chat message', chatMessage)
    })
})

app.use(logger('dev'))



app.get('/', (req, res) => {
    res.sendFile(process.cwd() + '/client/index.html')
})



server.listen(port, () => {
    console.log(`Server is running on port ${port}`)
}) 