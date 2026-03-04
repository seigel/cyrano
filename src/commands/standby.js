// noinspection SpellCheckingInspection
export const STANDBY_COMMAND = "STANDBY";
const LENGTH = 1;

export const register = (commandDictionary) => {
    commandDictionary[STANDBY_COMMAND] = parse;
    return commandDictionary;
}

const parse = (tokens) => {
    const localTokens = tokens || [];
    const length = localTokens.length;

    if (length !== LENGTH) {
        throw new Error(`Incompatible command tokens for >${STANDBY_COMMAND}<. Expected ${LENGTH}, Got: ${length}`);
    }

    return {
        "command": STANDBY_COMMAND,
        "piste": localTokens.shift(),
    };
}
