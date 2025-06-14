const express = require('express');
const { authMiddleware } = require('../middlewares/AuthMiddleware');
const checkPermission = require('../middlewares/checkPermissionMiddleware');
const AttendanceController = require('../controller/attendanceController');

const router = express.Router();

router.post('/create-attendance', authMiddleware, checkPermission('create-attendance'), AttendanceController.createAttendance)

router.get('/get-my-attendance', authMiddleware, checkPermission('get-my-attendance'), AttendanceController.getmyAttendance)

module.exports = router;