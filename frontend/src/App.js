import React, { useEffect, useState } from "react";
import Select from "react-select";
import "./App.css";

const Table = ({ d }) => {
  if (d.options == undefined) {
    return <></>;
  }

  const bookhandler = () => {
    fetch("https://cab-booking-system-1bcch2izz-manasvi-singhs-projects-8602c199.vercel.app/bookcab?email=" + d.email, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((r) => r.json())
      .then((r) => {
        alert(
          "Your booking has been confirmed and the bookingID is: " + r.bookingId
        );
      });
  };
  
  return (
    <table className="table w-full">
      <thead>
        <tr className="bg-gray-100 border-b border-gray-300">
          <th className="p-2 text-left">Car Type</th>
          <th className="p-2 text-left">Price</th>
          <th className="p-2 text-left"></th>
        </tr>
      </thead>
      <tbody>
        {d.options.map((item) => (
          <tr key={item.name} className="border-b border-gray-300">
            <td className="p-2">{item.name}</td>
            <td className="p-2">{item.price}</td>
            <td className="p-2">
              <button className="btn btn-primary" onClick={bookhandler}>
                Book
              </button>
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

  const onButtonClick = async () => {
    setEmailError("");
    if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      setEmailError("Please enter a valid email");
      return;
    }

    fetch(
      "https://cab-booking-system-1bcch2izz-manasvi-singhs-projects-8602c199.vercel.app/options?email=" +
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
    fetch("https://cab-booking-system-1bcch2izz-manasvi-singhs-projects-8602c199.vercel.app/locations", {
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
    <div className="mainContainer p-4">
      <div className="titleContainer mb-4">
        <h1 className="text-3xl font-bold text-center">Cab Booking System</h1>
      </div>

      <div className="inputContainer mb-4">
        <h3>Email</h3>
        <input
          value={email}
          placeholder="Enter your email here"
          onChange={(ev) => setEmail(ev.target.value)}
          className="inputBox"
        />
        <label className="errorLabel">{emailError}</label>
      </div>

      <div className="inputContainer mb-4">
        <h3>Source</h3>
        <Select
          placeholder="Enter Source"
          options={data}
          className="inputBox"
          onChange={setSource}
        />
      </div>

      <div className="inputContainer mb-4">
        <h3>Destination</h3>
        <Select
          placeholder="Enter Destination"
          options={data}
          className="inputBox"
          onChange={setDestination}
        />
      </div>

      <div className="buttonContainer">
        <button className="btn btn-primary" onClick={onButtonClick}>
          Search
        </button>
      </div>

      {travelData.options && (
        <div className="mt-4 text-center">
          <h1 className="text-2xl font-bold mb-4">Travel Options</h1>
          <Table d={travelData} />
        </div>
      )}
    </div>
  );
}
