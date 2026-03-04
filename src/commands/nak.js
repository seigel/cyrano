// noinspection SpellCheckingInspection
export const NAK_COMMAND = "NAK";
const LENGTH = 0;

export const register = (commandDictionary) => {
    commandDictionary[NAK_COMMAND] = parse;
    return commandDictionary;
}

export const registerBuilder = (builderDictionary) => {
    builderDictionary[NAK_COMMAND] = build;
    return builderDictionary;
}

export const build = ({}) => {
    return [NAK_COMMAND];
}

const parse = (tokens) => {
    const localTokens = tokens || [];
    const length = localTokens.length;

    if (length !== LENGTH) {
        throw new Error(`Incompatible command tokens for >${NAK_COMMAND}<. Expected ${LENGTH}, Got: ${length}`);
    }

    return {
        "command": NAK_COMMAND,
    };
}
