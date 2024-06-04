const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
  name: {
    type: String,
  },
  image: {
    type: String,
    default: ''
  },
  description: {
    type: String
  },
  price: {
    type: Number
  },
  owner: {
    // owner name
    type: String,
    default: ''
  },
  walletAd: {
    // owner wallet address
    type: String,
    default: ''
  },
  isSold: {
    type: Boolean,
    default: false
  }
})

const Product = mongoose.model('product', productSchema);
module.exports = Product;