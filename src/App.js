import React, { useState, useEffect } from "react";
import axios from "axios";
import Graph from "./Components/Graph";

function StockData() {
  const [symbol, setSymbol] = useState("");
  const [data, setData] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/predict", { text: symbol });
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Enter a stock symbol:
          <input
            type="text"
            value={symbol}
            onChange={(e) => setSymbol(e.target.value)}
          />
        </label>
        <button type="submit">Get Stock Data</button>
      </form>
    </div>
  );
}

export default StockData;
