// noinspection SpellCheckingInspection
export const TEAM_COMMAND = "TEAM";
const LENGTH = 20;

export const register = (commandDictionary) => {
    commandDictionary[TEAM_COMMAND] = parse;
    return commandDictionary;
}

export const registerBuilder = (builderDictionary) => {
    builderDictionary[TEAM_COMMAND] = build;
    return builderDictionary;
}

export const build = ({ piste, side, members, rounds, uniqueId }) => {
    return [
        TEAM_COMMAND,
        piste, side,
        members[0].id, members[0].name,
        members[1].id, members[1].name,
        members[2].id, members[2].name,
        members[3].id, members[3].name,
        ...rounds,
        uniqueId,
    ];
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
