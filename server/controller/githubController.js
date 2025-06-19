const OrgSystem = require("../model/OrgSystem");
const { github } = require("../service/github");

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
                return resjson({ message: "No organization found in database" });
            }

            const orgName = firstOrg.name;

            const { data } = await github.get(`/orgs/${orgName}`, {
                params: { per_page: 100 }
            });

            res.json({
                Result: data,
                orgNameFromDatabase: orgName
            });
        } catch (err) {
            console.error(err);
            res.json({ message: 'Failed to fetch GitHub organization data' });
        }
    }
};

module.exports = GithubController;