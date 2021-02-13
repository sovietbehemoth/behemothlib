import axios from 'axios';
import token from "../auth.js";

const message_send = async (channel, content) => {
    try {
        const contentjs = { "content": content, "tts": false };
        const headers = { "Content-Type": "application/json", "Authorization": token };
        await axios.post('https://www.discord.com/api/v8/channels/' + channel + '/messages', contentjs, headers, send => {
        console.log(send);
    });
    } catch (error) {
        console.log(error);
    }
}

export default message_send;
