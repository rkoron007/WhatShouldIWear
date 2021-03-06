import React from "react";

import DayListItem from "./dayListItem";

// render the weather forecast
const DayList = ({ days }) => {
  return (
    <ul className="day-list">
      {days.map(day => (
        <DayListItem key={day.id} day={day} />
      ))}
    </ul>
  );
};

export default DayList;
