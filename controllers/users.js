const User = require('../models/user');
const jwt = require("jsonwebtoken");

const SECRET = process.env.SECRET;

module.exports = {
    myFoodItems,
    addToList,
    myListItems,
    addOneQty,
    substractOneQty,
    createItem,
    updateItem,
    deleteItem,
    addAllItems,
    addSelectedItems,
    saveRemainingItems,



    signup,
    login
};

function myFoodItems() {};

function addToList() {};

function myListItems() {};

function addOneQty() {};

function substractOneQty() {};

function createItem() {};

function updateItem() {};

function deleteItem() {};

function addAllItems() {};

function addSelectedItems() {};

function saveRemainingItems() {};




// AUTH FUNCTIONS

async function signup(req, res) {
    console.log("hit");
    const user = new User(req.body);
    try {
      await user.save();
      // TODO: Send back a JWT instead of the user
      const token = createJWT(user);
      res.json({ token });
    } catch (err) {
      // Probably a duplicate email
      res.status(400).json(err);
    }
  }

async function login(req, res) {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) return res.status(401).json({ err: "bad credentials" });
        user.comparePassword(req.body.pw, (err, isMatch) => {
        if (isMatch) {
            const token = createJWT(user);
            res.json({ token });
        } else {
            return res.status(401).json({ err: "bad credentials" });
        }
        });
    } catch (err) {
        return res.status(401).json(err);
    }
}
  
  /* --- Helper Functions ---- */
function createJWT(user) {
    return jwt.sign({ user }, SECRET, { expiresIn: "24h" });
}