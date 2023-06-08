const passport = require("passport");
const Seller = require("../models/seller");

const LocalStrategy = require("passport-local").Strategy;

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
    },
    async function (email, password, done) {
        console.log(email);
      try {
        const seller = await Seller.findOne({ email: email });

        // console.log(seller);

        if (!seller || seller.password != password) {
          return done(null, false);
        }
        return done(null, seller);
      } catch (err) {
        console.log(err);
        return done(err);
      }
    }
  )
);

//serialize the seller
passport.serializeUser(function (seller, done) {
  done(null, seller._id);
});

//deserialize the seller
passport.deserializeUser(async function (id, done) {
  try{
    const seller = await Seller.findById(id);
    return done(null, seller);
  }catch(err){
    console.log(err);
        return done(err);
  }
});

//middleware for auth check
passport.checkAuthentication = function (req, res, next) {
  if (req.isAuthenticated) {
    return next();
  }

  return res.redirect("/");
};

//for setting authenticated seller in locals
passport.setAuthenticatedUser = function (req, res, next) {
  if (req.isAuthenticated) {
    // console.log('setAuth True');
    res.locals.seller = req.user;
    // console.log(req.user);
  }
  next();
};

module.exports = passport;