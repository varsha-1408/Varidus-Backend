// Defining database model for storing startup_investor details

var db_reqMongoose = require("mongoose");
var db_shSchema = db_reqMongoose.Schema;

var db_shStartupInvestor2 = new db_shSchema({
  _id: { type: String },
  db_sClientBase: [String],
  db_sValuation: { type: String },
  db_sRevenue: { type: String },
  db_sRevenueGrowth: { type: String },
  db_sEBITGrowth: { type: String },
  db_sMinimumAmount: { type: String },
  db_sFundsFrom: [String],
  db_sVertical: [String],
  db_sOwnershipCriteria: [String],
  db_sFundingStage: [String]  
});

var db_modelStartupInvestor2 = db_reqMongoose.model("StartupInvestor2",db_shStartupInvestor2);
module.exports = db_modelStartupInvestor2;


// routerData: {
// 		'User-Name': {
// 			'type': {type: String},
// 			'value': [String]
// 		},
// 		'NAS-IP-Address': {
// 			'type': {type: String},
// 			'value': [String]
// 		},

// 	},