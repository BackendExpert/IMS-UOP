const Intern = require("../model/Intern");
const OrgSystem = require("../model/OrgSystem");
const { github } = require("../service/github");
const jwt = require('jsonwebtoken')

const GithubController = {
    createOrginSystem: async (req, res) => {
        try {
            const {
                name,
                gitURL,
                desc
            } = req.body

            const checkname = await OrgSystem.findOne({ name: name })

            if (checkname) {
                return res.json({ Error: "Cannot Create Organization, Already Created" })
            }

            const newOrg = new OrgSystem({
                name: name,
                gitURL: gitURL,
                desc: desc
            })

            const resultneworg = await newOrg.save()

            if (resultneworg) {
                return res.json({ Status: "Success", Message: "Orgnazation Created Success" })
            }
            else {
                return res.json({ Error: "Internal Server Error" })
            }
        }
        catch (err) {
            console.log(err)
        }
    },

    getorganization: async (req, res) => {
        try {
            const firstOrg = await OrgSystem.findOne().sort({ _id: 1 });

            if (!firstOrg || !firstOrg.name) {
                return res.json({ message: "No organization found in database" });
            }

            const orgName = firstOrg.name;

            const { data } = await github.get(`/orgs/${orgName}`, {
                params: { per_page: 100 }
            });

            const { data: memberData } = await github.get(`/orgs/${orgName}/members`);

            res.json({
                Result: { data, memberData },
            });
        } catch (err) {
            console.error(err);
            res.json({ message: 'Failed to fetch GitHub organization data' });
        }
    },

    getusernamedata: async (req, res) => {
        try {
            const token = req.header('Authorization');
            if (!token || !token.startsWith('Bearer ')) {
                return res.json({ Error: "Missing or invalid token" });
            }

            const decoded = jwt.verify(token.replace('Bearer ', ''), process.env.JWT_SECRET);
            const UserID = decoded.id;

            const getintern = await Intern.findOne({ userID: UserID })

            const { data } = await github.get(`/users/${getintern.github}`, {
                params: { per_page: 100 }
            });

            return res.json({ Result: data })
        }
        catch (err) {
            console.log(err)
        }
    },

    getprojectrespo: async(req, res) => {
        try{
            
        }
        catch(err){
            console.log(err)
        }
    }
};

module.exports = GithubController;