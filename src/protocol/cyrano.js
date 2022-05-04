// main class to take a packet of information and break it into
import {tokenize} from "./cylex";
import {PROTOCOL} from "./cyranoTokens";

let commandDictionary = null;
export const configure = () => {
    if (commandDictionary === null) {
        commandDictionary = [];
        require('../commands/disp').register(commandDictionary);
    }
}

export const process = (rawMessage) => {
    if (commandDictionary === null) {
        configure();
    }
    const tokens = tokenize(rawMessage);
    const firstToken = tokens.shift();
    const protocolToken = tokens.shift();
    if (firstToken === "" && protocolToken === PROTOCOL) {
        const command = tokens.shift();
        const parse = commandDictionary[command]
        return parse([...tokens]);
    } else {
        throw new Error(`Unsupported protocol >${protocolToken}<`);
    }
}
