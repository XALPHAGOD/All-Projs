const mongoose = require("mongoose");
require("dotenv").config();

const dbURI= process.env.DB_URI;
const dbOPTIONS= {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

const dbConnObj= mongoose.createConnection(dbURI, dbOPTIONS);

const userSchema= new mongoose.Schema({
    username: String,
    hash: String,
    salt: String,
    admin: {
        type: Boolean,
        default: false
    }
});

const User= dbConnObj.model("User", userSchema);

module.exports= dbConnObj;