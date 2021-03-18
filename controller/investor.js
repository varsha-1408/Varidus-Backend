// Function for pushing data from investor modal to its database model

const mongoose = require("mongoose");
const userModel = require("../model/investorModel.js");

// Registering a new investor
const register = async(user, data) => {
  
  var usermodel = new userModel({
      _id: user,
      db_sInvestorType: data.InvestorType,
      db_sMininumAmount: data.MinimumAmount,
      db_sMaximumAmount: data.MaximumAmount,
      db_sClients: data.Clients,
      db_sVertical: data.Vertical,
      db_sOwnership: data.Ownership,
      db_sFundingStage: data.FundingStage
  });

  usermodel.save().then(result => {
    console.log("USERINFO",result);
  })
  .catch(err => {
    console.log(err);
  });
  
};



module.exports = { register };