const User = require('../models/user');
const jwt = require("jsonwebtoken");

const SECRET = process.env.SECRET;

module.exports = {
    myFoodItems,
    addToList,
    myListItems,
    addOne,
    subOne,
    getItem,
    createItem,
    updateItem,
    deleteItem,
    addAllItems,
    editSelectedItem,
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

async function myListItems(req, res) {
    try {
        await User.findById(req.user._id, function(err, user) {
            res.status(200).json(user)
        });
    } catch(err) {
        res.json({err})
    }
};

async function subOne(req, res) {
    try {
        await User.findById(req.user._id)
        .then(user => {
            user.food.id(req.params.itemId).inListQty--;
            return user.save(item => {
                console.log('passe into save: ', item)
                return res.status(200).json(item)})
        })
    } 
    catch(err) {
        console.log('err catched in addOne')
        res.json({err})
    }
};

async function createItem(req, res) {
    // console.log('current user: ', req.user._id)
    try {
        await User.findById(req.user._id).then((user) => {
            // console.log('user found by mongoose:', user)
            user.food.push(req.body);
            // req.body.inList ? user.list.push(req.body) : -1;
            return user.save((item) => res.status(200).json(item))
        });
    } 
    catch(err) {
        console.log('err catched in createItem')
        res.json({err})
    }
};

async function getItem(req, res) {
    // console.log('getItem ID passed: ', req.params.itemId)
    try {
        await User.findById(req.user._id).then(user => {
            // console.log('user: ', user)
            // let item;
            // req.params.locatedIn === 'inFood' ? item = user.food.id(req.params.itemId) :
            // req.params.locatedIn === 'inList' ? item = user.list.id(req.params.itemId) : -1;
            // console.log('user found by mongoose: ', user);
            // console.log('what is return: ', user.food.id(req.params.itemId))
            // console.log('item: ', item)
            return user.food.id(req.params.itemId);
        })
        .then((item) => {
            // console.log('return by status 200.json()', item);
            return res.status(200).json(item)
        })
    }
    catch(err) {
        console.log('err catched in getItem')
        res.json({err})
    }
}


async function updateItem(req, res) {
    try {
        await User.findById(req.user._id).then(user => {
            // console.log('item found by mongoose: ', req.params.itemId);
            // console.log('what is given to mongo: ', req.body);
            // console.log('req.body.inFood: ', req.body.inFood);
            // if(req.body.inFood) {console.log('item found: ', user.food.id(req.params.itemId)); 
            user.food.id(req.params.itemId).set(req.body); 
            // console.log('What is set applied on: ', user.food.id(req.params.itemId));
            // if(req.body.inList) {console.log('item found: ', user.list.id(req.params.itemId)); user.list.id(req.params.itemId).set(req.body); console.log('if 2')}
            // console.log('set passed');
            return user.save(item => {
                // console.log('item return by controller', item)
                return res.status(200).json(item)
            })
        })
    }
    catch(err) {
        // console.log('err catch in update item')
        res.json({err})}
};

async function deleteItem(req, res) {
    try {
        await User.findById(req.user._id).then(user => {
            user.food.id(req.params.itemId).remove();    
            // console.log('remove() passed')
            return user.save(() => {
                return res.status(200).json()})
        })
    }
    catch(err) {
        console.log('err catch in deleteitem')
        res.json({err})}
};

async function addAllItems(req, res) {
    try {
        await User.findById(req.user._id).then(user => {
            user.food.forEach(f => {
                f.inList = false;
                f.inFood = true;
                f.inFoodQty += f.inListQty;
                f.inListQty = 0;
            })
            return user.save(() => res.status(200).json())
        })
    }
    catch(err) {
        console.log('err catch in deleteitem')
        res.json({err})}
};

async function addToList(req, res) {
    try {
        await User.findById(req.user._id).then(user => {
            // console.log('VALUE OF INLIST', user.food.id(req.params.itemId).inList);
            user.food.id(req.params.itemId).inList = true;
            user.food.id(req.params.itemId).inListQty = 1;
            return user.save(item => {
                // console.log('passe into save: ', item)
                return res.status(200).json(item)})
        })
    }
    catch(err) {
        console.log('err catched in addToList')
        res.json({err})
    }
}

async function addOne(req, res) {
    try {
        await User.findById(req.user._id)
        .then(user => {
            user.food.id(req.params.itemId).inListQty++;
            return user.save(item => {
                console.log('passed into save on addOne: ', item)
                return res.status(200).json(item)
            })
        })
    } 
    catch(err) {
        console.log('err catched in addOne')
        res.json({err})
    }
};

async function editSelectedItem(req, res) {
    try {
        await User.findById(req.user._id).then(user => {
            user.food.id(req.params.itemId).selected = !user.food.id(req.params.itemId).selected;
            return user.save(item => {
                console.log('passed into save on editSelectedItem: ', item)
                return res.status(200).json(item)
            })
        })
    }
    catch(err) {
        console.log('err catched in addToList')
        res.json({err})
    }
};

async function addSelectedItems(req, res) {
    try {
        await User.findById(req.user._id).then(user => {
            user.food.forEach(item => {
                item.selected ? 
                (item.selected = false,
                item.inList = false,
                item.inFood = true,
                item.inFoodQty += item.inListQty,
                item.inListQty = 0)
                : -1;
            })
            return user.save(item => {
                console.log('passed into save on addOne: ', item)
                return res.status(200).json(item)
            })
        })
    }
    catch(err) {
        console.log('err catched in addSelectedItems')
        res.json({err})
    }
};

async function saveRemainingItems(req, res) {
    try {
        await User.findById(req.user._id).then(user => {
            req.params.choice === 'no' ? user.food.forEach(f => f.inList === true ? user.food.id(f._id).remove() : -1) : -1;
            return user.save(item => {
                console.log('passed into save on addOne: ', item)
                return res.status(200).json(item)
            })
        })
    }
    catch(err) {
        console.log('err catched in saveRemainingItems')
        res.json({err})
    }
};




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