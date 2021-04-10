const mongoose= require("mongoose");
const bcrypt= require("bcryptjs");
const jwt= require("jsonwebtoken");

const regSchema= new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    gender: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true,
        unique: true,
        min: 10
    },
    age: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
});


regSchema.methods.generateToken= async function(){
    try{
        const genToken= jwt.sign({_id: this._id.toString()}, process.env.secretKey, {expiresIn: 1000*60*60});
        this.tokens= this.tokens.concat({token: genToken});
        await this.save();
        return genToken;
    }catch(err){
        console.log(err);
    }
}


regSchema.pre("save", async function(next){     //hashing password
    if(this.isModified("password")){
        this.password= await bcrypt.hash(this.password, 10);
    }
    next();
});

const Registration= new mongoose.model("Registration", regSchema);

module.exports= Registration;