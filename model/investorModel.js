// Defining database model for storing investor details

var db_reqMongoose = require("mongoose");
var db_shSchema = db_reqMongoose.Schema;

var db_shInvestor2 = new db_shSchema({
  
  _id: { type: String },
  db_sInvestorType: { type: String },
  db_sMininumAmount: { type: String },
  db_sMaximumAmount: { type: String },
  db_sClients: [String],
  db_sVertical: [String],
  db_sOwnership: [String],
  db_sFundingStage: [String]
  
  
});

var db_modelInvestor2 = db_reqMongoose.model("Investor2", db_shInvestor2);
module.exports = db_modelInvestor2;