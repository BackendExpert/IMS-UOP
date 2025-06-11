const express = require('express');
const { authMiddleware } = require('../middlewares/AuthMiddleware');
const checkPermission = require('../middlewares/checkPermissionMiddleware');
const internController = require('../controller/internController');
const upload = require('../middlewares/UploadMiddleware');

const router = express.Router();

router.post('/create-intern-infor', authMiddleware, checkPermission('create-intern-infor'), upload.single('cv'), internController.createInternInfor)

module.exports = router;