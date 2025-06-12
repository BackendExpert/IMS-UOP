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
    }
};

module.exports = supervisorController;