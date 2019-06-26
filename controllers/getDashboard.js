const dashboardDal = require('../dal/dashboardDal.js');

const getDashboard = async (req, res) => {
  const { id } = req.params;
  if (id) {
    try {
      const dashboard = await dashboardDal.retrieveDashboard(id);
      res.status(200).json({ error: false, msg: 'OK', dashboard });
    } catch (err) {
      res.status(500).json({ error: true, msg: 'KO', error_msg: 'Error during database retrieve' });
    }
  } else {
    res.status(422).json({ error: true, msg: 'KO', error_msg: 'Missing id parameter' });
  }
};

module.exports = getDashboard;
