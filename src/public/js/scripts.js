const socket = io()

let user = ''
let chatBox = document.querySelector('#chatBox')

Swal.fire({
  title: 'Log In',
  input: 'text',
  text: 'Username',
  inputValidator: (value) => {
    return !value && 'Please enter a username to continue'
  },
  allowOutsideClick: false
}).then( result => {
  user = result.value
  socket.emit('userLoggedIn', `${user}` )
  console.log(`User ${user} is logged in`)
})

chatBox.addEventListener('keyup', (e) => {
  if(e.key === 'Enter') {
    if(chatBox.value.trim().length > 0) {
      socket.emit('message', {
        user: user,
        message: chatBox.value
      })
      chatBox.value = ''
    }
  }  
})

socket.on('messageLogs', data => {
  let log = document.querySelector('#messagesLogs')
  let messages = ''
  data.forEach( message => {
    messages += `${message.user}: ${message.message} </br>`
  });
  log.innerHTML = messages
  // console.log('Data incoming')
}) 

socket.on('newUserLoggedIn', data => {
  console.log(data)
  Swal.fire({
    text: `${data} has logged in`,
    toast: 'true',
    position: 'top-right'
  })
})