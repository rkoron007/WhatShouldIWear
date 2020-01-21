// Utility function for fetching a location's forecast and converting
// that forecast for our React frontend

const tempConvert = celsius => Math.round((celsius * 9) / 5 + 32);

// converting the date into a more usable format
const dateConvert = dateStr => {
  const date = new Date(dateStr);
  const day = date.getDate() + 1;
  const month = date.getMonth() + 1;
  return `${month}/${day}`;
};

// converting celsius, dates, and adding clothing recommendations for
// each day of our forecast
const prepareForecast = weatherForecast => {
  weatherForecast.forEach(day => {
    day.min_temp = tempConvert(day.min_temp);
    day.max_temp = tempConvert(day.max_temp);
    day.the_temp = tempConvert(day.the_temp);
    day.applicable_date = dateConvert(day.applicable_date);
    day.clothesMessage = clothesRecommendation(day);
  });
};

// function for setting a property on each day object with the recommended
// clothing for that day
const clothesRecommendation = day => {
  if (isRaining(day)) {
    return "It's raining - make sure to wear a hood!";
  } else if (day.max_temp <= 32) {
    return "It's freezing - literally! Wear all your layers.";
  } else if (day.max_temp <= 50) {
    return "It's pretty chilly - wear at least two layers.";
  } else if (day.max_temp <= 65) {
    return "A little brisk - bring a medium weight coat.";
  } else if (day.max_temp <= 75) {
    return "It's pretty nice out there! Bring a light coat.";
  } else {
    return "It's hot! Bust out the shorts and sunglasses!";
  }
};

const isRaining = weather => {
  // grab the weather for tomorrow
  const rains = ["h", "t", "hr", "lr", "s"];
  if (rains.includes(weather.weather_state_abbr)) {
    return true;
  }
  return false;
};

// function fetching data with a given url
const fetchRequest = url => {
  return fetch(`${url}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    },
    credentials: "same-origin"
  });
};

// intakes a response and returns a promise with the JSON from that response
const handleResponseJSON = response => {
  if (response.status >= 201) {
    throw new Error("Bad response from server");
  }
  return response.json();
};

// woeid = "Where in the World" id which can be used to get location's data
export const fetchWoeId = (queryLocation, callback) => {
  const url = `api/woeid/${queryLocation}`;
  fetchRequest(url)
    .then(response => {
      return handleResponseJSON(response);
    })
    .then(response => {
      if (response.length > 0) {
        const woeid = response[0].woeid;
        fetchLocationData(woeid, callback);
      } else {
        // if we are unable to find a location we convey that to our user
        return callback(
          `We are unable to find a forecast for that location.
          Please check your spelling and try again.`
        );
      }
    });
};

// fetch location data based on woeid (including weather forecast)
const fetchLocationData = (woeid, callback) => {
  const url = `api/location/${woeid}`;
  fetchRequest(url)
    .then(response => {
      return handleResponseJSON(response);
    })
    .then(response => {
      if (response) {
        // extract just the upcoming forecast form our response
        const weatherForecast = response.consolidated_weather;

        // converting celsius, dates, and adding clothing recommendations for
        // each day of our forecast
        prepareForecast(weatherForecast);

        // pass our several days of weather forecast back to React
        callback(weatherForecast);
      }
    });
};
