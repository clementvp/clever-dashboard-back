const mongoose = require('mongoose');
const moment = require('moment');

const dashboardSchema = new mongoose.Schema({
  name: { type: String, required: true },
  creation_date: { type: String, required: true, default: moment().format('DD/MM/YYYY') },
  plugins: { type: Array, required: true, default: [] },
});

const Dashboard = mongoose.model('Dashboard', dashboardSchema);
module.exports = Dashboard;
