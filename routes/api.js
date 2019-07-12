var express = require('express');
var router = express.Router();
var usersController = require('../controllers/users');


/*---------- Public Routes ----------*/
router.post("/signup", usersController.signup);
router.post("/login", usersController.login);

router.use(require('../config/auth'));

/* --- Protected Routes ---*/
router.get('/myfood',checkAuth, usersController.myFoodItems);

// Transfert the item from My list to My food
router.put('/myfood', checkAuth, usersController.addAllItems);
router.put('/myfood/add', checkAuth, usersController.addSelectedItems);

router.get('/mylist', checkAuth, usersController.myListItems);
router.post('/mylist/add', checkAuth, usersController.addToList);
router.put('/mylist/save', checkAuth, usersController.saveRemainingItems);
router.put('/mylist/:itemId/add', checkAuth, usersController.addOneQty);
router.put('/mylist/:itemId/sub', checkAuth, usersController.substractOneQty);

router.post('/item/create', checkAuth, usersController.createItem);
router.delete('/item/delete/:itemId', checkAuth, usersController.deleteItem);
router.put('/item/:itemId', checkAuth, usersController.updateItem);


function checkAuth(req, res, next) {
  console.log('checkauth reached')
    if (req.user) {
      console.log(req.user)
      return next()
    };
    return res.status(401).json({msg: 'Not Authorized'});
  }

module.exports = router;