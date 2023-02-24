import React from "react";
import LibrariesOccupancies from "../components/LibrariesOccupancies";
import LibrariesEvents from "../components/LibrariesEvents";

const Main = () => {
  return (
    <>
      <div>
        <h1 className="text-2xl uppercase font-bold p-8 text-center text-[#e5a712]">
          ConU Library Open Data
        </h1>
        <div className="p-8">
          <LibrariesOccupancies />
          <LibrariesEvents />
        </div>
        <h1 className="text-2xl uppercase font-bold p-8 text-center text-[#e5a712]">
          potentially more use of the API to come
        </h1>
      </div>
    </>
  );
};

export default Main;
