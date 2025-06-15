const express = require('express');
const { authMiddleware } = require('../middlewares/AuthMiddleware');
const checkPermission = require('../middlewares/checkPermissionMiddleware');
const ProjectController = require('../controller/projectController');

const router = express.Router();

router.post('/create-new-project', authMiddleware, checkPermission('create-new-project'), ProjectController.createProject)

router.get('/get-all-projects', authMiddleware, checkPermission('get-all-projects'), ProjectController.getallproject)

router.get('/get-one-project/:id', authMiddleware, checkPermission('get-one-project'), ProjectController.getoneproject)

router.get('/get-projects-to-assign', authMiddleware, checkPermission('get-projects-to-assign'), ProjectController.getallproject)

router.post('/intern-assign-project/:id', authMiddleware, checkPermission('intern-assign-project'), ProjectController.assignInterntoProject)

router.get('/my-all-projects', authMiddleware, checkPermission('my-all-projects'), ProjectController.myallprojectintern)

module.exports = router;