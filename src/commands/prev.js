// noinspection SpellCheckingInspection
export const PREV_COMMAND = "PREV";
const LENGTH = 1;

export const register = (commandDictionary) => {
    commandDictionary[PREV_COMMAND] = parse;
    return commandDictionary;
}

const parse = (tokens) => {
    const localTokens = tokens || [];
    const length = localTokens.length;

    if (length !== LENGTH) {
        throw new Error(`Incompatible command tokens for >${PREV_COMMAND}<. Expected ${LENGTH}, Got: ${length}`);
    }

    return {
        "command": PREV_COMMAND,
        "piste": localTokens.shift(),
    };
}
