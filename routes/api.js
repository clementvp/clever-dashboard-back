const express = require('express');
const dashboardCtrl = require('../controllers/dashboardCtrl.js');

const router = express.Router();

router.post('/dashboard', dashboardCtrl.createDashboard);
router.get('/dashboard', dashboardCtrl.getAllDashboard);
router.get('/dashboard/:id', dashboardCtrl.getDashboard);
router.delete('/dashboard/:id', dashboardCtrl.deleteDashboard);
router.post('/dashboard/:id/plugin', dashboardCtrl.writePlugins);

router.get('/plugin', dashboardCtrl.getAllPlugins);

module.exports = router;
