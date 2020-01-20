const handleResponseJSON = response => {
  if (response.status >= 201) {
    throw new Error("Bad response from server");
  }
  return response.json();
};

const tempConvert = celsius => Math.round((celsius * 9) / 5 + 32);

const dateConvert = dateStr => {
  const date = new Date(dateStr);
  const day = date.getDate() + 1;
  const month = date.getMonth() + 1;
  return `${month}/${day}`;
};

const convertForecast = weatherForecast => {
  weatherForecast.forEach(day => {
    day.min_temp = tempConvert(day.min_temp);
    day.max_temp = tempConvert(day.max_temp);
    day.the_temp = tempConvert(day.the_temp);
    day.applicable_date = dateConvert(day.applicable_date);
  });
};

// woeid = "Where in the World" id which can be used to get location's data
export const fetchWoeId = queryLocation => {
  fetch(`api/woeid/${queryLocation}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    },
    credentials: "same-origin"
  })
    .then(response => {
      return handleResponseJSON(response);
    })
    .then(response => {
      if (response) {
        const woeid = response[0].woeid;
        fetchLocationData(woeid);
      }
    });
};

const fetchLocationData = woeid => {
  fetch(`api/location/${woeid}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    },
    credentials: "same-origin"
  })
    .then(response => {
      return handleResponseJSON(response);
    })
    .then(response => {
      if (response) {
        const weatherForecast = response.consolidated_weather;
        convertForecast(weatherForecast);
        return weatherForecast;
      }
    });
};
