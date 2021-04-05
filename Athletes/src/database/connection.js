const mongoose= require("mongoose");

mongoose.connect("mongodb://localhost:27017/athletes", {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}).then(()=>{
    console.log("DB: Connected");
}).catch((err)=>{
    console.log("DB: Error");
});