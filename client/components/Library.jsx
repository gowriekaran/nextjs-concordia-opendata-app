import React from "react";

const Library = ({ name, occupancy, lastUpdated }) => {
  const getPrettyDateTime = (datetime) => {
    let dateString = datetime.split(" ")[0];

    let dateStringYear = dateString.split("-")[0];
    dateString = dateString.substring(dateString.indexOf("-") + 1);

    let dateStringMonth = dateString.split("-")[0];
    dateString = dateString.substring(dateString.indexOf("-") + 1);

    let dateStringDate = dateString.split("-")[0];

    let date = new Date(
      dateStringYear,
      parseInt(dateStringMonth) - 1,
      dateStringDate
    );

    let today = new Date();

    let timeString = datetime.split(" ")[1];

    let hour = timeString.split(":")[0];
    timeString = timeString.substring(timeString.indexOf(":") + 1);

    let minute = timeString.split(":")[0];
    timeString = timeString.substring(timeString.indexOf(":") + 1);

    let second = timeString.split(":")[0].split(".")[0];

    let suffix = " AM";

    if (hour >= 12) {
      suffix = " PM";
      if (hour != 12) {
        hour -= 12;
      }
    }

    let time = hour + ":" + minute + ":" + second + suffix;

    if (date.toDateString() == today.toDateString()) {
      return "Today at " + time;
    } else {
      return datetime;
    }
  };

  return (
    <div className="bg-white text-black grid grid-cols-1 p-8 mb-4 library shadow-xl">
      <h2 className="uppercase font-bold">{name}</h2>
      <h3>Occupancy: {Math.trunc(occupancy)}</h3>
      {Math.trunc(occupancy) < 0 && (
        <h5 className="italic text-sm text-red-500">
          (Not sure why it is negative, this is data fetched directly from
          Concordia.)
        </h5>
      )}
      <h4>Last updated: {getPrettyDateTime(lastUpdated)}</h4>
    </div>
  );
};

export default Library;
