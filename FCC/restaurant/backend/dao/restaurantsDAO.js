//DataAccessObj to allow us access estaurants in database
import mongodb from "mongodb";
const ObjectId = mongodb.ObjectID;

let restaurants   //reference to db

export default class RestaurantsDAO {

    static async injectDB(conn) {   //initially connect to db
      if (restaurants) {    //if already ref to db
        return
      }
      try {   //else try to get ref to db
        restaurants = await conn.db(process.env.RESTREVIEWS_NS).collection("restaurants")

      } catch (e) {
        console.error(`Unable to establish a collection handle in restaurantsDAO: ${e}`)

      }
    }
  
    static async getRestaurants({ filters = null, page = 0, restaurantsPerPage = 20}) {

      // console.log(filters);

      let query={}
      let queryArr= []

      if (filters) {
        if ("name" in filters) {
          queryArr.push({ $text: { $search: filters["name"] } });
        } 
        if ("cuisine" in filters) {
          queryArr.push( { "cuisine": { $eq: filters["cuisine"] } });
        } 
        if ("zipcode" in filters) {
          queryArr.push({ "address.zipcode": { $eq: filters["zipcode"] } });
        }
      }

      // console.log(queryArr);

      if(queryArr.length>0)
        query= {$and: queryArr};
        
      // console.log(query);
  
      let cursor
      
      try {
        cursor = await restaurants.find(query)

      } catch (e) {
        console.error(`Unable to issue find command, ${e}`)
        return { restaurantsList: [], totalNumRestaurants: 0 }
      }
  
      const displayCursor = cursor.limit(restaurantsPerPage).skip(restaurantsPerPage * page)
  
      try {
        const restaurantsList = await displayCursor.toArray()
        const totalNumRestaurants = await restaurants.countDocuments(query)
  
        return { restaurantsList, totalNumRestaurants }

      } catch (e) {
        console.error(`Unable to convert cursor to array or problem counting documents, ${e}`)
        return { restaurantsList: [], totalNumRestaurants: 0 }

      }
    }

    static async getRestaurantByID(id) {
      // console.log("Reach");
      try {
        
        const pipeline = [
          { $match: { _id: new ObjectId(id) } },    //match restaurant by id
          {
            $lookup: {    
              from: "reviews",
              let: { id: "$_id" },
              pipeline: [
                { $match: { $expr: { $eq: [ "$restaurant_id", "$$id" ] } } },   //match restaurant_id in each document in reviews collecction
                { $sort: { date: -1 } }
              ],
              as: "reviews"
            }
          },
          { $addFields: { reviews: "$reviews" } }
        ]
        return await restaurants.aggregate(pipeline).next();

      } catch (e) {
        console.error(`Something went wrong in getRestaurantByID: ${e}`);
        throw e;

      }
    }
  
    static async getCuisines() {

      let cuisines = []
      try {
        cuisines = await restaurants.distinct("cuisine");
        return cuisines;

      } catch (e) {
        console.error(`Unable to get cuisines, ${e}`);
        return cuisines;
        
      }
    }
  }