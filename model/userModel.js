// Defining database model for storing personal information for all users

var db_reqMongoose = require("mongoose");
var db_shSchema = db_reqMongoose.Schema;

var db_shUser = new db_shSchema({
  _id: { type: String },
  db_sName: { type: String, required: true },
  db_sEmail: { type: String, required: true, unique: true },
  db_nContactNumber: { type: Number, unique: true },
  db_sCountryName: { type: String, required: true },
  db_sCompanyName: { type: String, required: true },
  db_sAddressLine1: { type: String, required: true },
  db_sStateName: { type: String, required: true },
  db_sCityName: { type: String, required: true },
  db_nZipCode: { type: String, required: true },
  db_sCategory: { type: String, required: true },
  db_sTransactionId: { type: String },
  db_nTransactionAmount: { type: Number },
  db_nCredits:{ type: Number}
});
var db_modelUser = db_reqMongoose.model("personalInfo", db_shUser);
module.exports = db_modelUser;
