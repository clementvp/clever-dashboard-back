const Dashboard = require('../schemas/dashboardSchema.js');

module.exports = {
  createDashboard(name) {
    return new Promise((async (resolve, reject) => {
      try {
        const dashboard = new Dashboard({ name });
        await dashboard.save();
        resolve();
      } catch (error) {
        reject(error);
      }
    }));
  },
  retrieveAllDashboards() {
    return new Promise((async (resolve, reject) => {
      try {
        const dashboards = await Dashboard.find({});
        resolve(dashboards);
      } catch (error) {
        reject(error);
      }
    }));
  },
  retrieveDashboard(id) {
    return new Promise((async (resolve, reject) => {
      try {
        const dashboard = await Dashboard.findOne({ _id: id });
        resolve(dashboard);
      } catch (error) {
        reject(error);
      }
    }));
  },
  deleteDashboard(id) {
    return new Promise((async (resolve, reject) => {
      try {
        await Dashboard.deleteOne({ _id: id });
        resolve();
      } catch (error) {
        reject(error);
      }
    }));
  },
  writePlugins(id, plugins) {
    return new Promise((async (resolve, reject) => {
      try {
        const dashboard = await Dashboard.findOne({ _id: id });
        dashboard.plugins = plugins;
        await dashboard.save();
        resolve();
      } catch (error) {
        reject(error);
      }
    }));
  },
};
