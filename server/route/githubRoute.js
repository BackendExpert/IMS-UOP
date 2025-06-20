const express = require('express');
const GithubController = require('../controller/githubController');
const { authMiddleware } = require('../middlewares/AuthMiddleware');
const checkPermission = require('../middlewares/checkPermissionMiddleware');

const router = express.Router();

router.post('/create-org', authMiddleware, checkPermission('create-org'), GithubController.createOrginSystem)

router.get('/org', authMiddleware, checkPermission('get-organzation-data'), GithubController.getorganization)

router.get('/get-username-data', authMiddleware, checkPermission('get-username-data'), GithubController.getusernamedata)

module.exports = router;