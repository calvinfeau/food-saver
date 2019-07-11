var mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  category: {
    type: String,
    enum: ['Meats & Seafood', 'Fruits & Vegetables', 'Spices & Condiments', 'Dry & Packaged Food'],
    default: 'Dry & Packaged Food'
  },
  storage: {
    type: String,
    enum: ['Fridge', 'Freezer', 'Pantry'],
    default: 'Pantry'
  },
  qunatity: {
    type: Number,
    default: 1
  }
}, {
    timestamps: true
});

const myListSchema = new mongoose.Schema({
  items: [itemSchema]
});

const myFoodSchema = new mongoose.Schema({
  items: [itemSchema]
});

const userSchema = new mongoose.Schema({
    name: String,
    email: {
      type: String, 
      required: true, 
      lowercase: true, 
      unique: true
    },
    password: String,
    list: myListSchema,
    food: myFoodSchema
  }, {
    timestamps: true
});
  
module.exports = mongoose.model('User', userSchema);
