// noinspection SpellCheckingInspection
export const GETTEAM_COMMAND = "GETTEAM";
const LENGTH = 2;

export const register = (commandDictionary) => {
    commandDictionary[GETTEAM_COMMAND] = parse;
    return commandDictionary;
}

const parse = (tokens) => {
    const localTokens = tokens || [];
    const length = localTokens.length;

    if (length !== LENGTH) {
        throw new Error(`Incompatible command tokens for >${GETTEAM_COMMAND}<. Expected ${LENGTH}, Got: ${length}`);
    }

    return {
        "command": GETTEAM_COMMAND,
        "piste": localTokens.shift(),
        "side": localTokens.shift(),
    };
}
