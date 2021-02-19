import token from "../auth.js";
import fetch from 'node-fetch';

async function message_send(channel, content) {
    try {
        const contentjs = {
            "content": content,
            "tts": false,
        }
        const headers = { 'Content-Type': 'application/json', 'Authorization': `Bot ${token}` };
        const res = await fetch(`https://discord.com/api/channels/${channel}/messages`, {
            method: 'POST',
            headers,
            body: JSON.stringify(contentjs),          
        });
        const response = await res.json();
        console.log(response);
    } catch (error) {
        console.log(error);
    }
}

export default message_send;
