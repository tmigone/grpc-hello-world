const grpc = require('grpc')
const protoLoader = require('@grpc/proto-loader');

const contractPrototype = protoLoader.loadSync('hello.proto', { keepCase: true, longs: String, enums: String, defaults: true, oneofs: true })
const contract = grpc.loadPackageDefinition(contractPrototype)

const notes = [
  { id: '1', title: 'Note 1', content: 'Content 1' },
  { id: '2', title: 'Note 2', content: 'Content 2' }
]

const server = new grpc.Server()
server.addService(contract.NoteService.service, { list: function(call, callback) { 
  console.log(notes)
  callback(null, {notes}) 
} })
server.bind('127.0.0.1:50500', grpc.ServerCredentials.createInsecure())
console.log('Starting server...')
server.start()