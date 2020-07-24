const router = require("express").Router();
const cheerio = require("cheerio");
const axios = require("axios");

// scrapHomeDepotCalentadores()
// matches with /api/scrap/homedepot/calentadores
router.get("/calentadores", function (req, res) {
  const urls = [
    "https://www.homedepot.com.mx/SearchDisplay?categoryId=&storeId=10351&catalogId=10101&langId=-5&sType=SimpleSearch&resultCatEntryType=2&showResultsPage=true&searchSource=Q&pageView=&beginIndex=0&pageSize=200&searchTerm=calentador+de+dep%C3%B3sito#facet:&productBeginIndex:0&facetLimit:&orderBy:&pageView:grid&minPrice:&maxPrice:&pageSize:200&",
    "https://www.homedepot.com.mx/SearchDisplay?categoryId=&storeId=10351&catalogId=10101&langId=-5&sType=SimpleSearch&resultCatEntryType=2&showResultsPage=true&searchSource=Q&pageView=&beginIndex=0&pageSize=200&searchTerm=calentador+el%C3%A9ctrico#facet:&productBeginIndex:0&facetLimit:&orderBy:&pageView:grid&minPrice:&maxPrice:&pageSize:200&",
    "https://www.homedepot.com.mx/SearchDisplay?categoryId=&storeId=10351&catalogId=10101&langId=-5&sType=SimpleSearch&resultCatEntryType=2&showResultsPage=true&searchSource=Q&pageView=&beginIndex=0&pageSize=200&searchTerm=calentador+instant%C3%A1neo#facet:&productBeginIndex:0&facetLimit:&orderBy:&pageView:grid&minPrice:&maxPrice:&pageSize:200&",
    "https://www.homedepot.com.mx/SearchDisplay?categoryId=&storeId=10351&catalogId=10101&langId=-5&sType=SimpleSearch&resultCatEntryType=2&showResultsPage=true&searchSource=Q&pageView=&beginIndex=0&pageSize=200&searchTerm=calentador+r%C3%A1pida+recuperaci%C3%B3n#facet:&productBeginIndex:0&facetLimit:&orderBy:&pageView:grid&minPrice:&maxPrice:&pageSize:200&",
    "https://www.homedepot.com.mx/SearchDisplay?categoryId=&storeId=10351&catalogId=10101&langId=-5&sType=SimpleSearch&resultCatEntryType=2&showResultsPage=true&searchSource=Q&pageView=&beginIndex=0&pageSize=200&searchTerm=calentador+solar#facet:&productBeginIndex:0&facetLimit:&orderBy:&pageView:grid&minPrice:&maxPrice:&pageSize:200&",
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
        // brand
        const brand = $(element).find(".marca").text();
        // name
        const _name = $(element).find("a").text();
        const name = _name.substr(0, _name.indexOf("\t"));
        // price
        const _price = $(element).find(".price").text();
        const price1 = _price.substr(_price.indexOf(":") + 1, 100).trim();
        const price2 = price1.replace("$", "");
        const price = price2.includes(".")
          ? price2
          : price2.substring(0, price2.length - 2) +
            "." +
            price2.substring(price2.length - 2);
        // discount price
        const _discountPrice = $(element).find(".old_price").text();
        const discountPrice2 = _discountPrice
          .substr(_discountPrice.indexOf("$") + 1, 100)
          .trim();
        const discountPrice = discountPrice2.includes(".")
          ? discountPrice2
          : discountPrice2.substring(0, discountPrice2.length - 2) +
            "." +
            discountPrice2.substring(discountPrice2.length - 2);
        // hasDiscount
        const hasDiscount = discountPrice ? true : false;

        // const name = $(element).children("a").text();
        // const _prices = $(element).find(".product-price").text();
        // push to the results
        results.push({
          type: "Depósito",
          brand,
          name,
          price: hasDiscount ? discountPrice : price,
          discountPrice: hasDiscount ? price : discountPrice,
          hasDiscount,
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
      $("div.product_info").each((i, element) => {
        // brand
        const brand = $(element).find(".marca").text();
        // name
        const _name = $(element).find("a").text();
        const name = _name.substr(0, _name.indexOf("\t"));
        // price
        const _price = $(element).find(".price").text();
        const price1 = _price.substr(_price.indexOf(":") + 1, 100).trim();
        const price2 = price1.replace("$", "");
        const price = price2.includes(".")
          ? price2
          : price2.substring(0, price2.length - 2) +
            "." +
            price2.substring(price2.length - 2);
        // discount price
        const _discountPrice = $(element).find(".old_price").text();
        const discountPrice2 = _discountPrice
          .substr(_discountPrice.indexOf("$") + 1, 100)
          .trim();
        const discountPrice = discountPrice2.includes(".")
          ? discountPrice2
          : discountPrice2.substring(0, discountPrice2.length - 2) +
            "." +
            discountPrice2.substring(discountPrice2.length - 2);
        // hasDiscount
        const hasDiscount = discountPrice ? true : false;

        // const name = $(element).children("a").text();
        // const _prices = $(element).find(".product-price").text();
        // push to the results
        results.push({
          type: "Eléctrico",
          brand,
          name,
          price: hasDiscount ? discountPrice : price,
          discountPrice: hasDiscount ? price : discountPrice,
          hasDiscount,
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
      $("div.product_info").each((i, element) => {
        // brand
        const brand = $(element).find(".marca").text();
        // name
        const _name = $(element).find("a").text();
        const name = _name.substr(0, _name.indexOf("\t"));
        // price
        const _price = $(element).find(".price").text();
        const price1 = _price.substr(_price.indexOf(":") + 1, 100).trim();
        const price2 = price1.replace("$", "");
        const price = price2.includes(".")
          ? price2
          : price2.substring(0, price2.length - 2) +
            "." +
            price2.substring(price2.length - 2);
        // discount price
        const _discountPrice = $(element).find(".old_price").text();
        const discountPrice2 = _discountPrice
          .substr(_discountPrice.indexOf("$") + 1, 100)
          .trim();
        const discountPrice = discountPrice2.includes(".")
          ? discountPrice2
          : discountPrice2.substring(0, discountPrice2.length - 2) +
            "." +
            discountPrice2.substring(discountPrice2.length - 2);
        // hasDiscount
        const hasDiscount = discountPrice ? true : false;

        // const name = $(element).children("a").text();
        // const _prices = $(element).find(".product-price").text();
        // push to the results
        results.push({
          type: "Instantáneo",
          brand,
          name,
          price: hasDiscount ? discountPrice : price,
          discountPrice: hasDiscount ? price : discountPrice,
          hasDiscount,
        });
      });
      // push to the acc before going to the next page
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
      $("div.product_info").each((i, element) => {
        // brand
        const brand = $(element).find(".marca").text();
        // name
        const _name = $(element).find("a").text();
        const name = _name.substr(0, _name.indexOf("\t"));
        // price
        const _price = $(element).find(".price").text();
        const price1 = _price.substr(_price.indexOf(":") + 1, 100).trim();
        const price2 = price1.replace("$", "");
        const price = price2.includes(".")
          ? price2
          : price2.substring(0, price2.length - 2) +
            "." +
            price2.substring(price2.length - 2);
        // discount price
        const _discountPrice = $(element).find(".old_price").text();
        const discountPrice2 = _discountPrice
          .substr(_discountPrice.indexOf("$") + 1, 100)
          .trim();
        const discountPrice = discountPrice2.includes(".")
          ? discountPrice2
          : discountPrice2.substring(0, discountPrice2.length - 2) +
            "." +
            discountPrice2.substring(discountPrice2.length - 2);
        // hasDiscount
        const hasDiscount = discountPrice ? true : false;

        // const name = $(element).children("a").text();
        // const _prices = $(element).find(".product-price").text();
        // push to the results
        results.push({
          type: "Rápida recuperación",
          brand,
          name,
          price: hasDiscount ? discountPrice : price,
          discountPrice: hasDiscount ? price : discountPrice,
          hasDiscount,
        });
      });
      // push to the acc before going to the next page
      accumulator.push(...results);
      // next page
      return axios.get(urls[4]);
    })
    .then((response) => {
      // Load the HTML into cheerio
      const $ = cheerio.load(response.data);
      // Make an empty array for saving our scraped info
      const results = [];
      // With cheerio, look at each award-winning site, enclosed in "figure" tags with the class name "site"
      $("div.product_info").each((i, element) => {
        // brand
        const brand = $(element).find(".marca").text();
        // name
        const _name = $(element).find("a").text();
        const name = _name.substr(0, _name.indexOf("\t"));
        // price
        const _price = $(element).find(".price").text();
        const price1 = _price.substr(_price.indexOf(":") + 1, 100).trim();
        const price2 = price1.replace("$", "");
        const price = price2.includes(".")
          ? price2
          : price2.substring(0, price2.length - 2) +
            "." +
            price2.substring(price2.length - 2);
        // discount price
        const _discountPrice = $(element).find(".old_price").text();
        const discountPrice2 = _discountPrice
          .substr(_discountPrice.indexOf("$") + 1, 100)
          .trim();
        const discountPrice = discountPrice2.includes(".")
          ? discountPrice2
          : discountPrice2.substring(0, discountPrice2.length - 2) +
            "." +
            discountPrice2.substring(discountPrice2.length - 2);
        // hasDiscount
        const hasDiscount = discountPrice ? true : false;

        // const name = $(element).children("a").text();
        // const _prices = $(element).find(".product-price").text();
        // push to the results
        results.push({
          type: "Solar",
          brand,
          name,
          price: hasDiscount ? discountPrice : price,
          discountPrice: hasDiscount ? price : discountPrice,
          hasDiscount,
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

// scrapHomeDepotAdhesivos()
// matches with /api/scrap/homedepot/adhesivos
router.get("/adhesivos", function (req, res) {
  const urls = [
    "https://www.homedepot.com.mx/SearchDisplay?categoryId=&storeId=10351&catalogId=10101&langId=-5&sType=SimpleSearch&resultCatEntryType=2&showResultsPage=true&searchSource=Q&pageView=&beginIndex=0&pageSize=450&searchTerm=adhesivo#facet:&productBeginIndex:0&facetLimit:&orderBy:&pageView:grid&minPrice:&maxPrice:&pageSize:450&",
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
        // brand
        const brand = $(element).find(".marca").text();
        // name
        const _name = $(element).find("a").text();
        const name = _name.substr(0, _name.indexOf("\t"));
        // price
        const _price = $(element).find(".price").text();
        const price1 = _price.substr(_price.indexOf("$"), 100).trim();
        const price2 = price1.replace("$", "");
        console.log(_price + "//" + price2);
        const price = price2.includes(".")
          ? price2
          : price2.substring(0, price2.length - 2) +
            "." +
            price2.substring(price2.length - 2);
        // discount price
        const _discountPrice = $(element).find(".old_price").text();
        const discountPrice2 = _discountPrice
          .substr(_discountPrice.indexOf("$") + 1, 100)
          .trim();
        const discountPrice = discountPrice2.includes(".")
          ? discountPrice2
          : discountPrice2.substring(0, discountPrice2.length - 2) +
            "." +
            discountPrice2.substring(discountPrice2.length - 2);
        // hasDiscount
        const hasDiscount = discountPrice ? true : false;

        // const name = $(element).children("a").text();
        // const _prices = $(element).find(".product-price").text();
        // push to the results
        results.push({
          brand,
          name,
          price: hasDiscount ? discountPrice : price,
          discountPrice: hasDiscount ? price : discountPrice,
          hasDiscount,
        });
      });
      // push to the acc before going to the next page
      accumulator.push(...results);
      // send response to the client
      res.send(accumulator.slice(1, 10));
    })
    .catch((err) => {
      console.log("@error", err);
      res.status(422).send("Ocurrió un error");
    });
});

module.exports = router;
