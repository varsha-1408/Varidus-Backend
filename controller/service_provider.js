// Function for pushing data from serviceProvider modal to its database model

const mongoose = require("mongoose");
const userModel = require("../model/serviceProviderModel.js");

const register = async(user, data) => {
  
  var usermodel = new userModel({
      _id: user,
      db_sClientBase: data.ClientBase,
      db_sProviderType: data.ProviderType,
      db_sServices: data.Services,
      db_sLocations: data.Locations  
  });

  usermodel.save().then(result => {
    console.log("USERINFO",result);
  })
  .catch(err => {
    console.log(err);
  });
  
};

module.exports = { register };