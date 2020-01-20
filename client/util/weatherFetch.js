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

// converting a day's celsius values to fahrenheit
const convertForecast = weatherForecast => {
  weatherForecast.forEach(day => {
    day.min_temp = tempConvert(day.min_temp);
    day.max_temp = tempConvert(day.max_temp);
    day.the_temp = tempConvert(day.the_temp);
    day.applicable_date = dateConvert(day.applicable_date);
  });
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
      if (response) {
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

        // converting celsius and dates for our forecast
        convertForecast(weatherForecast);

        // pass our several days of weather forecast back to React
        callback(weatherForecast);
      }
    });
};
