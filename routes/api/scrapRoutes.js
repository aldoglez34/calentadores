const router = require("express").Router();
const cheerio = require("cheerio");
const axios = require("axios");

// scrapAzulemex()
// matches with /api/scrap/azulemex
router.get("/azulemex", function (req, res) {
  axios
    .get("https://azulemex.com/collections/calentadores")
    .then((response) => {
      // Load the HTML into cheerio
      const $ = cheerio.load(response.data);

      // Make an empty array for saving our scraped info
      const results = [];

      // With cheerio, look at each award-winning site, enclosed in "figure" tags with the class name "site"
      $("div.product-card__info").each((i, element) => {
        // const brand = $(element).find(".produc-card__brand").text();
        const brand = $(element).children().first().text();
        const name = $(element).find(".product-card__name").text();
        // const price = $(element).find(".product-card__price");

        // push to the results
        results.push({ brand, name });
      });

      console.log("====================");
      console.log(results[0]);

      // After looping through each element found, log the results to the console
      // console.log(results);
      res.send(results);
    })
    .catch((err) => {
      console.log("@error", err);
      res.status(422).send("Ocurrió un error");
    });
});

module.exports = router;
