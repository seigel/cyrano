import {UPDATED_COMMAND, register} from "../../src/commands/updated";

describe('#register', () => {
    test('basic registration should work', () => {
        const commandDictionary = {};
        register(commandDictionary);
        expect(typeof commandDictionary[UPDATED_COMMAND]).toEqual('function');
    });
});

describe('#parse', () => {
    const parse = register({})[UPDATED_COMMAND];
    let parsedResult = null;

    describe('invalid length of tokens', function () {
        test('problem with token length for this parser', () => {
            expect(() => { parse(["HI"]); })
                .toThrowError(`Incompatible command tokens for >${UPDATED_COMMAND}<. Expected 2, Got: 1`);
        });
        test('no issue with null tokens', () => {
            expect(() => { parse(null); })
                .toThrowError(`Incompatible command tokens for >${UPDATED_COMMAND}<. Expected 2, Got: 0`);
        });
    });

    describe("valid parameters", () => {
        beforeEach(() => {
            parsedResult = parse(['23', 'EIM']);
        });
        test('has the command in the result', () => {
            expect(parsedResult['command']).toEqual(UPDATED_COMMAND);
        });
        test('reads the event id', () => {
            expect(parsedResult['eventId']).toEqual('23');
        });
        test('reads the competition code', () => {
            expect(parsedResult['competitionCode']).toEqual('EIM');
        });
    });
});
