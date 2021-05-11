import app from "./server.js";
import mongodb from "mongodb";
import dotenv from "dotenv";
import RestaurantsDAO from "./dao/restaurantsDAO.js";
import ReviewsDAO from "./dao/reviewsDAO.js";

dotenv.config()
const MongoClient= mongodb.MongoClient;

const port= process.env.PORT || 8000;

MongoClient.connect(process.env.RESTREVIEWS_DB_URI, {poolSize: 50, wtimeout: 30000, useNewUrlParser: true, useUnifiedTopology: true})
.catch((err)=>{
    console.log(err.stack);
    process.exit(1);
})
.then(async (client)=>{
    await RestaurantsDAO.injectDB(client);      //connect to Restaurants Collection
    await ReviewsDAO.injectDB(client);      //connect to Reviews Collection

    app.listen(port, ()=>console.log(`Port: ${port}`));
})