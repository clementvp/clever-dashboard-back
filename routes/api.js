const express = require('express');
const createDashboard = require('../controllers/createDashboard');
const deleteDashboard = require('../controllers/deleteDashboard');
const getAllDashboards = require('../controllers/getAllDashboards');
const getDashboard = require('../controllers/getDashboard');
const writePlugins = require('../controllers/writePlugins.js');
const getAllPlugins = require('../controllers/getAllPlugins.js');

const router = express.Router();

router.post('/dashboard', createDashboard);
router.get('/dashboard', getAllDashboards);
router.get('/dashboard/:id', getDashboard);
router.delete('/dashboard/:id', deleteDashboard);
router.post('/dashboard/:id/plugin', writePlugins);

router.get('/plugin', getAllPlugins);

module.exports = router;
