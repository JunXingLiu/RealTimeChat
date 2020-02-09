const socket = io('http://localhost:3000')
const messageForm = document.getElementById("send-container")
const messageContainer = document.getElementById("message-container")
const messageInput = document.getElementById("message-input")

// get the name of the new user
const name = prompt('What is your name?')
appendMessage('You joined')
socket.emit('new-user', name)

// sending the message to all
socket.on('chat-message', data => {
    appendMessage(`${data.name}: ${data.message}`)
})

// notify a new user has joined
socket.on('user-connected', name => {
    appendMessage(`${name} connected`)
})

// notify user has disconnected
socket.on('user-disconnected', data => {
    appendMessage(`${name} disconnected`)
})

// prevent refresh when hit submit
messageForm.addEventListener('submit', e => {
    e.preventDefault()
    const message = messageInput.value
    appendMessage(`You: ${message}`)
    socket.emit('send-chat-message', message)
    messageInput.value = ''
})

// create new message div
function appendMessage(message) {
    const messageElement = document.createElement('div')
    messageElement.innerText = message
    messageContainer.append(messageElement)
}