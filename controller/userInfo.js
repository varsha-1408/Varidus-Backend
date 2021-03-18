// Function for pushing data from personalInfo modal to its database model (userModel)

const mongoose = require("mongoose");
const userModel = require("../model/userModel.js");

const register = async(user, data) => {
  
  var usermodel = new userModel({
    _id: user,
    db_sName: data.name,
    db_sEmail: data.email,
    db_nContactNumber: data.phone,
    db_sCountryName: data.country,
    db_sCompanyName: data.companyName,
    db_sAddressLine1: data.addressLine1,
    db_sStateName: data.state,
    db_sCityName: data.city,
    db_nZipCode: data.zipcode,
    db_sCategory:data.subcategory,
    db_sTransactionId:" ",
    db_nTransactionAmount:0,
    db_nCredits:0
  });

//   await userModel.findOne({ _id: user }, async function(err, doc) {
//     if (doc == null) {
//        usermodel.save().then(result => {
        
//         console.log("Startupdata",result);
//       });
//     }
//   });

  usermodel.save().then(result => {
      console.log("USERINFO",result);
      // res.status(201).send(result.result);
    })
    .catch(err => {
      console.log(err);
      // res.status(500).send(err);
    });
};

module.exports = { register };
