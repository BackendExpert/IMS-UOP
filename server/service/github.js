import axios from 'axios';
import 'dotenv/config.js';

export const github = axios.create({
    baseURL: 'https://api.github.com',
    headers: {
        Authorization: `Bearer ${process.env.GITHUB_PAT}`,   
        Accept: 'application/vnd.github+json',
        'X-GitHub-Api-Version': '2022-11-28',               
    },
    timeout: 10_000,                                       
});
