// noinspection SpellCheckingInspection
export const INFO_COMMAND = "INFO";
const LENGTH = 42;

export const register = (commandDictionary) => {
    commandDictionary[INFO_COMMAND] = parse;
    return commandDictionary;
}

const parse = (tokens) => {
    const localTokens = tokens || [];
    const length = localTokens.length;

    if (length !== LENGTH) {
        throw new Error(`Incompatible command tokens for >${INFO_COMMAND}<. Expected ${LENGTH}, Got: ${length}`);
    }

    return {
        "command": INFO_COMMAND,
        "piste": localTokens.shift(),
        "eventId": localTokens.shift(),
        "competitionCode": localTokens.shift(),
        "competitionPhase": localTokens.shift(),
        "boutOrderInPhase": localTokens.shift(),
        "roundNumber": localTokens.shift(),
        "boutId": localTokens.shift(),
        "beginTime": localTokens.shift(),
        "stopwatch": localTokens.shift(),
        "state": localTokens.shift(),
        "refereeRemoteControl": localTokens.shift(),
        "priority": localTokens.shift(),
        "callTechnician": localTokens.shift(),
        "callVideoEngineer": localTokens.shift(),
        "callDoctor": localTokens.shift(),
        "callDT": localTokens.shift(),
        "reverse": localTokens.shift(),
        "standby": localTokens.shift(),
        "rightFencer": {
            "id": localTokens.shift(),
            "name": localTokens.shift(),
            "teamInfo": localTokens.shift(),
            "teamMemberId": localTokens.shift(),
            "teamMemberName": localTokens.shift(),
            "score": localTokens.shift(),
            "yellowCard": localTokens.shift(),
            "redCards": localTokens.shift(),
            "blackCard": localTokens.shift(),
            "usedVideo": localTokens.shift(),
            "lamp": localTokens.shift(),
            "whiteLamp": localTokens.shift(),
        },
        "leftFencer": {
            "id": localTokens.shift(),
            "name": localTokens.shift(),
            "teamInfo": localTokens.shift(),
            "teamMemberId": localTokens.shift(),
            "teamMemberName": localTokens.shift(),
            "score": localTokens.shift(),
            "yellowCard": localTokens.shift(),
            "redCards": localTokens.shift(),
            "blackCard": localTokens.shift(),
            "usedVideo": localTokens.shift(),
            "lamp": localTokens.shift(),
            "whiteLamp": localTokens.shift(),
        },
    };
}
