import React from "react";

const DayListItem = day => {
  return (
    <li>
      <p>{day.the_temp}</p>
    </li>
  );
};

export default DayListItem;
