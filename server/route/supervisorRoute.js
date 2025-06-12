const express = require('express');
const { authMiddleware } = require('../middlewares/AuthMiddleware');
const checkPermission = require('../middlewares/checkPermissionMiddleware');
const supervisorController = require('../controller/supervisorController');

const router = express.Router();

router.get('/get-supervisor-to-assign', authMiddleware, checkPermission('get-supervisor-to-assign'), supervisorController.getAllSupervisors)

router.post('/intern-assign-supervisor', authMiddleware, checkPermission('intern-assign-supervisor'))

module.exports = router;