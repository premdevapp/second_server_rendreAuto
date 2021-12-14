const router = require("express").Router();
const collection = require("../model/collection");

router.get("/collection", async (req, res) => {
  try {
     await collection.find({}).sort([['stats.total_volume', 'desc']]).exec((err, docs)=>{
        if(err){
            console.log(err);
        }
        else{
           // console.log("DOCS : ",docs);
            res.json({data: docs});
        }
    });

  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
