import CLIENT_START from "./websocket.js";
import message_send from "./functions/messagecreate.js"

CLIENT_START();
function main(command, args) {
    switch (command) {
        case "ping":
            message_send("768501915104968755", "Hello");
            break;
    }
}
export { main }
