import React, { use, useEffect, useState } from "react";
import axios from "axios";

const Main = () => {
  const [libraries, setLibraries] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const fetchURL = "https://concordia.onrender.com/";
  let fetched = false;

  useEffect(() => {
    if (!fetched) {
      axios
        .get(fetchURL, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          setLibraries(Object.entries(response.data));
          fetched = true;
          setLoaded(true);
        });
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

    let timeString = datetime.split(" ")[1];

    let hour = timeString.split(":")[0];
    timeString = timeString.substring(timeString.indexOf(":") + 1);

    let minute = timeString.split(":")[0];
    timeString = timeString.substring(timeString.indexOf(":") + 1);

    let second = timeString.split(":")[0].split(".")[0];

    let suffix = " AM";

    if (hour > 12) {
      suffix = " PM";
    }

    let time = hour + ":" + minute + ":" + second + suffix;

    if (date.toDateString() == today.toDateString()) {
      return "Today at " + time;
    } else {
      return datetime;
    }
  };

  if (!loaded) {
    return (
      <div className="grid grid-cols-1 place-items-center">
        <h1 className="text-2xl uppercase font-bold p-8 text-center text-[#e5a712]">
          Fetching data
        </h1>
        <svg
          className="w-8 h-8 mr-2 text-[#f0f0f0] animate-spin dark:text-[#c8c8c8] fill-[#e5a712]"
          aria-hidden="true"
          viewBox="0 0 100 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="currentColor"
          />
          <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="currentFill"
          />
        </svg>
        <h1 className="text-2xl uppercase font-bold p-8 text-center text-[#e5a712]">
          potentially more use of the API to come
        </h1>
      </div>
    );
  } else {
    return (
      <div className="">
        <h1 className="text-2xl uppercase font-bold p-8 text-center text-[#e5a712]">
          Library Occupancy
        </h1>
        {libraries.map((item, id) => (
          <div
            className="bg-white text-black grid grid-cols-1 p-8 mb-4 library"
            key={id}
          >
            <h2 className="uppercase font-bold">{item[0]}</h2>
            <h3>Occupancy: {Math.trunc(Object.values(item[1])[0])}</h3>
            {Math.trunc(Object.values(item[1])[0]) < 0 && (
              <h5 className="italic text-sm text-red-500">
                (Not sure why it is negative, this is data fetched directly from
                Concordia.)
              </h5>
            )}
            <h4>
              Last updated: {getPrettyDateTime(Object.values(item[1])[1])}
            </h4>
          </div>
        ))}
        <h1 className="text-2xl uppercase font-bold p-8 text-center text-[#e5a712]">
          potentially more use of the API to come
        </h1>
      </div>
    );
  }
};

export default Main;
