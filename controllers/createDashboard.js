const dashboardDal = require('../dal/dashboardDal.js');

const createDashboard = async (req, res) => {
  const { name } = req.body;
  if (name) {
    try {
      await dashboardDal.createDashboard(name);
      res.status(200).json({ error: false, msg: 'OK' });
    } catch (error) {
      res.status(500).json({ error: true, msg: 'KO', error_msg: 'Error during dashboard creation' });
    }
  } else {
    res.status(422).json({ error: true, msg: 'KO', error_msg: 'Missing name argument' });
  }
};

module.exports = createDashboard;
