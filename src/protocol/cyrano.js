// main class to take a packet of information and break it into
import {tokenize} from "./cylex";
import {PROTOCOL} from "./cyranoTokens";
import commandDictionary from "../commands";

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
