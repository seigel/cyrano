// noinspection SpellCheckingInspection
export const ACK_COMMAND = "ACK";
const LENGTH = 0;

export const register = (commandDictionary) => {
    commandDictionary[ACK_COMMAND] = parse;
    return commandDictionary;
}

export const registerBuilder = (builderDictionary) => {
    builderDictionary[ACK_COMMAND] = build;
    return builderDictionary;
}

export const build = ({}) => {
    return [ACK_COMMAND];
}

const parse = (tokens) => {
    const localTokens = tokens || [];
    const length = localTokens.length;

    if (length !== LENGTH) {
        throw new Error(`Incompatible command tokens for >${ACK_COMMAND}<. Expected ${LENGTH}, Got: ${length}`);
    }

    return {
        "command": ACK_COMMAND,
    };
}
