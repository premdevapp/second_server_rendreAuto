const router = require("express").Router();
const axios = require("axios");

let arrLnk = [],
  groupData = [],
  check = [];

router.get("/:address", async (req, res) => {
  const traitSize = parseInt(req.query.traitSize) || 0;
  const traitsContents = req.query.traitsContents || "";
  const totalItems = parseInt(req.query.totalItems) || 30;
  const offset = parseInt(req.query.offset) || 0;
  const limit = parseInt(req.query.limit) || 30;

  let ids = Array.from(Array(totalItems).keys());
  ids = ids.map((id) => id + 1);
  const idNums = ids.map((id) => id.toString());

  const funcQuryStr = (val) => {
    return val.reduce(
      (accumulation, currentValue) =>
        accumulation + `token_ids=${currentValue}& `,
      ""
    );
  };

  const stringQuery = funcQuryStr(idNums);

  const postedQry = stringQuery.split(" ").slice(offset, limit).join("");

  if (traitSize == 0) {
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
      return res.json({ data: response.data });
    } catch (err) {
      console.log(err);
    }
  }

  //console.log("traitSize", traitSize, "traitsContents", traitsContents, "\n");

  if (traitSize > 0) {
    ids = ids.map((id) => id.toString());

    const groups = ids
      .map((e, i) => {
        return i % limit === 0 ? ids.slice(i, i + limit) : null;
      })
      .filter((e) => {
        return e;
      });

    let offset_internal = offset || 0;
    //filter assets ny traits
    const checkTraits = traitsContents.split(",") || [];
    const traitsCheck = new Map([...checkTraits.map((e) => e.split(":"))]);
    const checker = traitsCheck.entries();

    //console.log(array.filter((list)=>array.some(()=>list % 2 === 0)));

    for await (let element of groups) {
      const in_m = funcQuryStr(element);
      arrLnk.push({ in_m, offset_internal });
      offset_internal += limit;
    }

    for (let i = 0; i < traitSize; i++) {
      check.push(checker.next().value);
    }

    for await (let link of arrLnk) {
      try {
        const url = `https://api.opensea.io/api/v1/assets?${link.in_m
          .split(" ")
          .join("")}&asset_contract_address=${
          req.params.address
        }&order_direction=asc`;
        const response = await axios.get(url, {
          headers: {
            Authorization: {
              ["X-API-KEY"]: "79734c407faa40b89c45de1123cabdf6",
            },
          },
        });

        response.data.assets.forEach((e) => {
          groupData.push(e);
        });
      } catch (err) {
        console.log(err);
      }
    }
  }

  // console.log(e.traits, e.token_id, i);
  const check1 = [...check.flat().map((e) => e.replace(/\d+/g, ""))];

  /* const filter = groupData.filter((e) => {
    console.log(e);
    return groupData.some(()=>e.traits[0].trait_type == check1[0] && e.traits[0].value == check1[1]);
  }); */
  console.log("checking : >>", check1, "\n");

  const filter = groupData.filter((e) => {
    /* const value = [];
    for (let i = 0; i < check1.length; i++) {
      if (i % 2 == 0) {
        value.push(
          e.traits.some((t) => {
            return t.trait_type == check1[i] && t.value == check1[i + 1];
          })
        );
      }
    } */
    return  e.traits.some((t) => {
      return t.trait_type == check1[0] && t.value == check1[1];
    })
    return value;
  });

  const filteredTraits = filter.map((e) => e.token_id);

  res.json({ group: [...groupData], filteredTraits: filteredTraits });
});

module.exports = router;
