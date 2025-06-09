const Project = require("../model/Project");

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

            if(checkproject){
                res.json({ Error: "Project is Already exists"})
            }

            const newProject = new Project({
                pname: pname,
                pdescription: pdescription,
                giturl: giturl,
                estimatedEndDate: estimatedEndDate
            })

            const resultNewProject = await newProject.save()

            if(resultNewProject){
                return res.json({ Status: "Success", Message: "New Project Created Success"})
            }
            else{
                return res.json({ Error: "Internal Server Error while Create new Project"})
            }
        }
        catch (err) {
            cosnole.log(err)
        }
    }
};

module.exports = ProjectController;