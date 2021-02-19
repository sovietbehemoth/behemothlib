import WebSocket from 'ws';
import token from './auth.js';
import { main } from './main.js'


const url = 'wss://gateway.discord.gg/?v=8&encoding=json'
const socket = new WebSocket(url);

function CLIENT_START(call = "s", wait = "r") {
    try {       
        socket.onmessage = function (event) {
                    const payload = JSON.parse(event.data.toString());
                    const { t, s, op, d } = payload;
                    const p = { op: 1, d: null };
                    switch (op) {
                        case 10:
                            socket.send(JSON.stringify(p));
                            setInterval(() => {
                                    socket.send(JSON.stringify(p));
                                    console.log(`CLIENT: Heartbeat sent`);
                                }, 41250);                           
                            const identifyinfo = { "op": 2, "d":{ "token": token, "intents": 513, "properties":{ "$os": "linux", "$browser": "behemothlib", "$device": "behemothlib"}} }
                            socket.send(JSON.stringify(identifyinfo));
                            console.log("CLIENT: Identified with client");
                            break;
                        case 9:
                            console.log("An error occurred with the connection");
                            break;
                        case 0:
                            switch (t) {
                                case "MESSAGE_CREATE":
                                    const content = payload.d.content.toString(); 
                                    const tts = payload.d.tts;
                                    const timestamp = payload.d.timestamp.toString();
                                    const pinned = payload.d.pinned;
                                    const mention_everyone = payload.d.mention_everyone;
                                    const author_roles = payload.d.member.roles.toString();
                                    const author_voice_state_mute = payload.d.member.mute;
                                    const author_voice_state_deafen = payload.d.member.deaf;
                                    const author_joined_at = payload.d.member.joined_at;
                                    const author_username = payload.d.author.username;
                                    const author_id = payload.d.author.id;
                                    const author_profile_picture = payload.d.author.avatar;
                                    const author_discriminator = payload.d.author.discriminator;
                                    const id = payload.d.id;
                                    const bot = payload.d.author.bot;
                                    const channel = payload.d.channel_id;
                                    const server = payload.d.guild_id;
                                    if (bot != true) {
                                        console.log(`${author_username}#${author_discriminator}: ${content}`)
                                    }
                                    if (content.startsWith("-/")) {
                                        const args = content.split("-/")[1].split(" ");
                                        const command = args[0];
                                        main(command, args);
                                    }
                                    break;
                            }
                            break;
                        case 7:
                            console.log("RECONNECT ORDERED");
                            socket.close();
                            break;
                        case 1:
                            console.log("HEARTBEAT ORDERED");
                            break;
                    }
        };
    } catch (error) {
        console.log(error);
    }
};
export default CLIENT_START;
