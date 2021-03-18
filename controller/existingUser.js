// Function to check if user exists

const mongoose = require("mongoose");
const userModel = require("../model/userModel");
var res, ans,c;
var login = async user => {
  await userModel.findOne(
    {
      _id: user
    },
    async function(err, user) {
      if (err) throw err;
      if (user) {
        res = user;
        
      } else res = false;
    }
  );
  return res;
};

module.exports = { login };