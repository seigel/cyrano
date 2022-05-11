// noinspection SpellCheckingInspection
export const HELLO_COMMAND = "HELLO";
const MIN_LENGTH = 0;
const MAX_LENGTH = 1;

export const register = (commandDictionary) => {
    commandDictionary[HELLO_COMMAND] = parse;
    return commandDictionary;
}

const parse = (tokens) => {
    const localTokens = tokens || [];
    const length = localTokens.length;

    if (length < MIN_LENGTH || length > MAX_LENGTH) {
        throw new Error(`Incompatible command tokens for >${HELLO_COMMAND}<. Expected ${MIN_LENGTH} or ${MAX_LENGTH}, Got: ${length}`);
    }

    return {
        "command": HELLO_COMMAND,
        "pisteCode": localTokens.shift() || ""
    };
}
