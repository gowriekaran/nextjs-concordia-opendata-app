import React, { use, useEffect, useState } from "react";
import axios from "axios";
import FetchingPlaceHolder from "../components/FetchingPlaceHolder";

const LibrariesEvents = () => {
  const [events, setEvents] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const fetchURL = process.env.NEXT_PUBLIC_SERVER_URL;
  const request = "events/";
  let fetched = false;

  useEffect(() => {
    if (!fetched) {
      axios
        .get(
          fetchURL,
          {
            params: {
              url: request,
            },
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          setEvents(response.data.events);
          fetched = true;
          setLoaded(true);
        });
    }
  }, [fetchURL]);

  const getPrettyDateTime = (datetime) => {
    let dateString = datetime.split("T")[0];

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

    let timeString = datetime.split("T")[1].split("-")[0];

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
      return (
        getActualDay(date) +
        ", " +
        getActualMonth(date) +
        " " +
        date.getDate() +
        getDateSuffix(date) +
        " " +
        date.getFullYear() +
        " " +
        time
      );
    }
  };

  const getDateSuffix = (date) => {
    if (date > 3 && date < 21) return "th";
    switch (date % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  };

  const getActualDay = (date) => {
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    return days[date.getDay()];
  };

  const getActualMonth = (date) => {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    return months[date.getMonth()];
  };

  if (!loaded) {
    return <FetchingPlaceHolder />;
  } else {
    return (
      <div className="">
        <h1 className="text-xl text-center uppercase font-bold p-8 text-white">
          Events
        </h1>
        <div className="overflow-x-scroll flex">
          {events.map((item, id) => (
            <div
              className="bg-white text-black grid grid-cols-1 p-4 mr-4 event min-w-[400px] max-h-[200px] shadow-xl"
              key={id}
            >
              <a href={item.url.public} className="text-blue-500">
                <h2 className="uppercase font-bold">{item.title}</h2>
              </a>
              <h2 className="">Start: {getPrettyDateTime(item.start)}</h2>
              <h2 className="">End: {getPrettyDateTime(item.end)}</h2>
            </div>
          ))}
        </div>
      </div>
    );
  }
};

export default LibrariesEvents;
