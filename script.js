const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/my-online-store', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Product model
const Product = mongoose.model('Product', new mongoose.Schema({
  title: String,
  description: String,
  price: Number
}));

// Get all products
app.get('/api/products', async (req, res) => {
  const products = await Product.find();
  res.send(products);
});

// Create a new product
app.post('/api/products', async (req, res) => {
  const product = new Product(req.body);
  await product.save();
  res.send(product);
});

app.listen(3000, () => {
  console.log('Server started on http://localhost:3000');
});
