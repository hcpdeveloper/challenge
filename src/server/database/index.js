"use strict";
const _ = require("lodash");
const db = require("./db.js");

// UTILS
//----------------
// This is a mock db call that waits for # milliseconds and returns
const mockDBCall = (dataAccessMethod) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(dataAccessMethod());
    }, 500);
  });
};

// MOCK DB CALLS
//----------------
const getUsers = () => {
  const dataAccessMethod = () => _.map(db.usersById, (userInfo) => userInfo);
  return mockDBCall(dataAccessMethod);
};

const getListOfAgesOfUsersWith = (item) => {
  const dataAccessMethod = () => {
    const userItems = db.itemsOfUserByUsername;
    const matchedUsers = [];
    Object.keys(userItems).map((usr) => {
      if (userItems[usr].includes(item)) {
        matchedUsers.push(usr);
      }
    });

    const userDetails = db.usersById;
    const ageDemography = {};
    Object.keys(userDetails).map((usrItem) => {
      if (matchedUsers.includes(userDetails[usrItem].username)) {
        if (ageDemography[userDetails[usrItem].age] === undefined) {
          ageDemography[userDetails[usrItem].age] = 1;
        } else {
          ageDemography[userDetails[usrItem].age] += 1;
        }
      }
    });
    return ageDemography;
  };
  return mockDBCall(dataAccessMethod);
};

module.exports = {
  getUsers,
  getListOfAgesOfUsersWith,
};
