import React from "react";

import Card from "react-bootstrap/Card";

const DayListItem = ({ day }) => {
  console.log(day);
  return (
    <li>
      <Card style={{ width: "18rem" }}>
        <Card.Img
          variant="top"
          src={`https://www.metaweather.com/static/img/weather/ic/${day.weather_state_abbr}.ico`}
        />
        <Card.Body>
          <Card.Title>{day.applicable_date}</Card.Title>
          <Card.Text>{day.the_temp}</Card.Text>
        </Card.Body>
      </Card>
    </li>
  );
};

export default DayListItem;
