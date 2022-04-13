import {PROTOCOL_SEPERATOR} from "./cyranoTokens";

export const tokenize = (buffer) => {
    return buffer.toString().split(PROTOCOL_SEPERATOR);
};
