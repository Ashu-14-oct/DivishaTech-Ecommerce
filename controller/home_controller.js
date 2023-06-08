const Category = require("../models/category");
const Subcategory = require("../models/subcategories");
const Inventory = require("../models/inventory");

module.exports.home = async function (req, res) {
  if (req.isAuthenticated()) {
    const categories = await Category.find({seller: req.user._id});
    const subcategories = await Subcategory.find({seller: req.user._id});
    const inventory = await Inventory.find({seller: req.user._id});

    return res.render("home.ejs", {
      title: "Dashboard",
      categories: categories,
      subcategories: subcategories,
      inventory: inventory,
    });
  }
  return res.render("home.ejs", {
    title: "Home",
  });

};

