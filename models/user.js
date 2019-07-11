const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const SALT_ROUNDS = 6;

// const itemSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true
//   },
//   category: {
//     type: String,
//     enum: ['Meats & Seafood', 'Fruits & Vegetables', 'Spices & Condiments', 'Dry & Packaged Food'],
//     default: 'Dry & Packaged Food'
//   },
//   storage: {
//     type: String,
//     enum: ['Fridge', 'Freezer', 'Pantry'],
//     default: 'Pantry'
//   },
//   qunatity: {
//     type: Number,
//     default: 1
//   }
// }, {
//     timestamps: true
// });

// const myListSchema = new mongoose.Schema({
//   items: [itemSchema]
// });

// const myFoodSchema = new mongoose.Schema({
//   items: [itemSchema]
// });

const userSchema = new mongoose.Schema({
    name: String,
    email: {
      type: String, 
      required: true, 
      lowercase: true, 
      unique: true
    },
    password: String,
    // list: myListSchema,
    // food: myFoodSchema
  }, {
    timestamps: true
});

userSchema.set("toJSON", {
  transform: function(doc, ret) {
    // remove the password property when serializing doc to JSON
    delete ret.password;
    return ret;
  }
});

userSchema.pre("save", function(next) {
  const user = this;
  if (!user.isModified("password")) return next();
  // password has been modified, so let's hash it!
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
