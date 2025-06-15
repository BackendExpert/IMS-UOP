const Intern = require("../model/Intern");
const Project = require("../model/Project");
const ProjectAssign = require("../model/ProjectAssign");
const jwt = require('jsonwebtoken')

const ProjectController = {
    createProject: async (req, res) => {
        try {
            const {
                pname,
                pdescription,
                giturl,
                estimatedEndDate
            } = req.body

            const checkproject = await Project.findOne({ pname: pname })

            if (checkproject) {
                res.json({ Error: "Project is Already exists" })
            }

            const newProject = new Project({
                pname: pname,
                pdescription: pdescription,
                giturl: giturl,
                estimatedEndDate: estimatedEndDate
            })

            const resultNewProject = await newProject.save()

            if (resultNewProject) {
                return res.json({ Status: "Success", Message: "New Project Created Success" })
            }
            else {
                return res.json({ Error: "Internal Server Error while Create new Project" })
            }
        }
        catch (err) {
            console.log(err)
        }
    },

    getallproject: async (req, res) => {
        try {
            const allprojects = await Project.find()

            return res.json({ Result: allprojects })
        }
        catch (err) {
            console.log(err)
        }
    },

    getoneproject: async (req, res) => {
        try {
            const id = req.params.id;

            const getproject = await Project.findById(id);

            const getprojectassigns = await ProjectAssign.findOne({ project: id })
                .populate({
                    path: 'intern',
                    populate: {
                        path: 'userID',
                        model: 'User'
                    }
                })
                .populate('suprvisor');

            // console.log(getprojectassigns);

            return res.json({ Result: { getproject, getprojectassigns } });
        } catch (err) {
            console.log(err);
        }
    },


    assignInterntoProject: async (req, res) => {
        try {
            const id = req.params.id

            const { project } = req.body

            let assignment = await ProjectAssign.findOne({ project });

            if (assignment) {
                if (!assignment.intern.includes(id)) {
                    assignment.intern.push(id);
                    await assignment.save();
                }
            } else {
                assignment = new ProjectAssign({
                    project,
                    intern: [id]
                });
                await assignment.save();
            }

            return res.json({ Status: "Success", Message: "The Intern Assign to Project Success" })

        }
        catch (err) {
            console.log(err)
        }
    },

    myallprojectintern: async (req, res) => {
        try {
            const authHeader = req.headers['authorization'];
            if (!authHeader || !authHeader.startsWith('Bearer ')) {
                return res.json({ Error: "Unauthorized: Missing or invalid token" });
            }

            const token = authHeader.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const userID = decoded.id;
            console.log(userID)

            const InternID = await Intern.findOne({ userID: userID })

            const projects = await ProjectAssign.find({ intern: InternID._id })
                .populate('project')       
                .populate('suprvisor')    
                .populate('intern');       

            // console.log(projects);

            return res.json({ Result: projects })

        }
        catch (err) {
            console.log(err)
        }
    }
};

module.exports = ProjectController;