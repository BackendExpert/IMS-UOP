const ProjectAssign = require("../model/ProjectAssign");
const Role = require("../model/Role");
const User = require("../model/User");

const supervisorController = {
    getAllSupervisors: async (req, res) => {
        try {
            const getsp = await Role.findOne({ name: 'supervisor' })

            const getallsps = await User.find({ roles: getsp._id });

            return res.json({ Result: getallsps })
        }
        catch (err) {
            console.log(err)
        }
    },

    assignSupervisorToProject: async (req, res) => {
        try {
            const projectID = req.params.id;
            const { supervisor } = req.body;

            const existingAssignment = await ProjectAssign.findOne({ project: projectID });

            if (existingAssignment) {
                return res.json({ Error: "Project already assigned to a supervisor" });
            }

            const newAssignment = new ProjectAssign({
                suprvisor: supervisor,
                project: projectID
            });

            const resultAssignSp = await newAssignment.save();

            if (resultAssignSp) {
                return res.json({ Status: "Success", Message: "Supervisor assigned to project successfully" });
            } else {
                return res.json({ Error: "Failed to assign supervisor to project" });
            }
        }
        catch (err) {
            console.log(err)
        }
    },

    getAllSupervisorsData: async (req, res) => {
        try {
            const supervisorRole = await Role.findOne({ name: 'supervisor' });
            if (!supervisorRole) {
                return res.json({ Error: 'Supervisor role not found' });
            }

            const supervisors = await User.find({ roles: supervisorRole._id }).lean();

            const result = await Promise.all(
                supervisors.map(async (supervisor) => {
                    const projects = await ProjectAssign.find({ suprvisor: supervisor._id }) // keep your typo
                        .populate('project')
                        .lean();

                    return {
                        supervisor,
                        projects,
                    };
                })
            );

            return res.json({ Result: result });
        }
        catch (err) {
            console.log(err)
        }
    },


};

module.exports = supervisorController;