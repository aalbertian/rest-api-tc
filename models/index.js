const mongoose = require("mongoose");
const Roles = require("./Role");
const Users = require("./User");

mongoose.connect(process.env.DB_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true,})

module.exports = {
    Roles,
    Users
}