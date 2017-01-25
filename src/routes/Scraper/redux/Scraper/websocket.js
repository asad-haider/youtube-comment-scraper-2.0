import io from 'socket.io-client'

export default () => {
  const socket = io('http://localhost:3000')

  return {
    on: (event, handler) => socket.on(event, handler),
    emit: socket.emit.bind(socket),
    close: socket.close.bind(socket)
  }
}
