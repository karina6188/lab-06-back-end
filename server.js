'use strict';

const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
require('dotenv').config();

app.get('/location', (request, response) => {
  try {
    let searchQuery = request.query.data;
    const geoDataResults = require('./data/geo.json');

    const locations = new Location(searchQuery, geoDataResults);

    response.status(200).send(locations);
  }
  catch(err) {
    console.error(err);
  }
})

function Location(searchQuery, geoDataResults) {
  this.search_query = searchQuery;
  this.formatted_query = geoDataResults.results[0].formatted_address;
  this.latitude = geoDataResults.results[0].geometry.location.lat;
  this.longitude = geoDataResults.results[0].geometry.location.lng;
}

app.use('*', (request, response) => {
  response.status(404).send('Error 404 Page Not Found');
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`listening to ${PORT}`);
});

