const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const SALT_ROUNDS = 6;

const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  category: {
    type: String,
    enum: ['Meats & Seafood', 'Fruits & Vegetables', 'Spices & Condiments', 'Dairy'],
    default: 'Meats & Seafood'
  },
  storage: {
    type: String,
    enum: ['Fridge', 'Freezer', 'Pantry'],
    default: 'Fridge'
  },
  inFoodQty: {
    type: Number,
    default: 0
  },
  inListQty: {
    type: Number,
    default: 0
  },
  inFood: Boolean,
  inList: Boolean,
  selected: {
    type: Boolean,
    default: false
  }
}, {
    timestamps: true
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
    food: [itemSchema]
  }, {
    timestamps: true
});


// USER AUTHENTICATION 

userSchema.set("toJSON", {
  transform: function(doc, ret) {
    delete ret.password;
    return ret;
  }
});
userSchema.pre("save", function(next) {
  const user = this;
  if (!user.isModified("password")) return next();
  bcrypt.hash(user.password, SALT_ROUNDS, function(err, hash) {
    if (err) return next(err);
    user.password = hash;
    next();
  });
});
userSchema.methods.comparePassword = function(tryPassword, cb) {
  bcrypt.compare(tryPassword, this.password, cb);
};


module.exports = mongoose.model('User', userSchema);