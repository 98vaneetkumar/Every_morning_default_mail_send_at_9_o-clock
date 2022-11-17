const Model = require("../models");
const {QueryTypes} =require("sequelize");
const sequelize = require("../config/connectionDB").sequelize;
exports.addUser = (data) => {
  return Model.userModel.create(data);
};

// exports.getuser=(data)=>{
//   return Model.userModel.findAll()
// }

exports.getuser= async()=>{
  return await sequelize.query("SELECT * FROM user where gender=?",{ replacements: ['Male'],type: QueryTypes.SELECT })
}