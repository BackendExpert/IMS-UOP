const express = require('express');
const GithubController = require('../controller/githubController');

const router = express.Router();

router.get('/user/:username', GithubController.getusername)
router.get('/org/:org', GithubController.getorganization)

module.exports = router;