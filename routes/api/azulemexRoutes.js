const router = require("express").Router();
const cheerio = require("cheerio");
const axios = require("axios");

// scrapAzulemexCalentadores()
// matches with /api/scrap/azulemex/calentadores
router.get("/calentadores", function (req, res) {
  const urls = [
    "https://azulemex.com/collections/calentadores?_=pf&pf_t_tipo=De%20Paso",
    "https://azulemex.com/collections/calentadores?_=pf&pf_t_tipo=Dep%C3%B3sito",
    "https://azulemex.com/collections/calentadores?_=pf&pf_t_tipo=Instant%C3%A1neo",
  ];

  const accumulator = [];

  axios
    .get(urls[0])
    .then((response) => {
      // Load the HTML into cheerio
      const $ = cheerio.load(response.data);
      // Make an empty array for saving our scraped info
      const results = [];
      // cheerio
      $("div.product-card__info").each((i, element) => {
        // get the brand
        const brand = $(element).children().first().text();
        // get the name
        const name = $(element).find(".product-card__name").text();
        // get prices
        const _price = $(element).find(".product-card__price").text();
        // count amount of "$" (if it has more than 2 it means it does have a discount)
        const hasDiscount =
          _price.split("").reduce((acc, cv) => {
            if (cv === "$") acc++;
            return acc;
          }, 0) > 1
            ? true
            : false;
        const price = _price.substr(_price.indexOf("$") + 1, 10).trim();
        const _discountPrice = _price
          .substr(_price.indexOf("$") + 1, 100)
          .trim();
        const discountPrice = _discountPrice
          .substr(_discountPrice.indexOf("$") + 1, 100)
          .trim();
        // push to the results
        results.push({
          type: "De paso",
          brand,
          name,
          hasDiscount,
          price,
          discountPrice: hasDiscount ? discountPrice : null,
        });
      });
      // push to the acc before going to the next page
      accumulator.push(...results);
      // next page
      return axios.get(urls[1]);
    })
    .then((response) => {
      // Load the HTML into cheerio
      const $ = cheerio.load(response.data);
      // Make an empty array for saving our scraped info
      const results = [];
      // cheerio
      $("div.product-card__info").each((i, element) => {
        // get the brand
        const brand = $(element).children().first().text();
        // get the name
        const name = $(element).find(".product-card__name").text();
        // get prices
        const _price = $(element).find(".product-card__price").text();
        // count amount of "$" (if it has more than 2 it means it does have a discount)
        const hasDiscount =
          _price.split("").reduce((acc, cv) => {
            if (cv === "$") acc++;
            return acc;
          }, 0) > 1
            ? true
            : false;
        const price = _price.substr(_price.indexOf("$") + 1, 10).trim();
        const _discountPrice = _price
          .substr(_price.indexOf("$") + 1, 100)
          .trim();
        const discountPrice = _discountPrice
          .substr(_discountPrice.indexOf("$") + 1, 100)
          .trim();
        // push to the results
        results.push({
          type: "Depósito",
          brand,
          name,
          hasDiscount,
          price,
          discountPrice: hasDiscount ? discountPrice : null,
        });
      });
      // push to the acc before going to the next page
      accumulator.push(...results);
      // next page
      return axios.get(urls[2]);
    })
    .then((response) => {
      // Load the HTML into cheerio
      const $ = cheerio.load(response.data);
      // Make an empty array for saving our scraped info
      const results = [];
      // cheerio
      $("div.product-card__info").each((i, element) => {
        // get the brand
        const brand = $(element).children().first().text();
        // get the name
        const name = $(element).find(".product-card__name").text();
        // get prices
        const _price = $(element).find(".product-card__price").text();
        // count amount of "$" (if it has more than 2 it means it does have a discount)
        const hasDiscount =
          _price.split("").reduce((acc, cv) => {
            if (cv === "$") acc++;
            return acc;
          }, 0) > 1
            ? true
            : false;
        const price = _price.substr(_price.indexOf("$") + 1, 10).trim();
        const _discountPrice = _price
          .substr(_price.indexOf("$") + 1, 100)
          .trim();
        const discountPrice = _discountPrice
          .substr(_discountPrice.indexOf("$") + 1, 100)
          .trim();
        // push to the results
        results.push({
          type: "Instantáneo",
          brand,
          name,
          hasDiscount,
          price,
          discountPrice: hasDiscount ? discountPrice : null,
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

// scrapAzulemexPegazulejos()
// matches with /api/scrap/azulemex/pegazulejos
router.get("/pegazulejos", function (req, res) {
  axios
    .get("https://azulemex.com/collections/adhesivos-y-boquillas")
    .then((response) => {
      // Load the HTML into cheerio
      const $ = cheerio.load(response.data);

      // Make an empty array for saving our scraped info
      const results = [];

      // With cheerio, look at each award-winning site, enclosed in "figure" tags with the class name "site"
      $("div.product-card__info").each((i, element) => {
        const brand = $(element).children().first().text();
        const name = $(element).find(".product-card__name").text();

        const _price = $(element).find(".product-card__price").text();

        // count amount of "$" (if it has more than 2 it means it does have a discount)
        const hasDiscount =
          _price.split("").reduce((acc, cv) => {
            if (cv === "$") acc++;
            return acc;
          }, 0) > 1
            ? true
            : false;

        const price = _price.substr(_price.indexOf("$") + 1, 10).trim();

        const _discountPrice = _price
          .substr(_price.indexOf("$") + 1, 100)
          .trim();

        const discountPrice = _discountPrice
          .substr(_discountPrice.indexOf("$") + 1, 100)
          .trim();

        // push to the results
        results.push({
          brand,
          name,
          hasDiscount,
          price,
          discountPrice: hasDiscount ? discountPrice : null,
        });
      });

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
