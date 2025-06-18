const express = require('express');
const GithubController = require('../controller/githubController');
const { authMiddleware } = require('../middlewares/AuthMiddleware');
const checkPermission = require('../middlewares/checkPermissionMiddleware');

const router = express.Router();

router.post('/createorg', authMiddleware, checkPermission('create-org-system'), GithubController.createOrginSystem)

router.get('/user/:username', GithubController.getusername)
router.get('/org/:org', GithubController.getorganization)

module.exports = router;