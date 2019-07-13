var express = require('express');
var router = express.Router();
var usersController = require('../controllers/users');


/*---------- Public Routes ----------*/
router.post("/signup", usersController.signup);
router.post("/login", usersController.login);

router.use(require('../config/auth'));

router.get('/myfood',checkAuth, usersController.myFoodItems);
router.put('/myfood', checkAuth, usersController.addAllItems);
router.put('/myfood/add', checkAuth, usersController.addSelectedItems);

router.get('/mylist', checkAuth, usersController.myListItems);
router.post('/mylist/add', checkAuth, usersController.addToList);
router.put('/mylist/save', checkAuth, usersController.saveRemainingItems);
router.put('/mylist/:itemId/add', checkAuth, usersController.addOneQty);
router.put('/mylist/:itemId/sub', checkAuth, usersController.substractOneQty);

router.post('/create', checkAuth, usersController.createItem);
router.delete('/item/delete/:itemId', checkAuth, usersController.deleteItem);
router.get('/item/:itemId', checkAuth, usersController.getItem);
router.put('/item/:itemId/edit', checkAuth, usersController.updateItem);


function checkAuth(req, res, next) {
    if (req.user) {
      console.log('user authenticated')
      return next()
    };
    return res.status(401).json({msg: 'Not Authorized'});
  }

module.exports = router;