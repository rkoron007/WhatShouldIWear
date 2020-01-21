const express = require("express");
const router = express.Router();
const request = require("request");

const METAWEATHER_URL = "https://www.metaweather.com/api/";

// rendering our main html file which will be used by React to render
router.get("/", (req, res) => {
  res.sendFile("index.html");
});

// backend API to fetch woeid information based on a query
// woeid = "Where in the World" id which can be used to get location's data
router.get("/api/woeid/:queryLocation", (req, res) => {
  let location = req.params.queryLocation;
  let url = `${METAWEATHER_URL}/location/search/?query=${location}`;
  req.pipe(request(url)).pipe(res);
});

// backend API to fetch location information including weather
router.get("/api/location/:woeid", (req, res) => {
  let woeid = req.params["woeid"];
  let url = `${METAWEATHER_URL}/location/${woeid}/`;
  req.pipe(request(url)).pipe(res);
});

module.exports = router;
