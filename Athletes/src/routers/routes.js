const express= require("express");

const router= new express.Router();



const dataSchema= require("../models/athleteschema");



router.use(express.json());



router.get("/", async (req, res)=>{
    res.send("Home Page");
});



router.post("/athletes", async (req, res)=>{
    try{

        const addData= new dataSchema(req.body);
        const added= await addData.save();

        res.status(201).send("Data Sent");
    }catch(err){
        res.status(400).send(err);
    }
});



router.get("/athletes", async (req, res)=>{
    try{

        const findData= await dataSchema.find().sort({"ranking": 1});
        
        res.status(201).send(findData);
    }catch(err){
        res.status(400).send(err);
    }
});

router.get("/athletes/:id", async (req, res)=>{
    try{

        const findData= await dataSchema.findById({_id: req.params.id});
        
        res.status(201).send(findData);
    }catch(err){
        res.status(400).send(err);
    }
});



router.patch("/athletes/:id", async (req, res)=>{
    try{

        const newData= req.body;
        const updStatus= await dataSchema.findByIdAndUpdate({_id: req.params.id}, {$set: newData});
        
        if(updStatus)
            res.status(201).send(updStatus);
        else
            res.status(404).send("Data Not Found");
    }catch(err){
        res.status(500).send(err);
    }
});



router.delete("/athletes/:id", async (req, res)=>{
    try{

        const delStatus= await dataSchema.findByIdAndDelete({_id: req.params.id});
        
        if(delStatus)
            res.status(201).send(delStatus);
        else
            res.status(404).send("Data Not Found");
    }catch(err){
        res.status(500).send(err);
    }
});



module.exports= router;