// noinspection SpellCheckingInspection
export const NEXT_COMMAND = "NEXT";
const LENGTH = 1;

export const register = (commandDictionary) => {
    commandDictionary[NEXT_COMMAND] = parse;
    return commandDictionary;
}

const parse = (tokens) => {
    const localTokens = tokens || [];
    const length = localTokens.length;

    if (length !== LENGTH) {
        throw new Error(`Incompatible command tokens for >${NEXT_COMMAND}<. Expected ${LENGTH}, Got: ${length}`);
    }

    return {
        "command": NEXT_COMMAND,
        "piste": localTokens.shift(),
    };
}
