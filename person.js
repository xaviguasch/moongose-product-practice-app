const mongoose = require('mongoose')
mongoose
  .connect('mongodb://localhost:27017/shopApp')
  .then((result) => {
    console.log('connection open!')
  })
  .catch((error) => {
    console.log('Oh no error!!!')
    console.log(error)
  })

const personSchema = new mongoose.Schema({
  first: String,
  last: String,
})

personSchema.virtual('fullName').get(function () {
  return `${this.first} ${this.last}`
})

const Person = mongoose.model('Person', personSchema)
