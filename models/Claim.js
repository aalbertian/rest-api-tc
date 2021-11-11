const mongoose = require("mongoose");
const {Schema, model} = mongoose;
const ObjectId = Schema.Types.ObjectId;

const Claims = new Schema({
   title: {type: String, required: true},
   description: {type: String, required: true},
   type: {type: ObjectId, ref: 'Types'},
   status: {type: ObjectId, ref: 'Status'},
   user: {type: ObjectId, ref: 'Users'}
}, { timestamps: true })

Claims.index({'$**': 'text'})

module.exports = model('Claims', Claims)