const express = require("express");
const router = express.Router();
const axios = require("axios");

router.get("/:address", async (req, res) => {
  const page = req.query.page || 1;
  const limit = req.query.limit || 12;
  const ids = Array.from(
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    (v) => v + (page - 1) * limit
  );

  try {
    const response = await axios.get(
      // `https://api.opensea.io/api/v1/asset/${req.params.address}/${req.params.id}`,
      `https://api.opensea.io/api/v1/assets?token_ids=${ids[0]}&token_ids=${ids[1]}&token_ids=${ids[2]}&token_ids=${ids[3]}&token_ids=${ids[4]}&token_ids=${ids[5]}&token_ids=${ids[6]}&token_ids=${ids[7]}&token_ids=${ids[8]}&token_ids=${ids[9]}&token_ids=${ids[10]}&token_ids=${ids[11]}&asset_contract_address=0xb47e3cd837ddf8e4c57f05d70ab865de6e193bbb&order_direction=desc&offset=${limit-12}`,
      {
        headers: {
          Authorization: {
            ["X-API-KEY"]: "79734c407faa40b89c45de1123cabdf6",
          },
        },
      }
    );
    console.log(response.data);
    res.json(response.data);
  } catch (err) {
    console.log(err);
  }
});
module.exports = router;
