const mongoose = require('mongoose');

const stipendSchema = new mongoose.Schema({
  rollNo: { type: String, required: true, unique: true },
  name: String,
  course: String,
  accountNo: String,
  joiningDate: Date,
  leavesexisting: Number,
  leavesavailed: Number,
  leavesBalance: Number,
  presentAndHolidays: Number,
  stipend: String,
});

module.exports = mongoose.model('Stipends', stipendSchema);
