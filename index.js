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
    maxLength: 20,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  onSale: {
    type: Boolean,
    default: false,
  },
  categories: [String],
  qty: {
    online: {
      type: Number,
      default: 0,
    },
    inStore: {
      type: Number,
      default: 0,
    },
  },
})

const Product = mongoose.model('Product', productSchema)

// const bike = new Product({
//   name: 'Soft Helmet',
//   price: 30.5,
//   categories: ['Cycling', 'Safety'],
// })

// bike
//   .save()
//   .then((data) => {
//     console.log('IT WORKED!')
//     console.log(data)
//   })
//   .catch((err) => {
//     console.log('OH NO ERROR!!!')
//     console.log(err)
//   })

Product.findOneAndUpdate(
  { name: 'Soft Helmet' },
  { price: -5 },
  { new: true, runValidators: true }
)
  .then((data) => {
    console.log('IT WORKED!')
    console.log(data)
  })
  .catch((err) => {
    console.log('OH NO ERROR!!!')
    console.log(err)
  })
