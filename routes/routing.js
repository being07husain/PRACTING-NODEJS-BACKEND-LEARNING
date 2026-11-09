const express = require('express');
const userRouter = express.Router();
const controllers = require('../controllers/controllers')
userRouter.get('/', controllers.login);
userRouter.get('/home', controllers.home);
userRouter.get('/products', controllers.product);
userRouter.get('/sell', controllers.sellProductPage);
userRouter.post('/sell', controllers.addProduct);
userRouter.get('/manageProducts', controllers.manageProducts);
userRouter.get('/edit-product/:id', controllers.getEditProduct);
userRouter.post('/edit-product/:id', controllers.postEditProduct);
userRouter.post('/products/delete/:id', controllers.deleteProduct);
userRouter.get('/login', controllers.login);
userRouter.post('/home', controllers.postlogin);
userRouter.get('/logout', controllers.logout);
module.exports = userRouter;