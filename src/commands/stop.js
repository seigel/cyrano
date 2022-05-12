// noinspection SpellCheckingInspection
export const STOP_COMMAND = "STOP";
const LENGTH = 0;

export const register = (commandDictionary) => {
    commandDictionary[STOP_COMMAND] = parse;
    return commandDictionary;
}

const parse = (tokens) => {
    const localTokens = tokens || [];
    const length = localTokens.length;

    if (length !== 0) {
        throw new Error(`Incompatible command tokens for >${STOP_COMMAND}<. Expected ${LENGTH}, Got: ${length}`);
    }

    return {
        "command": STOP_COMMAND
    };
}
