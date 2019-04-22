const fs = require('fs');
const dashboardDal = require('../dal/dashboardDal.js');

module.exports = {
  async createDashboard(req, res) {
    const { name } = req.body;
    if (name) {
      try {
        await dashboardDal.createDashboard(name);
        res.status(200).json({ error: false, msg: 'OK' });
      } catch (error) {
        res.status(501).json({ error: true, msg: 'KO', error_msg: 'Error during dashboard creation' });
      }
    } else {
      res.status(422).json({ error: true, msg: 'KO', error_msg: 'Missing name argument' });
    }
  },
  async deleteDashboard(req, res) {
    const { id } = req.params;
    if (id) {
      try {
        await dashboardDal.deleteDashboard(id);
        res.status(200).json({ error: false, msg: 'OK' });
      } catch (error) {
        res.status(501).json({ error: true, msg: 'KO', error_msg: 'Error during deletation of this dashboard' });
      }
    } else {
      res.status(422).json({ error: true, msg: 'KO', error_msg: 'Missing id parameters' });
    }
  },
  async getAllDashboard(req, res) {
    try {
      const dashboards = await dashboardDal.retrieveAllDashboards();
      res.status(200).json({ error: false, msg: 'OK', dashboards });
    } catch (error) {
      res.status(501).json({ error: true, msg: 'KO', error_msg: 'Error during database retrieve' });
    }
  },
  async getDashboard(req, res) {
    const { id } = req.params;
    if (id) {
      try {
        const dashboard = await dashboardDal.retrieveDashboard(id);
        res.status(200).json({ error: false, msg: 'OK', dashboard });
      } catch (error) {
        res.status(501).json({ error: true, msg: 'KO', error_msg: 'Error during database retrieve' });
      }
    } else {
      res.status(422).json({ error: true, msg: 'KO', error_msg: 'Missing id parameter' });
    }
  },
  async writePlugins(req, res) {
    const { plugins } = req.body;
    const { id } = req.params;
    const pluginsError = [];
    if (plugins && id) {
      plugins.forEach((plugin) => {
        if (typeof plugin.x === 'undefined'
        || typeof plugin.y === 'undefined'
        || typeof plugin.w === 'undefined'
        || typeof plugin.h === 'undefined'
        || typeof plugin.i === 'undefined'
        || typeof plugin.type === 'undefined'
        || typeof plugin.url === 'undefined') {
          pluginsError.push(plugin);
        }
      });
      if (pluginsError.length === 0) {
        try {
          await dashboardDal.writePlugins(id, plugins);
          res.status(200).json({ error: false, msg: 'OK' });
        } catch (error) {
          res.status(501).json({ error: true, msg: 'KO', error_msg: 'Error during database retrieve' });
        }
      } else {
        res.status(422).json({
          error: true, msg: 'KO', error_msg: 'Bad formating of one plugin', pluginsError,
        });
      }
    } else {
      res.status(422).json({ error: true, msg: 'KO', error_msg: 'Missing id parameter or plugin parameter' });
    }
  },
  async getAllPlugins(req, res) {
    try {
      const plugins = await fs.readdirSync('./plugins');
      res.status(200).json({ error: false, msg: 'OK', plugins });
    } catch (error) {
      res.status(501).json({ error: true, msg: 'KO', error_msg: 'Error during plugins scan' });
    }
  },
};
