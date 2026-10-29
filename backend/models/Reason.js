/* Shariff Muhammad u23611732 */

const mongoose = require('mongoose');

const reasonSchema = new mongoose.Schema({
  label: { type: String, required: true, unique: true },
}, { timestamps: true });

module.exports = mongoose.model('Reason', reasonSchema);