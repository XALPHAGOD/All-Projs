const mongoose= require("mongoose");

mongoose.connect("mongodb://localhost:27017/registration", {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(()=>{
    console.log("DB: Connected");
})
.catch((err)=>{
    console.log("DB: Error", err);
});