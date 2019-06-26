const dashboardDal = require('../dal/dashboardDal.js');

const getAllDashboards = async (req, res) => {
  try {
    const dashboards = await dashboardDal.retrieveAllDashboards();
    res.status(200).json({ error: false, msg: 'OK', dashboards });
  } catch (err) {
    console.warn(err);
    res.status(500).json({ error: true, msg: 'KO', error_msg: 'Error during database retrieve' });
  }
};

module.exports = getAllDashboards;
