const express = require('express');
const { authMiddleware } = require('../middlewares/AuthMiddleware');
const checkPermission = require('../middlewares/checkPermissionMiddleware');
const internController = require('../controller/internController');
const upload = require('../middlewares/UploadMiddleware');

const router = express.Router();

router.post('/create-intern-infor', authMiddleware, checkPermission('create-intern-infor'), upload.single('cv'), internController.createInternInfor)

router.get('/get-intern-infor', authMiddleware, checkPermission('get-intern-infor'), internController.GetInternInfor)

router.get('/get-all-interns', authMiddleware, checkPermission('get-all-interns'), internController.GetAllInterns)

router.get('/view-one-intern/:id', authMiddleware, checkPermission('view-one-intern'), internController.getoneintern)

module.exports = router;