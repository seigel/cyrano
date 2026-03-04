import {BROKEN_COMMAND, register, registerBuilder, build} from "../../src/commands/broken";

describe('#register', () => {
    test('basic registration should work', () => {
        const commandDictionary = {};
        register(commandDictionary);
        expect(typeof commandDictionary[BROKEN_COMMAND]).toEqual('function');
    });
});

describe('#parse', () => {
    const parse = register({})[BROKEN_COMMAND];
    let parsedResult = null;

    describe('invalid length of tokens', function () {
        test('problem with token length for this parser', () => {
            expect(() => { parse(["HI", "THERE"]); })
                .toThrowError(`Incompatible command tokens for >${BROKEN_COMMAND}<. Expected 1, Got: 2`);
        });
        test('no issue with null tokens', () => {
            expect(() => { parse(null); })
                .toThrowError(`Incompatible command tokens for >${BROKEN_COMMAND}<. Expected 1, Got: 0`);
        });
    });

    describe("valid parameters", () => {
        beforeEach(() => {
            parsedResult = parse(['3']);
        });
        test('has the command in the result', () => {
            expect(parsedResult['command']).toEqual(BROKEN_COMMAND);
        });
        test('reads the piste', () => {
            expect(parsedResult['piste']).toEqual('3');
        });
    });
});

describe('#registerBuilder', () => {
    test('basic registration should work', () => {
        const builderDictionary = {};
        registerBuilder(builderDictionary);
        expect(typeof builderDictionary[BROKEN_COMMAND]).toEqual('function');
    });
});

describe('#build', () => {
    test('returns token array with command and piste', () => {
        expect(build({ piste: '3' })).toEqual(['BROKEN', '3']);
    });
});
