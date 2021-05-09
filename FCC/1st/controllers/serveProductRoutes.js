const {products}= require("../apiData");

const getAllProds= (req, res)=>{
    res.json(products.map((product)=>{
        const {id, name, price}= product;
        return {id, name, price};
    }));
};

const getProdById= (req, res)=>{      //req.params is a string
    const result= products.find((product)=>product.id===Number(req.params.prodID));     //filter returns array of all matches, find return 1st match
    if(result)
        res.json(result);
    else
        res.status(404).send("<h1>Product Doesn't Exist</h1>");
};

module.exports= {getAllProds, getProdById};