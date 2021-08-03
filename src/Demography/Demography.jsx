import React, { useEffect, useState } from "react";
import "./Demography.scss";

const Demography = () => {
  const [userData, setUserData] = useState([]);
  const [demographyData, setDemographyData] = useState({});

  useEffect(() => {
    fetch("http://localhost:3100/users")
      .then((response) => response.json())
      .then((data) => {
        setUserData(data);
      });
  }, []);

  const handleItemClick = (event) => {
    fetch(`http://localhost:3100/users/age/${event.target.innerHTML}`)
      .then((response) => response.json())
      .then((data) => {
        setDemographyData(data);
      });
  };

  const itemList = [
    "carrot",
    "apple",
    "grapes",
    "cake",
    "crackers",
    "chips",
    "tv",
    "ham",
    "beef",
  ];

  if (userData.length === 0) {
    return null;
  }

  return (
    <div className="demography">
      <div>
        <h3 className="user-header">All Users</h3>
        <p>Users and their age</p>
        <table class="table">
          <thead>
            <tr>
              <th scope="col">Username</th>
              <th scope="col">Age</th>
            </tr>
          </thead>
          <tbody>
            {userData.map((user, index) => {
              return (
                <tr key={index}>
                  <td>{user.username}</td>
                  <td>{user.age}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="demography-section">
        <h3 className="dg-header">Age Demographic of User With ___</h3>
        <div class="dropdown">
          <button
            class="btn btn-primary dropdown-toggle"
            type="button"
            id="dropdownItem"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Item
          </button>
          <ul class="dropdown-menu" aria-labelledby="dropdownItem">
            {itemList.map((menuItem) => {
              return (
                <li
                  class="dropdown-item dropdown-menu-item"
                  onClick={(e) => handleItemClick(e)}
                >
                  {menuItem}
                </li>
              );
            })}
          </ul>
        </div>
        <table class="table">
          <thead>
            <tr>
              <th scope="col">Age</th>
              <th scope="col">Count</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(demographyData).map((dmg, index) => {
              return (
                <tr key={index}>
                  <td>{dmg}</td>
                  <td>{demographyData[dmg]}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Demography;
