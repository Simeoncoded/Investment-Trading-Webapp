const mongoose = require("mongoose");
const connect = mongoose.connect("mongodb+srv://tbooks61:0mxXaHpfjfDlLdWF@clardex1.bbpkors.mongodb.net/");

//password: 0mxXaHpfjfDlLdWF
//const connect = mongoose.connect("mongodb://localhost:27017/users");
//check database connected or not
connect.then(() => {
    console.log("Database connected successfully");
})
    .catch(() => {
        console.log("Database cannot be connected");
    });

//Create a schema
const LoginSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    // id: {
    //     type: String,
    // },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phonenumber: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        default: 0.00,
      },
      totalProfit: {
        type: Number,
        default: 0.00,
      },
      bonus: {
        type: Number,
        default: 0.00,
      },
      refBonus: {
        type: Number,
        default: 0.00,
      },
      totalDeposit: {
        type: Number,
        default: 0.00,
      },
      totalWithdrawal: {
        type: Number,
        default: 0.00,
      },
      bitcoin: {
        type: String,
        default: "mgWdydQfdaWHYyktkpSJHV1G4EuQBiPFu8"
      },
    ethereum : {
      type: String,
      default: "mgWdydQfdaWHYyktkpSJHV1G4EuQBiPFu8"
    },
    usdt: {
      type: String,
      default: "mgWdydQfdaWHYyktkpSJHV1G4EuQBiPFu8"
    },
    bnb :{
      type: String,
      default: "mgWdydQfdaWHYyktkpSJHV1G4EuQBiPFu8"
    },
    solana: {
      type: String,
      default: "mgWdydQfdaWHYyktkpSJHV1G4EuQBiPFu8"
    },
    xrp: {
      type: String,
      default: "mgWdydQfdaWHYyktkpSJHV1G4EuQBiPFu8"
    },
    trx : {
      type: String,
      default: "mgWdydQfdaWHYyktkpSJHV1G4EuQBiPFu8"
    },
    dodge: {
      type: String,
      default: "mgWdydQfdaWHYyktkpSJHV1G4EuQBiPFu8"
    },
    usdc:{ 
      type: String,
      default: "mgWdydQfdaWHYyktkpSJHV1G4EuQBiPFu8"
    },
    bch:{
      type: String,
      default: "mgWdydQfdaWHYyktkpSJHV1G4EuQBiPFu8"
    },
    shibainu:{
      type: String,
      default: "mgWdydQfdaWHYyktkpSJHV1G4EuQBiPFu8"
    },
    arb: {
      type: String,
      default: "mgWdydQfdaWHYyktkpSJHV1G4EuQBiPFu8"
    },
    tia: {
      type: String,
      default: "mgWdydQfdaWHYyktkpSJHV1G4EuQBiPFu8"
    },
    matic :{
      type: String,
      default: "mgWdydQfdaWHYyktkpSJHV1G4EuQBiPFu8"
    },
    
});

//collection part
const collection = new mongoose.model("users", LoginSchema);

module.exports = collection;