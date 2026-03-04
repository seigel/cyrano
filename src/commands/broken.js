// noinspection SpellCheckingInspection
export const BROKEN_COMMAND = "BROKEN";
const LENGTH = 1;

export const register = (commandDictionary) => {
    commandDictionary[BROKEN_COMMAND] = parse;
    return commandDictionary;
}

const parse = (tokens) => {
    const localTokens = tokens || [];
    const length = localTokens.length;

    if (length !== LENGTH) {
        throw new Error(`Incompatible command tokens for >${BROKEN_COMMAND}<. Expected ${LENGTH}, Got: ${length}`);
    }

    return {
        "command": BROKEN_COMMAND,
        "piste": localTokens.shift(),
    };
}
