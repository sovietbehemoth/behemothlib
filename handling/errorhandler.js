function errorhandler(code) {
    switch (code) {
        case 0:
            console.log("BehemothLib: Internal error, malformed request body");
            break;
        case 10001:
            console.log("BehemothLib: User not found");
            break;
        case 10003:
            console.log("BehemothLib: Channel not found");
            break;
        case 10004:
            console.log("BehemothLib: Server not found");
            break;
        case 10007:
            console.log("BehemothLib: Member not found");
            break;
        case 10008:
            console.log("BehemothLib: Message not found");
            break;
        case 10011:
            console.log("BehemothLib: Role not found");
            break;
        case 10012:
            console.log("BehemothLib: Invalid token");
            break;
        case 10013:
            console.log("BehemothLib: User not found");
            break;
        case 10014:
            console.log("BehemothLib: Emoji not found");
            break;
    }
}
export default errorhandler;
