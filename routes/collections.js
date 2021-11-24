const express = require('express');
const router = express.Router();
const axios = require('axios');
let opensea_collections = [];

router.get('/collections', async(req,res) => {
	await axios.get("https://api.opensea.io/api/v1/collections?offset=0&limit=300")
	.then((res) => {
    let collections = res.data.collections;
    let i = 0;
    opensea_collections = []
    for (let collection of collections) {
      opensea_collections.push({
        id: ++i,
        name: collection.name,
        image: collection.image_url,
        seven_day_volume: collection.stats.seven_day_volume,
        volume_all_time_high: collection.stats.one_day_volume,
        sales_all_time_high: collection.stats.one_day_sales,
        seven_day_sales: collection.stats.seven_day_sales,
        seven_day_average_price: collection.stats.seven_day_average_price,
        total_supply: collection.stats.total_supply,
        num_owners: collection.stats.num_owners,
        market_cap: collection.stats.market_cap,
      })
    }
  })
  .catch((error) => {
    console.log(error);
  });
	res.status(200).send(opensea_collections);
});

module.exports = router;