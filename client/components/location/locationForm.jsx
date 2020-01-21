import React from "react";
import { fetchWoeId } from "../../util/weatherFetch";
import DayList from "../day/dayList";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";

class LocationForm extends React.Component {
  constructor() {
    super();
    this.state = {
      locationInput: "",
      loading: false,
      days: ""
    };

    this.submitForm = this.submitForm.bind(this);
  }

  update(input) {
    return e => this.setState({ [input]: e.target.value });
  }

  submitForm(e) {
    e.preventDefault();
    let queryLocation = this.state.locationInput;
    // set our spinner running first
    this.setState({ loading: true });
    // next we'll fetch for a woeid based on the query location
    fetchWoeId(queryLocation, weatherForecast =>
      // setting the response into our state
      this.setState({ days: weatherForecast, loading: false })
    );
  }

  checkForForecast() {
    // if we have a weather forecast array we'll render the DayList component
    if (typeof this.state.days === "object") {
      return <DayList days={this.state.days} />;
    } else if (this.state.days) {
      // otherwise we will have an error to present to the user
      return <p className="error-message">{this.state.days}</p>;
    }
  }

  setSpinner() {
    // if loading we will show a spinner
    if (this.state.loading) {
      return <Spinner animation="border" variant="primary" />;
    } else {
      return undefined;
    }
  }

  render() {
    let dayComponent = this.checkForForecast();
    const spinner = this.setSpinner();

    return (
      <div>
        <form className="location-form" onSubmit={this.submitForm}>
          <InputGroup id="city-input-group">
            <FormControl
              placeholder="Enter a City Name"
              type="text"
              value={this.state.locationInput}
              onChange={this.update("locationInput")}
            />
            <InputGroup.Append>
              <Button type="submit" variant="outline-primary">
                What Should I Wear?
              </Button>
            </InputGroup.Append>
          </InputGroup>
        </form>
        {spinner}
        {dayComponent}
      </div>
    );
  }
}

export default LocationForm;
