const express = require("express");
const router = express.Router();
const axios = require("axios");

const data = require("../data/imgageData.json");


router.get("/", (req, res) => {
  const intermediate = data.link.map(item => {
      return item.slice(1);
  });
res.json(intermediate);
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
    console.log(response.data);
    const {primary_asset_contracts, traits, stats, discord_url, external_url, image_url, twitter_username, instagram_username} = response.data.collection;
    res.json({primary_asset_contracts, traits, stats, discord_url, external_url, image_url, twitter_username, instagram_username});
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;