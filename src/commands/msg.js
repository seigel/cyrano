// noinspection SpellCheckingInspection
export const MSG_COMMAND = "MSG";
const LENGTH = 2;

export const register = (commandDictionary) => {
    commandDictionary[MSG_COMMAND] = parse;
    return commandDictionary;
}

const parse = (tokens) => {
    const localTokens = tokens || [];
    const length = localTokens.length;

    if (length !== LENGTH) {
        throw new Error(`Incompatible command tokens for >${MSG_COMMAND}<. Expected ${LENGTH}, Got: ${length}`);
    }

    return {
        "command": MSG_COMMAND,
        "piste": tokens.shift(),
        "message": tokens.shift(),
    };
}
