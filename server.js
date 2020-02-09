// require
const io = require('socket.io')(3000)

// list of users
const users = {}

io.on('connection', socket => {
    // new user
    socket.on('new-user', name => {
        users[socket.id] = name
        socket.broadcast.emit('user-connected', name)
    })
    // sending message to all
    socket.on('send-chat-message', message => {
        socket.broadcast.emit('chat-message', { message: message, name: users[socket.id]})
    })
    // disconnect and clearing from list
    socket.on('disconnect', () => {
        socket.broadcast.emit('user-disconnected', users[socket.id])
        delete users[socket.id]
    })
})