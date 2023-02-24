import React, { use, useEffect, useState } from "react";
import axios from "axios";

const Main = () => {
  const [libraries, setLibraries] = useState([]);
  const [loaded, setLoaded] = useState(false);
  let fetched = false;

  const fetchURL = "https://concordia.onrender.com/";

  useEffect(() => {
    if (!fetched) {
      axios.get(fetchURL).then((response) => {
        setLibraries(Object.entries(response.data));
      });
      fetched = true;
      setLoaded(true);
    }
  }, [fetchURL]);

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

    if (date.toDateString() == today.toDateString()) {
      return "Today at " + datetime.split(" ")[1];
    } else {
      return datetime;
    }
  };

  if (!loaded) {
    return <>...</>;
  } else {
    return (
      <div className="">
        <h1 className="text-2xl uppercase font-bold p-8 text-center text-white">
          Library Occupancy
        </h1>
        {libraries.map((item, id) => (
          <div
            className="bg-white text-black grid grid-cols-1 p-8 mb-4"
            key={id}
          >
            <h2 className="uppercase font-bold">{item[0]}</h2>
            <h3>Occupancy: {Math.trunc(Object.values(item[1])[0])}</h3>
            <h4>
              Last updated: {getPrettyDateTime(Object.values(item[1])[1])}
            </h4>
          </div>
        ))}
      </div>
    );
  }
};

export default Main;
