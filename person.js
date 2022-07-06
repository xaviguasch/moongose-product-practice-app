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

personSchema.pre('save', async function () {
  // this.first = 'YO'
  // this.last = 'MAMA'
  console.log('ABOUT TO SAVE')
})
personSchema.post('save', async function () {
  console.log('JUST SAVED')
})

const Person = mongoose.model('Person', personSchema)
