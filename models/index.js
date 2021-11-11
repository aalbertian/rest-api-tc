const mongoose = require("mongoose");
const Roles = require("./Role");
const Users = require("./User");
const Types = require("./Type");
const Status = require("./Status");

mongoose.connect(process.env.DB_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true,})

module.exports = {
    Roles,
    Users,
    Types,
    Status
}