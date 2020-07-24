const router = require("express").Router();
const cheerio = require("cheerio");
const axios = require("axios");

// scrapGersaCalentadores()
// matches with /api/scrap/gersa/calentadores
router.get("/calentadores", function (req, res) {
  const urls = [
    "https://gersamex.com/categoria-boilers/?subcat=boilers_paso&subcat=boilers_deposito&etiqueta2=0&etiqueta=0",
    "https://gersamex.com/categoria-boilers/?subcat=boilers_deposito&subcat=boilers_instantaneos&etiqueta2=0&etiqueta=0",
    "https://gersamex.com/categoria-boilers/?subcat=boilers_instantaneos&subcat=boilers_paso&etiqueta2=0&etiqueta=0",
    "https://gersamex.com/categoria-boilers/?subcat=boilers_paso&subcat=boilers_solares&etiqueta2=0&etiqueta=0",
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
      $("div.product-info").each((i, element) => {
        const name = $(element).children().first().text();
        const _price = $(element).find(".precio").text();
        const price = _price.substr(_price.indexOf("$") + 1, 100).trim();
        // push to the results
        results.push({
          type: "De depósito",
          name,
          price,
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
      $("div.product-info").each((i, element) => {
        const name = $(element).children().first().text();
        const _price = $(element).find(".precio").text();
        const price = _price.substr(_price.indexOf("$") + 1, 100).trim();
        // push to the results
        results.push({
          type: "Instantáneos",
          name,
          price,
        });
      });
      // push to the acc
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
      $("div.product-info").each((i, element) => {
        const name = $(element).children().first().text();
        const _price = $(element).find(".precio").text();
        const price = _price.substr(_price.indexOf("$") + 1, 100).trim();
        // push to the results
        results.push({
          type: "De paso",
          name,
          price,
        });
      });
      // push to the acc
      accumulator.push(...results);
      // next page
      return axios.get(urls[3]);
    })
    .then((response) => {
      // Load the HTML into cheerio
      const $ = cheerio.load(response.data);
      // Make an empty array for saving our scraped info
      const results = [];
      // With cheerio, look at each award-winning site, enclosed in "figure" tags with the class name "site"
      $("div.product-info").each((i, element) => {
        const name = $(element).children().first().text();
        const _price = $(element).find(".precio").text();
        const price = _price.substr(_price.indexOf("$") + 1, 100).trim();
        // push to the results
        results.push({
          type: "Solares",
          name,
          price,
        });
      });
      // push to the acc
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
