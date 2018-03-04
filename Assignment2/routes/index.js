const products = require("../data/products");
const constructorMethod = app => {
  
  
    app.use("/", (req, res) => {
      if(req.path==="/"){
        res.render("products/static", {products:products});
      }
      else{
        res.sendStatus(404);
      }
    });

  };
  module.exports = constructorMethod;
  