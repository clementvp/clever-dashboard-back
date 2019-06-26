const dashboardDal = require('../dal/dashboardDal.js');
const checkPlugins = require('../services/checkPlugins.js');

const writePlugins = async (req, res) => {
  const { plugins } = req.body;
  const { id } = req.params;
  const pluginsError = [];
  if (plugins && id) {
    if (checkPlugins(plugins)) {
      try {
        await dashboardDal.writePlugins(id, plugins);
        res.status(200).json({ error: false, msg: 'OK' });
      } catch (err) {
        res.status(500).json({ error: true, msg: 'KO', error_msg: 'Error during database writing' });
      }
    } else {
      res.status(422).json({
        error: true, msg: 'KO', error_msg: 'Bad formating of one plugin', pluginsError,
      });
    }
  } else {
    res.status(422).json({ error: true, msg: 'KO', error_msg: 'Missing id parameter or plugin parameter' });
  }
};

module.exports = writePlugins;
