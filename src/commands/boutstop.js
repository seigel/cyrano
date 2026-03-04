// noinspection SpellCheckingInspection
export const BOUTSTOP_COMMAND = "BOUTSTOP";
const LENGTH = 1;

export const register = (commandDictionary) => {
    commandDictionary[BOUTSTOP_COMMAND] = parse;
    return commandDictionary;
}

const parse = (tokens) => {
    const localTokens = tokens || [];
    const length = localTokens.length;

    if (length !== LENGTH) {
        throw new Error(`Incompatible command tokens for >${BOUTSTOP_COMMAND}<. Expected ${LENGTH}, Got: ${length}`);
    }

    return {
        "command": BOUTSTOP_COMMAND,
        "piste": localTokens.shift(),
    };
}
