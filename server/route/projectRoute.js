const express = require('express');
const { authMiddleware } = require('../middlewares/AuthMiddleware');
const checkPermission = require('../middlewares/checkPermissionMiddleware');
const ProjectController = require('../controller/projectController');

const router = express.Router();

router.post('/create-new-project', authMiddleware, checkPermission('create-new-project'), ProjectController.createProject)

router.get('/get-all-projects', authMiddleware, checkPermission('get-all-projects'), ProjectController.getallproject)

module.exports = router;