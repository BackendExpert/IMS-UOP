const { github } = require("../service/github");

const GithubController = {
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
            const { data } = await github.get(`/orgs/${org}/repos`, { params: { per_page: 100 } });
            res.json(data);
        } catch (err) {
            res.json({ message: 'Org fetch failed' });
        }
    }
};

module.exports = GithubController;