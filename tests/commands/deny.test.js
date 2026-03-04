import {DENY_COMMAND, register, registerBuilder, build} from "../../src/commands/deny";

describe('#register', () => {
    test('basic registration should work', () => {
        const commandDictionary = {};
        register(commandDictionary);
        expect(typeof commandDictionary[DENY_COMMAND]).toEqual('function');
    });
});

describe('#parse', () => {
    const parse = register({})[DENY_COMMAND];
    let parsedResult = null;

    describe('invalid length of tokens', function () {
        test('problem with token length for this parser', () => {
            expect(() => { parse(["HI", "THERE"]); })
                .toThrowError(`Incompatible command tokens for >${DENY_COMMAND}<. Expected 1, Got: 2`);
        });
        test('no issue with null tokens', () => {
            expect(() => { parse(null); })
                .toThrowError(`Incompatible command tokens for >${DENY_COMMAND}<. Expected 1, Got: 0`);
        });
    });

    describe("valid parameters", () => {
        beforeEach(() => {
            parsedResult = parse(['Piste does not exists']);
        });
        test('has the command in the result', () => {
            expect(parsedResult['command']).toEqual(DENY_COMMAND);
        });
        test('reads the reason', () => {
            expect(parsedResult['reason']).toEqual('Piste does not exists');
        });
    });
});

describe('#registerBuilder', () => {
    test('basic registration should work', () => {
        const builderDictionary = {};
        registerBuilder(builderDictionary);
        expect(typeof builderDictionary[DENY_COMMAND]).toEqual('function');
    });
});

describe('#build', () => {
    test('returns token array with command and reason', () => {
        expect(build({ reason: 'Piste does not exists' })).toEqual(['DENY', 'Piste does not exists']);
    });
});
