// noinspection SpellCheckingInspection
export const TEAM_COMMAND = "TEAM";
const LENGTH = 20;

export const register = (commandDictionary) => {
    commandDictionary[TEAM_COMMAND] = parse;
    return commandDictionary;
}

const parse = (tokens) => {
    const localTokens = tokens || [];
    const length = localTokens.length;

    if (length !== LENGTH) {
        throw new Error(`Incompatible command tokens for >${TEAM_COMMAND}<. Expected ${LENGTH}, Got: ${length}`);
    }

    return {
        "command": TEAM_COMMAND,
        "piste": localTokens.shift(),
        "side": localTokens.shift(),
        "members": [
            { "id": localTokens.shift(), "name": localTokens.shift() },
            { "id": localTokens.shift(), "name": localTokens.shift() },
            { "id": localTokens.shift(), "name": localTokens.shift() },
            { "id": localTokens.shift(), "name": localTokens.shift() },
        ],
        "rounds": [
            localTokens.shift(),
            localTokens.shift(),
            localTokens.shift(),
            localTokens.shift(),
            localTokens.shift(),
            localTokens.shift(),
            localTokens.shift(),
            localTokens.shift(),
            localTokens.shift(),
        ],
        "uniqueId": localTokens.shift(),
    };
}
