const express = require('express');
const { authMiddleware } = require('../middlewares/AuthMiddleware');
const checkPermission = require('../middlewares/checkPermissionMiddleware');
const internController = require('../controller/internController');
const upload = require('../middlewares/UploadMiddleware');

const router = express.Router();

// router.get('/get-infor', authMiddleware, checkPermission('view-my-infor-intern'), internController.viewInternInfor)

// router.post('/update-infor', authMiddleware, checkPermission('update-my-infor-intern'), upload.single('cv'), internController.updateInternInfor)

module.exports = router;