// Utility function for fetching a location's forecast and converting
// that forecast for our React frontend

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

// converting the date into a more usable format
const dateConvert = dateStr => {
  const date = new Date(dateStr);
  const day = date.getDate() + 1;
  const month = date.getMonth() + 1;
  return `${month}/${day}`;
};

const tempConvert = celsius => Math.round((celsius * 9) / 5 + 32);

// function for setting a property on each day object with the recommended
// clothing for that day
const clothesRecommendation = day => {
  if (isRaining(day)) {
    return "It will be raining - make sure to wear a hood!";
  } else if (day.max_temp <= 32) {
    return "It will be freezing - literally! Wear all your layers.";
  } else if (day.max_temp <= 50) {
    return "It is gonna be pretty chilly - wear at least two layers.";
  } else if (day.max_temp <= 65) {
    return "It will be a little brisk - bring a medium weight coat.";
  } else if (day.max_temp <= 75) {
    return "It will be pretty nice out there! Bring a light coat.";
  } else {
    return "It is gonna be hot! Bust out the shorts and sunglasses!";
  }
};

const isRaining = weather => {
  // different kinds of rain, e.g. "thunder"
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

// checks response status, returns response JSON
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
        // extract the upcoming forecast from our response
        const weatherForecast = response.consolidated_weather;

        // add clothing recommendations, convert celsius, and format dates
        // for each day of our forecast
        prepareForecast(weatherForecast);

        // pass our several days of weather forecast back to React
        callback(weatherForecast);
      }
    });
};
