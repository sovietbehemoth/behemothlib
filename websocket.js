import WebSocket from 'ws';
import token from './auth.js';

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
                                setInterval(() => {
                                    console.log(`CLIENT: Heartbeat sent`);
                                    socket.send(JSON.stringify(p));
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
                                    const isbot = payload.d.content.toString();
                                    if (content.startsWith("-/") && isbot === "false") {
                                        const args = content.split("-/")[1].split(" ");
                                        const command = args[0];
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
