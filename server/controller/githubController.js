const OrgSystem = require("../model/OrgSystem");
const { github } = require("../service/github");

const GithubController = {
    createOrginSystem: async(req, res) => {
        try{
            const {
                name,
                gitlink,
                desc
            } = req.body

            const checkname = await OrgSystem.find({ name: name })

            if(checkname){
                return res.json({ Error: "Cannot Create Organization, Already Created"})
            }

            const newOrg = new OrgSystem({
                name: name,
                gitURL: gitlink,
                desc: desc
            })

            const resultneworg = await newOrg.save()

            if(resultneworg){
                return res.json({ Status: "Success", Message: "Orgnazation Created Success"})
            }
            else{
                return res.json({ Error: "Internal Server Error"})
            }
        }
        catch(err){
            console.log(err)
        }
    },

    getusername: async (req, res) => {
        try {
            const { username } = req.params;

            const [profile, repos] = await Promise.all([
                github.get(`/users/${username}`),
                github.get(`/users/${username}/repos`, { params: { per_page: 100, sort: 'updated' } }),
            ]);

            res.json({ profile: profile.data, repos: repos.data });
        } catch (err) {
            console.error(err.response?.data || err.message);
            res.status(err.response?.status || 500).json({ message: 'GitHub fetch failed' });
        }
    },

    getorganization: async (req, res) => {
        try {
            const { org } = req.params;
            const { data } = await github.get(`/orgs/${org}`, { params: { per_page: 100 } });
            res.json(data);
        } catch (err) {
            res.json({ message: 'Org fetch failed' });
        }
    }
};

module.exports = GithubController;