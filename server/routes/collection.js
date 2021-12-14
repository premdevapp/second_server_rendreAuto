const express = require("express");
const router = express.Router();
const axios = require("axios");

const data = require("../data/imgageData.json");

//const collection = require("../model/collection");

const intermediate = data.link.map((item) => {
  return item.slice(1);
});

router.get("/", (req, res) => {
  const page = req.query.page || 1;
  const limit = req.query.limit || 12;
  res.json({
    totalNum: intermediate.length,
    sliced: intermediate.splice((page - 1) * limit, limit),
  });
});

router.get("/all", async (req, res) => {
  const dataArr = [];
  try {
    for (let item of intermediate) {
      const response = await axios.get(
        `http://localhost:3000/collection/${item}`
      );
      dataArr.push(response.data);
    }
    res.json({ response: dataArr });
  } catch (e) {
    console.log(errorVal);
  }
});

router.get("/:collection", async (req, res) => {
  try {
    const response = await axios.get(
      `https://api.opensea.io/api/v1/collection/${req.params.collection}`,
      {
        headers: {
          Authorization: {
            ["X-API-KEY"]: "79734c407faa40b89c45de1123cabdf6",
          },
        },
      }
    );

    const {
      banner_image_url,
      primary_asset_contracts,
      traits,
      stats,
      discord_url,
      external_url,
      image_url,
      twitter_username,
      instagram_username,
    } = response.data.collection;

    /*

    const collect = new collection({
      banner_image_url,
      primary_asset_contracts,
      traits,
      stats,
      discord_url,
      external_url,
      image_url,
      twitter_username,
      instagram_username,
      ...response.data.collection,
    });
 collect.save(function (err, data) {
      if (err) {
        console.log(err);
      } else {
        console.log("saved");
      }
    });

    setTimeout(() => {
      console.log("time elapsed 5 seconds");
    }, 5000);
    
    res.json({ data: "saved" });
    
    */
    res.json({
      banner_image_url,
      primary_asset_contracts,
      traits,
      stats,
      discord_url,
      external_url,
      image_url,
      twitter_username,
      instagram_username,
      ...response.data.collection,
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
