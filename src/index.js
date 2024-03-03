//importing libraries
const express = require("express");
const path = require("path");
const bcrypt = require("bcrypt");
const collection = require("./config");
const exp = require("constants");
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
const crypto = require('crypto');
const flash = require('express-flash');
const methodOverride = require("method-override");

let data = {};

const app = express();

//convert data to json format
app.use(express.json());

app.use(express.urlencoded({ extended: false }));

// Generate a random secret key
const secretKey = crypto.randomBytes(32).toString('hex');

// Configure express-session middleware
app.use(session({
  secret: secretKey,
  resave: true,
  saveUninitialized: true
}));

// Use method-override middleware
app.use(methodOverride('_method'));

// Configure express-flash middleware
app.use(flash());

//passport middleware
app.use(passport.initialize());
app.use(passport.session());



//use EJS as the view engine
app.set('view engine', 'ejs');

//static file path
app.use(express.static("public"));

//routes
// Add a route to render the login page with error messages if needed

app.get("/home", checkNotAuthenticated, (req, res) => {
  res.render("home");
});

// app.get("/dashboard", checkNotAuthenticated, (req, res) => {
//   res.render("dashboard ");
// });

//app.get("/deposit", checkNotAuthenticated, (req, res) => {
 // res.render("deposit");
//});
app.get("/", checkNotAuthenticated, (req, res) => {
  res.render("index");
});

app.get("/about", checkNotAuthenticated, (req, res) => {
  res.render("about");
});

app.get("/contact", checkNotAuthenticated, (req, res) => {
  res.render("contact");
});

app.get('/login', checkNotAuthenticated, (req, res) => {
  res.render('login', { message: req.flash('error') });
});

app.get("/signup", checkNotAuthenticated, (req, res) => {
  res.render("signup");
});
// app.get("/index",checkAuthenticated, (req,res) => {
//     res.render("index", { name: data.name });
// });

// Route for deposit
app.get("/deposit", checkAuthenticated, async (req, res) => {
  try {
    const userId = req.user.id;

    // Fetch user data from MongoDB using the user ID
    const userData = await collection.findById(userId);

    if (!userData) {
      return res.status(404).send("User not found");
    }

    // Pass user data to the view, including the updated amount2
    res.render("deposit", { name: userData.name, 
      amount: userData.amount,
       totalProfit: userData.totalProfit, 
       bonus: userData.bonus, 
       refBonus: userData.refBonus,
       totalDeposit: userData.totalDeposit,
       totalWithdrawal: userData.totalWithdrawal,
       bitcoin: userData.bitcoin,
       ethereum: userData.ethereum,
       usdt: userData.usdt,
       bnb: userData.bnb,
       solana: userData.solana,
       xrp: userData.xrp,
       trx: userData.trx,
       dodge: userData.dodge,
       usdc: userData.usdc,
       bch: userData.bch,
       shibainu: userData.shibainu,
       arb: userData.arb,
       tia: userData.tia,
       matic: userData.matic
      });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});


// Route for withdraw
app.get("/withdraw", checkAuthenticated, async (req, res) => {
  try {
    const userId = req.user.id;

    // Fetch user data from MongoDB using the user ID
    const userData = await collection.findById(userId);

    if (!userData) {
      return res.status(404).send("User not found");
    }

    // Pass user data to the view, including the updated amount2
    res.render("withdraw", { name: userData.name, 
      amount: userData.amount,
       totalProfit: userData.totalProfit, 
       bonus: userData.bonus, 
       refBonus: userData.refBonus,
       totalDeposit: userData.totalDeposit,
       totalWithdrawal: userData.totalWithdrawal,
      });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});



app.get("/dashboard", checkAuthenticated, async (req, res) => {
  try {
    const userId = req.user.id;

    // Fetch user data from MongoDB using the user ID
    const userData = await collection.findById(userId);

    if (!userData) {
      return res.status(404).send("User not found");
    }


    

    // Pass user data to the view, including the updated amount2
    res.render("dashboard", { name: userData.name, 
      amount: userData.amount,
       totalProfit: userData.totalProfit, 
       bonus: userData.bonus, 
       refBonus: userData.refBonus,
       totalDeposit: userData.totalDeposit,
       totalWithdrawal: userData.totalWithdrawal,
       bitcoin: userData.bitcoin
      });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});



// Route for projectview
app.get("/profitview", checkAuthenticated, async (req, res) => {
  try {
    const userId = req.user.id;

    // Fetch user data from MongoDB using the user ID
    const userData = await collection.findById(userId);

    if (!userData) {
      return res.status(404).send("User not found");
    }

    // Pass user data to the view, including the updated amount2
    res.render("profitview", { name: userData.name, 
      amount: userData.amount,
       totalProfit: userData.totalProfit, 
       bonus: userData.bonus, 
       refBonus: userData.refBonus,
       totalDeposit: userData.totalDeposit,
       totalWithdrawal: userData.totalWithdrawal,
      });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});


// // Assuming you have the user's ID (userId) and the new amount (newAmount)
// async function updateAmount(userId, newAmount) {
//   try {
//     await collection.findByIdAndUpdate(userId, { $set: { amount: newAmount } });
//   } catch (error) {
//     console.error("Error updating amount:", error);
//   }
// }

// //Register User
// app.post("/signup", async(req,res) => {
//      data = {
//         //name:req.body.username,
//         id: Date.now().toString(),
//         name:req.body.name,
//         phonenumber:req.body.number,
//         email:req.body.email,
//         password:req.body.password,
//         country:req.body.countries
//     }

//     //check if user already exists
//     const existingUser = await collection.findOne({email: data.email});

//     if(existingUser){
//         res.send("Email already exists. Please Login");
//     }else{     
//         //hash the password using bcrypt
//         const saltRounds = 10;//number of salt rounds in bcrypt
//         const hashedPassword = await bcrypt.hash(data.password, saltRounds);

//         data.password = hashedPassword; //Replace the hashed password with original password

//     const userdata = await collection.insertMany(data);
//     console.log(userdata);
//         res.redirect("/");
//     }

// });

//Register User
app.post("/signup", checkNotAuthenticated, async (req, res) => {
  data = {
    username: req.body.username,
    // id: Date.now().toString(),
    name: req.body.name,
    phonenumber: req.body.number,
    email: req.body.email,
    password: req.body.password,
    country: req.body.countries,
  }

  try {
    // Check if user already exists
    const existingUser = await collection.findOne({ email: data.email });
    const existingUserName = await collection.findOne({ username: data.username });

    if (existingUser) {
      req.flash("error", "Email already exists. Please Login");
      return res.redirect("/signup");
    }
    if (existingUserName) {
      req.flash("error", "Username already exists. Please try another");
      return res.redirect("/signup");
    }

    // Hash the password using bcrypt
    const saltRounds = 10; // number of salt rounds in bcrypt
    const hashedPassword = await bcrypt.hash(data.password, saltRounds);

    data.password = hashedPassword; // Replace the hashed password with the original password

    const userdata = await collection.insertMany(data);
    console.log(userdata);
    req.flash("success", "Registration Successful");
    res.redirect("/login");
  } catch (err) {
    console.error(err);
    req.flash("error", "An error occurred during registration.");
    res.redirect("/signup");
  }
});



//passport initialization

passport.use(new LocalStrategy(
  { usernameField: 'email' }, // or 'username' if that's the field you're using
  async (email, password, done) => {
    try {
      const user = await collection.findOne({ email });

      if (!user) {
        return done(null, false, { message: 'User not found, please signup.' });
      }

      const isPasswordMatch = await bcrypt.compare(password, user.password);

      if (!isPasswordMatch) {
        return done(null, false, { message: 'Incorrect password.' });
      }

      return done(null, user);
    } catch (err) {
      return done(err);
    }
  }
));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await collection.findOne({ _id: id });
    done(null, user);
  } catch (err) {
    done(err);
  }
});

//implement passport in login route
app.post('/login', checkNotAuthenticated, passport.authenticate('local', {
  successRedirect: '/dashboard',
  failureRedirect: '/',
  failureFlash: true // Enable flash messages for error handling
}));

//logout user
// app.delete("/logout", (req, res) => {
//     req.logout();  // Use req.logout() without passing req.user
//     res.redirect("/");
//   });

// Logout user
app.delete("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/login");
  });
});

// //Login User
// app.post("/login", async (req,res) => {
//     try{
//         const check = await collection.findOne({email: req.body.email});
//         if(!check){
//             res.send("User with this email does not exist")
//         }

//         //compare the hash password from the database with the plain text
//         const isPasswordMatch = await bcrypt.compare(req.body.password, check.password);
//         if(isPasswordMatch){
//             res.render("index", { username: check.name });
//         }else{
//             req.send("Incorrect password");
//         }
//      }catch{
//         res.send("Wrong Details");
//     }
// });

//other authentication
function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next()
  }
  res.redirect("/login")
}

function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect("/index")

  }
  next()
}

const port = 5000;

app.listen(port, () => {
  console.log(`Server running on Port:${port}`);
})
//app.listen(5000);


