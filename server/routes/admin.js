const express = require('express');

const router = express.Router();

const isAuth = require('../middlewares/is-auth');
const adminController = require('../controller/admin');

router.post('/signup', adminController.postAdminSignup);

router.post('/signin', adminController.postAdminSignin);

router.get('/products', isAuth, adminController.getProducts);

router.post('/search', isAuth, adminController.postSearchProducts);

router.get('/chatrooms', adminController.getAllChatRooms);

router.get('/chatrooms/getById', adminController.getChatRoomById);

router.get('/clients', adminController.getClients);

router.get('/orders', adminController.getOrders);

router.post('/new-product', adminController.postNewProduct);

router.post('/delete-product', adminController.postDeleteProduct);

router.get('/edit-product/:prodId', isAuth, adminController.getEditProduct);

router.post('/edit-product/:prodId', isAuth, adminController.postEditProduct);

module.exports = router;
