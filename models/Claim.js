const mongoose = require("mongoose");
const {Schema, model} = mongoose;
const ObjectId = Schema.Types.ObjectId;

const Claims = new Schema({
   title: {type: String, required: true},
   description: {type: String, required: true},
   type: {type: String, required: true},
   status: {type: String, required: true},
   user: {type: ObjectId, ref: 'Users'}
}, { timestamps: true })

module.exports = model('Claims', Claims)