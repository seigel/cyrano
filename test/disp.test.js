import {DISP_COMMAND} from "../src/commands/disp";
import {register} from "../src/commands/disp";

const EXAMPLE_DISP_TOKENS = [
        'RED', '24', 'EIM', 'T32', '1', '32', "14:45", "3:00",
        "33", " IVANOV Sidor", 'CAN', '', '',
        '531', 'LIMON Jua', 'FRA', '', '', ''
    ]
;

describe('#register', () => {
    test('basic registration should work', () => {
        const commandDictionary = {};
        register(commandDictionary);
        const result = commandDictionary[DISP_COMMAND];
        expect(
            typeof result
        ).toEqual(
            'function'
        );
    });
});
describe('#parse', () => {
    const parse = register({})[DISP_COMMAND];
    let parsedResult = null;

    beforeEach(()=>{
        const tokens = [...EXAMPLE_DISP_TOKENS];
        parsedResult = parse(tokens);
    });

    test('has the command in the result', () => {
        expect(
            parsedResult['command']
        ).toEqual(
            DISP_COMMAND
        )
    });

    test('reads the piste', () => {
        expect(
            parsedResult['piste']
        ).toEqual(
            "RED"
        )
    });
    test('reads the event identifier', () => {
        expect(
            parsedResult['eventId']
        ).toEqual(
            "24"
        )
    });

    test('reads the competition code', () => {
        expect(
            parsedResult['competitionCode']
        ).toEqual(
            "EIM"
        )
    });

    test('reads the competition phase', () => {
        expect(
            parsedResult['competitionPhase']
        ).toEqual(
            "T32"
        )
    });

    test('Bout order in Phase', () => {
        expect(
            parsedResult['boutOrderInPhase']
        ).toEqual(
            "1"
        )
    });
})
