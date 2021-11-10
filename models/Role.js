const mongoose = require("mongoose");
const {Schema, model} = mongoose;

const Roles = new Schema({
    name: {type: String, unique: true, required: true},
    slug: {type: String, unique: true, required: true},
}, { timestamps: true })

module.exports = model('Roles', Roles)