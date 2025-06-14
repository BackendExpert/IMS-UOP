const Intern = require('../model/Intern')
const jwt = require('jsonwebtoken');
const ProjectAssign = require('../model/ProjectAssign');

const internController = {
    createInternInfor: async (req, res) => {
        try {
            const token = req.header('Authorization');
            if (!token || !token.startsWith('Bearer ')) {
                return res.json({ Error: "Missing or invalid token" });
            }

            const decoded = jwt.verify(token.replace('Bearer ', ''), process.env.JWT_SECRET);
            const UserID = decoded.id;

            const {
                address,
                dob,
                github,
                linkedin,
                campus,
                course,
            } = req.body

            const cvFile = req.file;
            if (!cvFile) {
                return res.json({ Error: "CV file is required" });
            }

            // console.log(req.body, cvFile);

            const newIntern = new Intern({
                cv: cvFile.filename,
                userID: UserID,
                address: address,
                dob: dob,
                github: github,
                linkedin: linkedin,
                camups: campus,
                course: course
            })

            const newResultInter = await newIntern.save()

            if (newResultInter) {
                res.json({ Status: "Success", Message: 'Intern Information Created Sccuess' })
            }
            else {
                res.json({ Error: "Internal Server Error While Creating Intern Informaiton" })
            }

        }
        catch (err) {
            console.log(err)
        }
    },

    GetInternInfor: async (req, res) => {
        try {
            const token = req.header('Authorization');
            if (!token || !token.startsWith('Bearer ')) {
                return res.json({ Error: "Missing or invalid token" });
            }

            const decoded = jwt.verify(token.replace('Bearer ', ''), process.env.JWT_SECRET);
            const UserID = decoded.id;

            const getinterndata = await Intern.findOne({ userID: UserID }).populate('userID')

            return res.json({ Result: getinterndata })
        }
        catch (err) {
            console.log(err)
        }
    },

    GetAllInterns: async (req, res) => {
        try {
            const getallinters = await Intern.find().populate('userID')

            return res.json({ Result: getallinters })
        }
        catch (err) {
            console.log(err)
        }
    },

    getoneintern: async (req, res) => {
        try {
            const id = req.params.id

            const internbyID = await Intern.findById(id).populate('userID')

            const getProjectData = await ProjectAssign.find({ intern: id }).populate('project').populate('suprvisor')

            // console.log(getProjectData)

            return res.json({ Result: { internbyID, getProjectData } });
        }
        catch (err) {
            console.log(err)
        }
    },

    setInternShipEndAt: async (req, res) => {
        try {
            const internID = req.params.id;
            const { enddata } = req.body;

            if (!enddata) {
                return res.json({ Status: "Error", Error: "End date is required." });
            }

            const endDate = new Date(enddata);

            const intern = await Intern.findById(internID);
            if (!intern) {
                return res.json({ Status: "Error", Error: "Intern not found." });
            }

            intern.InternshipEndAt = endDate;

            await intern.save();

            return res.json({
                Status: "Success",
                Message: "Internship end date updated successfully.",
            });

        }
        catch (err) {
            console.log(err)
        }
    }
};

module.exports = internController;