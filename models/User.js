const mongoose = require("mongoose");
const {Schema, model} = mongoose;
const ObjectId = Schema.Types.ObjectId;

const Users = new Schema({
    fullName: {type: String, required: true},
    email: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    role: {type: ObjectId, ref: 'Roles'},
}, { timestamps: true })

Users.index({'$**': 'text'})

module.exports = model('Users', Users)