const router = require("express").Router();
const cheerio = require("cheerio");
const axios = require("axios");

// scrapElSurtidorCalentadores()
// matches with /api/scrap/elsurtidor/calentadores
router.get("/calentadores", function (req, res) {
  const urls = [
    "https://www.surtidor.com/buscar?search_query=calentador&orderby=position&orderway=desc&n=50",
    "https://www.surtidor.com/buscar?search_query=calentador&orderby=position&orderway=desc&n=50&p=2",
    "https://www.surtidor.com/buscar?search_query=calentador&orderby=position&orderway=desc&n=50&p=3",
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
      $("div.pro_second_box").each((i, element) => {
        const name = $(element).children().first().text();
        const _prices = $(element).find(".product-price").text();
        // count amount of "$" (if it has more than 2 it means it does have a discount)
        const hasDiscount =
          _prices.split("").reduce((acc, cv) => {
            if (cv === "$") acc++;
            return acc;
          }, 0) > 1
            ? true
            : false;
        const price1 = _prices.substr(_prices.indexOf(" "), 100);
        const price = price1.substr(1, price1.indexOf("$") - 1).trim();
        const discountPrice = price1
          .substr(price1.indexOf("$") + 1, 100)
          .trim();
        // push to the results
        results.push({
          name,
          price,
          hasDiscount,
          discountPrice,
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
      // With cheerio, look at each award-winning site, enclosed in "figure" tags with the class name "site"
      $("div.pro_second_box").each((i, element) => {
        const name = $(element).children().first().text();
        const _prices = $(element).find(".product-price").text();
        // count amount of "$" (if it has more than 2 it means it does have a discount)
        const hasDiscount =
          _prices.split("").reduce((acc, cv) => {
            if (cv === "$") acc++;
            return acc;
          }, 0) > 1
            ? true
            : false;
        const price1 = _prices.substr(_prices.indexOf(" "), 100);
        const price = price1.substr(1, price1.indexOf("$") - 1).trim();
        const discountPrice = price1
          .substr(price1.indexOf("$") + 1, 100)
          .trim();
        // push to the results
        results.push({
          name,
          price,
          hasDiscount,
          discountPrice,
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
      // With cheerio, look at each award-winning site, enclosed in "figure" tags with the class name "site"
      $("div.pro_second_box").each((i, element) => {
        const name = $(element).children().first().text();
        const _prices = $(element).find(".product-price").text();
        // count amount of "$" (if it has more than 2 it means it does have a discount)
        const hasDiscount =
          _prices.split("").reduce((acc, cv) => {
            if (cv === "$") acc++;
            return acc;
          }, 0) > 1
            ? true
            : false;
        const price1 = _prices.substr(_prices.indexOf(" "), 100);
        const price = price1.substr(1, price1.indexOf("$") - 1).trim();
        const discountPrice = price1
          .substr(price1.indexOf("$") + 1, 100)
          .trim();
        // push to the results
        results.push({
          name,
          price,
          hasDiscount,
          discountPrice,
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
