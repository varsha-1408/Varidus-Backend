// Defining database model for storing startup_provider details

var db_reqMongoose = require("mongoose");
var db_shSchema = db_reqMongoose.Schema;

var db_shStartup_provider2 = new db_shSchema({
  
  _id: { type: String },
  db_sClientBase: [String],
  db_sServices: [String],
  db_sLocations: [String],
  db_sPartnerType: [String]

});

var db_modelStartup_provider2 = db_reqMongoose.model("StartupProvider2", db_shStartup_provider2);
module.exports = db_modelStartup_provider2;