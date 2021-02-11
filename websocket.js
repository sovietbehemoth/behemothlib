import WebSocket from 'ws';
import token from './auth.js'

function CLIENT_START() {

    try {
        const url = 'wss://gateway.discord.gg/?v=6&encoding=json'
        let socket = new WebSocket(url);
        socket.onmessage = function (event) {
            const payload = JSON.parse(event.data.toString());
            const { t, s, op, d } = payload;
            const p = { op: 1, d: null };
            switch (op) {
                case 10:
                    setInterval(() => {
                        console.log(`CLIENT: Heartbeat initiated in intervals of 41250`);
                        socket.send(JSON.stringify(p));
                    }, 41250);
                    const properties = { $os: 'linux', $browser: 'behemothlib', $device: 'iOS' };
                    const intents = { 'intents': 513 };
                    const identifyinfo = {
                        op: 2,
                        d: { token, intents, properties }
                    };
                    socket.send(JSON.stringify(identifyinfo));
                    console.log(event);
                    break;
            }
        };
    } catch (error) {
        console.log(error);
    }
};
export default CLIENT_START;
