import React, { useEffect, useState, useMemo } from "react";
import Select from "react-select";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import "./App.css";

const Table = ({ d }) => {
  if (d == undefined) {
    return <></>;
  }

  return (
    <table style={{ width: "100%", borderCollapse: "collapse" }}>
      <thead>
        <tr style={{ backgroundColor: "#f2f2f2", border: "1px solid #dddddd" }}>
          <th style={{ padding: "8px", textAlign: "left" }}>Car Type</th>
          <th style={{ padding: "8px", textAlign: "left" }}>Price</th>
          <th style={{ padding: "8px", textAlign: "left" }}></th>
        </tr>
      </thead>
      <tbody>
        {d.map((item) => (
          <tr key={item.name} style={{ border: "1px solid #dddddd" }}>
            <td style={{ padding: "8px" }}>{item.name}</td>
            <td style={{ padding: "8px" }}>{item.price}</td>
            <td style={{ padding: "8px" }}>
              <button>Book</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default function App() {
  const [email, setEmail] = useState("");
  const [source, setSource] = useState("");
  const [emailError, setEmailError] = useState("");
  const [sourceError, setSourceError] = useState("");
  const [destination, setDestination] = useState("");

  const [data, setData] = useState([]);
  const [travelData, setTravelData] = useState([]);

  const columns = useMemo(
    () => [
      {
        accessorKey: "options.name", //access nested data with dot notation
        header: "Car",
        size: 150,
      },
      {
        accessorKey: "options.price",
        header: "Price",
        size: 150,
      },
    ],
    []
  );

  // const table = useMaterialReactTable({
  //   columns,
  //   travelData, //data must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
  // });

  const onButtonClick = async () => {
    setEmailError("");
    if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      setEmailError("Please enter a valid email");
      return;
    }

    fetch(
      "http://localhost:3002/options?email=" +
        email +
        "&source=" +
        source.value +
        "&destination=" +
        destination.value,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }
    )
      .then((r) => r.json())
      .then((r) => {
        console.log(r);
        setTravelData(r);
      });
  };

  const fetchSource = async () => {
    fetch("http://localhost:3002/locations", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((r) => r.json())
      .then((r) => {
        setData(r);
      });
  };

  useEffect(() => {
    fetchSource();
  }, []);

  return (
    <div className="mainContainer">
      <div className="titleContainer">
        <div>Cab booking System</div>
      </div>
      <br />
      <div className={"inputContainer"}>
        <h3>Email</h3>
        <input
          value={email}
          placeholder="Enter your email here"
          onChange={(ev) => setEmail(ev.target.value)}
          className={"inputBox"}
        />
        <label className="errorLabel">{emailError}</label>
      </div>
      <br />
      <div className={"inputContainer"}>
        <h3>Source</h3>
        <Select
          placeholder="Enter Source"
          options={data}
          className={"inputBox"}
          onChange={setSource}
        />
      </div>
      <br />
      <div className={"inputContainer"}>
        <h3>Destination</h3>
        <Select
          placeholder="Enter Destination"
          options={data}
          className="inputBox"
          onChange={setDestination}
        />
      </div>
      <br />
      <div className={"inputContainer"}></div>
      <div className="inputContainer"></div>
      <div className="inputContainer">
        <input
          className="inputButton"
          type="button"
          onClick={onButtonClick}
          value={"Search"}
        />
      </div>

      <div>
        <h1>Travel Options</h1>
        <Table d={travelData.options} />
      </div>
    </div>
  );
}
