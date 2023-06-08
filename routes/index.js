const express = require('express');
const router = express.Router();
const passport = require('passport');

const homeController = require('../controller/home_controller');
const sellerController = require('../controller/seller_controller');

// log In / sign In routes
router.get('/', homeController.home);
router.post('/create-seller', sellerController.createSeller);
router.get('/seller/sign-in',sellerController.signInForm);
router.get('/user/sign-out', sellerController.signOut);
router.post('/login', passport.authenticate('local', {failureRedirect: '/'}),sellerController.login)

//dashboard routes
router.post('/dashboard/store-info', sellerController.storeInfo);
router.post('/dashboard/add-category', sellerController.addCategory);
router.post('/dashboard/add-subcategory', sellerController.addSubCategory);
router.post('/dashboard/add-inventory', sellerController.addInventory);

//search item
router.get('/search', sellerController.search);

module.exports = router;

