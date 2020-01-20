import React from "react";

const DayList = days => {
  return (
    <ul>
      {days.map(day => (
        <DayListItem key={day.id} day={day} />
      ))}
    </ul>
  );
};

export default DayList;
