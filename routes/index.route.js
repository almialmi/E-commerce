const express = require('express');
const router = express.Router();
const jwtHelper = require('../config/jwtHelper');
const ctrlAdmin = require('../controllers/user.controller');
const ctrlProduct = require('../controllers/product.controllers'); 

/*********************User Section*********************** */
router.post('/registerAdmin',ctrlAdmin.AdminRegister);

router.post('/registerCustomer',ctrlAdmin.customerRegister);

router.post('/userLogin',ctrlAdmin.userLogin);

router.get('/fetchOwnProfile',jwtHelper.verifyJwtToken,ctrlAdmin.grantAccess("readOwn","profile"),ctrlAdmin.fetchOwnProfile);

/*********************Product Section******************** */
router.get('/check',ctrlAdmin.check);

router.post('/createProduct',jwtHelper.verifyJwtToken,ctrlAdmin.grantAccess("createAny","product"),ctrlProduct.registerProduct);

router.get('/fetchAllProducts',ctrlProduct.fetchProductByCategory);

router.get('/fetchProductDetail/:id',ctrlProduct.productDetail);

router.post('/addComment',ctrlAdmin.addComment);

router.get('/fetchAllComment',jwtHelper.verifyJwtToken,ctrlAdmin.grantAccess("readAny","comment"),ctrlAdmin.fetchAllComment);



module.exports = router
