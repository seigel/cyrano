// noinspection SpellCheckingInspection
export const DISP_COMMAND = "DISP";
const LENGTH = 19;

export const register = (commandDictionary) => {
    commandDictionary[DISP_COMMAND] = parse;
    return commandDictionary;
}

const parse = (tokens) => {
    const length = (tokens || []).length;
    if (length !== LENGTH) {
        throw new Error(`Incompatible command tokens for >${DISP_COMMAND}<. Expected ${LENGTH}, Got: ${length}`);
    }
    return {
        "command": DISP_COMMAND,
        "piste": tokens.shift(),
        "eventId": tokens.shift(),
        "competitionCode": tokens.shift(),
        "competitionPhase": tokens.shift(),
        "boutOrderInPhase": tokens.shift(),
        "boutId": tokens.shift(),
        "beginTime": tokens.shift(),
        "stopwatch": tokens.shift(),
        "rightFencer": {
            "id": tokens.shift(),
            "name": tokens.shift(),
            "teamInfo": tokens.shift(),
            "teamId": tokens.shift(),
            "teamMemberName": tokens.shift(),
        },
        "leftFencer": {
            "id": tokens.shift(),
            "name": tokens.shift(),
            "teamInfo": tokens.shift(),
            "teamId": tokens.shift(),
            "teamMemberName": tokens.shift(),
        },
        "stringify": function () {
            return stringify(this)
        }
    };
}

const stringify = (dictionary) => {
    return "";
}
