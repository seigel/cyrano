import {STANDBY_COMMAND, register, registerBuilder, build} from "../../src/commands/standby";

describe('#register', () => {
    test('basic registration should work', () => {
        const commandDictionary = {};
        register(commandDictionary);
        expect(typeof commandDictionary[STANDBY_COMMAND]).toEqual('function');
    });
});

describe('#parse', () => {
    const parse = register({})[STANDBY_COMMAND];
    let parsedResult = null;

    describe('invalid length of tokens', function () {
        test('problem with token length for this parser', () => {
            expect(() => { parse(["HI", "THERE"]); })
                .toThrowError(`Incompatible command tokens for >${STANDBY_COMMAND}<. Expected 1, Got: 2`);
        });
        test('no issue with null tokens', () => {
            expect(() => { parse(null); })
                .toThrowError(`Incompatible command tokens for >${STANDBY_COMMAND}<. Expected 1, Got: 0`);
        });
    });

    describe("valid parameters", () => {
        beforeEach(() => {
            parsedResult = parse(['FINAL']);
        });
        test('has the command in the result', () => {
            expect(parsedResult['command']).toEqual(STANDBY_COMMAND);
        });
        test('reads the piste', () => {
            expect(parsedResult['piste']).toEqual('FINAL');
        });
    });
});

describe('#registerBuilder', () => {
    test('basic registration should work', () => {
        const builderDictionary = {};
        registerBuilder(builderDictionary);
        expect(typeof builderDictionary[STANDBY_COMMAND]).toEqual('function');
    });
});

describe('#build', () => {
    test('returns token array with command and piste', () => {
        expect(build({ piste: 'FINAL' })).toEqual(['STANDBY', 'FINAL']);
    });
});
