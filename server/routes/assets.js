const express = require("express");
const router = express.Router();
const axios = require("axios");

const assets = require("../model/assets");

const data = require("../data/imgageData.json");

const intermediate = data.link.map((item) => {
  return item.slice(1);
});



router.get("/all", async (req, res) => {
  try {
    for (let item of intermediate) {
      const result = await axios.get(
        `https://api.opensea.io/api/v1/collection/${item}`,
        {
          headers: {
            Authorization: {
              ["X-API-KEY"]: "79734c407faa40b89c45de1123cabdf6",
            },
          },
        }
      );
      const { primary_asset_contracts, stats } = result.data.collection;
      const address = primary_asset_contracts[0].address;
      const { total_supply } = stats;
      const bundle = total_supply / 30;
      let offset = 0,
        limit = 30;
      for (let i = 1; i < bundle; i++) {
        await axios.get(
          `http://localhost:3000/assets/${address}?totalItems=${total_supply}&offset=${(offset*limit)}&limit=${limit*i}`
        );
        offset += 30;
        limit += 30;
      }
    }
  } catch (e) {
    console.log(e);
  }
});



router.get("/:address", async (req, res) => {
  const totalItems = req.query.totalItems || 30;
  const offset = req.query.offset || 0;
  const limit = req.query.limit || 30;
  let ids = Array.from(Array(parseInt(totalItems)).keys());
  ids = ids.map((id) => id + 1);
  const idNums = ids.map((id) => id.toString());

  const stringQuery = idNums.reduce(
    (accumulation, currentValue) =>
      accumulation + `token_ids=${currentValue}& `,
    ""
  );
  const newStrQuery = stringQuery.split(" ");
  const postedQry = newStrQuery
    .slice(parseInt(offset), parseInt(limit))
    .join("");

  try {
    const response = await axios.get(
      `https://api.opensea.io/api/v1/assets?${postedQry}&asset_contract_address=${req.params.address}&order_direction=asc&offset=${offset}&limit=${limit}`,
      {
        headers: {
          Authorization: {
            ["X-API-KEY"]: "79734c407faa40b89c45de1123cabdf6",
          },
        },
      }
    );
    console.log(response.data);
    const asset = new assets({
      name: response.data.assets[0].collection.slug,
      ...response.data,
    });
    asset.save(function (err, data) {
      if (err) {
        console.log(error);
      } else {
        console.log("Data inserted");
      }
    });
    return res.json({"data":"added"});
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
