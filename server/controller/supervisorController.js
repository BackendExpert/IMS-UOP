const User = require("../model/User");

const supervisorController = {
    getAllSupervisors: async(req, res) => {
        try{
            const getallsp = await User.find()
        }
        catch(err){
            console.log(err)
        }
    }
};

module.exports = supervisorController;