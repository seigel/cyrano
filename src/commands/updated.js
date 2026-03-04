// noinspection SpellCheckingInspection
export const UPDATED_COMMAND = "UPDATED";
const LENGTH = 2;

export const register = (commandDictionary) => {
    commandDictionary[UPDATED_COMMAND] = parse;
    return commandDictionary;
}

const parse = (tokens) => {
    const localTokens = tokens || [];
    const length = localTokens.length;

    if (length !== LENGTH) {
        throw new Error(`Incompatible command tokens for >${UPDATED_COMMAND}<. Expected ${LENGTH}, Got: ${length}`);
    }

    return {
        "command": UPDATED_COMMAND,
        "eventId": localTokens.shift(),
        "competitionCode": localTokens.shift(),
    };
}
