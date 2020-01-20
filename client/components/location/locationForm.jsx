import React from "react";
import { fetchWoeId } from "../../util/weatherFetch";
import DayList from "../day/dayList";
import Button from "react-bootstrap/Button";

class LocationForm extends React.Component {
  constructor() {
    super();
    this.state = {
      locationInput: "",
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
    fetchWoeId(queryLocation, weatherForecast =>
      this.setState({ days: weatherForecast })
    );
  }

  checkForForecast() {
    if (typeof this.state.days === "object") {
      return <DayList days={this.state.days} />;
    } else if (this.state.days) {
      return this.state.days;
    }
  }

  render() {
    let dayComponent = this.checkForForecast();

    return (
      <div>
        <form onSubmit={this.submitForm}>
          <h1>Enter a Location:</h1>
          <input
            type="text"
            value={this.state.locationInput}
            onChange={this.update("locationInput")}
          />
          <Button type="submit" variant="outline-primary">
            What Should I Wear?
          </Button>
        </form>
        {dayComponent}
      </div>
    );
  }
}

export default LocationForm;
