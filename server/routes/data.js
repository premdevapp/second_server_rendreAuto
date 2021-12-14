const router = require("express").Router();
const collection = require("../model/collection");

router.get("/collection/desc", async (req, res) => {
  try {
    await collection
      .find({})
      .sort([["stats.total_volume", "desc"]])
      .exec((err, docs) => {
        if (err) {
          console.log(err);
        } else {
          res.json({ ...docs });
        }
      });
  } catch (e) {
    console.log(e);
  }
});

router.get("/collection/popular", async (req, res) => {
  try {
    await collection.find({})
      .sort([["stats.market_cap", "desc"]])
      .limit(12)
      .exec( (err, docs) => {
        if (err) {
          console.log(err);
        } else {
          // console.log("DOCS : ",docs);
          res.json({...docs });
        }
      })
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
