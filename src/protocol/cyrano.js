// main class to take a packet of information and break it into
import {tokenize} from "./cylex";
import {PROTOCOL} from "./cyranoTokens";

export const process = (rawMessage) => {
    const tokens = tokenize(rawMessage);
    const firstToken = tokens.shift();
    const protocolToken = tokens.shift();
    if (firstToken === "" && protocolToken === PROTOCOL) {
        const command = tokens.shift();
        return {
            command
        };
    } else {
        throw new Error(`Unsupported protocol >${protocolToken}<`);
    }
}
