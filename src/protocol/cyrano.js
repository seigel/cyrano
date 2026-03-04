// main class to take a packet of information and break it into
import {tokenize} from "./cylex";
import {PROTOCOL, PROTOCOL_SEPERATOR} from "./cyranoTokens";
import commandDictionary, {builders as builderDictionary} from "../commands";

export const process = (rawMessage) => {
    const tokens = tokenize(rawMessage);
    const firstToken = tokens.shift();
    const protocolToken = tokens.shift();
    if (firstToken === "" && protocolToken === PROTOCOL) {
        const command = tokens.shift();
        tokens.pop();
        const parse = commandDictionary[command]
        return parse([...tokens]);
    } else {
        throw new Error(`Unsupported protocol >${protocolToken}<`);
    }
}

export const compose = (commandObject) => {
    const build = builderDictionary[commandObject.command];
    if (!build) {
        throw new Error(`No builder registered for command >${commandObject.command}<`);
    }
    const tokens = build(commandObject);
    return PROTOCOL_SEPERATOR + [PROTOCOL, ...tokens].join(PROTOCOL_SEPERATOR) + PROTOCOL_SEPERATOR;
}
