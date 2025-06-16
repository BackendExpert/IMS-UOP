const express = require('express');
const { authMiddleware } = require('../middlewares/AuthMiddleware');
const checkPermission = require('../middlewares/checkPermissionMiddleware');
const supervisorController = require('../controller/supervisorController');

const router = express.Router();

router.get('/get-supervisor-to-assign', authMiddleware, checkPermission('get-supervisor-to-assign'), supervisorController.getAllSupervisors)

router.post('/assign-supervisor-project/:id', authMiddleware, checkPermission('assign-supervisor-project'), supervisorController.assignSupervisorToProject)

router.get('/get-all-supervisors', authMiddleware, checkPermission('get-all-supervisors'), supervisorController.getAllSupervisorsData)

router.get('/supervisor-get-interns', authMiddleware, checkPermission('supervisor-get-interns'), supervisorController.getallmyinterns)

module.exports = router;