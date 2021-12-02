const fs = require("fs");
const { scrapTable } = require("puppeteer-table-scraper");

scrapTable("https://rarity.tools", "table")
  .then((data) => {
    
    data.resultData.forEach(function(row) {
        for (const [key, value] of Object.entries(row)) {
            
            console.log(` the ${key}: ${value}`);
          }
    });

    fs.writeFile("data.json", JSON.stringify(data.resultData), err => {
        if (err) throw err;
        console.log("The file has been saved!");
        });

    /* for (const [key, value] of Object.entries(...data.resultData)) {
        console.log(`the ${key}: ${value}`);
      } */

   /*  data.resultData[data.headerKeys[0]] : data.resultData["_"];
    data.resultData[data.headerKeys[4]] = data.resultData["__________Volume__All_Time_"];
    data.resultData[data.headerKeys[9]] = data.resultData["Owners_"]; */

    //console.log("resultant: ", data.resultData, "\nheader: ",  data.headerKeys);
  })
  .catch((err) => {
    console.log(err);
  });