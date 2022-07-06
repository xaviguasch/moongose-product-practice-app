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

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: { type: Number },
})

const Product = mongoose.model('Product', productSchema)

const bike = new Product({ name: 'Mountain Bike', price: 599 })

bike
  .save()
  .then((data) => {
    console.log('IT WORKED!')
    console.log(data)
  })
  .catch((err) => {
    console.log('OH NO ERROR!!!')
    console.log(err)
  })
