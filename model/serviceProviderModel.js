// Defining database model for storing service provider details

var db_reqMongoose = require("mongoose");
var db_shSchema = db_reqMongoose.Schema;

var db_shServiceProvider2 = new db_shSchema({
  
  _id: { type: String },
  db_sClientBase: [String],
  db_sProviderType: [String],
  db_sServices: [String],
  db_sLocations: [String]
  
});

var db_modelServiceProvider2 = db_reqMongoose.model("ServiceProvider2", db_shServiceProvider2);
module.exports = db_modelServiceProvider2;