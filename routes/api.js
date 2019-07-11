var express = require('express');
var router = express.Router();
var usersController = require('../controllers/users');


/*---------- Public Routes ----------*/
router.post("/signup", usersController.signup);
router.post("/login", usersController.login);


/* --- Protected Routes ---*/
router.get('/myfood', usersController.myFoodItems);

// Transfert the item from My list to My food
router.put('/myfood/', usersController.addAllItems);
router.put('/myfood/add', usersController.addSelectedItems);

router.get('/mylist', usersController.myListItems);
router.post('/mylist/add', usersController.addToList);
router.put('/mylist/save', usersController.saveRemainingItems);
router.put('/mylist/:itemId/add', usersController.addOneQty);
router.put('/mylist/:itemId/sub', usersController.substractOneQty);

router.get('/item/create', usersController.createItem);
router.delete('/item/delete/:itemId', usersController.deleteItem);
router.put('/item/:itemId', usersController.updateItem);



module.exports = router;