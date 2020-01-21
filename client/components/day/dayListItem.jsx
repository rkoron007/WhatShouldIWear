import React from "react";

import Card from "react-bootstrap/Card";

const DayListItem = ({ day }) => {
  return (
    <li>
      <Card style={{ width: "18rem" }}>
        <Card.Header as="h4">{`${day.applicable_date} - ${day.the_temp} °F`}</Card.Header>
        <Card.Img
          variant="top"
          src={`https://www.metaweather.com/static/img/weather/png/${day.weather_state_abbr}.png`}
        />
        <Card.Body>
          <Card.Text>{day.clothesMessage}</Card.Text>
        </Card.Body>
      </Card>
    </li>
  );
};

export default DayListItem;
