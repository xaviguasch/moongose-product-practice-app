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
  size: {
    type: String,
    enum: ['S', 'M', 'L'],
  },
})

// Instance methods (Operate on the individual instance)
productSchema.methods.greet = function () {
  console.log('helloooooooooo!!!')
  console.log(`from ${this.name}`)
}

productSchema.methods.toggleOnSale = function () {
  this.onSale = !this.onSale
  return this.save()
}

productSchema.methods.addCategory = function (newCat) {
  this.categories.push(newCat)

  return this.save()
}

// Static methods (Operate on the model)
productSchema.statics.fireSale = function () {
  return this.updateMany({}, { onSale: true, price: 0 })
}

const Product = mongoose.model('Product', productSchema)

const findProduct = async () => {
  const foundProduct = await Product.findOne({ name: 'Soft Helmet' })
  console.log(foundProduct)
  await foundProduct.toggleOnSale()
  console.log(foundProduct)
  await foundProduct.addCategory('Outdoors')
  console.log(foundProduct)
}

// findProduct()

Product.fireSale().then((res) => console.log(res))

// const bike = new Product({
//   name: 'Cycling Jersey',
//   price: 28.5,
//   categories: ['Cycling'],
//   size: 'S',
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

// Product.findOneAndUpdate(
//   { name: 'Soft Helmet' },
//   { price: -5 },
//   { new: true, runValidators: true }
// )
//   .then((data) => {
//     console.log('IT WORKED!')
//     console.log(data)
//   })
//   .catch((err) => {
//     console.log('OH NO ERROR!!!')
//     console.log(err)
//   })
