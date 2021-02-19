import token from "../auth.js";
import fetch from 'node-fetch';
import errorhandler from '../handling/errorhandler.js';

async function message_delete(channelID, messageID) {
    try {
        const headers = { 'Content-Type': 'application/json', 'Authorization': `Bot ${token}` };
        const res = await fetch(`https://discord.com/api/channels/${channelID}/messages/${messageID}`, {
            method: 'DELETE',
            headers,      
        });
        const response = await res.json();
        errorhandler(response.code);
    } catch (error) {
        console.log(error)
    }
}

export default message_delete;
