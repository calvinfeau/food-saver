const User = require('../models/user');
const jwt = require("jsonwebtoken");

const SECRET = process.env.SECRET;

module.exports = {
    myFoodItems,
    addToList,
    myListItems,
    addOneQty,
    substractOneQty,
    getItem,
    createItem,
    updateItem,
    deleteItem,
    addAllItems,
    addSelectedItems,
    saveRemainingItems,
    signup,
    login
};

async function myFoodItems(req, res) {
    try {
        await User.findById(req.user._id, function(err, user) {
            res.status(200).json(user)
        });
    } catch(err) {
        res.json({err})
    }
};

function addToList() {};

async function myListItems(req, res) {
    try {
        await User.findById(req.user._id, function(err, user) {
            res.status(200).json(user)
        });
    } catch(err) {
        res.json({err})
    }
};

function addOneQty() {};

function substractOneQty() {};

async function createItem(req, res) {
    // console.log('current user: ', req.user._id)
    try {
        await User.findById(req.user._id).then((user) => {
            // console.log('user found by mongoose:', user)
            req.body.inFood ? user.food.push(req.body) : -1;
            req.body.inList ? user.list.push(req.body) : -1;
            return user.save((item) => res.status(200).json(item))
        });
    } 
    catch(err) {res.json({err});}
};

async function getItem(req, res) {
    // console.log('getItem ID passed: ', req.params.itemId)
    try {
        await User.findById(req.user._id).then(user => {
            console.log('user: ', user)
            let item;
            req.params.locatedIn === 'inFood' ? item = user.food.id(req.params.itemId) :
            req.params.locatedIn === 'inList' ? item = user.list.id(req.params.itemId) : -1;
            // console.log('user found by mongoose: ', user);
            // console.log('what is return: ', user.food.id(req.params.itemId))
            console.log('item: ', item)
            return item;
        })
        .then((item) => {
            console.log('return by status 200.json()', item);
            return res.status(200).json(item)
        })
    }
    catch(err) {res.json({err})}
}

async function updateItem(req, res) {
    try {
        await User.findById(req.user._id).then(user => {
            console.log('item found by mongoose: ', req.params.itemId);
            console.log('what is given to mongo: ', req.body);
            console.log('req.body.inFood: ', req.body.inFood);
            if(req.body.inFood) {console.log('item found: ', user.food.id(req.params.itemId)); user.food.id(req.params.itemId).set(req.body); console.log('if 1')}
            console.log('req.body.inList: ', req.body.inList);
            if(req.body.inList) {console.log('item found: ', user.list.id(req.params.itemId)); user.list.id(req.params.itemId).set(req.body); console.log('if 2')}
            console.log('set passed');
            return user.save(item => res.status(200).json(item))
        })
    }
    catch(err) {
        console.log('err catch')
        res.json({err})}
};

async function deleteItem(req, res) {
    try {
        await User.findById(req.user._id).then(user => {
            let itemInFood = user.food.id(req.params.itemId);
            let itemInList= user.list.id(req.params.itemId);
            itemInFood ? itemInFood.remove() : -1;            
            itemInList ? itemInList.remove() : -1;            
            // console.log('remove() passed')
            return user.save(() => {
                return res.status(200).json()})
        })
    }
    catch(err) {
        // console.log('err catch')
        res.json({err})}
};

function addAllItems() {};

function addSelectedItems() {};

function saveRemainingItems() {};




// AUTH FUNCTIONS

async function signup(req, res) {
    const user = new User(req.body);
    try {
      await user.save();
      const token = createJWT(user);
      res.json({ token });
    } catch (err) {
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
  
function createJWT(user) {
    return jwt.sign({ user }, SECRET, { expiresIn: "24h" });
}