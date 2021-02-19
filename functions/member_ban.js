import token from "../auth.js";
import fetch from 'node-fetch';
import errorhandler from '../handling/errorhandler.js'

async function ban_member(server, user, reason) {
    try {
    const contentjs = {
        "reason": reason,
    }
    const headers = { 'Content-Type': 'application/json', 'Authorization': `Bot ${token}` };
    const res = await fetch(`https://discord.com/api/guilds/${server}/bans/${user}`, {
        method: 'PUT',
        headers,  
        body: JSON.stringify(contentjs),
    });
    const response = await res.json();
    errorhandler(response.code);
} catch (error) {
    console.log(error);
}
}
export default ban_member;
