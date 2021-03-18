// Function for pushing data from startup_provider modal to its database model

const mongoose = require("mongoose");
const userModel = require("../model/startup_providerModel.js");

const register = async(user, data) => {
  
  var usermodel = new userModel({
      _id: user,
      db_sClientBase: data.ClientBase,
      db_sServices: data.Services,
      db_sLocations: data.Locations,  
      db_sPartnerType: data.PartnerType
  });

  usermodel.save().then(result => {
    console.log("USERINFO",result);
  })
  .catch(err => {console.log(err); });
  
};

module.exports = { register };