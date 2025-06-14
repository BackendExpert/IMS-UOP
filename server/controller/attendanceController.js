const Attendance = require("../model/Attendance");
const User = require("../model/User");
const jwt = require('jsonwebtoken')

const AttendanceController = {
    createAttendance: async (req, res) => {
        try {
            const authHeader = req.headers['authorization'];
            if (!authHeader || !authHeader.startsWith('Bearer ')) {
                return res.json({ Error: "Unauthorized: Missing or invalid token" });
            }

            const token = authHeader.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const email = decoded.user.email;

            const {
                intime,
                leaveat,
                mode
            } = req.body

            const getuser = await User.findOne({ email: email })

            const startOfDay = new Date();
            startOfDay.setHours(0, 0, 0, 0);

            const endOfDay = new Date();
            endOfDay.setHours(23, 59, 59, 999);

            const checktodayattendance = await Attendance.findOne({
                intern: getuser._id,
                attendanceDate: {
                    $gte: startOfDay,
                    $lte: endOfDay
                }
            });

            if (checktodayattendance) {
                return res.json({ Error: "Attendance Already Created for Today..." })
            }

            const newAttendance = new Attendance({
                intern: getuser._id,
                startAt: intime,
                leaveAt: leaveat,
                mode: mode
            })

            const resultnewAttendance = await newAttendance.save()

            if (resultnewAttendance) {
                return res.json({ Status: "Success", Message: "Attendance Created Successful " })
            }
            else {
                return res.json({ Error: "Internal Server Error" })
            }

        }
        catch (err) {
            console.log(err)
        }
    },

    getmyAttendance: async (req, res) => {
        try {
            const authHeader = req.headers['authorization'];
            if (!authHeader || !authHeader.startsWith('Bearer ')) {
                return res.json({ Error: "Unauthorized: Missing or invalid token" });
            }

            const token = authHeader.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const email = decoded.user.email;

            const userID = await User.findOne({ email: email })

            const getAttendance = await Attendance.find({ intern: userID._id }).populate('intern')
                .sort({ attendanceDate: -1 });

            return res.json({ Result: getAttendance })
        }
        catch (err) {
            console.log(err)
        }
    },

    getallinternAttendance: async(req, res) => {
        try{
            const getinteralldata = await Attendance.find().populate('Intern')

            return res.json({ Result: getinteralldata })
        }
        catch(err){
            console.log(err)
        }
    }
};

module.exports = AttendanceController;