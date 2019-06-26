const dashboardDal = require('../dal/dashboardDal.js');

const deleteDashboard = async (req, res) => {
  const { id } = req.params;
  if (id) {
    try {
      await dashboardDal.deleteDashboard(id);
      res.status(200).json({ error: false, msg: 'OK' });
    } catch (error) {
      res.status(500).json({ error: true, msg: 'KO', error_msg: 'Error during deletation of this dashboard' });
    }
  } else {
    res.status(422).json({ error: true, msg: 'KO', error_msg: 'Missing id parameters' });
  }
};

module.exports = deleteDashboard;
