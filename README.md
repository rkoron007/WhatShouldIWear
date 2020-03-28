# What Should I Wear?

[Live Demo Here!][demo]

Have you ever looked at a weather forecast and had trouble converting the
temperature into an outfit for that day? So have I. That is what **What Should I
Wear?** was built to do. _What Should I Wear?_ uses the [MetaWeather
API][metaweather-api] to fetch a 5+ day weather forecast for a city and then
give clothing recommendations based on that forecast.

[metaweather-api]: https://www.metaweather.com/api/
[demo]: https://what-should-i-wear-this-week.herokuapp.com/

## How it Works

_What Should I Wear?_ uses a Node & Express backend with a React frontend.

The _What Should I Wear?_ React frontend queries the Node/Express backend which
will then make a `fetch` request to the [MetaWeather API][metaweather-api] with
a city name. If the city name is valid, the returned response from the `fetch`
request will contain a `woeid` (which stands for a 'Where in the World' id).

```js
// client/util/weatherFetch

export const fetchWoeId = (queryLocation, callback) => {
  const url = `api/woeid/${queryLocation}`;
  // make a fetch to the Node/Express backend which will query the MetaWeather API
  fetchRequest(url)
    .then(response => {
      // return the response json or throw an error
      return handleResponseJSON(response);
    })
    .then(response => {
      // if we have a response
      if (response.length > 0) {
        const woeid = response[0].woeid;
        // we will fetch location data with the returned woeid passing our
        // initial callback
        fetchLocationData(woeid, callback);
      } else {
        return callback(
          `We are unable to find a forecast for that location.
          Please check your spelling and try again.`
        );
      }
    });
};
```

The returned `woeid` will be used for an additional `fetch` request to find the
weather forecast for the specified location. The returned weather forecast will
be handed back to our React frontend for rendering.

## Future Features

This ia a simple application which could have any number of fun future
additions. A list of fun things I'd like to add in the future are:

- Recommending Specific Clothing types for certain types of weather (for example
  jackets that are best for below freezing temperatures)
- Support for both Celsius & Fahrenheit temperatures
- Support for Google/iCal Calendar clothing reminders based on the forecast
