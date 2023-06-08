const Seller = require('../models/seller');
const Category = require('../models/category');
const Subcategory = require('../models/subcategories');
const Inventory = require('../models/inventory');
const Store = require('../models/store');

module.exports.createSeller = async function(req, res){
    try{
        if(req.body.password !== req.body.confirmpassword){
            return res.redirect('/');
        }
        //search db if seller is already made
        const seller = await Seller.findOne({email: req.body.email});
        
        if(seller){
            console.log('seller already made');
           return res.redirect('/'); 
        }

        //create seller cause they are not registered
        const newSeller = await Seller.create({
            email: req.body.email,
            businessName: req.body.businessName,
            password: req.body.password
        });


        // console.log(newSeller);

        req.login(newSeller, (err) => {
            if (err) {
              console.log(err);
              return res.redirect('/');
            }
            return res.redirect('/');
          });
        
    }catch(err){
        console.log(err);
        return;
    }
}
//sign in form endpoint
module.exports.signInForm = function (req, res) {
    res.render('signIn.ejs',{
        title: 'Sign In'
    });
};

//log in
module.exports.login = function (req, res) {
    return res.redirect("/");
};

//sign out
module.exports.signOut = function(req, res){
    req.logout(function(err) {
        if(err){
            return;
        }
        res.redirect('/');
    })
}

//add store info
module.exports.storeInfo = async function(req, res){
    try{
        const store = await Store.create({
            businessName: req.body.businessName,
            address: req.body.address,
            gst: req.body.gst,
            logo: req.body.logo,
            storeTimings: req.body.storeTimings,
            seller: req.user._id,
        });
        req.user.storeInfo = true;
        res.locals.storeInfo = req.user.storeInfo;
        console.log(req.user.storeInfo);
        console.log(store);
        res.redirect('/');
    }catch(err){
        console.log(err);
        return;
    }
}

//add category
module.exports.addCategory = async function(req, res){

    const category = await Category.create({
        categoryName: req.body.categoryName,
        seller: req.user._id
    });

    console.log(category);
    res.redirect('/');
}

//add subcategory
module.exports.addSubCategory = async function(req, res){
    const subcategory = await Subcategory.create({
        subcategoryName: req.body.subcategoryName,
        category : req.body.categoryId,
        seller: req.user._id
    });
    console.log(subcategory);
    res.redirect('/');
}

//add item to inventory
module.exports.addInventory = async function (req, res) {
    try{
        const inventory = await Inventory.create({
            productName: req.body.productName,
            mrp: req.body.mrp,
            sp: req.body.sp,
            quantity: req.body.quantity,
            imageUrls: req.body.imageUrls,
            category: req.body.categoryId,
            subcategory: req.body.subcategoryId,
            seller: req.user._id,
        });

        console.log(inventory);
        res.redirect('/');
    }catch(err){
        console.log(err);
        return res.send('<h1>internal server error</h2>');
    }

}

//search item in db
module.exports.search = async function(req, res){
    try{
        // console.log(req.query.searchText);
        const searchText = req.query.searchText;
        const products = await Inventory.find({ productName: {$regex: searchText, $options: 'i'} });
        res.render('search', {
            products: products,
            title: 'Search result'
        });
    }catch(err){
        console.log(err);
        return res.send('<h1>internal server error</h2>');
    }
}