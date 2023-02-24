import React, { use, useEffect, useState } from "react";
import axios from "axios";
import Library from "../components/Library";
import FetchingPlaceHolder from "../components/FetchingPlaceHolder";

const LibrariesOccupancies = () => {
  const [greynuns, setGreynuns] = useState([]);
  const [webster, setWebster] = useState([]);
  const [vanier, setVanier] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const fetchURL = process.env.NEXT_PUBLIC_SERVER_URL;
  const request = "occupancy/";
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
          setGreynuns(response.data.GreyNuns);
          setWebster(response.data.Webster);
          setVanier(response.data.Vanier);
          fetched = true;
          setLoaded(true);
        });
    }
  }, [fetchURL]);

  if (!loaded) {
    return <FetchingPlaceHolder />;
  } else {
    return (
      <div className="">
        <h1 className="text-xl text-center uppercase font-bold p-8 text-white">
          Occupancy
        </h1>
        <Library
          name={"Webster"}
          occupancy={webster.Occupancy}
          lastUpdated={webster.LastRecordTime}
        />
        <Library
          name={"Greynuns"}
          occupancy={greynuns.Occupancy}
          lastUpdated={greynuns.LastRecordTime}
        />
        <Library
          name={"Vanier"}
          occupancy={vanier.Occupancy}
          lastUpdated={vanier.LastRecordTime}
        />
      </div>
    );
  }
};

export default LibrariesOccupancies;
