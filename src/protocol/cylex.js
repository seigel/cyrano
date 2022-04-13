import {PROTOCOL_SEPERATOR} from "./cyranoTokens";

export const tokenize = (buffer, validator) => {
    const tokens = buffer.toString().split(PROTOCOL_SEPERATOR);
    if (validator !== undefined && validator !== null) {
        tokens.forEach((token, index) => {
            if (validator(token)) {
                return;
            }
            throw new Error(`Invalid token ${token} at index ${index}`);
        });
    }
    return tokens;
};
