const grpc = require('grpc')
const protoLoader = require('@grpc/proto-loader')

const contractPrototype = protoLoader.loadSync('hello.proto', { keepCase: true, longs: String, enums: String, defaults: true, oneofs: true })
const NoteService = grpc.loadPackageDefinition(contractPrototype).NoteService

// const NoteService = grpc.load('hello.proto').NoteService
const client = new NoteService('localhost:50500', grpc.credentials.createInsecure())

console.log(client.list({}, (error, notes) => {
  if (!error) {
    console.log('successfully fetch List notes')
    console.log(notes)
  } else {
    console.error(error)
  }
}))