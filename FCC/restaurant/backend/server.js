// const express= require("express");      //will give error as type set to module instead of commonjs in pkg.json
import express from "express";
import cors from "cors";
import restaurants from "./api/restaurants.route.js";

const app= express();
app.use(cors());
app.use(express.json());        //parses requests body json data

app.use("/api/v1/restaurants", restaurants);
app.use("*", (req, res)=>res.status(404).json({error: "not found"}));

export default app;