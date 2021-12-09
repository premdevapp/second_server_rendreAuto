const fs = require("fs");
const splitArrayIntoChunksOfLen = (arr, len) => {
  let chunks = [],
    i = 0,
    n = arr.length;
  while (i < n) {
    chunks.push(arr.slice(i, (i += len)));
  }
  return chunks;
};

const jsonRes = [];

const scraperObject = {

 // url: "https://rarity.tools",
  url: "https://opensea.io/rankings?category=new",

  async scraper(browser) {
    let page = await browser.newPage();
    console.log(`Navigating to ${this.url}...`);
    await page.goto(this.url);
    await page.setDefaultNavigationTimeout(60000);
    await page.waitForSelector("table");
    //await page.$$eval('/html/body/div[1]/div[1]/main/div/div[2]/div/div[2]/', t =>{console.log(t); return t.map(tab => tab.querySelector('td'))});
    let result = await page.evaluate(() => {
      const tds = Array.from(document.querySelectorAll("#__layout > div > div.p-4.pb-20.overflow-x-auto > div:nth-child(5) > div > div > table"));
      console.log("tds",tds);
      return tds.map((td) => td.innerText);
    });

    const images = await page.evaluate(() => ({link: Array.from(
        document.querySelectorAll('a[href]'),
        a => a.getAttribute('href')/* .slice(4, 586) */
      ), img:Array.from(document.images, e => e.src)/* .slice(3, 586) */}));

      console.log("images",images);

      fs.writeFile("imgageData.json", JSON.stringify(images), err => {
        if (err) throw err;
        console.log("The file has been saved!");
        });

    const intemediate = splitArrayIntoChunksOfLen(result, 12);

    intemediate.forEach((item) => {
      jsonRes.push({
        id: item[0],
        Collection: item[1],
        Volume_7d: item[2],
        Sales_7d: item[3],
        Volume_All_Time: item[4],
        Sales_All_Time: item[5],
        Avg_Price_7d: item[6],
        Total_Supply: item[7],
        Owners: item[8],
        Owners_percent: item[9],
        Estimated_Market_Cap: item[10],
        Added: item[11],
        ...item[12],
      });
    });
    return JSON.stringify(jsonRes)
  },
};


module.exports = scraperObject;
