// noinspection SpellCheckingInspection
export const PING_COMMAND = "PING";
const LENGTH = 0;

export const register = (commandDictionary) => {
    commandDictionary[PING_COMMAND] = parse;
    return commandDictionary;
}

const parse = (tokens) => {
    const localTokens = tokens || [];
    const length = localTokens.length;

    if (length !== 0) {
        throw new Error(`Incompatible command tokens for >${PING_COMMAND}<. Expected ${LENGTH}, Got: ${length}`);
    }

    return {
        "command": PING_COMMAND
    };
}
