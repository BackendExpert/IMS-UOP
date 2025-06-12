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

    assignSupervisorToProject: async(req, res) => {
        try{
            const projectID = req.params.id

            const { supervisor } = req.body

            const newProject = new ProjectAssign({
                supervisor: supervisor,
                project: projectID
            })

            const resultAssignSp = await newProject.save()

            if(resultAssignSp){
                return res.json({ Status: "Success", Message: "Supervisor Assign to Project Success"})
            }
            else{
                return res.json({ Error: "Internal Server Error"})
            }
        }
        catch(err){
            console.log(err)
        }
    }


};

module.exports = supervisorController;