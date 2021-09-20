const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let authorSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  country: { type: String, required: true },
});

module.exports = mongoose.model('Author', authorSchema);
