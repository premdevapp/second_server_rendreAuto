const express = require("express");
const router = express.Router();
const axios = require("axios");

router.get("/:address/:id", async (req, res) => {
  try {
    const response = await axios.get(
      `https://api.opensea.io/api/v1/asset/${req.params.address}/${req.params.id}`,
      {
        headers: {
          Authorization: {
            ["X-API-KEY"]: "79734c407faa40b89c45de1123cabdf6",
          },
        },
      }
    );
    
    const {token_id, image_url, name, owner, traits, permalink} = response.data;
    res.json({token_id, image_url, name, owner, traits, permalink});
  } catch (err) {
    console.log(err);
  }
});
module.exports = router;
