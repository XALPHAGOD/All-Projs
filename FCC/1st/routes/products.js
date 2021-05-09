const express= require("express");

const router= express.Router();

// const {products}= require("../apiData");  //moved to serveProductRoutes
const {getAllProds, getProdById}= require("../controllers/serveProductRoutes");

// router.get("/", getAllProds);
// router.get("/:prodID", getProdById);

router.route("/").get(getAllProds);     //chaining similar routes
router.route("/:prodID").get(getProdById);

module.exports= router;