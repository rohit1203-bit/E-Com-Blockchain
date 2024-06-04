const Product = require('../model/Product')
const User = require('../model/User')
const { convertToBase64 } = require('../helpers/convertToBase64')

// get all products
const getAll = async (req, res) => {
  try {
    const products = await Product.find({ isSold: false })
    res.json({
      results: products.length,
      data: {
        products
      },
      success: true
    })
  } catch (err) {
    console.error(err.message)
    res.json({
      results: 0,
      data: {
        error: err.message
      },
      success: false
    })
  }
}

// create Product
const create = async (req, res) => {
  const { name, email, price, description, owner, walletAd } = req.body
  const image = req?.file;
  let img = ""
  if (image) {
    const { buffer, mimetype } = image;
    img = await convertToBase64(buffer, mimetype);
  }
  try {
    const product = await Product.create({
      name, description, price, owner, image: img, walletAd
    })
    const user = await User.findOne({ email });
    user.created.push(product._id);
    await user.save();
    res.status(201).json({
      results: 0,
      data: {
        message: "Created Successfully",
      },
      success: true
    })
  } catch (err) {
    console.error(err.message)
    res.json({
      results: 0,
      data: {
        error: err.message
      },
      success: false
    })
  }
}

// buy product
const buy = async (req, res) => {
  const { owner, email } = req.body;
  const { id } = req.params
  try {
    const product = await Product.findOne({ _id: id });
    const user = await User.findOne({ email });
    product.isSold = true;
    product.owner = owner;
    await product.save();
    user.bought.push(product._id);
    await user.save();

    res.status(201).json({
      results: 0,
      data: {
        message: "Bought Successfully",
        product
      },
      success: true
    })

  } catch (err) {
    console.error(err)
    res.json({
      results: 0,
      data: {
        error: err.message
      },
      success: false
    })
  }
}

// get all created products
const getCreated = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    const products = await user.populate({ path: 'created' });

    res.json({
      results: products.created.length,
      data: {
        products: products.created
      },
      success: true
    });
  } catch (err) {
    console.error(err)
    res.json({
      results: 0,
      data: {
        error: err.message
      },
      success: false
    })

  }
}

// get all bought products
const getBought = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    const products = await user.populate({ path: 'bought' });

    res.json({
      results: products.bought.length,
      data: {
        products: products.bought
      },
      success: true
    });
  } catch (err) {
    console.error(err)
    res.json({
      results: 0,
      data: {
        error: err.message
      },
      success: false
    })

  }
}

module.exports = { getAll, create, buy, getCreated, getBought }
