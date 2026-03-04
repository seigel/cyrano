// noinspection SpellCheckingInspection
export const DENY_COMMAND = "DENY";
const LENGTH = 1;

export const register = (commandDictionary) => {
    commandDictionary[DENY_COMMAND] = parse;
    return commandDictionary;
}

const parse = (tokens) => {
    const localTokens = tokens || [];
    const length = localTokens.length;

    if (length !== LENGTH) {
        throw new Error(`Incompatible command tokens for >${DENY_COMMAND}<. Expected ${LENGTH}, Got: ${length}`);
    }

    return {
        "command": DENY_COMMAND,
        "reason": localTokens.shift(),
    };
}
