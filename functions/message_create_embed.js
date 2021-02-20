import token from "../auth.js";
import fetch from 'node-fetch';
import errorhandler from '../handling/errorhandler.js'

async function message_send_embed(channel, title, description) {
    try {
        const contentjs = {
            "tts": false,
            "embed": {
                "title": title,
                "description": description,
            }
        }
        const headers = { 'Content-Type': 'application/json', 'Authorization': `Bot ${token}` };
        const res = await fetch(`https://discord.com/api/channels/${channel}/messages`, {
            method: 'POST',
            headers,
            body: JSON.stringify(contentjs),          
        });
        const response = await res.json();
        errorhandler(response.code);
    } catch (error) {
        console.log(error);
    }
}

export default message_send_embed;
