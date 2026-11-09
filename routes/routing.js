const express = require('express');
const userRouter = express.Router();
const controllers = require('../controllers/controllers')
userRouter.get('/', controllers.home);
userRouter.get('/products', controllers.product);
userRouter.get('/sell', controllers.sellProductPage);
userRouter.post('/sell', controllers.addProduct);
userRouter.get('/manageProducts', controllers.manageProducts);
userRouter.get('/edit-product/:id', controllers.getEditProduct);
userRouter.post('/edit-product/:id', controllers.postEditProduct);
userRouter.post('/products/delete/:id', controllers.deleteProduct);
userRouter.get('/login', controllers.login);
userRouter.post('/login', controllers.login);
module.exports = userRouter;