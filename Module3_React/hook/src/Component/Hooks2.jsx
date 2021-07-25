import React, { useState, useEffect } from "react";

const Hooks2 = () => {
  const [datatype, setDatatype] = useState("posts");

  useEffect(() => {
    // use effect works like componentDidMount function
    // we use useEffect so that it runs on any particular condition
    // data can be extracted through APIs from here

    fetch(`https://jsonplaceholder.typicode.com/${datatype}`)
      .then((response) => {
        // response.json is also a promisified function so another 'then' has to be attached to it
        return response.json();
      })
      .then((data) => {
        console.log(data);
      });
  }, [datatype]);

  return (
    <div>
      <div className="buttons">
        <button onClick={() => setDatatype("posts")}>posts</button>
        <button onClick={() => setDatatype("comments")}>comments</button>
        <button onClick={() => setDatatype("albums")}>Albums</button>
      </div>
      <p>{datatype}</p>
    </div>
  );
};

export default Hooks2;
