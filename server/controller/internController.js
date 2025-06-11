const Intern = require('../model/Intern')

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

            const cv = req.path

            const newIntern = new Intern({
                userID: UserID,
                address: address,
                dob: dob,
                github: github,
                linkedin: linkedin,
                camups: campus,
                course: course
            })

            const newResultInter = await newIntern.save()

            if(newResultInter){
                res.json({ Status: "Success", Message: 'Intern Information Created Sccuess'})
            }
            else{
                res.json({ Error: "Internal Server Error While Creating Intern Informaiton"})
            }

        }
        catch (err) {
            console.log(err)
        }
    }
};

module.exports = internController;