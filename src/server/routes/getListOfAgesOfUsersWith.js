"use strict";
const mockDBCalls = require("../database/index.js");

const getListOfAgesOfUsersWithHandler = async (request, response) => {
  try {
    const routeParams = request.params;
    const itemToLookup = routeParams.type;
    const data = await mockDBCalls.getListOfAgesOfUsersWith(itemToLookup);
    return response.status(200).send(JSON.stringify(data));
  } catch (err) {
    return response.status(500).send("Something went wrong!!!");
  }
};

module.exports = (app) => {
  app.get("/users/age/:type", getListOfAgesOfUsersWithHandler);
};
