const router = require("express").Router();
const cheerio = require("cheerio");
const axios = require("axios");

// scrapHomeDepotCalentadores()
// matches with /api/scrap/homedepot/calentadores
router.get("/calentadores", function (req, res) {
  const urls = [
    "https://www.homedepot.com.mx/SearchDisplay?categoryId=&storeId=10351&catalogId=10101&langId=-5&sType=SimpleSearch&resultCatEntryType=2&showResultsPage=true&searchSource=Q&pageView=&beginIndex=0&pageSize=20&searchTerm=calentador+de+gas+natural#facet:&productBeginIndex:0&facetLimit:&orderBy:&pageView:grid&minPrice:&maxPrice:&pageSize:80&",
  ];

  const accumulator = [];

  axios
    .get(urls[0])
    .then((response) => {
      // Load the HTML into cheerio
      const $ = cheerio.load(response.data);
      // Make an empty array for saving our scraped info
      const results = [];
      // With cheerio, look at each award-winning site, enclosed in "figure" tags with the class name "site"
      $("div.product_info").each((i, element) => {
        const brand = $(element).find(".marca").text();
        const name = $(element).children("a").text();
        // const _prices = $(element).find(".product-price").text();
        // push to the results
        results.push({
          type: "Gas Natural",
          brand,
          name,
        });
      });
      // push to the acc before going to the next page
      accumulator.push(...results);
      // send response to the client
      res.send(accumulator);
    })
    .catch((err) => {
      console.log("@error", err);
      res.status(422).send("Ocurrió un error");
    });
});

module.exports = router;
