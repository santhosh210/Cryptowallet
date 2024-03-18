// src/components/Dashboard.tsx

import React, { useState, useEffect } from "react";
import cardsIconBlack from "../grid black.svg";
import cardsIconGrey from "../grid gray.svg";
import tableIconBlack from "../list black.svg";
import tableIconGrey from "../list gray.svg";
import pulldown from "../pull down.svg";
import axios from "axios";
import "./dashboard.css";

interface BalanceData {
  currency: string;
  total: number;
  available: number;
  inOrder: number;
  lock: number;
  svgImage: string;
}

const Dashboard: React.FC = () => {
  const [data, setData] = useState<BalanceData[]>([]);
  const [view, setView] = useState<"cards" | "table">("table");
  const [searchTerm, setSearchTerm] = useState<string>("");

  const [iconIndex, setIconIndex] = useState(0);
  const cardIcons = [cardsIconGrey, cardsIconBlack];
  const tableIcons = [tableIconBlack, tableIconGrey];
  const [openDropdown, setOpenDropdown] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const handleCardIconView = () => {
    setIconIndex((prevIndex) =>
      prevIndex === cardIcons.length - 1 ? 0 : prevIndex + 1
    );
    setView("cards");
  };
  const handletableIconView = () => {
    setIconIndex((pIndex) =>
      pIndex === cardIcons.length - 1 ? 0 : pIndex + 1
    );
    setView("table");
  };

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/balances");
      console.log(response.data);
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const filteredData = data.filter((item) =>
    item.currency.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const toggleDropdown = (currency: string | number) => {
    setOpenDropdown((prevState: any) => ({
      ...prevState,
      [currency]: !prevState[currency],
    }));
  };

  return (
    <div>
      <div className="container">
        <h1 className="heading">Crypto Wallet</h1>
        <hr color="#c4c9cc" />
        <div className="items-container">
          <div className="search-container">
            <input
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
          <div>
            {/* <button onClick={() => setView("cards")}> */}
            <button className="custom-btn" onClick={handletableIconView}>
              <img
                className="tableIcon"
                src={tableIcons[iconIndex]}
                alt="table View"
              />
            </button>
            <button className="custom-btn" onClick={handleCardIconView}>
              <img
                className="cardIcon"
                src={cardIcons[iconIndex]}
                alt="card View"
              />
            </button>
          </div>
        </div>
        {view === "cards" ? (
          <div className="neumorphic-cards">
            {filteredData.map((item) => (
              <div key={item.currency} className="neumorphic-card">
                <h3>{item.currency}</h3>
                <p>Total: {item.total}</p>
                <p>Available: {item.available}</p>
                <p>In Order: {item.inOrder}</p>
                <p>Lock: {item.lock}</p>
              </div>
            ))}
          </div>
        ) : (
          <table className="neumorphic-table">
            <thead>
              <tr>
                <th>Currency</th>
                <th>Total</th>
                <th>Available</th>
                <th>In Order</th>
                <th>Lock</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((item, index) => (
                <tr key={item.currency}>
                  {/* <td>{item.currency}</td> */}
                  <td>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <div
                        style={{ marginRight: "8px" }}
                        dangerouslySetInnerHTML={{ __html: item.svgImage }}
                      />
                      <span>{item.currency}</span>
                    </div>
                  </td>
                  <td>{item.total}</td>
                  <td>{item.available}</td>
                  <td>{item.inOrder}</td>
                  <td>{item.lock}</td>
                  <td>
                    <img
                      className="pullDownIcon"
                      src={pulldown}
                      alt="pull down"
                      onClick={() => toggleDropdown(7)}

                      // onClick={() => setOpenDropdown(openDropdown)}
                    />
                    {openDropdown && (
                      <select>
                        <option value="Exchange">Exchange</option>
                        <option value="Deposit">Deposit</option>
                        <option value="Withdraw">Withdraw</option>
                        <option value="Trade">Trade</option>
                        <option value="Transfer">Transfer</option>
                      </select>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
