// Function for pushing data from startup_investor modal to its database model

const mongoose = require("mongoose");
const userModel = require("../model/startup_investorModel");

// Registering a new startup looking for investors
const register = async(user, data) => {
  var usermodel = new userModel({
      _id: user,
      db_sClientBase: data.ClientBase,
      db_sValuation: data.Valuation,
      db_sRevenue: data.Revenue,
      db_sRevenueGrowth: data.RevenueGrowth,
      db_sEBITGrowth: data.EBITGrowth,
      db_sMinimumAmount: data.MinimumAmount,
      db_sFundsFrom: data.FundsFrom,
      db_sVertical: data.Vertical,
      db_sOwnershipCriteria: data.OwnershipCriteria,
      db_sFundingStage: data.FundingStage
    
  });
  usermodel.save().then(result => { console.log("USERINFO",result); })
           .catch(err => { console.log(err); });
};

// Listing matching startups for investors dashboard
var c=[], data=[]
var matchStartups = () => {
  
  c = userModel.find( {}, function (err, result) {
              
              if (err) { throw err; }
              //console.log(result);
            }
          )
  return c
  
  // console.log(c)
  // console.log("Before")
  // return c;
  // console.log("After")
}

module.exports = { register , matchStartups};
