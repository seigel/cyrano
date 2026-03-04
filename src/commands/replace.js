// noinspection SpellCheckingInspection
export const REPLACE_COMMAND = "REPLACE";
const LENGTH = 3;

export const register = (commandDictionary) => {
    commandDictionary[REPLACE_COMMAND] = parse;
    return commandDictionary;
}

export const registerBuilder = (builderDictionary) => {
    builderDictionary[REPLACE_COMMAND] = build;
    return builderDictionary;
}

export const build = ({ piste, side, fencerNumber }) => {
    return [REPLACE_COMMAND, piste, side, fencerNumber];
}

const parse = (tokens) => {
    const localTokens = tokens || [];
    const length = localTokens.length;

    if (length !== LENGTH) {
        throw new Error(`Incompatible command tokens for >${REPLACE_COMMAND}<. Expected ${LENGTH}, Got: ${length}`);
    }

    return {
        "command": REPLACE_COMMAND,
        "piste": localTokens.shift(),
        "side": localTokens.shift(),
        "fencerNumber": localTokens.shift(),
    };
}
