import React from "react";
import { fetchWoeId } from "../../util/weatherFetch";
import DayList from "../day/dayList";

class LocationForm extends React.Component {
  constructor() {
    super();
    this.state = {
      locationInput: "",
      day: undefined
    };

    this.submitForm = this.submitForm.bind(this);
  }

  update(input) {
    return e => this.setState({ [input]: e.target.value });
  }

  submitForm(e) {
    e.preventDefault();
    let queryLocation = this.state.locationInput;
    const daysOfForecast = fetchWoeId(queryLocation).then(daysOfForecast =>
      this.setState({ days: daysOfForecast })
    );
  }

  render() {
    let dayComponent;
    if (this.state.days) {
      dayComponent = <DayList days={this.state.days} />;
    }
    return (
      <div>
        <form onSubmit={this.submitForm}>
          <h1>Enter a Location:</h1>
          <input
            type="text"
            value={this.state.locationInput}
            onChange={this.update("locationInput")}
          />
          <button>Check Dates</button>
        </form>
        {dayComponent}
      </div>
    );
  }
}

export default LocationForm;
